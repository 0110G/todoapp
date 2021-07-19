// New todo elements
const submitButton = document.getElementById('todo_submit');
const todoTextInput = document.getElementById('todo_new');
const todoTasks = document.getElementById('todo_tasks');

// State elements
const pendingTaskButton = document.getElementById('pending_button');
const allTaskButton = document.getElementById('all_button');
const completedTaskButton = document.getElementById('completed_button');

let todoTasksArray = []

function setButtonState(btn, isSelected) {
    if (isSelected) {
        btn.setAttribute("class", "note_state_button_selected");
    } else {
        btn.setAttribute("class", "note_state_button_unselected");
    }
}

function setActiveStateButton(activeState) {
    switch (activeState) {
        case "completed":
            setButtonState(pendingTaskButton, false);
            setButtonState(allTaskButton, false);
            setButtonState(completedTaskButton, true);
            break;
        case "pending":
            setButtonState(completedTaskButton, false);
            setButtonState(allTaskButton, false);
            setButtonState(pendingTaskButton, true);
            break;
        case "all":
            setButtonState(completedTaskButton, false);
            setButtonState(pendingTaskButton, false);
            setButtonState(allTaskButton, true);
            break;    
        default:
            throw "Invalid";
    }
}

function renderDeleteButton(id) {
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.setAttribute("class", "delete_button");
    deleteButton.onclick = (event) => {
        todoTasksArray = todoTasksArray.filter((value) => {
            
        });
        event.stopPropagation();
        document.getElementById(id).remove();
    }
    return deleteButton;
}

function markTaskCompleted(todoTask) {
    function onClickFunction() {
        todoTask.isPending = false;
        let li = document.getElementById(todoTask.id);
        li.setAttribute("class", "todo_item_completed");
    }
    return onClickFunction;
}

function renderTodoItem(todoItem) {
    var li = document.createElement("li");
    li.innerHTML = todoItem.content;
    if (todoItem.isPending == true) {
        li.setAttribute("class", "todo_item_pending");
    } else {
        li.setAttribute("class", "todo_item_completed");   
    }
    li.onclick = markTaskCompleted(todoItem);
    li.appendChild(renderDeleteButton(todoItem.id));
    li.setAttribute("id", todoItem.id);
    return li;
}

// Submit action
submitButton.onclick = (e) => {
    e.preventDefault()
    var todoContent = todoTextInput.value;
    if (todoContent == null || todoContent == "") {
        return;
    }
    newTask = {
        id: todoTasksArray.length,
        content: todoContent,
        isPending: true
    };
    todoTextInput.value = "";
    todoTasks.appendChild(renderTodoItem(newTask));
    todoTasksArray.push(newTask);
}

// Select pending tasks
pendingTaskButton.onclick = () => {
    todoTasks.innerHTML = "";
    setActiveStateButton("pending");
    for (var i=0 ; i<todoTasksArray.length ; i++) {
        if (todoTasksArray[i].isPending) {
            todoTasks.appendChild(renderTodoItem(todoTasksArray[i]));
        }
    }
}

// Select all tasks
allTaskButton.onclick = () => {
    todoTasks.innerHTML = "";
    setActiveStateButton("all");
    for (var i=0 ; i<todoTasksArray.length ; i++) {
        todoTasks.appendChild(renderTodoItem(todoTasksArray[i]));
    }
}

completedTaskButton.onclick = () => {
    todoTasks.innerHTML = "";
    setActiveStateButton("completed");
    for (var i=0 ; i<todoTasksArray.length ; i++) {
        if (!todoTasksArray[i].isPending) {
            todoTasks.appendChild(renderTodoItem(todoTasksArray[i]));
        }
    }
}

