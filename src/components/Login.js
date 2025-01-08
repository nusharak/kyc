import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import { BASE_URL } from '../constants/DefaultValues';
import Logo from"../images/download.jpeg"
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string().required('Password is required')
});

function Login() {
  const [redirectToSubmitKyc, setRedirectToSubmitKyc] = useState(false);
  const [type,setType]=useState("")
  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post(BASE_URL+'api/login', values);
      localStorage.setItem('token', response.data.token); // Store JWT in local storage
      localStorage.setItem('type',response.data.user.role)
      setRedirectToSubmitKyc(true); // Trigger redirect
      setType(response.data.user.role)
    } catch (err) {
      setErrors({ general: 'Invalid credentials' });
      alert("Invalid credentials")
    } finally {
      setSubmitting(false);
    }
  };

  if (redirectToSubmitKyc) {
    return type==="admin"?<Navigate to="/admin-dashboard" />:<Navigate to="/submit-kyc" />;
  }

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
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
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
                  variant="outlined"
                  margin="normal"
                  required
                  helperText={<ErrorMessage name="password" />}
                  error={Boolean(<ErrorMessage name="password" />)}
                />
                <div>
                  {<ErrorMessage name="general" />}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isSubmitting}
                    sx={{ mt: 2 }}
                  >
                    Login
                  </Button>
                </div>
              </Form>
            )}
          </Formik>

          <Typography sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link to="/register">
              Register
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
