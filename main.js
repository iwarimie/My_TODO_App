let addNew = document.getElementById("addNew");
let form = document.getElementById("form");
let errorMessage = document.getElementById("error-msg");
let modal = document.getElementById("modal");
let backdrop = document.getElementById("backdrop");
let closeBtn = document.getElementById("close-btn");
let allTasks = document.getElementById("tasks");
let title = document.getElementById("title");
let dueDate = document.getElementById("due-date");
let describe = document.getElementById("describe");
let submit = document.getElementById("submit");


addNew.addEventListener('click', openModalBox);
closeBtn.addEventListener('click', closeModalBox);
backdrop.addEventListener('click', closeModalBox);

function openModalBox(){
    modal.style.display = "block";
    backdrop.style.display = "block";
}

function closeModalBox(){
    modal.style.display = "none";
    backdrop.style.display = "none"; 
}


form.addEventListener("submit", (e)=>{
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if(title.value === ""){
        // console.log("failure");
        errorMessage.innerHTML = "Task cannot be blank";
    } else {
        // console.log("success");
        errorMessage.innerHTML = "";
        acceptData();
        closeModalBox();
    }
};

let data =   [];

let acceptData = () => {
    data.push({
        text: title.value,
        date: dueDate.value,
        describe: describe.value,
    });

    localStorage.setItem("data", JSON.stringify(data));

    // console.log(data);
    createTasks();
}

let createTasks = () => {
    allTasks.innerHTML = "";
    data.map((x, y) => {
        return ( allTasks.innerHTML += `
        <div id=${y} >
        <span class="task-heading">${x.text}</span>
        <span class="task-date">${x.date}</span>
        <p>${x.describe}</p>
        <span class="options">
            <i onClick="editTask(this)" class="bi bi-pencil-square"></i>
            <i onClick="deleteTask(this); createTasks()" class="bi bi-trash3"></i>
        </span>
    </div>
        
        `);
    });
   

    resetForm();
};

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));

};

let editTask = (e) => {
    openModalBox();
    let selectedTask = e.parentElement.parentElement;
    title.value = selectedTask.children[0].innerHTML;
    dueDate.value = selectedTask.children[1].innerHTML;
    describe.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
};
let resetForm = () => {
    title.value = "";
    dueDate.value = "";
    describe.value = "";
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
})();
