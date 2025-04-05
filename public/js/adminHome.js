

async function getUsersFromDb() {
    try {
        const response = await fetch('http://localhost:3000/app/admin-home-page',{
            method:"GET",
        });
        
        if (response.ok) {
            const data = await response.json();

            if (Array.isArray(data.users)) {
                const tableBody = document.querySelector('#usersTable tbody');
                tableBody.innerHTML = ""; // Clear any previous rows

                data.users.forEach((user, index) => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.score}</td>
                        <td>${user.attempt-1}</td>
                        <td><button onclick="deleteUser(${user.id})">Delete</button></td>
                    `;

                    tableBody.appendChild(row);
                });   
            }
        }
        
    } catch (error) {
        console.log('error:=> ',error);
    }
}


async function deleteUser(userId) {
    try {
        const response = await fetch(`http://localhost:3000/app/user-delete/${userId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert('User deleted successfully');
            getUsersFromDb(); // Refresh the list
        } else {
            alert('Failed to delete user');
        }
    } catch (error) {
        console.log('Delete error:=> ', error);
    }
}

getUsersFromDb();

















