let addbutton = document.getElementById("add-button");
addbutton.addEventListener("click", addToDoItem);
function addToDoItem() {
    let itemText = toDoEntryBox.value;
    newtodoitem(itemText, false);
}


let emptybutton = document.getElementById("empty-button");
emptybutton.addEventListener("click", emptyList);
function emptyList() {
    var toDeleteAll = toDoList.children;
    while (toDeleteAll.length > 0) {
        toDeleteAll.item(0).remove();
    }
}


let savebutton = document.getElementById("save-button");
savebutton.addEventListener("click", saveList);
function saveList() {

    let toDos = [];
    for (let i = 0; i < toDoList.children.length; i++) {
        let todo = toDoList.children.item(i);


        let todoinfo = {
            "task": todo.innerText,
            "completed": todo.classList.contains("completed")
        };
        toDos.push(todoinfo);
    }
    localStorage.setItem("toDos", JSON.stringify(toDos));
}


let completedbutton = document.getElementById("clear-completed-button");
completedbutton.addEventListener("click", clearCompletedToDoItems);
function clearCompletedToDoItems() {
    var completedItems = document.getElementsByClassName("completed");
    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}




//adding functioning
let toDoEntryBox = document.getElementById("todo-entry-box");
let toDoList = document.getElementById("todo-list");

function newtodoitem(itemText, completed) {
    let todoitem = document.createElement("li");
    let todotext = document.createTextNode(itemText);
    //adds text to list
    todoitem.appendChild(todotext);
    //only for styling(adds class to list)
    if (completed) {
        todoitem.classList.add("completed");
    }
    toDoList.appendChild(todoitem);
    todoitem.addEventListener("dblclick", toggleToDoItemState)

}
function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    }
    else {
        this.classList.add("completed");
    }
}

function loadList() {
    if (localStorage.getItem("toDos") != null) {
        let toDos = JSON.parse(localStorage.getItem("toDos"));

        for (let i = 0; i < toDos.length; i++) {
            let todo = toDos[i];
            newtodoitem(todo.task, todo.completed);
        }
    }
}
loadList();