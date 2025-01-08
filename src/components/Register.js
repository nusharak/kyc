import React from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/DefaultValues';
import Logo from"../images/download.jpeg"
// Yup validation schema
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

function Register() {
  const navigate=useNavigate()
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await axios.post(BASE_URL+'api/register', values);
      alert('Registration successful!');
      navigate("/login")
      
    } catch (err) {
      alert('Already registered !');
      setErrors({ general: 'Error registering user' });
      console.error(err);
      navigate("/login")
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid container spacing={2} sx={{ minHeight: '100vh' }}>
      {/* Left Column - Logo */}
      <Grid item xs={12} md={6} sx={{ backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box>
          <img src={Logo} alt="Logo" style={{ maxWidth: '100%' }} />
        </Box>
      </Grid>

      {/* Right Column - Form */}
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ width: '80%', maxWidth: 400 }}>
          <Typography variant="h4" gutterBottom>Register</Typography>

          <Formik
            initialValues={{ username: '', email: '', password: '', role: 'user' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="username"
                  as={TextField}
                  label="Username"
                  fullWidth
                  margin="normal"
                  required
                  helperText={<ErrorMessage name="username" />}
                  error={Boolean(<ErrorMessage name="username" />)}
                />
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  required
                  helperText={<ErrorMessage name="email" />}
                  error={Boolean(<ErrorMessage name="email" />)}
                />
                <Field
                  name="password"
                  as={TextField}
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  required
                  helperText={<ErrorMessage name="password" />}
                  error={Boolean(<ErrorMessage name="password" />)}
                />
                {/* General error message */}
                <div style={{ color: 'red' }}>
                  <ErrorMessage name="general" />
                </div>
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting} sx={{ mt: 2 }}>
                  Register
                </Button>
              </Form>
            )}
          </Formik>

          <Typography sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link to="/login">
              Login
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Register;
