import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComplaints, deleteComplaint } from '../store/complaintsSlice';
import { Link } from 'react-router-dom';

const ComplaintList = () => {
  const dispatch = useDispatch();
  const { list, status } = useSelector(state => state.complaints);

  useEffect(() => {
    dispatch(fetchComplaints());
  }, [dispatch]);

  return (
    <div>
      {status === 'loading' && <p>Loading complaints...</p>}
      {list.map(c => (
        <div key={c._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          {/* Render other fields dynamically */}
          {Object.keys(c).map(key => {
            if (!['_id', 'title', 'description', '__v', 'createdAt', 'updatedAt'].includes(key)) {
              return <p key={key}><strong>{key}:</strong> {c[key]}</p>;
            }
            return null;
          })}
          <Link to={`/complaints/${c._id}/edit`} style={{ marginRight: '10px' }}>Edit</Link>
          <button onClick={() => dispatch(deleteComplaint(c._id))}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ComplaintList;
