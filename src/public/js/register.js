const onSubmit = async () => {
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const name = document.getElementById('name').value;
        const lastName = document.getElementById('lastName').value;
        const age = document.getElementById('age').value;
    
        const response = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, confirmPassword, first_name: name, last_name: lastName, age }),
        });
        const data = await response.json();

        if (data && data.status && data.status == 'success') {
            window.location.href = '/view/login';
        } else {
            displayError(data.error);
        }
    }
    catch (error) {
        console.log("error: ", error);
    }

    return false;
}

const displayError = (errorMsg) => {
    const errorEl = document.getElementById('error');
    errorEl.style.display = 'block';
    errorEl.innerHTML = errorMsg;
}