import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function GroupList() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/groups')
      .then(res => setGroups(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Group List</h2>
      <ul className="space-y-2">
        {groups.map(group => (
          <li key={group.ObjectSid}>
            <Link
              to={`/groups/${group.ObjectSid}`}
              className="text-purple-600 hover:underline"
            >
              {group.DistinguishedName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
