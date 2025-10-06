// client/src/components/ComplaintList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComplaints, deleteComplaint } from '../store/complaintsSlice';
import { Link } from 'react-router-dom';

const ComplaintList = () => {
  const dispatch = useDispatch();
  const { list, status } = useSelector(state => state.complaints);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchComplaints());
  }, [dispatch, status]);

  if (status === 'loading') return <p>Loading...</p>;
  if (!list.length) return <p>No complaints yet.</p>;

  return (
    <div>
      <h2>Recent Complaints</h2>
      <ul className="complaint-list">
        {list.map(c => (
          <li key={c._id} className="complaint-item">
            <div>
              <Link to={`/complaints/${c._id}`}><strong>{c.title}</strong></Link>
              <div className="meta">{c.location} • {c.priority} • {new Date(c.createdAt).toLocaleString()}</div>
            </div>
            <div className="actions">
              <Link to={`/complaints/${c._id}/edit`}>Edit</Link>
              <button onClick={() => {
                if (window.confirm('Delete this complaint?')) dispatch(deleteComplaint(c._id));
              }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintList;
