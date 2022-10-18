import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import Litmus from './Litmus';
import BodyContainer from './components/BodyContainer/BodyContainer';
import './styles/globalStyles.sass';
import InputField from './components/InputField/InputField';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <BodyContainer>
      <Litmus />
    </BodyContainer>
=======
    <Litmus />
    <div className="inputs">
    <InputField 
      label="Postal Code" 
      maxLength="10" 
      placeholder="Enter something" 
      required="required"
      />
    <InputField 
      label="Yearly Income"  
      placeholder="Wow, you're rich." 
      required="required"
      />
      <InputField 
      label="Bonus"  
      placeholder="Lorem ipsum dolor sit amet." 
      required="required"
      />
    </div>
>>>>>>> f3510c2555d0c1b23f2e02f346cb4f77067a3ab4
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
