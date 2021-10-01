import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../../context/global states/GlobalState';
import { Loading } from '../../Loading';

export const ResetPasswordLink = () => {
  const { error, setError, priv_loading, submitEmail, msg } = useContext(
    GlobalContext
  );
  const [email, setEmail] = useState('');

  const validatePasswords = (e) => {
    e.preventDefault();
    if (!email) return setError('Your email is required');

    submitEmail(email);
  };

  return (
    <div className='retrieve-password pre'>
      <h1>Sultan Dev</h1>
      <div className='pass-div'>
        {/* knowing your email, input your new and confirm password, and update the old one in firestore */}

        <form onSubmit={validatePasswords}>
          <h2>Reset Password</h2>
          {msg === 'done' ? (
            <>
              <p>
                A link has been sent to your email. Click on it to reset
                password
              </p>
            </>
          ) : (
            <>
              <span>Enter registered email to reset password</span>
              <br />
              <br />
              <input
                type='email'
                name='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type='submit'
                className='submit-form'
                disabled={priv_loading ? true : false}
              >
                {priv_loading ? <Loading /> : 'Submit'}
              </button>
            </>
          )}
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
