const express = require('express');
const app = express();
const port = 9000;
const https = require('https'); // 这里修正了变量名，使其更符合语义，用于发起https请求
const crypto = require('crypto');

// 从环境变量中获取相关配置信息
const kdocsUrl = process.env.kdocsUrl;
const kdocsToken = process.env.kdocsToken;
const webhookUrl = process.env.kdocsFrom;
const secretKey = process.env.Secretkey; // 替换为实际的Secret key
const kwsc = process.env.kwsc; // 考务web的secret key

// 设置静态页面目录，这里假设静态页面都放在名为'public'的目录下，你可以根据实际情况修改
app.use(express.static('public'));

// 定义路由，当访问/k时，发送kw.html文件
app.get('/k', (req, res) => {
    res.sendFile(path.join(__dirname, 'kw.html'));
});

// 新增一个接口路由，用于获取金山文档API的数据并推送到前端
app.get('/api/getKdocsData', (req, res) => {
    const options = {
        method: 'POST',
        hostname: 'www.kdocs.cn',
        port: null,
        path: kdocsUrl,
        headers: {
            'Content-Type': 'application/json',
            'AirScript-Token': kdocsToken
        }
    };

    const reqInner = https.request(options, (resInner) => {
        const chunks = [];
        // 收集响应数据块
        resInner.on('data', (chunk) => {
            chunks.push(chunk);
        });
        resInner.on('end', () => {
            const body = Buffer.concat(chunks);
            const bodydata = body.toString();
            console.log('从金山文档获取到的数据:', bodydata);

            // 将从金山文档获取到的数据直接作为响应发送给前端
            res.send(bodydata);
        });
    });

    // 写入请求体数据（这里是一个简单的示例数据结构，根据实际需求调整）
    reqInner.write(JSON.stringify({ Context: { argv: {} } }));
    reqInner.end();

    reqInner.on('error', (err) => {
        console.error('向金山文档API请求出错:', err);
        res.status(500).send('向金山文档API请求出错');
    });
});

// 生成GoEasy-OTP的函数
function goEasyOTP(secretKey) {
    try {
        // 获取当前系统毫秒数并拼接成指定格式的字符串
        const otp = '000' + Date.now();

        // 将字符串形式的密钥转换为Buffer类型，作为加密密钥
        const key = Buffer.from(secretKey, 'utf8');

        // 创建AES加密对象，使用ECB��式且不使用填充（与Java代码中的NoPadding对应）
        const cipher = crypto.createCipheriv('aes-128-ecb', key, null);

        // 设置加密模式为加密
        cipher.setAutoPadding(false);

        // 将otp字符串转换为字节类型
        const otpBytes = Buffer.from(otp, 'utf8');

        // 对otp字节数组进行加密
        let encryptedOTP = cipher.update(otpBytes);
        encryptedOTP = Buffer.concat([encryptedOTP, cipher.final()]);

        // 对加密结果进行Base64编码
        const otpBase64 = encryptedOTP.toString('base64');

        return otpBase64;
    } catch (err) {
        throw new Error('Failed to generate GoEasy-OTP.');
    }
}

// 生成GoEasy-OTP的路由（使用secretKey）
app.get('/otp', async (req, res) => {
    try {
        // 假设这里从配置文件或者环境变量中获取Secret key
        const generatedOTP = goEasyOTP(secretKey);
        res.send({ goEasyOTP: generatedOTP });
    } catch (err) {
        res.status(500).json({
            error: '生成GoEasy-OTP时出错',
            details: err.message
        });
    }
});

// 生成考务相关GoEasy-OTP的路由（使用kwsc）
app.get('/kwotp', async (req, res) => {
    try {
        // 假设这里从配置文件或者环境变量中获取Secret key
        const kwOTP = goEasyOTP(kwsc);
        res.send({ goEasyOTP: kwOTP });
    } catch (err) {
        res.status(500).json({
            error: '生成GoEasy-OTP时出错',
            details: err.message
        });
    }
});

// 壁纸 API 地址
const wallpaperApiUrl = 'https://api.mmp.cc/api/pcwallpaper?category=4k&type=jpg';

// 辅助函数，用于将响应数据拼接成字符串
function handleResponseData(resInner, callback) {
    let data = '';
    resInner.on('data', (chunk) => {
        data += chunk;
    });
    resInner.on('end', () => {
        callback(null, data);
    });
    resInner.on('error', (err) => {
        callback(err);
    });
}

// 后端路由，用于获取壁纸数据并返回给前端
app.get('/api/wallpaper', (req, res) => {
    const options = {
        hostname: 'api.mmp.cc',
        port: 443,
        path: '/api/pcwallpaper?category=&type=',
        method: 'GET',
        headers: {
            // 根据实际需求添加可能需要的请求头，这里示例为空
        }
    };

    const reqInner = https.request(options, (resInner) => {
        handleResponseData(resInner, (err, bodydata) => {
            if (err) {
                res.status(500).send('后端获取壁纸数据出错：' + err.message);
                return;
            }
            try {
                const data = JSON.parse(bodydata);
                res.json(data);
            } catch (parseErr) {
                res.status(500).send('解析壁纸数据出错：' + parseErr.message);
            }
        });
    });

    reqInner.on('error', (err) => {
        res.status(500).send('向壁纸 API 发起请求出错：' + err.message);
    });
    reqInner.end();
});

// 使Express应用能够解析JSON格式的请求体数据
app.use(express.json());

// 创建一个路由，用于接收表单数据并传递给AirScript
app.post('/submitFormData', (req, res) => {
    const { examType, roomNumber, subject } = req.body;

    // 构建请求数据
    const requestData = {
        Context: {
            argv: {
                action: 'create',
                sheet: '考务通知',
                fields: {
                    "年级": subject,
                    "问题": examType,
                    "教室号": roomNumber
                }
            }
        }
    };

    const postData = JSON.stringify(requestData);

    // 使用环境变量中的 webhookUrl
    const webhookUrlObj = new URL(webhookUrl);
    
    const options = {
        hostname: webhookUrlObj.hostname,
        path: webhookUrlObj.pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'AirScript-Token': kdocsToken,  // 使用环境变量中的 kdocsToken
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const reqInner = https.request(options, (resInner) => {
        let data = '';

        resInner.on('data', (chunk) => {
            data += chunk;
        });

        resInner.on('end', () => {
            try {
                const responseData = JSON.parse(data);
                
                if (responseData && responseData.error) {
                    console.error('AirScript操作出错:', responseData.error);
                    res.status(500).json({
                        success: false,
                        message: '操作失败',
                        error: responseData.error
                    });
                    return;
                }

                res.status(200).json({
                    success: true,
                    message: '操作成功',
                    data: responseData
                });

            } catch (parseErr) {
                console.error('解析响应数据出错:', parseErr);
                res.status(500).json({
                    success: false,
                    message: '解析响应数据失败',
                    error: parseErr.message
                });
            }
        });
    });

    reqInner.on('error', (err) => {
        console.error('请求出错:', err);
        res.status(500).json({
            success: false,
            message: '请求失败',
            error: err.message
        });
    });

    reqInner.write(postData);
    reqInner.end();
});

// 启动服务器，监听9000端口
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});