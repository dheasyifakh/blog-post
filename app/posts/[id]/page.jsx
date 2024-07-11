"use client"
import React from 'react'
import { useParams } from 'next/navigation';
import Post from '@/app/_components/post';

const PostDetail = () => {
    const params = useParams();
    const { id } = params;
  
    if (!id) {
      return <div>Loading...</div>;
    }
  return (
    <div>
        <Post postId={id}/>
    </div>
  )
}

export default PostDetail