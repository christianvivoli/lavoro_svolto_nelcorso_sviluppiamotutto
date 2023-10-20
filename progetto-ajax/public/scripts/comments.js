const loadCommentsBtnElement = document.getElementById('load-comments-btn');

async function fetchCommentsForPost(event){
    const postId= loadCommentsBtnElement.dataset.postId;
    const response = await fetch(`/posts/${postId}/comments`);
    response.json();
}

loadCommentsBtnElement.addEventListener('click',fetchCommentsForPost);