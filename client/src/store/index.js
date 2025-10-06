// client/src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import complaintsReducer from './complaintsSlice';

export default configureStore({
  reducer: {
    complaints: complaintsReducer
  }
});
