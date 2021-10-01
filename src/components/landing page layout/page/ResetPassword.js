import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import { GlobalContext } from '../../../context/global states/GlobalState';
import { Loading } from '../../Loading';

export const ResetPassword = () => {
  const { error, setError, priv_loading, resetPassword, msg } = useContext(
    GlobalContext
  );
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const seePassword = (e) => {
    const passwordInput = e.target.previousElementSibling;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      e.target.classList.remove('fa-eye-slash');
      e.target.classList.add('fa-eye');
      e.target.classList.add('make-blue');
    } else {
      passwordInput.type = 'password';
      e.target.classList.add('fa-eye-slash');
      e.target.classList.remove('make-blue');
    }
  };

  const validatePasswords = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword)
      return setError('All fields are required');
    else if (newPassword !== confirmPassword)
      return setError('Passwords do not match');
    else if (newPassword.length <= 8)
      return setError('Password should contain at least 8 characters');

    resetPassword(newPassword);
  };

  return (
    <div className='retrieve-password'>
      {msg && <Redirect to='/dashboard/tasks' />}
      <h1>SortCode</h1>
      <div className='pass-div'>
        {/* knowing your email, input your new and confirm password, and update the old one in firestore */}
        <form onSubmit={validatePasswords}>
          <label htmlFor='new-password'>New Password</label>
          <div className='password'>
            <input
              type='password'
              name='new-password'
              placeholder='Enter new password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <i className='fas fa-eye-slash' onClick={seePassword}></i>
          </div>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <div className='password'>
            <input
              type='password'
              name='confirm-password'
              placeholder='Enter password again'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <i className='fas fa-eye-slash' onClick={seePassword}></i>
          </div>
          <button
            type='submit'
            className='submit-form'
            disabled={priv_loading ? true : false}
          >
            {priv_loading ? <Loading /> : 'Submit'}
          </button>
        </form>
      </div>
      {error && (
        <div className='alert pass-div'>
          <p>{error}</p>
          <i
            className='fas fa-times-circle alert-cncl-btn'
            onClick={() => setError(false)}
          ></i>
        </div>
      )}
    </div>
  );
};

// try to make the link from nodemailer dynamic
