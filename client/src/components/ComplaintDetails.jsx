// client/src/components/ComplaintDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const ComplaintDetails = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/complaints/${id}`).then(res => setComplaint(res.data)).catch(() => setComplaint(null));
  }, [id]);

  if (!complaint) return <p>Loading complaint...</p>;

  const changeStatus = async (newStatus) => {
    const res = await api.put(`/complaints/${id}`, { ...complaint, status: newStatus });
    setComplaint(res.data);
  };

  return (
    <div>
      <h2>{complaint.title}</h2>
      <p>{complaint.description}</p>
      <p><strong>Location:</strong> {complaint.location}</p>
      <p><strong>Reporter:</strong> {complaint.reporterName}</p>
      <p><strong>Priority:</strong> {complaint.priority}</p>
      <p><strong>Status:</strong> {complaint.status}</p>

      <div>
        <button onClick={() => changeStatus('in-progress')}>Mark In-Progress</button>
        <button onClick={() => changeStatus('resolved')}>Mark Resolved</button>
        <Link to={`/complaints/${id}/edit`}>Edit</Link>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default ComplaintDetails;
