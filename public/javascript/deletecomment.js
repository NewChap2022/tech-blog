async function deleteComment(event) {
    if (event.target.matches(".delete-comment")) {
        const id = event.target.getAttribute('id');
        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE',
        });
    
        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            document.querySelector("#alert-message").textContent = response.statusText;
            document.querySelector('#pop-up').style.display = 'block'
        }
    }
};

document.querySelector('.comment-list').addEventListener('click', deleteComment);