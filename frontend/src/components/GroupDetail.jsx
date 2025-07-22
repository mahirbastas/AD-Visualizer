import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function GroupDetail() {
  const { sid } = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    axios.get(`/api/v1/groups/${sid}`).then(res => setGroup(res.data));
  }, [sid]);

  if (!group) return <p>Loading...</p>;

  return (
    <div>
      <h2>{group.DistinguishedName}</h2>
      <p>SID: {group.ObjectSid}</p>
      <p>Description: {group.Description}</p>
      <p>Created: {group.WhenCreated}</p>
    </div>
  );
}
