import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { Bootstrap } from './types/Bootstrap';
import { Authors } from './types/Authors';
import { Comment } from './types/Comment';
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

function Comments() {
  const { commentsAPI } = useLoaderData() as Bootstrap;
  const [comments, setComments] = useState<Comment[]>([]);
  console.log(commentsAPI);

  useEffect(() => {
    axios
      .get<{ comments: Comment[] }>(commentsAPI)
      .then(({ data: { comments } }) => {
        console.log('commentsAPI: ', commentsAPI);
        setComments(comments);
        console.log('comments: ', comments);
      });
  }, [commentsAPI]);

  return (
    <>
      <h2 className="font-bold text-xl my-2">Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.text}</p>
        </div>
      ))}
    </>
  );
}

function App() {
  return (
    // <QueryClientProvider client={queryClient}>
    <div className="max-w-7xl mx-auto">
      <div className="md:grid md:grid-cols-2 gap-x-8">
        <div className="col-span-1">
          <h1 className="text-3xl font-bold">My App</h1>
        </div>
        <Comments />
      </div>
    </div>
    // </QueryClientProvider>
  );
}

export default App;
