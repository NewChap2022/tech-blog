async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    
      if(comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
              post_id,
              comment_text
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if(response.ok) {
            document.location.reload();
          } else {
            document.querySelector('#alert-message').textContent = response.statusText;
            document.querySelector('#pop-up').style.display = 'block';
          }
      } else {
        document.querySelector('#alert-message').textContent = "Please add your comment";
        document.querySelector('#pop-up').style.display = 'block';
      }
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);