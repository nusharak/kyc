import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Container, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/DefaultValues';


function KycSubmission() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [kycExists, setKycExists] = useState(false);

  useEffect(() => {
    const checkKycStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(BASE_URL+'api/kyc-status', {
          headers: {
            'Authorization': `${token}`,
          },
        });

        if (response.data.exists) {
          setKycExists(true);
          navigate('/kyc-listed');
        
        } else {
            // alert("Token Expired Login again!")
            // navigate('/login');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking KYC status:', error);
        alert("Token Expired Login again!")
            navigate('/login');
        setLoading(false);
      }
    };

    checkKycStatus();
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      id_document: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Document Name is required'),
      description: Yup.string().required('Description is required'),
      id_document: Yup.mixed().required('ID Document is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrors({ submit: 'Please log in first' });
        setSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('id_document', values.id_document);

      try {
        await axios.post(BASE_URL+'api/submit-kyc', formData, {
          headers: {
            'Authorization': `${token}`,
          },
        });
        navigate('/kyc-listed');
      } catch (err) {
        setErrors({ submit: 'Failed to submit KYC' });
        setSubmitting(false);
      }
    },
  });

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Checking KYC status...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Submit KYC
        </Typography>
        {formik.errors.submit && (
          <Typography color="error" gutterBottom>
            {formik.errors.submit}
          </Typography>
        )}
        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Full Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            fullWidth
            margin="normal"
            required
          />
          <Typography variant="body1" gutterBottom>
            Upload ID Document
          </Typography>
          <input
            type="file"
            name="id_document"
            onChange={(event) => {
              formik.setFieldValue('id_document', event.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
            required
            style={{ marginBottom: 16 }}
          />
          {formik.touched.id_document && formik.errors.id_document && (
            <Typography color="error" gutterBottom>
              {formik.errors.id_document}
              </Typography>
            )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={formik.isSubmitting}
            sx={{ mt: 2 }}
          >
            Submit KYC
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default KycSubmission;
