function toggleColor() {
    const toggleColor = document.getElementById('toggle-theme');
    const toggleButton = document.getElementById('toggle-theme');

    // 给按钮添加点击事件监听器
    toggleButton.addEventListener('click', function () {
        // 切换body元素的dark-mode类，实现主题切换
        document.body.classList.toggle('dark-mode');
    });
}
