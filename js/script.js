let users = [];
let elements = "";
const inputName = document.querySelector("#name");
const inputLastname = document.querySelector("#lastname");
const registerBtn = document.querySelector("#register");
const tableBody = document.querySelector("#table-body");
const app_url = 'http://localhost:3000/';
getElement()

registerBtn.addEventListener("click",function() {
    postData()
    getElement()
})

//Functions
function getElement() {
    fetch(app_url + "users")
        .then(res => res.json())
        .then(data => {
            let elements = "";
            data.forEach(user => {
                elements += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.lastname}</td>
                    <td>button</td>
                </tr>
                `
            });
            tableBody.innerHTML = elements;
        });
}

function postData() {
    fetch(app_url + "users", {
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
    .then(data => data)
}