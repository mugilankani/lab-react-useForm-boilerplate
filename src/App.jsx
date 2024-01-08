import { useFormik } from 'formik';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validate = (ini) => {
    const errors = {};

    if (!ini.firstName) {
      errors.firstName = 'First Name is required';
    }

    if (!ini.lastName) {
      errors.lastName = 'Last Name is required';
    }

    if (!ini.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ini.email)) {
      errors.email = 'Invalid email address';
    }

    if (ini.password.length < 5 || ini.password.length > 20) {
      errors.password = 'Password must be between 5 and 20 characters';
    }

    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formik.values);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      setSuccessMessage('Registration successful!');
    }
  };

  useEffect(() => {
    setSuccessMessage('');
  }, [formik.values]);

  return (
    <div className='backGround'>
      <form onSubmit={onSubmit} className='FlexBox'>
        {successMessage && <div className='successMessage'>{successMessage}</div>}

        <input
          placeholder='First Name'
          type='text'
          name='firstName'
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
        {formErrors.firstName && <div className='error'>{formErrors.firstName}</div>}

        <input
          placeholder='Last Name'
          type='text'
          name='lastName'
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
        {formErrors.lastName && <div className='error'>{formErrors.lastName}</div>}

        <input
          placeholder='Email'
          type='text'
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formErrors.email && <div className='error'>{formErrors.email}</div>}

        <input
          placeholder='Password'
          type='password'
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formErrors.password && <div className='error'>{formErrors.password}</div>}

        <button type='submit'>Register</button>
      </form>
    </div>
  );
}

export default App;
