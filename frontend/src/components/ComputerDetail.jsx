import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ComputerDetail() {
  const { sid } = useParams();
  const [computer, setComputer] = useState(null);

  useEffect(() => {
    axios.get(`/api/v1/computers/${sid}`).then(res => setComputer(res.data));
  }, [sid]);

  if (!computer) return <p>Loading...</p>;

  return (
    <div>
      <h2>{computer.DistinguishedName}</h2>
      <p>SID: {computer.ObjectSid}</p>
      <p>OS: {computer.OperatingSystem}</p>
      <p>Created: {computer.WhenCreated}</p>
    </div>
  );
}
