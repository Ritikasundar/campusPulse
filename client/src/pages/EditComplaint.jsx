import React, { useEffect, useState } from 'react';
import ComplaintForm from '../components/ComplaintForm';
import { useDispatch } from 'react-redux';
import { updateComplaint } from '../store/complaintsSlice';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const EditComplaint = () => {
  const { id } = useParams();
  const [initial, setInitial] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // EditComplaint.jsx
useEffect(() => {
  axios.get(`https://campuspulse.onrender.com/api/complaints/${id}`)
    .then(res => setComplaint(res.data))
    .catch(err => {
      if (err.response && err.response.status === 404) {
        alert('Complaint not found');
        navigate('/'); // go back to home
      } else {
        console.error(err);
      }
    });
}, [id]);


  if (!initial) return <p>Loading...</p>;

  const handleSubmit = async (data) => {
    await dispatch(updateComplaint({ id, data }));
    navigate('/'); // ✅ After submit, go to Home page
  };

  return (
    <div>
      <h1>Edit Complaint</h1>
      {/* ComplaintForm handles e.preventDefault internally */}
      <ComplaintForm initial={initial} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditComplaint;
