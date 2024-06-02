let tasks = JSON.parse(localStorage.getItem("data")) || [];
let outputContainer = document.querySelector("#output");

document.querySelector("#todoForm").addEventListener("submit", (e) => {
    e.preventDefault();

    let task = {
        work: document.getElementById("work").value,
        completed: false
    };

    tasks.push(task);
    localStorage.setItem("data", JSON.stringify(tasks));
    document.getElementById("work").value = ''; // Clear the input field
    renderTasks(tasks);
});

function renderTasks(tasksArray) {
    outputContainer.innerHTML = "";
    tasksArray.forEach((task, index) => {
        let taskDiv = document.createElement("div");
        taskDiv.setAttribute("class", "cards");

        let taskTitle = document.createElement("h1");
        taskTitle.innerText = task.work;

        let taskStatus = document.createElement("p");
        taskStatus.innerText = task.completed ? "Completed ✔️" : "Not completed ✖️";

        let completeButton = document.createElement("button");
        completeButton.innerText = task.completed ? "Mark as Not Complete" : "Mark as Complete";
        completeButton.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem("data", JSON.stringify(tasks));
            renderTasks(tasks);
        });

        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.addEventListener("click", () => {
            let newWork = prompt("Edit your task:", task.work);
            if (newWork !== null && newWork.trim() !== "") {
                tasks[index].work = newWork;
                localStorage.setItem("data", JSON.stringify(tasks));
                renderTasks(tasks);
            }
        });

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            localStorage.setItem("data", JSON.stringify(tasks));
            renderTasks(tasks);
        });

        taskDiv.append(taskTitle, taskStatus, completeButton, editButton, deleteButton);
        outputContainer.append(taskDiv);
    });
}

renderTasks(tasks);
