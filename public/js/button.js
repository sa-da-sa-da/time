document.addEventListener('DOMContentLoaded', function() {
    setupTimeToggle(); // 初始化时间切换功能
});


// 监考老师要填写的考务表单 跳转 考务表单
function callexam() {
    window.open("https://f.wps.cn/g/Mos5uoMT", "_blank"); // 填写 你 的 考务表单
}function kwbutton(){
    window.open("https://time.sakaay.com/kw.html", "_blank");
}
function adminbutton(){
    window.open("https://www.kdocs.cn/etapps/workbench/w/MCIYxWUs", "_blank");
}
function toggleFullscreen() {
    const fullscreenButton = document.getElementById('fullscreenButton');

    // 检查浏览器是否支持全屏
    function getBrowserFullscreenElement() {
        if (typeof document.fullscreenElement !== "undefined") {
            return document.fullscreenElement;
        } else if (typeof document.webkitFullscreenElement !== "undefined") {
            return document.webkitFullscreenElement;
        } else if (typeof document.mozFullScreenElement !== "undefined") {
            return document.mozFullScreenElement;
        } else if (typeof document.msFullscreenElement !== "undefined") {
            return document.msFullscreenElement;
        }
        return null;
    }

    // 请求全屏
    function requestFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    // 退出全屏
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    // 检查浏览器是否支持全屏API
    function isFullscreenEnabled() {
        return document.fullscreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled;
    }

    fullscreenButton.addEventListener('click', function () {
        if (!isFullscreenEnabled()) {
            // 如果浏览器不支持全屏API，显示提示
            Swal.fire({
                title: '全屏功能不可用',
                text: '您的浏览器不支持全屏功能，建议使用最新版本的Chrome、Firefox或Edge浏览器',
                icon: 'warning',
                confirmButtonText: '确定'
            });
            return;
        }

        try {
            if (!getBrowserFullscreenElement()) {
                // 进入全屏
                requestFullscreen(document.documentElement);
                fullscreenButton.title = '退出全屏';
            } else {
                // 退出全屏
                exitFullscreen();
                fullscreenButton.title = '进入全屏';
            }
        } catch (error) {
            console.error('全屏操作失败:', error);
            Swal.fire({
                title: '全屏操作失败',
                text: '请尝试使用其他浏览器或更新当前浏览器',
                icon: 'error',
                confirmButtonText: '确定'
            });
        }
    });

    // 监听全屏变化事件
    const fullscreenEvents = [
        'fullscreenchange',
        'webkitfullscreenchange',
        'mozfullscreenchange',
        'MSFullscreenChange'
    ];

    fullscreenEvents.forEach(eventName => {
        document.addEventListener(eventName, function() {
            if (!getBrowserFullscreenElement()) {
                fullscreenButton.title = '进入全屏';
            } else {
                fullscreenButton.title = '退出全屏';
            }
        });
    });

    // 初始化按钮标题
    fullscreenButton.title = '进入全屏';
}




// 等待
function wait(duration) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, duration);
    });
}


//暂时被弃用了 等待时机
function playBell(type) {
    Swal.fire({
        title: '确定播放铃声吗？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        position: 'center',
        customClass: {
            container: 'your-custom-class'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let audio;
            switch (type) {
                case 1:
                    audio = new Audio('https://timezk.oss-cn-beijing.aliyuncs.com/03%E5%93%A8%E5%A3%B0%E4%B8%80%E9%95%BF.mp3');
                    setTimeout(() => {
                        const audio2 = new Audio('https://timezk.oss-cn-beijing.aliyuncs.com/11%E7%8E%B0%E5%9C%A8%E5%88%86%E5%8F%91%E8%AF%95%E5%8D%B7.mp3');
                        audio2.play();
                    }, 1000);
                    break;
                case 2:
                    audio = new Audio('https://timezk.oss-cn-beijing.aliyuncs.com/02%E5%93%A8%E5%A3%B0%E4%B8%80%E7%9F%AD.mp3');
                    setTimeout(() => {
                        const audio2 = new Audio('https://timezk.oss-cn-beijing.aliyuncs.com/12%E7%8E%B0%E5%9C%A8%E5%BC%80%E5%A7%8B%E7%AD%94%E9%A2%98.mp3');
                        audio2.play();
                    }, 1000);
                    break;
                case 3:
                    audio = new Audio('https://timezk.oss-cn-beijing.aliyuncs.com/02%E5%93%A8%E5%A3%B0%E4%B8%80%E7%9F%AD.mp3');
                    setTimeout(() => {
                        const audio2 = new Audio('https://timezk.oss-cn-beijing.aliyuncs.com/13%E6%9C%80%E5%90%8E15%E5%88%86%E9%92%9F.mp3');
                        audio2.play();
                    }, 1000);
                    break;
                case 4:
                    audio = new Audio('https://timezk.oss-cn-beijing.aliyuncs.com/03%E5%93%A8%E5%A3%B0%E4%B8%80%E9%95%BF.mp3');
                    setTimeout(() => {
                        const audio2 = new Audio('https://timezk.oss-cn-beijing.aliyuncs.com/14%E8%80%83%E8%AF%95%E7%BB%93%E6%9D%9F%E6%8A%8A%E7%AC%94%E6%94%BE%E4%B8%8B.mp3');
                        audio2.play();
                    }, 1000);
                    break;
            }
            audio.play();
        }
    });

}


function setupTimeToggle() {
    const toggleTimeButton = document.getElementById('toggleTimeButton');
    const toggleCarouselButton = document.getElementById('toggleCarouselButton');
    const setCountdownButton = document.getElementById('setCountdownButton');
    let isCountdownMode = false;
    let targetTime = null;
    let hasCountdown = false;
    let carouselInterval = null;

    // 如果找不到设置倒计时按钮，创建一个
    if (!setCountdownButton) {
        const newSetCountdownButton = document.createElement('button');
        newSetCountdownButton.id = 'setCountdownButton';
        newSetCountdownButton.className = 'elegant-button';
        newSetCountdownButton.textContent = '设置倒计时';
        toggleTimeButton.parentNode.insertBefore(newSetCountdownButton, toggleTimeButton.nextSibling);
    }

    // 重新获取按钮
    const countdownButton = document.getElementById('setCountdownButton');

    // 初始隐藏切换显示按钮和轮播按钮
    toggleTimeButton.style.display = 'none';
    toggleCarouselButton.style.display = 'none';

    // 创建清零按钮
    const resetButton = document.createElement('button');
    resetButton.id = 'resetButton';
    resetButton.className = 'elegant-button';
    resetButton.textContent = '清零倒计时';
    resetButton.style.display = 'none';
    document.querySelector('.exam-operations').appendChild(resetButton);

    // 设置倒计时按钮事件
    countdownButton.addEventListener('click', () => {
        Swal.fire({
            title: '设置倒计时',
            html: `
                <div style="display: flex; justify-content: center; align-items: center;">
                    <input type="number" id="hours" class="swal2-input" placeholder="时" min="0" max="99" style="width: 70px; margin: 0 2px;">
                    <span style="margin: 0 2px;">:</span>
                    <input type="number" id="minutes" class="swal2-input" placeholder="分" min="0" max="59" style="width: 70px; margin: 0 2px;">
                    <span style="margin: 0 2px;">:</span>
                    <input type="number" id="seconds" class="swal2-input" placeholder="秒" min="0" max="59" style="width: 70px; margin: 0 2px;">
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: '开始倒计时',
            cancelButtonText: '取消',
            preConfirm: () => {
                const hours = document.getElementById('hours').value;
                const minutes = document.getElementById('minutes').value;
                const seconds = document.getElementById('seconds').value;
                
                if (!hours && !minutes && !seconds) {
                    Swal.showValidationMessage('请至少输入一个时间值');
                    return false;
                }
                
                if ((minutes && (minutes < 0 || minutes > 59)) || 
                    (seconds && (seconds < 0 || seconds > 59))) {
                    Swal.showValidationMessage('分钟和秒钟必须在0-59之间');
                    return false;
                }
                
                return { 
                    hours: parseInt(hours) || 0, 
                    minutes: parseInt(minutes) || 0,
                    seconds: parseInt(seconds) || 0
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { hours, minutes, seconds } = result.value;
                targetTime = new Date().getTime() + 
                    (hours * 60 * 60 * 1000) + 
                    (minutes * 60 * 1000) + 
                    (seconds * 1000);
                isCountdownMode = true;
                hasCountdown = true;
                
                // 显示其他按钮
                toggleTimeButton.style.display = 'inline-block';
                resetButton.style.display = 'block';
                toggleCarouselButton.style.display = 'block';
                
                // 设置切换按钮的初始文字
                toggleTimeButton.textContent = '显示当前时间';
                
                toggleTimeDisplay(true, targetTime);
            }
        });
    });

    // 修改切换按钮事件
    toggleTimeButton.addEventListener('click', () => {
        if (hasCountdown) {
            isCountdownMode = !isCountdownMode;
            if (isCountdownMode) {
                toggleTimeButton.textContent = '显示当前时间';
                toggleTimeDisplay(true, targetTime);
            } else {
                toggleTimeButton.textContent = '显示倒计时';
                toggleTimeDisplay(false);
            }
        }
    });

    // 修改清零按钮事件
    resetButton.addEventListener('click', () => {
        Swal.fire({
            title: '确认清零？',
            text: '倒计时将被清零',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then((result) => {
            if (result.isConfirmed) {
                // 清除轮播
                if (carouselInterval) {
                    clearInterval(carouselInterval);
                    carouselInterval = null;
                    toggleCarouselButton.textContent = '开启轮播';
                }
                
                targetTime = null;
                isCountdownMode = false;
                hasCountdown = false;
                
                // 隐藏按钮
                toggleTimeButton.style.display = 'none';
                resetButton.style.display = 'none';
                toggleCarouselButton.style.display = 'none';
                
                toggleTimeDisplay(false);
            }
        });
    });

    // 轮播按钮事件保持不变
    toggleCarouselButton.addEventListener('click', () => {
        if (!hasCountdown) {
            Swal.fire({
                title: '无法开启轮播',
                text: '请先设置倒计时',
                icon: 'warning',
                confirmButtonText: '确定'
            });
            return;
        }

        if (!carouselInterval) {
            // 开启轮播
            carouselInterval = setInterval(() => {
                isCountdownMode = !isCountdownMode;
                if (isCountdownMode) {
                    toggleTimeButton.textContent = '显示当前时间';
                    toggleTimeDisplay(true, targetTime);
                } else {
                    toggleTimeButton.textContent = '显示倒计时';
                    toggleTimeDisplay(false);
                }
            }, 10000); // 每10秒切换一次

            toggleCarouselButton.textContent = '关闭轮播';
            Swal.fire({
                title: '轮播已开启',
                text: '将每10秒自动切换显示',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        } else {
            // 关闭轮播并返回倒计时显示
            clearInterval(carouselInterval);
            carouselInterval = null;
            toggleCarouselButton.textContent = '开启轮播';
            
            // 确保返回到倒计时显示
            isCountdownMode = true;
            toggleTimeButton.textContent = '显示当前时间';
            toggleTimeDisplay(true, targetTime);
            
            Swal.fire({
                title: '轮播已关闭',
                text: '已返回倒计时显示',
                icon: 'info',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}
function toggleTimeDisplay(isCountdown, targetTime) {
    const clockElement = document.querySelector('.clock');
    const countdownElement = document.querySelector('.countdown');

    if (isCountdown && targetTime) {
        // 隐藏时钟，显示倒计时
        clockElement.classList.add('hidden');
        countdownElement.classList.remove('hidden');

        // 更新倒计时
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetTime - now;

            if (distance < 0) {
                // 倒计时结束
                countdownElement.innerHTML = "00:00:00";
                return;
            }

            // 计算时、分、秒
            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // 格式化显示
            countdownElement.innerHTML = 
                (hours < 10 ? "0" + hours : hours) + ":" +
                (minutes < 10 ? "0" + minutes : minutes) + ":" +
                (seconds < 10 ? "0" + seconds : seconds);

            // 继续更新
            requestAnimationFrame(updateCountdown);
        };

        updateCountdown();
    } else {
        // 显示时钟，隐藏倒计时
        clockElement.classList.remove('hidden');
        countdownElement.classList.add('hidden');
    }
}
function setupFormButton() {
    // 直接处理点击事件，不创建新按钮
    Swal.fire({
        title: '请具体填写您的需要，以便精准服务于您',
        html: `
            <form id="examForm" class="custom-form">

                <!-- 选择题1 -->
                <div class="form-group">
                    <label>1. 您的年级：</label>
                    <select id="subject" class="swal2-select" style="width: 300px; margin: 10px 0;">
                        <option value="高一">高一</option>
                        <option value="高二">高二</option>
                        <option value="高三" selected>高三</option>
                    </select>
                </div>
                <!-- 选择题1 -->
                <div class="form-group">
                    <label>2. 您的问题：</label>
                    <select id="examType" class="swal2-select" style="width: 300px; margin: 10px 0;">
                        <option value="缺调试卷题卡" selected>缺调试卷题卡</option>
                        <option value="教师上卫生间">教师上卫生间</option>
                        <option value="其他呼叫行为">其他呼叫行为</option>
                        <option value="学生上卫生间">学生上卫生间</option>
                        <option value="学生违纪行为">学生违纪行为</option>
                    </select>
                </div>

                <!-- 输入题 -->
                <div class="form-group">
                    <label>3. 您所在的位置：</label>
                    <input type="text" id="roomNumber" class="swal2-input" placeholder="教室/考场号，如：511" style="width: 300px; margin: 10px 0;">
                </div>

            </form>
        `,
        showCancelButton: true,
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        customClass: {
            container: 'custom-swal-container',
            popup: 'custom-swal-popup'
        },
        preConfirm: async () => {
            // 获取表单数据
            const examType = document.getElementById('examType').value;
            const roomNumber = document.getElementById('roomNumber').value;
            const subject = document.getElementById('subject').value;

            // 验证
            if (!examType ||!roomNumber ||!subject) {
                Swal.showValidationMessage('请填写所有必填项');
                return false;
            }

            // 准备发送的数据
            const formData = {
                examType,
                roomNumber,
                subject,
                timestamp: new Date().toISOString()
            };

            try {
                // 发送数据到后端
                const response = await fetch('/submitFormData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('网络响应错误');
                }

                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    // 如果响应头表明是JSON格式，尝试解析
                    const result = await response.json();
                    // 进一步判断后端返回的JSON数据结构是否符合预期
                    if (result && result.hasOwnProperty('success') && typeof result.success === 'boolean') {
                        return { success: result.success, data: formData };
                    } else {
                        console.error('后端返回的JSON数据格式不符合预期');
                        Swal.showValidationMessage('后端返回的数据格式不符合要求，请联系管理员');
                        return false;
                    }
                } else {
                    console.error('后端返回的数据不是JSON格式');
                    // 尝试以文本格式获取数据，看是否能从中提取有用信息（比如简单的错误提示文本等）
                    const textData = await response.text();
                    if (textData.trim().length > 0) {
                        console.error('后端返回的非JSON格式数据内容:', textData);
                        Swal.showValidationMessage(`后端返回的数据格式不正确，请联系管理员：${textData}`);
                    } else {
                        Swal.showValidationMessage('后端返回的数据为空，请联系管理员');
                    }
                    return false;
                }
            } catch (error) {
                console.error('提交表单时出错:', error);
                Swal.showValidationMessage(`提交失败: ${error.message}`);
                return false;
            }
        }
    }).then((result) => {
        if (result.isConfirmed && result.value.success) {
            // 提交成功的处理
            Swal.fire({
                title: '提交成功',
                text: '考务信息已记录',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });

            // 记录到控制台
            console.log('表单数据：', result.value.data);
        }
    }).catch(error => {
        // 错误处理
        Swal.fire({
            title: '错误',
            text: '提交表单时发生错误',
            icon: 'error',
            confirmButtonText: '确定'
        });
        console.error('表单提交错误:', error);
    });
}