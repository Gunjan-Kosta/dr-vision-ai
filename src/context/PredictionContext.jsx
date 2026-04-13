import React, { createContext, useContext, useState } from 'react';

const PredictionContext = createContext();

export const PredictionProvider = ({ children }) => {
  const [predictionData, setPredictionData] = useState(null);
  const [patientData, setPatientData] = useState(null);

  const clearData = () => {
    setPredictionData(null);
    setPatientData(null);
  };

  return (
    <PredictionContext.Provider value={{ predictionData, setPredictionData, patientData, setPatientData, clearData }}>
      {children}
    </PredictionContext.Provider>
  );
};

export const usePrediction = () => useContext(PredictionContext);
