import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/users').then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.ObjectSid}>
            <Link to={`/users/${user.ObjectSid}`}>{user.DistinguishedName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
