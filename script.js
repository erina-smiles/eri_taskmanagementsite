let tasks = JSON.parse(localStorage.getItem("tasks")) || [
    { text: "Complete project report 📑", completed: false },
    { text: "Read 10 pages of a book 📖", completed: false },
    { text: "Go for a 30-minute walk 🚶‍♂️", completed: false },
    { text: "Organize workspace 🗂️", completed: false },
    { text: "Plan next week's schedule 📝", completed: false },
    { text: "Play guitar for 15 minutes 🎸", completed: false },
    { text: "Paint something creative 🎨", completed: false },
    { text: "Follow a skincare routine 🧖‍♀️", completed: false },
    { text: "Listen to relaxing music 🎶", completed: false },
    { text: "Try meditation for 10 minutes 🧘‍♂️", completed: false }
];

let undoStack = []; // Stores the last deleted/completed task for undo

// Function to display tasks
function displayTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button onclick="toggleTask(${index})">✔</button>
            <button onclick="deleteTask(${index})">❌</button>
        `;
        taskList.appendChild(taskItem);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks
}

// Toggle task completion
function toggleTask(index) {
    undoStack.push({ action: "toggle", task: { ...tasks[index] }, index }); // Store for undo
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

// Delete a task
function deleteTask(index) {
    undoStack.push({ action: "delete", task: { ...tasks[index] }, index }); // Store for undo
    tasks.splice(index, 1);
    displayTasks();
}

// Undo last action
function undoLastAction() {
    if (undoStack.length === 0) return alert("Nothing to undo!");

    let lastAction = undoStack.pop();
    
    if (lastAction.action === "delete") {
        tasks.splice(lastAction.index, 0, lastAction.task); // Restore deleted task
    } else if (lastAction.action === "toggle") {
        tasks[lastAction.index].completed = !tasks[lastAction.index].completed; // Reverse completion status
    }

    displayTasks();
}

// Language Translation (English <-> Tamil)
const translations = {
    "Task Manager ✅": "பணி மேலாளர் ✅",
    "You don’t have to be great to start, but you have to start to be great, SO START PLANNING!":
        "நீங்கள் சிறந்ததாக தொடங்க வேண்டியதில்லை, ஆனால் நீங்கள் தொடங்க வேண்டும் சிறந்ததாக இருப்பதற்கு, ஆகவே திட்டமிடத் தொடங்குங்கள்!",
    "Enter a new task...": "புதிய பணியை உள்ளிடுங்கள்...",
    "Add Task": "பணி சேர்",
    "Toggle Dark Mode 🌙": "இருண்ட பயன்முறையை மாற்றவும் 🌙",
    "Undo Last Action": "கடைசி செயலை வாபஸ் செய்",
    "Switch to Tamil": "தமிழுக்கு மாறவும்",
    "Switch to English": "ஆங்கிலத்திற்கு மாறவும்"
};

let isTamil = false;

function toggleLanguage() {
    document.querySelector("h1").innerText = isTamil ? "Task Manager ✅" : translations["Task Manager ✅"];
    document.querySelector(".quote").innerText = isTamil ? translations["You don’t have to be great to start, but you have to start to be great, SO START PLANNING!"] : "You don’t have to be great to start, but you have to start to be great, SO START PLANNING!";
    document.getElementById("task").placeholder = isTamil ? translations["Enter a new task..."] : "Enter a new task...";
    document.getElementById("addTaskBtn").innerText = isTamil ? translations["Add Task"] : "Add Task";
    document.getElementById("darkModeToggle").innerText = isTamil ? translations["Toggle Dark Mode 🌙"] : "Toggle Dark Mode 🌙";
    document.getElementById("undoBtn").innerText = isTamil ? translations["Undo Last Action"] : "Undo Last Action";
    document.getElementById("languageToggle").innerText = isTamil ? translations["Switch to English"] : "Switch to Tamil";

    isTamil = !isTamil;
}

// Call displayTasks() when the page loads
window.onload = displayTasks;

