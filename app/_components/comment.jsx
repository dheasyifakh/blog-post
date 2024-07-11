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
        
        <form className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label for="comment" className="sr-only">Your comment</label>
                <textarea id="comment" rows="6"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..." required></textarea>
            </div>
            <button type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                Post comment
            </button>
        </form>
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