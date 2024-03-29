const validateRole = (userRole, roleToCompare) => {
    console.log(userRole, roleToCompare)
    return userRole === roleToCompare;
}

const changeRole = async (userId) => {
    const role = document.getElementById("selectRole-" + userId).value;
   
    fetch(`/api/user/${role}/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        window.location.reload();
    })
    .catch(error => console.log(error));
}

const deleteUser = async (userId) => {
    fetch(`/api/user/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        window.location.reload();
    })
    .catch(error => console.log(error));
}

const deleteInactiveUsers = async () => {
    fetch(`/api/user`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        window.location.reload();
    })
    .catch(error => console.log(error));
}