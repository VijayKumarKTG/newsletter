import { useState } from 'react';
import { CheckCircle, XCircle } from 'react-feather';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('initial');

  let buttonContent = '',
    errorMessage = '';
  if (status === 'initial') {
    buttonContent = <span className='text-white'>Subscribe</span>;
  } else if (status === 'submitting') {
    buttonContent = (
      <span className='animate-pulse text-white'>Subscribing...</span>
    );
  } else if (status === 'submitted') {
    buttonContent = (
      <>
        <span className='animate-pulse text-white mr-1.5'>
          <CheckCircle />
        </span>
        <span className='text-white'>Successful!</span>
      </>
    );
  } else if (status === 'error') {
    buttonContent = (
      <>
        <span className='animate-pulse text-white mr-1.5'>
          <XCircle />
        </span>
        <span className='text-white'>Something went wrong!</span>
      </>
    );
  } else {
    buttonContent = <span className='text-white'>Try again</span>;
  }

  if (error) {
    errorMessage = (
      <div className='space-x-0 text-red-500 text-sm'>{error}</div>
    );
  }

  const emailOnChange = (e) => {
    setEmail(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('submitting');
    try {
      let response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.status === 200) {
        let data = await response.json();
        if (data) {
          setStatus('submitted');
        }
      } else {
        let err = await response.json();
        throw err;
      }
    } catch (err) {
      setStatus('error');
      setError(err.message);
      setTimeout(() => setStatus('tryagain'), 2000);
    }
  };

  return (
    <div className='App min-h-screen flex items-center justify-center bg-green-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 rounded-xl shadow-lg bg-gray-100 pt-2 pb-8 px-8'>
        <div>
          <h2 className='mt-6 text-center text-2xl font-extrabold text-green-600'>
            Subscribe to my newsletter
          </h2>
          <p className='mt-2 text-center text-base text-gray-600'>
            You won't regret it.
          </p>
        </div>
        <form
          className='mt-8 space-y-6'
          action='#'
          method='POST'
          onSubmit={submitForm}>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-green-700 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm'
                placeholder='Email address'
                onChange={emailOnChange}
                value={email}
              />
            </div>
          </div>
          {errorMessage}
          <div>
            <button
              type='submit'
              className={
                'group relative w-full flex items-center justify-center py-2 px-4 border border-transparent font-medium rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-offset-2' +
                (status === 'error'
                  ? ' bg-red-600 hover:bg-red-700 focus:ring-red-500'
                  : ' bg-green-600 hover:bg-green-700 focus:ring-green-500')
              }>
              {buttonContent}
            </button>
          </div>
        </form>
        <hr />
        <div className='text-center'>
          <a
            className='text-green-500'
            href='/api/subscriptions'
            target='_blank'>
            View the subscriptions list
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
