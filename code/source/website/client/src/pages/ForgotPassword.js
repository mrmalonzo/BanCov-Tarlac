import React from 'react';
import "../styles/ForgetPassword.css"

function ForgotPassword() {

  return (
    <div className="forget-pw">
        <h2 className='forget-t'>Forgot Password? <span className='forget-t-t'>Contact the Developer</span></h2>
        <div className='forget-p'>
          <h3 className='forget-p-p'><span className='forget-o'>Name: </span>Marlon R. Malonzo</h3>
          <h3 className='forget-p-p'><span className='forget-o'>Email Address: </span>mrmalonzo1@up.edu.ph</h3>
          <h3 className='forget-p-p'><span className='forget-o'>Location: </span>Tarlac City, Tarlac</h3>
        </div>
        <p className='forget-credits'>This website is designed and developed by Marlon Malonzo of BSCS UPLB for the Province of Tarlac and for the fulfilment of his Special Problem Curriculum.</p>
    </div>
  );
}

export default ForgotPassword;
