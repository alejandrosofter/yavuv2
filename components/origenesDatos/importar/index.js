import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import Step1_selectRegistro from './step1_selectRecistro';
import Step2_checkDatos from './step2_checkDatos';
import Step3_finalizar from './step3_finalizar';
import { useEffect, useState } from 'react';
const steps = ['Seleccion de Registros', 'Importar DATOS',];

export default function ImportarOrginDatos({modulo,token,dataUsuario}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [textoRegistros, setTextoRegistros] = React.useState("");
    const [stepValido, setStepValido] = React.useState([false,false,false]);
  const [completed, setCompleted] = React.useState({});
 

  const [seleccionDesde,setDatosSeleccionDesde]=useState();
    const [seleccionHasta,setDatosSeleccionHasta]=useState();
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    
    if(stepValido[activeStep]){
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ?steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {

    if(stepValido[activeStep]){
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    }else{
  
        const newCompleted = completed;
        newCompleted[activeStep] = false;
        setCompleted(newCompleted);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              La importacion ha finalizado!
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Atras
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {/* <Button onClick={handleNext} sx={{ mr: 1 }}>
                Siguiente
              </Button> */}
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                    Siguiente
                  </Button>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'FINALIZAR'
                      : 'Siguiente'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
      <SwipeableViews index={activeStep} >
                    <Step1_selectRegistro  completed={completed} setCompleted={setCompleted} 
                    setDatosSeleccionDesde={setDatosSeleccionDesde} setDatosSeleccionHasta={setDatosSeleccionHasta} 
                    setStepValido={setStepValido} textoRegistros={textoRegistros} setTextoRegistros={setTextoRegistros}
                     stepValido={stepValido} nroStep={0} token={token} />
                    <Step2_checkDatos seleccionDesde={seleccionDesde} seleccionHasta={seleccionHasta} textoRegistros={textoRegistros} completed={completed} setCompleted={setCompleted}  setStepValido={setStepValido} stepValido={stepValido} nroStep={1} token={token}  />
                    <Step3_finalizar  completed={completed} setCompleted={setCompleted}  setStepValido={setStepValido} stepValido={stepValido} nroStep={2} token={token}  />
      </SwipeableViews>
    </Box>
  );
}
