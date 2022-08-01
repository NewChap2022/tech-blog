async function loginFormHandler(event) {
    event.preventDefault();
    
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    const oldUrl = document.referrer;

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
            document.location.replace(document.referrer);
        } else {
            const res = await response.json();
            document.querySelector('#alert-message').textContent = res.message;
            document.querySelector('#pop-up').style.display = 'block'
        }
    } else {
        document.querySelector('#alert-message').textContent = "Please fill out the missing information";
        document.querySelector('#pop-up').style.display = 'block';
    };
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);