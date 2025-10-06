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
      {status === 'loading' && <p>Loading...</p>}
      {list.map(c => (
        <div key={c._id}>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <Link to={`/edit/${c._id}`}>Edit</Link>
          <button onClick={() => dispatch(deleteComplaint(c._id))}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ComplaintList;
