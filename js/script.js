const inputName = document.querySelector("#name");
const inputLastname = document.querySelector("#lastname");
const registerBtn = document.querySelector("#register");
const tableBody = document.querySelector("#table-body");
const app_url = 'http://localhost:3000/';
const searchBtn = document.querySelector("#search-btn");

getElement(app_url + "users")

registerBtn.addEventListener("click",function() {
    postElement(app_url + "users", inputName.value, inputLastname.value)
    inputName.value = "";
    inputLastname.value = "";
})

searchBtn.addEventListener("click", function() {
    const inputSearch = document.querySelector("#search");
    getElement(app_url + "users?q=" + inputSearch.value)
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
        tableBody.innerHTML = items;
    }
    return items
  } catch (e) {
    console.error(e);
  }
}

async function postElement(url, newName, newLastname) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newName,
        lastname: newLastname
      })
    });
    const data = await res.json();
  } catch (error) {
    console.error('Error en POST:', error);
  }
}

function deleteBtn(id) {
    deleteData("users/" + id)
    getElement("users")
}