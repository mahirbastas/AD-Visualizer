import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ComputerList() {
  const [computers, setComputers] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/computers')
      .then(res => setComputers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Computer List</h2>
      <ul className="space-y-2">
        {computers.map(computer => (
          <li key={computer.ObjectSid}>
            <Link
              to={`/computers/${computer.ObjectSid}`}
              className="text-blue-600 hover:underline"
            >
              {computer.DistinguishedName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
