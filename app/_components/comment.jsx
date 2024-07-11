import React, { useEffect, useState } from 'react'

const Comments = ({postId}) => {
  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(3);
  
  const getComments = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/posts/${postId}/comments`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (postId) {
      getComments();
    }
  }, [postId]);

  const handleLoadMore = () => {
    setVisibleComments((prev) => prev + 3);
  };

  return (
    <div>
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.slice(0, visibleComments).map((comment, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
            <h3 className="font-bold">{comment.user.username}</h3>
            <p>{comment.body}</p>
          </div>
        ))}
        {visibleComments < comments.length && (
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        )}

    </div>
  )
}

export default Comments