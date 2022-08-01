async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const confirmPassword = document.querySelector('#confirm-password-signup').value.trim();

    if (username && password && confirmPassword) {
        if (password !== confirmPassword) {
            document.querySelector('#alert-message').textContent = "Password you entered doesn't match!";
            document.querySelector('#pop-up').style.display = 'block';
            return;
        }

        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            const res = await response.json();
            document.querySelector('#alert-message').textContent = res.message;
            document.querySelector('#pop-up').style.display = 'block';
        }
    } else {
        document.querySelector('#alert-message').textContent = "Please fill out the missing information";
        document.querySelector('#pop-up').style.display = 'block';
    }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);