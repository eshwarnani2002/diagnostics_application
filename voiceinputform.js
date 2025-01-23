// VoiceInputForm.js
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { startListening, stopListening } from './SpeechRecognition';
import { analyzePreviousMedications } from './medicationData';

const VoiceInputForm = () => {
  const formik = useFormik({
    initialValues: {
      medicine_timings: '',
      patient_weight: '',
      imageUrl: '',
    },
    onSubmit: (values) => {
      console.log('Form Submitted:', values);
      // Handle form submission logic here
    },
  });

  useEffect(() => {
    const handleVoiceInput = (transcript) => {
      const analyzedData = analyzePreviousMedications(transcript);
      formik.setValues((prevValues) => ({
        ...prevValues,
        ...analyzedData,
      }));
    };

    startListening(handleVoiceInput);

    return () => {
      stopListening();
    };
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        label="Medicine Timings"
        name="medicine_timings"
        value={formik.values.medicine_timings}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.medicine_timings && Boolean(formik.errors.medicine_timings)}
        helperText={formik.touched.medicine_timings && formik.errors.medicine_timings}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Patient Weight (kg)"
        name="patient_weight"
        type="number"
        value={formik.values.patient_weight}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.patient_weight && Boolean(formik.errors.patient_weight)}
        helperText={formik.touched.patient_weight && formik.errors.patient_weight}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Image URL"
        name="imageUrl"
        value={formik.values.imageUrl}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
        helperText={formik.touched.imageUrl && formik.errors.imageUrl}
        margin="normal"
      />
      <CardActions sx={{ justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" color="secondary" onClick={() => formik.resetForm()}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </CardActions>
    </form>
  );
};

export default VoiceInputForm;
