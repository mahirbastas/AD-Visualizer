import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserDetail() {
  const { sid } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`/api/v1/users/${sid}`).then(res => setUser(res.data));
  }, [sid]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>{user.DistinguishedName}</h2>
      <p>SID: {user.ObjectSid}</p>
      <p>Created: {user.WhenCreated}</p>
      <h3>ACL Permissions</h3>
      <p>GenericAll: {user.GenericAll.join(', ') || 'None'}</p>
      <p>WriteDacl: {user.WriteDacl.join(', ') || 'None'}</p>
      <p>ForceChangePassword: {user.ForceChangePassword.join(', ') || 'None'}</p>
    </div>
  );
}
