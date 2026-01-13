/*Import functions from script*/
import {getElement, postElement, deleteData, putData} from "./script.js"

/*Set const to interact with DOM and Json-Server url */
const registerBtn = document.querySelector("#register");
const tableBody = document.querySelector("#table-body");
const app_url = 'http://localhost:3000/';
const inputSearch = document.querySelector("#search");

/*Get elements from json-server*/
getElement(app_url + "users", tableBody)

/*Register a new user */
registerBtn.addEventListener("click",function() {
    const inputName = document.querySelector("#name");
    const inputLastname = document.querySelector("#lastname");

    postElement(app_url + "users", inputName.value, inputLastname.value)
    inputName.value = "";
    inputLastname.value = "";
})

/*Search for a user */
inputSearch.addEventListener("change", function() {
    getElement(app_url + "users?q=" + inputSearch.value, tableBody)
    inputSearch.value = "";
    setTimeout(() => {
        getElement(app_url + "users?q=" + inputSearch.value, tableBody)
    }, 2000)
})

/*Delete for a user */
tableBody.addEventListener("click", function(e) {
    const data = e.composedPath()[0];
    if(Array.from(data.classList).includes("delete")) {
        deleteData(app_url + "users/" + data.getAttribute("id"))
    }
})

/*Edit for a user */
tableBody.addEventListener("click", function(e) {
    const data = e.composedPath()[0];
    if(Array.from(data.classList).includes("edit")) {
        const id = data.getAttribute("id");
        const tr = document.querySelector(`#tr-${id}`)
        tr.innerHTML = `
            <td>${id}</td>
            <td><input type="text" id="name-${id}" placeholder="${document.getElementById(`name-${id}`).textContent}"></td>
            <td><input type="text" id="lastname-${id}" placeholder="${document.getElementById(`lastname-${id}`).textContent}"></td>
            <td><button class="save" id="${id}">Save</button></td>
            <td><button class="delete" id="${id}">Delete</button></td>
        `
    }
})

/*Save the modifications */
tableBody.addEventListener("click", function(e) {
    const data = e.composedPath()[0];
    const id = data.getAttribute("id");
    const userName = document.getElementById(`name-${id}`);
    const userLast = document.getElementById(`lastname-${id}`);
    if(Array.from(data.classList).includes("save")) {
        console.log(userName.getAttribute("placeholder"), userLast.getAttribute("placeholder"))
        if (userName.value && userLast.value) {
            putData(app_url + "users/" + id, userName.value, userLast.value)
        } else if (userName.value) {
            putData(app_url + "users/" + id, userName.value, userLast.getAttribute("placeholder"))
        } else if (userLast.value) {
            putData(app_url + "users/" + id, userName.getAttribute("placeholder"), userLast.value)
        }
    }
})