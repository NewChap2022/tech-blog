async function editFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="content"]').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch(`/api/comments/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            const res = await response.json();
            document.querySelector('#alert-message').textContent = res.message;
            document.querySelector('#pop-up').style.display = 'block';
        }
    } else {
        document.querySelector('#alert-message').textContent = "Please do not leave the comment empty!";
        document.querySelector('#pop-up').style.display = 'block';
    }
};

async function deleteComment(event) {
    event.preventDefault();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        document.querySelector("#alert-message").textContent = response.statusText;
        document.querySelector('#pop-up').style.display = 'block'
    }
};

document.querySelector('.edit-comment-form').addEventListener('submit', editFormHandler);
document.querySelector('.delete-comment-button').addEventListener('click', deleteComment);
