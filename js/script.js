//Functions
export async function getElement(url, htmlInnerElement) {
    let items = "";
  try {
    const res = await fetch(url);
    const users = await res.json();
    let user = "";
    for (user of users) {
        items += `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.lastname}</td>
            <td><button class="delete" id="${user.id}">Delete</button></td>
        </tr>
        `;
        htmlInnerElement.innerHTML = items;
    }
    return items
  } catch (error) {
    console.error('Error en POST:', error);
  }
}

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

export async function deleteData(url) {
    try {
    await fetch(url, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error en DELETE:', error);
  }
}