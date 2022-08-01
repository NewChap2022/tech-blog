async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/')
    } else {
        const res = await response.json();
        document.querySelector("#alert-message").textContent = res.message;
        document.querySelector('#pop-up').style.display = 'block'
    }
};

document.querySelector('#logout').addEventListener('click', logout);
