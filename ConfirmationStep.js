import React from 'react';
import {
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Box,
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SignatureIcon from '@material-ui/icons/AssignmentInd'; // You can replace this with your preferred signature icon
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { useState } from 'react';
const ConfirmationStep = ({ formData, onChange, onPrevious, onNext }) => {
    const [signatureImage, setSignatureImage] = useState(null);
    const [error , setError] = useState({});
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
      
        // Handle checkboxes separately
        if (e.target.type === 'checkbox') {
          onChange({ [name]: checked });
        } else if (name === 'signatureParent') {
          const file = e.target.files[0];
      
          if (file) {
            // Read the selected file as a data URL
            const reader = new FileReader();
            reader.onloadend = () => {
              // Update local state
              setSignatureImage(reader.result);
              // Update global state
              onChange({ [name]: reader.result });
            };
            reader.readAsDataURL(file);
          } else {
            // If no file is selected, reset both local and global state
            setSignatureImage(null);
            onChange({ [name]: null });
          }
        } else {
          onChange({ [name]: value });
        }
      };

    const validate = () => {
        const newError = {};
        if(!formData.signMyself){
            newError.signMyself = 'Please select atleast one option';
        }
        const pattern = /^[+]\d{2} \d{10}$/;
        if(!formData.homeTeleNo)
            newError.homeTeleNo = 'Please enter Home Tele No';
        else if(!formData.homeTeleNo.match(pattern))
            newError.homeTeleNo = "Should prefix with + two digit space and remaining 10 digits";

        if(formData.workTeleNo && !formData.workTeleNo.match(pattern))
            newError.workTeleNo = "Should prefix with + two digit space and remaining 10 digit";

        setError(newError);
        return Object.keys(newError).length === 0;
    };
    const handleNext = () => {
        const isValid = validate();
        if(isValid){
            onNext();
        }
      };
      

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '60%', height: '100%', padding: '20px',margin : 'auto' }}>
    <FormControl component="fieldset" style={{ marginBottom: 20 }}>
        <FormLabel component="legend">I am signing on behalf of (check all that apply)</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={formData.signMyself} onChange={handleChange} name="signMyself" />}
            label="Myself"
          />
          <span>
          {error.signMyself && <p style={{ color: 'red' , fontSize : 12 ,textAlign : 'left'}}>{error.signMyself}</p>}
          </span>
          <FormControlLabel
            control={<Checkbox checked={formData.signChild} onChange={handleChange} name="signChild" />}
            label="Child(ren)"
          />
          <FormControlLabel
            control={<Checkbox checked={formData.signDependent} onChange={handleChange} name="signDependent" />}
            label="Dependent adult(s)"
          />
        </FormGroup>
      </FormControl>
      <TextField
        label="Date"
        type="date"
        name="date"
        variant="outlined"
        value={formData.date}
        onChange={handleChange}
        style={{ marginBottom: 20, width: '40%' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarTodayIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Home Tele No"
        name="homeTeleNo"
        value={formData.homeTeleNo}
        onChange={handleChange}
        style={{ marginBottom: 20, width: '40%' }}
        inputProps={{ maxLength: 14 }}
        error = {!!error.homeTeleNo}
        helperText={error.homeTeleNo}
      />
      <TextField
        label="Work Tele No"
        name="workTeleNo"
        value={formData.workTeleNo}
        onChange={handleChange}
        style={{ marginBottom: 20, width: '40%' }}
        inputProps={{ maxLength: 13 }}
        error = {!!error.workTeleNo}
        helperText={error.workTeleNo}
      />
      <Box display="flex" alignItems="center" style={{ marginBottom: 20, width: '40%' }}>
        {formData.signatureParent ? ( // Render the image if available
          <img src={formData.signatureParent} alt="Signature" style={{ width: 100, height: 50, marginRight: 10 }} />
        ) : (
          <SignatureIcon style={{ marginRight: 10 }} />
        )}
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="signature-upload"
          type="file"
          onChange={handleChange}
          name="signatureParent"
        />
        <label htmlFor="signature-upload">
          <Button variant="contained" color="default" component="span">
            Upload Signature
          </Button>
        </label>
      </Box>
    <span>
    <Button variant="contained" color="default" onClick={onPrevious} style={{  width : '40%' , marginRight : 10}}>
        <NavigateBeforeIcon/>
      </Button>
      <Button variant="contained" color="primary" onClick={handleNext} style = {{ width : '40%' , marginLeft : 10}}>
        <NavigateNextIcon/>
    </Button>
    </span>
      </div>
      </>
  );
};

export default ConfirmationStep;
