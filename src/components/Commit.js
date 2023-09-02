import React, { useState, useEffect } from 'react';

function Comment() {
  // State to store comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editedComment, setEditedComment] = useState('');

  // Fetch comments from the JSONPlaceholder API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, []);

  // Create a new comment
  const createComment = () => {
    fetch('https://jsonplaceholder.typicode.com/comments', {
      method: 'POST',
      body: JSON.stringify({
        body: newComment,
        postId: 1, // Replace with the desired post ID
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, data]);
        setNewComment('');
      });
  };

   // Edit a comment
   const edit = (id) => {
    setEditedComment(id);
  };

  // Save edited comment
  const saveEdit = (id, updatedComment) => {
    fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        body: updatedComment,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setComments(
          comments.map((comment) =>
          comment.id === id ? { ...comment, body: updatedComment } : comment
          )
        );
        setEditedComment('');
      });
  };

  // Delete a comment
  const deleteComment = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setComments(comments.filter((comment) => comment.id !== id));
    });
  };

  return (
    <div>
      <h2>Comments</h2>
      <div>
        <input
          type="text"
          placeholder="Add a new comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={createComment}>Add</button>
      </div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            

            {editedComment === comment.id ? (
              <>
                <input
                  type="text"
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
                <button onClick={() => saveEdit(comment.id, editedComment)}>
                  Save
                </button>
              </>
            ) : (
              <>
                {comment.body}
                <button onClick={() => edit(comment.id)}>Edit</button>
                <button onClick={() => deleteComment(comment.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comment;
