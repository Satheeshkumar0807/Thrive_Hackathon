import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, TextField, Checkbox, FormControlLabel , RadioGroup, Radio, FormControl, FormLabel, InputAdornment} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ConfirmationStep from './ConfirmationStep';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import FamilyDoctorStep from './FamilyDoctorStep';
const steps = ['Personal Information', 'Children or Dependents', 'Signature','Family Doctor'];

// Component for Personal Information step
const PersonalInformationStep = ({ formData, onChange, onNext }) => {
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    onChange({ [name]: name === 'sameAsResidential' ? checked : value });
  };

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const isValid = validateFormData();
    if (isValid) {
      onNext();
    }
  };
  const validateFormData = () => {
    const newErrors = {};
  
    // Required fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    }
    if (!formData.sex) {
      newErrors.sex = 'Please select Male or Female';
    }
  
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim())
      newErrors.email = 'Email Address is required';
    if (formData.email.trim() && !emailPattern.test(formData.email.trim())) {
      newErrors.email = 'Invalid Email Address';
    }
  
    // Other validations
    if (!formData.healthNumber.trim())
      newErrors.healthNumber = 'Health Number is required';
    else if (formData.healthNumber.trim() && isNaN(formData.healthNumber.trim())) {
      newErrors.healthNumber = 'Health Number must be a number';
    }
    // Add more validations as needed
    const postalCodePattern = /^[a-zA-Z0-9]{6}$/;

  if (!formData.postalCode.trim())
    newErrors.postalCode = 'Postal Code is required';
  else if (formData.postalCode.trim() && !postalCodePattern.test(formData.postalCode.trim())) {
    newErrors.postalCode = 'Postal Code must be alpha-numeric and 6 characters long';
  }
    const versionCodePattern = /^[a-zA-Z0-9]{2}$/;

  if (!formData.versionCode.trim())
    newErrors.versionCode = 'Version Code is required';
  else if (formData.versionCode.trim() && !versionCodePattern.test(formData.versionCode.trim())) 
    newErrors.versionCode = 'Version Code must be alpha-numeric and 2 characters long';

  if(!formData.sameAsResidential){
    if (!formData.residentialAddress.trim())
      newErrors.residentialAddress = 'Residential Address is required';
    if (!formData.cityResidential.trim())
      newErrors.cityResidential = 'Residential City is required';
    if (!formData.postalCodeResidential.trim())
      newErrors.postalCodeResidential = 'Residential Postal Code is required';
  }
  // Apartment No, Street No validation (number)
  const numberPattern = /^[0-9]+$/;
  if (formData.apartmentNo.trim()){
    if (!numberPattern.test(formData.apartmentNo.trim()))
      newErrors.apartmentNo = 'Apartment No must be a number';
  }
  if (formData.apartmentNoResidential.trim() && !formData.sameAsResidential){
    if (!numberPattern.test(formData.apartmentNoResidential.trim()))
      newErrors.apartmentNoResidential = 'Residential Apartment No must be a number';
  }
  if (formData.streetName.trim()){
    if (!numberPattern.test(formData.streetName.trim()))
      newErrors.streetName = 'Street Number must be a number';
  }
  if (formData.streetNameResidential.trim() && !formData.sameAsResidential){
    if (!numberPattern.test(formData.streetNameResidential.trim()))
      newErrors.streetNameResidential = 'Residential Street Number must be a number';
  }
  // City validation (alphabet)

  const cityPattern = /^[a-zA-Z\s]+$/;
  if (!formData.city.trim())
    newErrors.city = 'City is required';
  else if (formData.city.trim() && !cityPattern.test(formData.city.trim())) {
    newErrors.city = 'City must contain only alphabetic characters';
  }

  if (!formData.mailingAddress.trim())
    newErrors.mailingAddress = 'Mailing Address is required';
  
    // Set errors state
    setErrors(newErrors);
  
    // Check if there are any errors
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div style={{  display : 'flex'  , flexDirection : 'row' ,
      flexWrap : 'wrap', justifyContent : 'center',
      padding : 20,
      width : '50%',margin : 'auto',height : '80%',

    }}>
      <TextField
        style = {{ width : '85%' ,
           textAlign : 'center',
           marginBottom : 15 ,
        }}

        variant="outlined"
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
        error={!!errors.firstName}
        helperText={errors.firstName}
      />
      
      <TextField
        style = {{ width : '41%' ,marginRight : 10 , marginBottom : 15}}
        variant="outlined"
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      <TextField
        style = {{ width : '41%' ,marginLeft : 10 , marginBottom : 15 }}
        variant="outlined"
        label="Second Name"
        name="secondName"
        value={formData.secondName}
        onChange={handleChange}
      />
      <TextField
        style={{ width: '85%', marginBottom: 15 }}
        variant="outlined"
        label="Date of Birth"
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarTodayIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        style = {{ width : '41%' ,marginRight : 12 , marginBottom : 15}}
        variant="outlined"
        label="Health Number"
        name="healthNumber"
        value={formData.healthNumber}
        onChange={handleChange}
        inputProps={{ maxLength: 10 }}
        required
        error={!!errors.healthNumber}
        helperText={errors.healthNumber}
      />
      <TextField
        style = {{ width : '41%' ,marginLeft : 12 , marginBottom : 15}}
        variant="outlined"
        label="Version Code"
        name="versionCode"
        value={formData.versionCode}
        onChange={handleChange}
        inputProps={{ maxLength: 2 }}
        error={!!errors.versionCode}
        helperText={errors.versionCode}
      />
      <TextField
        style = {{ width : '85%' , marginBottom : 15 ,
          textAlign : 'center'
        }}
        variant="outlined"
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
     <FormControl component="fieldset" 
        style = {{ width : '85%' ,  marginBottom : 15}}
     >
        <FormLabel component="legend" 
        style = {{ textAlign : 'left' }}>Gender</FormLabel>
        <RadioGroup row aria-label="gender" name="sex" value={formData.sex} onChange={handleChange}>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
     {!formData.sex && <span style={{ color: 'red' , textAlign : 'left' , fontSize : 12 }}>{errors.sex}</span>}
      </FormControl>

      <FormLabel component="legend"
        style = {{ width : '85%' ,  marginBottom : 25 , alignSelf : 'flex-start' , textAlign : 'left' , fontSize : 30 , marginLeft : 5 }}
      >Mailing Address</FormLabel>
      <TextField
          style = {{ width : '50%' , marginBottom : 15 , marginRight : 10}}
          multiline
          rows={4} // Set the number of rows you want to display initially
          maxRows={8} // Set the maximum number of rows
          variant="outlined"
          label="Mailing Address"
          name="mailingAddress"
          value={formData.mailingAddress}
          onChange={handleChange}
          required
          error={!!errors.mailingAddress}
          helperText={errors.mailingAddress}
/>

      <TextField
        style = {{ width : '15%' , marginBottom : 5 , marginRight : 10}}
        variant="outlined"
        label="Apart No"
        name="apartmentNo"
        value={formData.apartmentNo}
        onChange={handleChange}
        error={!!errors.apartmentNo}
        helperText={errors.apartmentNo}
      />
      <TextField
        style = {{ width : '15%' , marginBottom : 5}}
        variant="outlined"
        label="Strt No"
        name="streetName"
        value={formData.streetName}
        onChange={handleChange}
        error={!!errors.streetName}
        helperText={errors.streetName}
      />
      <TextField
        style = {{ width : '40%' ,marginRight : 10 , marginBottom : 15}}
        variant="outlined"
        label="City/Town"
        name="city"
        value={formData.city}
        onChange={handleChange}
        error={!!errors.city}
        helperText={errors.city}
      />
      <TextField
        style = {{ width : '40%' ,marginLeft : 10 , marginBottom : 15}}
        variant="outlined"
        label="Postal Code"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
        inputProps={{ maxLength: 6 }}
        error={!!errors.postalCode}
        helperText={errors.postalCode}
      />
      <FormControlLabel style = {{ width : '85%' ,  marginBottom : 15 , alignSelf : 'flex-start' , textAlign : 'left' , fontSize : 30 , marginLeft : 5 }}
        control={<Checkbox name="sameAsResidential" checked={formData.sameAsResidential} onChange={handleChange} />}
        label="Same as Residential Address"
      />
      {/* Render Residential Address fields if the checkbox is unchecked */}
      {!formData.sameAsResidential && (
        <>
          <FormLabel
            component="legend"
            style={{
              width: '85%',
              marginBottom: 15,
              alignSelf: 'flex-start',
              textAlign: 'left',
              fontSize: 30,
              marginLeft: 5,
            }}
          >
            Residential Address
          </FormLabel>
          <TextField
            style={{ width: '50%', marginBottom: 15, marginRight: 10 }}
            multiline
            rows={4}
            variant="outlined"
            label="Residential Address"
            name="residentialAddress"
            value={formData.residentialAddress}
            onChange={handleChange}
            required
            error={!!errors.residentialAddress}
            helperText={errors.residentialAddress}
            
          />
          <TextField
            style={{ width: '15%', marginBottom: 5, marginRight: 10 }}
            variant="outlined"
            label="Apart No"
            name="apartmentNoResidential"
            value={formData.apartmentNoResidential}
            onChange={handleChange}
            error={!!errors.apartmentNoResidential}
            helperText={errors.apartmentNoResidential}
          />
          <TextField
            style={{ width: '15%', marginBottom: 5 }}
            variant="outlined"
            label="Strt No"
            name="streetNameResidential"
            value={formData.streetNameResidential}
            onChange={handleChange}
            error={!!errors.streetNameResidential}
            helperText={errors.streetNameResidential}
          />
          <TextField
            style={{ width: '40%', marginRight: 10, marginBottom: 15 }}
            variant="outlined"
            label="City/Town"
            name="cityResidential"
            value={formData.cityResidential}
            onChange={handleChange}
            error={!!errors.cityResidential}
            helperText={errors.cityResidential}
          />
          <TextField
            style={{ width: '40%', marginLeft: 10, marginBottom: 15 }}
            variant="outlined"
            label="Postal Code"
            name="postalCodeResidential"
            value={formData.postalCodeResidential}
            onChange={handleChange}
            inputProps={{ maxLength: 6 }}
            error={!!errors.postalCodeResidential}
            helperText={errors.postalCodeResidential}
          />
        </>
      )}
      <Button variant="contained" color="primary" style = {{width : '20%' , alignSelf : 'flex-end'}}
      onClick={handleNext}>
          <NavigateNextIcon/>
      </Button>
    </div>
  );
};




const ChildrenDependentsStep = ({ formData, onChange, onPrevious, onNext }) => {
  const [childForms, setChildForms] = useState(formData.children || []); // Initialize with existing children or an empty array

  const [errors, setErrors] = useState({});
  const [removeConfirmationOpen, setRemoveConfirmationOpen] = useState(false);
  const [personToRemoveIndex, setPersonToRemoveIndex] = useState(null);

  const handleChange = (e, index) => {
    const { name, value, checked } = e.target;
    const newChildForms = [...childForms];
    newChildForms[index] = {
      ...newChildForms[index],
      [name]: name === 'sameAsParent' ? checked : value,
    };
    setChildForms(newChildForms);
  };

  const handleAddChild = () => {
    setChildForms([...childForms, {
      childFirstName: '',
      childLastName: '',
      childSecondName: '',
      childHealthNumber: '',
      childVersionCode: '',
      childDob: '',
      childSex: '',
      childEmail: '',
      childMailingAddress: '',
      childApartmentNo: '',
      childStreetName: '',
      childCity: '',
      childPostalCode: '',
      sameAsParent: false,
    }]);
  };

  const handleRemoveChildConfirmed = (index) => {
    const newChildForms = [...childForms];
    newChildForms.splice(index, 1);
    setChildForms(newChildForms);
    closeRemoveConfirmationDialog();
  };

  const handleNext = () => {
    // Combine child forms with main form data
    
        
      const combinedFormData = {
        ...formData,
        children: childForms,
      };
      onChange(combinedFormData);
      onNext();
    
  };
  const openRemoveConfirmationDialog = (index) => {
    setPersonToRemoveIndex(index);
    setRemoveConfirmationOpen(true);
  };
  // Function to handle going to the previous step
const handlePrevious = () => {
  onPrevious();
};

// Function to handle removing a child
const handleRemoveChild = (index) => {
  openRemoveConfirmationDialog(index);
};

  // Function to close the remove confirmation dialog
  const closeRemoveConfirmationDialog = () => {
    setPersonToRemoveIndex(null);
    setRemoveConfirmationOpen(false);
  };
  
  return (
    <div style={{  display : 'flex'  , flexDirection : 'row' ,
      flexWrap : 'wrap', justifyContent : 'center',
      padding : 20,
      width : '50%',margin : 'auto',height : '80%',
    }}>
      {childForms.map((childForm, index) => (
      <div key={index} >
      <TextField
        style = {{ width : '85%' ,
           textAlign : 'center',
           marginBottom : 15 ,
        }}

        variant="outlined"
        label="First Name"
        name="childFirstName"
        value={childForm.childFirstName}
        onChange={(e) => handleChange(e, index)}
        required
        error={!!errors.childFirstName}
        helperText={errors.childFirstName}
      />
      
      <TextField
        style = {{ width : '41%' ,marginRight : 10 , marginBottom : 15}}
        variant="outlined"
        label="Last Name"
        name="childLastName"
        value={childForm.childLastName}
        onChange={(e) => handleChange(e, index)}
      />
      <TextField
        style = {{ width : '41%' ,marginLeft : 10 , marginBottom : 15 }}
        variant="outlined"
        label="Second Name"
        name="childSecondName"
        value={childForm.childSecondName}
        onChange={(e) => handleChange(e, index)}
      />
      <TextField
        style={{ width: '85%', marginBottom: 15 }}
        variant="outlined"
        label="Date of Birth"
        type="date"
        name="childDob"
        value={childForm.childDob}
        onChange={(e) => handleChange(e, index)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarTodayIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        style = {{ width : '41%' ,marginRight : 12 , marginBottom : 15}}
        variant="outlined"
        label="Health Number"
        name="childHealthNumber"
        value={childForm.childHealthNumber}
        onChange={(e) => handleChange(e, index)}
        inputProps={{ maxLength: 10 }}
        required
        error={!!errors.childHealthNumber}
        helperText={errors.childHealthNumber}
      />
      <TextField
        style = {{ width : '41%' ,marginLeft : 12 , marginBottom : 15}}
        variant="outlined"
        label="Version Code"
        name="childVersionCode"
        value={childForm.childVersionCode}
        onChange={(e) => handleChange(e, index)}
        inputProps={{ maxLength: 2 }}
        error={!!errors.childVersionCode}
        helperText={errors.childVersionCode}
      />
      <TextField
        style = {{ width : '85%' , marginBottom : 15 ,
          textAlign : 'center'
        }}
        variant="outlined"
        label="Email Address"
        type="email"
        name="childEmail"
        value={childForm.childEmail}
        onChange={(e) => handleChange(e, index)}
        error={!!errors.childEmail}
        helperText={errors.childEmail}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
     <FormControl component="fieldset" 
        style = {{ width : '85%' ,  marginBottom : 15}}
     >
        <FormLabel component="legend" 
        style = {{ textAlign : 'left' }}>Gender</FormLabel>
        <RadioGroup row aria-label="gender" name="childSex" value={childForm.childSex} onChange={(e) => handleChange(e, index)}>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
        
      </FormControl>

      <FormControlLabel style = {{ width : '85%' ,  marginBottom : 15 , alignSelf : 'flex-start' , textAlign : 'left' , fontSize : 30 , marginLeft : 5 }}
        control={<Checkbox name="sameAsParent" checked={childForm.sameAsParent} onChange={(e) => handleChange(e, index)} />}
        label="Same as Parent's Address"
      />
      {/* Render Parent's Address fields if the checkbox is unchecked */}
      {!childForm.sameAsParent && (
        <>
          <FormLabel component="legend"
        style = {{ width : '85%' ,  marginBottom : 15 , textAlign : 'left' , fontSize : 30 , marginLeft : '8%' }}
      >Mailing Address</FormLabel>
      <TextField
          style = {{ width : '50%' , marginBottom : 15 , marginRight : 10}}
          multiline
          rows={4} // Set the number of rows you want to display initially
          maxRows={8} // Set the maximum number of rows
          variant="outlined"
          label="Mailing Address"
          name="childMailingAddress"
          value={childForm.childMailingAddress}
          onChange={(e) => handleChange(e, index)}
          required
          error={!!errors.childMailingAddress}
          helperText={errors.childMailingAddress}
      />

      <TextField
        style = {{ width : '15%' , marginBottom : 5 , marginRight : 10}}
        variant="outlined"
        label="Apart No"
        name="childApartmentNo"
        value={childForm.childApartmentNo}
        onChange={(e) => handleChange(e, index)}
      />
      <TextField
        style = {{ width : '15%' , marginBottom : 5}}
        variant="outlined"
        label="Strt No"
        name="childStreetName"
        value={childForm.childStreetName}
        onChange={(e) => handleChange(e, index)}
      />
      <TextField
        style = {{ width : '40%' ,marginRight : 10 , marginBottom : 15}}
        variant="outlined"
        label="City/Town"
        name="childCity"
        value={childForm.childCity}
        onChange={(e) => handleChange(e, index)}
        error={!!errors.childCity}
        helperText={errors.childCity}
      />
      <TextField
        style = {{ width : '40%' ,marginLeft : 10 , marginBottom : 15}}
        variant="outlined"
        label="Postal Code"
        name="childPostalCode"
        value={childForm.childPostalCode}
        onChange={(e) => handleChange(e, index)}
        inputProps={{ maxLength: 6 }}
        error={!!errors.childPostalCode}
        helperText={errors.childPostalCode}
      />
      <Button variant="contained" color="secondary" style={{ marginTop: '10px',marginLeft : '73%' , marginBottom : 20 }} onClick={() => handleRemoveChild(index)}>
          <DeleteOutlineIcon/>
      </Button>
      <Dialog open={removeConfirmationOpen} onClose={closeRemoveConfirmationDialog}>
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          Are you sure you want to remove this person?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRemoveConfirmationDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
            closeRemoveConfirmationDialog();
            handleRemoveChildConfirmed(personToRemoveIndex);
          }} color="secondary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>

        </>

      )}
      </div>
      ))}
      

      
      <Button variant="contained" color="default" style={{ marginTop : 10, width: '20%', alignSelf: 'flex-start', marginRight: 10 , marginLeft : 10 }} onClick={handlePrevious}>      
        <NavigateBeforeIcon/>
      </Button>
      
      <Button variant="contained" color="primary" onClick={handleAddChild} style={{ marginTop : 10,width: '10%', marginRight: 10 , marginLeft : 10 }}><AddIcon/></Button>

      
      <Button variant="contained" color="primary" style = {{marginTop : 10,width : '20%' , alignSelf : 'flex-end' , marginLeft : 10}}
      
      onClick={handleNext}>       
         <NavigateNextIcon/>
      </Button>
      

    </div>
  );
};


// Main form component
const MultiPageForm = () => {
  // Local state to hold form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    secondName: '',
    healthNumber: '',
    versionCode: '',
    dob: '',
    sex: '',
    email: '',
    mailingAddress: '',
    apartmentNo: '',
    streetName: '',
    city: '',
    postalCode: '',
    sameAsResidential: false,
    residentialAddress: '',
    apartmentNoResidential: '',
    streetNameResidential: '',
    cityResidential: '',
    postalCodeResidential: '',
    // Child's data
    children: [{
      childFirstName: '',
      childLastName: '',
      childSecondName: '',
      childHealthNumber: '',
      childVersionCode: '',
      childDob: '',
      childSex: '',
      childEmail: '',
      childMailingAddress: '',
      childApartmentNo: '',
      childStreetName: '',
      childCity: '',
      childPostalCode: '',
      sameAsParent: false,
    }],
    signMyself: false,
    signChild: '',
    signDependent: '',
    homeTeleNo: '',
    workTeleNo: '',
    doctorInfo: '',
    signatureParent: null,
    signatureDoctor: null,
    date: '',
    dateDoctor: '',
  });


  // Active step state
  const [activeStep, setActiveStep] = useState(0);

  // Function to update form data
  const updateFormData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  // Function to handle "Next" button click
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handlePrevious = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log(formData); // For testing
  };

  // Render step content based on active step
  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <PersonalInformationStep formData={formData} onChange={updateFormData} onNext={handleNext} />;
      case 1:
        return <ChildrenDependentsStep formData={formData} onChange={updateFormData} onPrevious={handlePrevious} onNext={handleNext} />;      // Add more steps as needed
      case 2:
        return <ConfirmationStep formData={formData} onChange={updateFormData} onPrevious={handlePrevious} onNext={handleNext} />;
      case 3 : 
        return <FamilyDoctorStep formData={formData} onChange={updateFormData} onPrevious={handlePrevious} onSubmit={handleSubmit} />;
      default:
        return 'Unknown stepIndex';
    }
  };

  return (
    <div>
      <h1 style = {{ margin : 0,padding : 15, height : 50,backgroundColor : 'ButtonFace', fontFamily : 'calibri', color : '#ff347f',
       borderRadius : 10 , textAlign : 'center', fontSize : 30,
        boxShadow : '0px 0px 10px 5px #ff347f',
         
      }}>
        Patient Consent and Entrollment Form</h1>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography>All steps completed</Typography>
          </div>
        ) : (
          <div>
            <Typography>{getStepContent(activeStep)}</Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiPageForm;

