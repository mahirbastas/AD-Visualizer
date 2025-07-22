import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [counts, setCounts] = useState({ users: 0, computers: 0, groups: 0 });

  useEffect(() => {
    Promise.all([
      axios.get('/api/v1/users'),
      axios.get('/api/v1/computers'),
      axios.get('/api/v1/groups'),
    ]).then(([u, c, g]) => {
      setCounts({ users: u.data.length, computers: c.data.length, groups: g.data.length });
    });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Users: {counts.users}</p>
      <p>Computers: {counts.computers}</p>
      <p>Groups: {counts.groups}</p>
    </div>
  );
}
