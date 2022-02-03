import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

function Win() {

  return (
    <div className="lossPred">
        <CancelIcon />
    </div>
  );
}

function Loss() {
    
  return (
    <div className="winPred">
      <CheckCircleOutlineIcon />
    </div>
  );
}
const predictionIcon = {
    win: Win,
    loss: Loss
}

export default predictionIcon; 
