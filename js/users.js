import {getElement, postElement, deleteData} from "./script.js"

const registerBtn = document.querySelector("#register");
const tableBody = document.querySelector("#table-body");
const app_url = 'http://localhost:3000/';
const searchBtn = document.querySelector("#search-btn");

getElement(app_url + "users", tableBody)

registerBtn.addEventListener("click",function() {
    const inputName = document.querySelector("#name");
    const inputLastname = document.querySelector("#lastname");

    postElement(app_url + "users", inputName.value, inputLastname.value)
    inputName.value = "";
    inputLastname.value = "";
})

searchBtn.addEventListener("click", function() {
    const inputSearch = document.querySelector("#search");

    getElement(app_url + "users?q=" + inputSearch.value, tableBody)
    inputSearch.value = "";
})

tableBody.addEventListener("click", function(e) {
    const data = e.composedPath()[0];
    if(Array.from(data.classList).includes("delete")) {
        deleteData(app_url + "users/" + data.getAttribute("id"))
    }
})

tableBody.addEventListener("click", function(e) {
    const data = e.composedPath()[0];
    if(Array.from(data.classList).includes("edit")) {
        console.log("Edit")
    }
})