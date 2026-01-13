//Functions of json-server
/*Get elements and inner in HTML */
export async function getElement(url, htmlInnerElement) {
    let items = "";
  try {
    const res = await fetch(url);
    const users = await res.json();
    let user = "";
    for (user of users) {
        items += `
        <tr id="tr-${user.id}">
            <td>${user.id}</td>
            <td id="name-${user.id}">${user.name}</td>
            <td id="lastname-${user.id}">${user.lastname}</td>
            <td><button class="edit" id="${user.id}">Edit</button></td>
            <td><button class="delete" id="${user.id}">Delete</button></td>
        </tr>
        `;
        localStorage.setItem(user.id, `${user.name} ${user.lastname}`)
    }
    htmlInnerElement.innerHTML = items;
  } catch (error) {
    console.error('Error en POST:', error);
  }
}

/*Post elements to json-server */
export async function postElement(url, newName, newLastname) {
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

/*Delete elements to json-server */
export async function deleteData(url) {
    try {
    await fetch(url, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error en DELETE:', error);
  }
}

/*Update elements to json-server */
export async function putData(url, nameUpdated, lastnameUpdated) {
  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameUpdated,
        lastname: lastnameUpdated
      })
    });

    const data = await res.json();
  } catch (error) {
    console.error('Error en PUT:', error);
  }
}