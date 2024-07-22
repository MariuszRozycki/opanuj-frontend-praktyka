import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { Bootstrap } from './types/Bootstrap';
import { Author } from './types/Authors';
import { Comment } from './types/Comment';
import {
  QueryClient,
  useQuery,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

function useCommentsQuery(commentsAPI: string) {
  return useQuery<Comment[], Error>({
    queryKey: ['comments'],
    queryFn: async () => {
      const response = await axios.get<{ comments: Comment[] }>(commentsAPI);
      return response.data.comments;
    },
  });
}

function useAuthorsQuery(authorsAPI: string) {
  return useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      const response = await axios.get<{ authors: Author[] }>(authorsAPI);
      return response.data.authors;
    },
  });
}

function Comments() {
  const { commentsAPI } = useLoaderData() as Bootstrap;
  const { data, error, isLoading } = useCommentsQuery(commentsAPI);

  if (isLoading) {
    return <div className="font-bold text-green-600">Loading comments...</div>;
  }

  if (error) {
    return <div className="font-bold text-red-800">Error loading comments</div>;
  }

  return (
    <div className="mb-5">
      <h2 className="font-bold text-xl my-2">Comments</h2>
      {data &&
        data.map((comment) => (
          <div
            className="rounded border-solid border-2 border-indigo-600 mb-2 p-2 w-6/12"
            key={comment.id}
          >
            <p>{comment.text}</p>
            <p>---------</p>
            <p className="font-semibold">Author: {comment.author}</p>
          </div>
        ))}
    </div>
  );
}

function AddComments() {
  const { commentsAPI } = useLoaderData() as Bootstrap;
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<{ comments: Comment[] }>(commentsAPI);
        setComments(response.data.comments);
        console.log('comments: ', response.data.comments);
      } catch (error) {
        setError('Error fetching comments.');
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [commentsAPI]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setComments([
      ...comments,
      {
        id: comments.length + 1,
        text: newComment,
        author: 'John Doe',
      },
    ]);
    setNewComment('');
    setError(null);

    try {
      const response = await axios.post<Comment>(commentsAPI, {
        comment: newComment,
      });

      console.log('Successfully added comment:', response.data);
    } catch (error) {
      setError('Error submitting comment.');
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="mb-5">
      <h2 className="font-bold text-xl my-2">New comments</h2>

      {loading && <p>Loading comments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.author}: {comment.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          className="rounded border-solid border-2 border-indigo-600"
          type="text"
          value={newComment}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function Authors() {
  const { authorsAPI } = useLoaderData() as Bootstrap;
  const { data, error, isLoading } = useAuthorsQuery(authorsAPI);

  if (isLoading) {
    return <div className="font-bold text-green-600">Loading authors...</div>;
  }

  if (error) {
    return <div className="font-bold text-red-800">Error loading authors</div>;
  }

  return (
    <div className="">
      <h2 className="font-bold text-xl my-2">Authors:</h2>
      {data &&
        data.map((author) => (
          <div
            className="rounded border-solid border-2 border-indigo-600 mb-2 p-2 w-6/12"
            key={author.id}
          >
            <p className="font-semibold">Author: {author.name}</p>
          </div>
        ))}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-7xl mx-auto">
        <div className="md:grid md:grid-cols-1 gap-x-8">
          <div className="col-span-1">
            <h1 className="text-3xl font-bold mb-5">
              Mariusz's TanStack Query App:
            </h1>
            <p>-----------------------------------------------------</p>
          </div>
          <div>
            <AddComments />
            <Comments />
            <Authors />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
