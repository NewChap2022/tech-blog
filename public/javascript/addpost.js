async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('textarea[name="content"]').value.trim();

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            const res = await response.json()
            document.querySelector('#alert-message').textContent = res.message;
            document.querySelector('#pop-up').style.display = 'block';
        }
    } else {
        document.querySelector('#alert-message').textContent = "Please fill out both title and content of the post!";
        document.querySelector('#pop-up').style.display = 'block';
    }
}; 

document.querySelector('.edit-post-form').addEventListener('submit', newFormHandler);