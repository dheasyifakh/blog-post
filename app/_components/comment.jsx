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
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                Post comment
            </button>
        </form>
       
        {comments.slice(0, visibleComments).map((comment, index) => (
            <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900"  key={index}>
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                            className="mr-2 w-6 h-6 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                            alt={comment.user.username}/>{comment.user.username}</p>
                     </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">{comment.body}</p>
            </article>
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