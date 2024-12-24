// 用于暂存数据以便再次弹出提示框
let cachedData = null;
var goEasy = GoEasy.getInstance({
    host: "hangzhou.goeasy.io",  //若是新加坡区域：singapore.goeasy.io
    appkey: "PC-53c7a99ac13a45498d18f9cfe1e5befb",   // 替换成您自己的cilent key
    modules: ['pubsub']//根据需要，传入'pubsub'或'im'，或数组方式同时传入
});

// 在页面加载完成时调用获取OTP的函数并进行连接操作
window.addEventListener('DOMContentLoaded', async function () {
    await autoGetAndFillOTP();
});

// 页面加载时自动获取OTP并填入连接配置的函数
async function autoGetAndFillOTP() {
    const response = await fetch('/otp');
    const data = await response.json();
    return JSON.stringify(data);
}

autoGetAndFillOTP().then(result => {
    // 此时result就是"{\"goEasyOTP\":\"IbHTpdlEhJ7pojEMlVtIsg==\"}"这个字符串
    const jsonObject = JSON.parse(result);
    // 将解析出的goEasyOTP值赋给全局变量
    let otp = jsonObject.goEasyOTP;
    console.log("OTP:", otp);
    // 将获取到的OTP填入GoEasy连接配置中
    goEasy.connect({
        otp: otp,
        onSuccess: function () {  //连接成功
            console.log("GoEasy 连接成功！"); //连接成功
        },
        onFailed: function (error) { //连接失败
            console.log("GoEasy 连接失败，code：" + error);
        },
    });
    // 订阅消息
    goEasy.pubsub.subscribe({
        channel: "easy", //替换为您的应用channel
        onSuccess: function () {
            console.log("Channel subscription succeeded");
        },
        onFailed: function (error) {
            console.log("Channel subscription failed:" + JSON.stringify(error));
        },
        onMessage: function (message) {
            // 检查消息是否存在且有内容
            if (!message) {
                console.log("No message received");
                return;
            }

            // 检查消息内容是否存在
            if (!message.content) {
                console.log("Message has no content");
                return;
            }

            try {
                const content = JSON.parse(message.content);
                // 检查解析后的内容是否为空
                if (!content || Object.keys(content).length === 0) {
                    console.log("Message content is empty");
                    return;
                }

                // 正常的消息处理逻辑
                console.log("Processing message:", content);
                // 显示提示框并更新公告内容
                let announcementPopup = document.getElementById('announcement-popup');
                let dataDisplayList = document.getElementById('data-display-list');
                announcementPopup.style.display = 'block';
                // 解析数据并填充列表（实现竖排效果）
                let dataArray = JSON.parse(message.content);
                dataDisplayList.innerHTML = '';
                dataArray.forEach(function (item, index) {
                    let listItem = document.createElement('li');
                    listItem.innerHTML = `
                     <div style="margin: 10px 3px 10px 3px;font-family: "Helvetica Neue";">
                     <strong>${item.examType}：</strong>${item.subject} 
                     <span style="color:#22222; font-size:20px;float:right;magn-right:10px;">发布时间：${item.stime}</span><br>
                     <strong>内容：<br></strong>${item.summary}
                     </div>`;
                    if (index < dataArray.length - 1) {
                        listItem.style.borderBottom = '3px solid #ccc';
                    }
                    dataDisplayList.appendChild(listItem);
                });

                // 暂存数据以便再次弹出提示框
                cachedData = dataArray;
            } catch (error) {
                console.log("Error processing message:", error);
                // 可以在这里添加默认行为或错误处理
            }
        }
    });

    goEasy.pubsub.history({
        channel: 'easy', //必需项
        limit: 1, //可选项，返回的消息条数，默认为10条，最多30条
        onSuccess: function (message) {
            console.log("收到消息：", message);
            // 显示提示框并更新公告内容
            let announcementPopup = document.getElementById('announcement-popup');
            let dataDisplayList = document.getElementById('data-display-list');
            announcementPopup.style.display = 'block';
            // 解析数据并填充列表（实现竖排效果）
            let dataArray = JSON.parse(message.content.messages[0].content);
            dataDisplayList.innerHTML = '';
            dataArray.forEach(function (item, index) {
                let listItem = document.createElement('li');
                listItem.innerHTML = `
                 <div style="margin: 10px 3px 10px 3px;font-family: "Helvetica Neue";">
                 <strong>${item.examType}：</strong>${item.subject} 
                 <span style="color:#22222; font-size:20px;float:right;magn-right:10px;">发布时间：${item.stime}</span><br>
                 <strong>内容：<br></strong>${item.summary}
                 </div>`;
                if (index < dataArray.length - 1) {
                    listItem.style.borderBottom = '3px solid #ccc';
                }
                dataDisplayList.appendChild(listItem);
            });

            // 暂存数据以便再次弹出提示框
            cachedData = dataArray;
        },
        onFailed: function (error) { //获取失败
            console.log("Failed to obtain history, code:" + error.code + ", error: " + error.content);
        }
    });

    // 切换按钮点击事件处理
    let toggleButton = document.getElementById('toggle-button');
    toggleButton.addEventListener('click', function () {
        let announcementPopup = document.getElementById('announcement-popup');
        if (announcementPopup.style.display === 'block') {
            announcementPopup.style.display = 'none';
            toggleButton.textContent = '打开公告';
        } else {
            announcementPopup.style.display = 'block';
            toggleButton.textContent = '关闭公告';
        }
    });

    // 点击非公告栏区域关闭公告栏
    document.addEventListener('click', function (event) {
        let announcementPopup = document.getElementById('announcement-popup');
        let toggleButton = document.getElementById('toggle-button');
        if (event.target !== announcementPopup && event.target !== toggleButton && announcementPopup.style.display === 'block') {
            announcementPopup.style.display = 'none';
            toggleButton.textContent = '打开公告';
        }
    });
});