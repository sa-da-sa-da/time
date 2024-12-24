// 添加补零函数
function padLeftZero(str) {
    return ('00' + str).slice(-2);
}

let clockInterval = null;
let countdownInterval = null;
let currentMode = 'clock';
let localFlipObjs = [];
let countdownFlipObjs = [];

// 初始化两组翻牌对象
function initializeFlips() {
    //console.log('Initializing flips...');
    
    const localClock = document.getElementById('localClock');
    const countdownClock = document.getElementById('countdownClock');
    
    if (!localClock || !countdownClock) {
        console.error('Clock elements not found!');
        return;
    }
    
    // 初始化本地时钟翻牌
    localFlipObjs = Array.from(localClock.getElementsByClassName('flip')).map(flip => ({
        node: flip,
        frontNode: flip.querySelector('.front'),
        backNode: flip.querySelector('.back'),
        flipDown: function(front, back) {
            // 移除之前的 go 类
            this.node.classList.remove('go');
            
            // 设置新的数字
            this.frontNode.className = 'digital front ' + front;
            this.backNode.className = 'digital back ' + back;
            
            // 触发重排
            void this.node.offsetWidth;
            
            // 添加 go 类启动动画
            this.node.classList.add('go');
        }
    }));
    
    // 初始化倒计时翻牌
    countdownFlipObjs = Array.from(countdownClock.getElementsByClassName('flip')).map(flip => ({
        node: flip,
        frontNode: flip.querySelector('.front'),
        backNode: flip.querySelector('.back'),
        flipDown: function(front, back) {
            // 移除之前的 go 类
            this.node.classList.remove('go');
            
            // 设置新的数字
            this.frontNode.className = 'digital front ' + front;
            this.backNode.className = 'digital back ' + back;
            
            // 触发重排
            void this.node.offsetWidth;
            
            // 添加 go 类启动动画
            this.node.classList.add('go');
        }
    }));
    
    // 确保初始状态正确
    localClock.style.display = 'block';
    countdownClock.style.display = 'none';
    
    // 初始化本地时间显示
    const now = new Date();
    updateClockDisplay({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds()
    });
}

function toggleTimeDisplay(showCountdown, targetTime) {
    stopAllTimers();
    
    const localClock = document.getElementById('localClock');
    const countdownClock = document.getElementById('countdownClock');
    const clockStatus = document.getElementById('clockStatus');
    
    if (showCountdown && targetTime) {
        currentMode = 'countdown';
        localClock.style.display = 'none';
        countdownClock.style.display = 'block';
        clockStatus.textContent = '倒计时';
        startCountdown(targetTime);
    } else {
        currentMode = 'clock';
        localClock.style.display = 'block';
        countdownClock.style.display = 'none';
        clockStatus.textContent = '当前时间';
        startClock();
    }
}

function updateClockDisplay(timeObj) {
    //console.log('Updating clock display:', timeObj);
    
    const hours = padLeftZero(timeObj.hours.toString());
    const minutes = padLeftZero(timeObj.minutes.toString());
    const seconds = padLeftZero(timeObj.seconds.toString());
    
    const timeStr = hours + minutes + seconds;
    //console.log('Time string:', timeStr);
    
    for (let i = 0; i < localFlipObjs.length; i++) {
        const currentNumber = localFlipObjs[i].frontNode.className.slice(-1);
        const nextNumber = timeStr[i];
        
        //console.log(`Updating digit ${i}: ${currentNumber} -> ${nextNumber}`);
        
        if (currentNumber !== nextNumber) {
            localFlipObjs[i].flipDown('number' + nextNumber, 'number' + nextNumber);
        }
    }
}

function updateCountdownDisplay(timeObj) {
    //console.log('Updating countdown display:', timeObj);
    
    const hours = padLeftZero(timeObj.hours.toString());
    const minutes = padLeftZero(timeObj.minutes.toString());
    const seconds = padLeftZero(timeObj.seconds.toString());
    
    const timeStr = hours + minutes + seconds;
   // console.log('Countdown string:', timeStr);
    
    for (let i = 0; i < countdownFlipObjs.length; i++) {
        const currentNumber = countdownFlipObjs[i].frontNode.className.slice(-1);
        const nextNumber = timeStr[i];
        
        //console.log(`Updating countdown digit ${i}: ${currentNumber} -> ${nextNumber}`);
        
        if (currentNumber !== nextNumber) {
            countdownFlipObjs[i].flipDown('number' + nextNumber, 'number' + nextNumber);
        }
    }
}

function startClock() {
    const now = new Date();
    updateClockDisplay({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds()
    });
    
    clockInterval = setInterval(() => {
        const current = new Date();
        updateClockDisplay({
            hours: current.getHours(),
            minutes: current.getMinutes(),
            seconds: current.getSeconds()
        });
    }, 1000);
}

function startCountdown(targetTime) {
    // 立即显示一次
    const now = new Date().getTime();
    const distance = targetTime - now;
    
    if (distance > 0) {
        updateCountdownDisplay({
            hours: Math.floor(distance / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
    }
    
    countdownInterval = setInterval(() => {
        const current = new Date().getTime();
        const remaining = targetTime - current;
        
        if (remaining < 0) {
            stopAllTimers();
            Swal.fire({
                title: '倒计时结束！',
                icon: 'info',
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                const resetButton = document.querySelector('.buttop6');
                if (resetButton) resetButton.style.display = 'none';
                
                const toggleTimeButton = document.getElementById('toggleTimeButton');
                if (toggleTimeButton) toggleTimeButton.textContent = '切换倒计时';
                
                toggleTimeDisplay(false);
            });
            return;
        }
        
        updateCountdownDisplay({
            hours: Math.floor(remaining / (1000 * 60 * 60)),
            minutes: Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((remaining % (1000 * 60)) / 1000)
        });
    }, 1000);
}

function stopAllTimers() {
    if (clockInterval) {
        clearInterval(clockInterval);
        clockInterval = null;
    }
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}

// 确保在 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    //console.log('DOM Content Loaded'); // 调试日志
    const clockStatus = document.getElementById('clockStatus');
    if (clockStatus) {
        clockStatus.textContent = '当前时间';
    }
    initializeFlips();
    currentMode = 'clock';
    startClock();
});

// 添加错误处理
window.onerror = function(msg, url, lineNo, columnNo, error) {
    //console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
    return false;
};


