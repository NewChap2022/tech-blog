async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('textarea[name="content"]').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (title && content) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            document.querySelector('#alert-message').textContent = response.statusText;
            document.querySelector('#pop-up').style.display = 'block';
        }
    } else {
        document.querySelector('#alert-message').textContent = "Please make sure to fill out title and content of the post!";
        document.querySelector('#pop-up').style.display = 'block';
    }
};

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);