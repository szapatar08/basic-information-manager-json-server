const inputName = document.querySelector("#name");
const inputLastname = document.querySelector("#lastname");
const registerBtn = document.querySelector("#register");
const tableBody = document.querySelector("#table-body");
const app_url = 'http://localhost:3000/';
const searchBtn = document.querySelector("#search-btn");
getElement("users")

registerBtn.addEventListener("click",function() {
    postData("users")
    getElement("users")
    inputName.value = "";
    inputLastname.value = "";
})

searchBtn.addEventListener("click", function() {
    const inputSearch = document.querySelector("#search");
    getElement("users?name=" + inputSearch.value)
    inputSearch.value = "";
})

//Functions
function getElement(data) {
    fetch(app_url + data)
        .then(res => res.json())
        .then(data => {
            let elements = "";
            data.forEach(user => {
                elements += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.lastname}</td>
                    <td><button class="delete" onclick="deleteBtn('${user.id}')">Delete</button></td>
                </tr>
                `
            });
            tableBody.innerHTML = elements;
        });
}

function postData(data) {
    fetch(app_url + data, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: inputName.value,
            lastname: inputLastname.value
        })
    })
    .then(res => res.json())
    .then(data => data);
}

function deleteData(data) {
    fetch(app_url + data, {
        method: "DELETE"
    })
    .then(data => data);
}

function deleteBtn(id) {
    deleteData("users/" + id)
    getElement("users")
}