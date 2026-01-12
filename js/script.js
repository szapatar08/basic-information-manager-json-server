const inputName = document.querySelector("#name");
const inputLastname = document.querySelector("#lastname");
const registerBtn = document.querySelector("#register");
const tableBody = document.querySelector("#table-body");
const app_url = 'http://localhost:3000/';
const searchBtn = document.querySelector("#search-btn");
getElement(app_url + "users")

registerBtn.addEventListener("click",function() {
    postData("users")
    getElement("users")
    inputName.value = "";
    inputLastname.value = "";
})

searchBtn.addEventListener("click", function() {
    const inputSearch = document.querySelector("#search");
    getElement("users?q=" + inputSearch.value)
    inputSearch.value = "";
})

//Functions
async function getElement(url) {
    let items = "";
  try {
    const res = await fetch(url);
    const users = await res.json();
    for (user of users) {
        items += `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.lastname}</td>
            <td><button class="delete" onclick="deleteBtn('${user.id}')">Delete</button></td>
        </tr>
        `;
    }
    tableBody.innerHTML = items;
  } catch (e) {
    console.error(e);
  }
}

function deleteBtn(id) {
    deleteData("users/" + id)
    getElement("users")
}