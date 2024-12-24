// 后端接口地址（这里假设后端和前端在同一域名下，比如 http://localhost:3000，如果实际不同请修改）
const backendUrl = '/api/wallpaper';

// 获取背景图片并设置为背景的通用函数
function setBackground(imageUrl) {
  return new Promise((resolve, reject) => {
    const bgImage = new Image();
    bgImage.src = imageUrl;
    bgImage.onload = function () {
      document.getElementById('fullscreen-bg').style.backgroundImage = `url(${this.src})`;
      resolve();
    };
    bgImage.onerror = function () {
      reject(new Error('图片加载失败'));
    };
  });
}

// 获取初始背景图片
async function getInitialBackground() {
  try {
    const response = await fetch(backendUrl);
    if (response.ok) {
      const data = await response.json();
      await setBackground(data.url);
    } else {
      throw new Error('后端接口请求失败，状态码：' + response.status);
    }
  } catch (error) {
    console.error('获取初始背景图片出错：', error);
    // 这里可以设置一个默认背景图片或者给出提示信息等
  }
}

// 切换背景图片
async function changeBackground() {
  try {
    const response = await fetch(backendUrl);
    if (response.ok) {
      const data = await response.json();
      await setBackground(data.url);
    } else {
      throw new Error('后端接口请求失败，状态码：' + response.status);
    }
  } catch (error) {
    console.error('切换背景图片出错：', error);
    // 可以考虑保留当前背景或者进行其他合适的错误处理
  }
}

document.addEventListener('DOMContentLoaded', function() {
    // 设置默认背景图片
    function setDefaultBackground() {
        const fullscreenBg = document.getElementById('fullscreen-bg');
        if (fullscreenBg) {
            fullscreenBg.style.backgroundImage = 'url(https://api.dujin.org/bing/1920.php)';
            // 添加图片加载错误处理
            const img = new Image();
            img.onerror = function() {
                console.log('Background image failed to load, using fallback');
                fullscreenBg.style.backgroundImage = 'url(your-fallback-image-url.jpg)'; // 设置一个备用图片
            };
            img.src = 'https://api.dujin.org/bing/1920.php';
        }
    }

    // 立即调用设置背景
    setDefaultBackground();

    // 其他初始化代码...
});

// 确保图片加载完成后再显示
window.addEventListener('load', function() {
    const fullscreenBg = document.getElementById('fullscreen-bg');
    if (fullscreenBg) {
        fullscreenBg.style.opacity = '1';
    }
});

// 将不依赖 DOM 的函数定义和其他代码放在外面