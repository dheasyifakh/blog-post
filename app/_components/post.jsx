"use client"
import React,{useState,useEffect} from 'react'
import Comments from './comment';

const Post = ({postId}) => {
  const [post, setPost] = useState(null);
  const getData = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/posts/${postId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPost(data);
    } catch (error) {
        console.error(error)
    }
  };

  useEffect(() => {
    if (postId) {
      getData();
    }
  }, [postId]);


  if (!post) {
    return <div>No data found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 mb-24 px-8">
        <h1 className="text-4xl font-bold text-center mb-4">{post && post.title}</h1>
        <div className="text-center text-gray-500 mb-6">
            <span className='flex text-center gap-5'>views: <h5>{post.views}</h5></span> 
        </div>
        <img src="https://images.unsplash.com/photo-1595147389795-37094173bfd8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Test" className="w-full h-96 object-cover rounded-lg mb-8" />

        <div className="prose prose-lg max-w-none">
        
            <p>{post && post.body}</p>
        </div>
    
        <div className="flex mt-10 gap-2">
            <h4>tags:</h4> 
            {post && post.tags.map ((tag, index)=>(
                <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10" key={index}>{tag}</span>

            ))

            }
        </div>
        <div className="mt-12">
            <Comments postId={postId}/>
        </div>
    </div>
  )
}

export default Post