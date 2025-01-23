// medicationData.js
const previousMedications = [
    { medicine_timings: '8 AM, 8 PM', patient_weight: '70', imageUrl: 'http://example.com/image1.jpg' },
    // Add more medication records as needed
  ];
  
  export const analyzePreviousMedications = (transcript) => {
    // Simple keyword analysis to match transcript with previous medications
    const matchedMedication = previousMedications.find(med =>
      transcript.includes(med.medicine_timings) || transcript.includes(med.patient_weight)
    );
  
    return matchedMedication || {};
  };
  