document.addEventListener('DOMContentLoaded', async function () {
    let kdocsData;
    console.log('kdocsData');
    // 使用fetch API获取/index.js中设置的路由数据，并使用async/await处理异步操作
    try {
        const response = await fetch('/api/getKdocsData');
        kdocsData = await response.json();
        console.log('获取到的金山文档数据:', kdocsData);
    } catch (fetchError) {
        console.error('获取金山文档数据出错:', fetchError);
        // 这里可以添加更多逻辑，比如显示一个提示框告知用户获取数据失败等
        return;
    }

    const examTableBody = document.getElementById('examTable').tBodies[0];

    const receivedData = kdocsData;
    console.log(receivedData);

    try {
        // 简单的数据结构验证，确保数据格式符合预期
        if (!receivedData || !receivedData.data || !receivedData.data.result) {
            throw new Error('后端返回数据结构不符合预期');
        }

        // 解析result字段中的JSON数据
        const resultData = JSON.parse(receivedData.data.result);

        // 获取数据中的年级列表，用于动态生成ul中的li元素
        const gradeList = Object.keys(resultData);

        // 动态生成ul中的li元素
        const gradeListUl = document.getElementById('gradeList');
        gradeList.forEach(function (grade) {
            const li = document.createElement('li');
            li.setAttribute('data-grade', grade);
            li.textContent = grade;
            gradeListUl.appendChild(li);
        });

        // 获取动态生成的ul列表中的li元素，作为可切换的选项
        const gradeListItems = document.getElementById('gradeList').querySelectorAll('li');

        // 给每个li元素添加点击事件监听器
        gradeListItems.forEach(function (item) {
            item.addEventListener('click', function () {
                // 移除所有li元素的active类
                gradeListItems.forEach(function (li) {
                    li.classList.remove('active');
                });

                // 给当前点击的li元素添加active类
                this.classList.add('active');

                // 根据当前点击li元素的data-grade属性获取对应的年级数据
                const grade = this.getAttribute('data-grade');
                const gradeData = resultData[grade];

                // 清空表格内容
                examTableBody.innerHTML = '';

                // 将当前年级的数据填充到表格中
                if (Array.isArray(gradeData)) {
                    gradeData.forEach(function (exam) {
                        const row = document.createElement('tr');

                        const cell1 = document.createElement('td');
                        const cell2 = document.createElement('td');
                        const cell3 = document.createElement('td');

                        cell1.textContent = exam.sdate;
                        cell2.textContent = exam.subject;
                        cell3.textContent = exam.stime;

                        // 将单元格添加到行中，并设置弹性布局属性
                        row.appendChild(cell1);
                        row.appendChild(cell2);
                        row.appendChild(cell3);

                        // 设置行内单元格的弹性布局属性
                        cell1.style.flex = '1';
                        cell2.style.flex = '1';
                        cell3.style.flex = '1';

                        examTableBody.appendChild(row);
                    });
                } else {
                    console.error(`年级数据格式不正确，预期为数组，实际为：${typeof gradeData}`);
                }
            });
        });
    } catch (parseError) {
        console.error('数据处理错误：', parseError);
        // 同样可以添加更多逻辑，比如提示用户数据解析失败等
    }
});
