import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
}

const API_URL = '/api/data/users?timeout=10000';

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const ulRef = useRef<HTMLUListElement>(null);

  const fetchData = () => {
    if (ulRef.current) {
      ulRef.current.innerHTML = '';
    }

    axios
      .get(API_URL, { timeout: 5000 })
      .then((response) => {
        console.log(response);
        setUsers(response.data.users);
        setIsError(false);
      })
      .catch((error) => {
        if (error.code === 'ECONNABORTED') {
          setIsError(true);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Users</h1>
        {/* Class hidden add to div when error occur */}
        <div
          className={`flex flex-row items-center ${isError ? '' : 'hidden'}`}
        >
          <p className="mr-2">
            Sorry, there seems to be connectivity issues...
          </p>
          <button
            className="text-blue-400 bg-blue-200 hover:text-blue-200 hover:bg-blue-400 rounded-md p-4"
            onClick={fetchData}
          >
            Try again
          </button>
        </div>
      </div>
      {/* Add ulRef and set innerHTML to "" if param timeout is longer then ?timeout=10000 */}
      <ul ref={ulRef} className="space-y-2">
        {users.map((user, index) => (
          <li
            className="bg-white p-4 rounded-md border border-gray-100"
            key={index}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
