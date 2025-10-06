import React from 'react';
import ComplaintForm from '../components/ComplaintForm';
import { useDispatch } from 'react-redux';
import { addComplaint } from '../store/complaintsSlice';
import { useNavigate } from 'react-router-dom';

const NewComplaint = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await dispatch(addComplaint(data));
    navigate('/'); // Redirect after submit
  };

  return (
    <div>
      <h1>Report an Issue</h1>
      <ComplaintForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewComplaint;
