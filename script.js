// script.js

// الحصول على العناصر
const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const emptyMessage = document.getElementById('emptyMessage');

// تحميل المهام من التخزين المحلي عند تحميل الصفحة
window.onload = () => {
  loadTasks();
};

// دالة لتحميل المهام من localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(taskText => {
    addTaskToList(taskText);
  });
  updateEmptyMessage(tasks.length);
}

// دالة لإضافة مهمة إلى القائمة
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('يرجى إدخال مهمة');
    return;
  }

  addTaskToList(taskText);
  saveTaskToLocalStorage(taskText);
  taskInput.value = ''; // مسح المدخل بعد إضافة المهمة
  taskInput.focus(); // وضع المؤشر في حقل الإدخال
}

// دالة لإضافة مهمة إلى DOM
function addTaskToList(taskText) {
  const taskItem = document.createElement('li'); // إنشاء عنصر قائمة جديد
  taskItem.classList.add('taskItem');
  
  const taskContent = document.createElement('span');
  taskContent.classList.add('taskText');
  taskContent.textContent = taskText;
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'حذف';
  deleteButton.onclick = function() {
    taskList.removeChild(taskItem); // حذف المهمة عند الضغط على الزر
    removeTaskFromLocalStorage(taskText); // حذف المهمة من localStorage
    updateEmptyMessage(taskList.children.length);
  };

  const markDoneButton = document.createElement('button');
  markDoneButton.textContent = 'أتممتها';
  markDoneButton.onclick = function() {
    taskItem.classList.toggle('done'); // تغيير حالة المهمة بين مكتملة وغير مكتملة
    updateEmptyMessage(taskList.children.length);
  };

  taskItem.appendChild(taskContent);
  taskItem.appendChild(markDoneButton);
  taskItem.appendChild(deleteButton);
  taskList.insertBefore(taskItem, taskList.firstChild); // إضافة المهمة في البداية

  updateEmptyMessage(taskList.children.length); // تحديث الرسالة إذا كانت القائمة فارغة
}

// دالة لحفظ المهمة في localStorage
function saveTaskToLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.unshift(taskText); // إضافة المهمة في البداية
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// دالة لإزالة المهمة من localStorage
function removeTaskFromLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// دالة لتحديث رسالة عند عدم وجود مهام
function updateEmptyMessage(taskCount) {
  if (taskCount === 0) {
    emptyMessage.classList.remove('hidden');
  } else {
    emptyMessage.classList.add('hidden');
  }
}

// إضافة المهمة عند الضغط على الزر
addTaskButton.addEventListener('click', addTask);

// إضافة المهمة عند الضغط على زر Enter
taskInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});