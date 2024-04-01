const resources = {
    roleBtn: {
        user_role: "Get Premium",
        premium_role: "Unsubscribe from premium"
    }
}

const getCurrentUser = async () => {
    const response = await fetch('/api/user/current', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    console.log(data)
   
    if(!data || data.error) {
        return;
    }

    return data;
}

const logout = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
   
    if (data.status == "success") {
        window.location.href = '/view/login';
        sessionStorage.removeItem('user');
        document.getElementById('cartRoute').href = '#';
        document.getElementById('loginBtn').classList.remove('hidden');
    }

    return false;
}

const initializeHeader = async () => {
    let user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
    
    if (!user || Object.keys(user).length === 0) {
        let userResponse = await getCurrentUser();
        user = userResponse.payload;
        
        if(userResponse && userResponse.status == 'success') sessionStorage["user"] = JSON.stringify(userResponse.payload);
    }

    if(user && user.cart && user.role) {
        const hiddenElements = document.querySelectorAll('.hidden');
        const roleClass = user?.role?.toLowerCase();

        hiddenElements.forEach(element => {
            element.classList.remove('hidden');
        });

        document.getElementById('loginBtn').classList.add('hidden');

        if(user.cart) {
            document.getElementById('cartRoute').href = `/view/cart/${user.cart}`;
        }
        
        document.querySelectorAll('.' + roleClass).forEach(element => {
            element.classList.remove(roleClass);
        });

        if(roleClass == 'premium_role') {
            document.querySelectorAll('.user_role').forEach(element => {
                element.classList.remove('user_role');
            });

            document.querySelectorAll('.admin_role').forEach(element => {
                element.classList.remove('admin_role');
            });

            document.getElementById("adminUsersRoute").classList.add('admin_role');
        }

        document.getElementById('switchRoleBtn').innerHTML = resources.roleBtn[roleClass];
        
    }

    document.getElementById('restorePwDialog').classList.add('hidden');
}

const getPremium = async () => {
    let user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
   
    if (!user) {
        let userResponse = await getCurrentUser();
        user = userResponse.payload;
        if(userResponse && userResponse.status == "success") sessionStorage["user"] = JSON.stringify(userResponse.payload);
    }

    const response = await fetch('/api/user/premium/' + user.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.ok) {
        const userDataRefresh = await getCurrentUser();
        if(userDataRefresh && userDataRefresh.status == "success") sessionStorage["user"] = JSON.stringify(userDataRefresh.payload);
        alert("Role updated, please login again to see the changes in your account and access the new features. 🚀");
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await initializeHeader();
});