import React from 'react';
import { useNavigate } from 'react-router-dom';
import OpponentList from '../components/Opponent/OpponentsList'

const OpponentSelectionDisplay = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <OpponentList />
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default OpponentSelectionDisplay;
