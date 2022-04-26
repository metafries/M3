import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { grey, green, purple } from '@material-ui/core/colors';
import PhotoWidgetDropzone from '../../steps/PhotoWidgetDropzone';
import Container from '@material-ui/core/Container';
import PhotoWidgetCropper from '../../steps/PhotoWidgetCropper';
import cuid from 'cuid';
import { getFileExtension } from '../../../util';
import { uploadToFirebaseStorage } from '../../../api/firebaseService';
import { updateUserProfilePhoto } from '../../../api/firestoreService';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& .MuiStepper-root': {
        paddingLeft: 0,
        paddingRIght: 0,
    },  
  },
  button: {
    border: '1px solid #0000001f',
    borderRadius: 0,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Select', 'Resize', 'Preview'];
}

export default function HorizontalLinearStepper({handleUploadCompleted}) {
  const [files, setFiles] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const handleUploadImage = () => {
      const filename = files[0] ? cuid() + '.' + getFileExtension(files[0].name) : '';
      const uploadTask = uploadToFirebaseStorage(image, filename);
      uploadTask.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;          
        console.log('Upload is ' + progress + '% done');        
      }, error => {
        console.log('1st',error.message);
        setUploading(false);
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            updateUserProfilePhoto(downloadURL, filename).then(() => {
                setUploading(false);
                setFiles([]);
                setImage(null);
                handleUploadCompleted();
            }).catch(error => {
                console.log('2nd',error.messge)
                setUploading(false);
            });
        })
      })
  }

  const getStepContent = (step) => {
    switch (step) {
        case 0:
            return  <PhotoWidgetDropzone files={files} setFiles={setFiles} />;
        case 1:
            return  <PhotoWidgetCropper 
                        setImage={setImage} 
                        setPreview={setPreview}
                        imagePreview={files.length > 0 ? files[0].preview : ''} 
                    />;
        case 2:
            return  <img src={preview} style={{width: '100%'}} />
        default:
            return  'Unknown step';
      }    
  }

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              Upload completed!
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div style={{ position: 'fixed', left: 0, width: '100%', bottom: '20px'}}>
            <Container maxWidth='sm'>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                    style={{marginLeft: '10px'}}
                  variant="contained"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
              disabled={files.length === 0}
              style={{float: 'right'}}
                variant="contained"
                color="primary"
                onClick={async () => {                        
                    if (activeStep === steps.length - 1) {
                        setUploading(true);
                        await handleUploadImage();
                    } else {
                        handleNext();
                    }
                }}
                className={classes.button}
              >
                {activeStep !== steps.length - 1  && 'Next'}
                {activeStep === steps.length - 1 && !uploading && 'Upload'}
                {activeStep === steps.length - 1 && uploading && <CircularProgress style={{color: '#fff'}} size={20} />}
              </Button>
              </Container>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
