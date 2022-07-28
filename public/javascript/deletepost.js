async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        document.querySelector('#alert-message').textContent = response.statusText;
        document.querySelector('#pop-up').style.display = 'block';
    }
};

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
