   import React, { useState } from 'react'
   import {Grid,Box,TextField,Button,Typography,makeStyles} from '@material-ui/core'
   import { useDispatch } from 'react-redux'
   import validator from 'validator'
   import {asyncRegister} from '../../Actions/registerAction'

   const useStyle = makeStyles({
     formElements : {
       marginTop : '15px'
     }
   })


   function RegisterForm(props) {

    const {handleChangeTabValue } = props;
    const [username,setUsername]  = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [ address, setAddress] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const errors = {};
    const classes = useStyle();
    const dispatch = useDispatch()

    function handleChange (e){
        const name = e.target.name;
        const value = e.target.value;
        if(name === 'username'){
          setUsername(value)
        }
        else if (name === 'email'){
          setEmail(value)
        }
        else if (name === 'password'){
          setPassword(value)
        }
        else if (name === 'businessName'){
          setBusinessName(value)
        }
        else if (name === 'businessName'){
          setBusinessName(value)
        }

        else if (name === 'address'){
          setAddress(value)
        }
    }

    const validation = () =>{
      if(username.length === 0){
        errors.username = 'User name cannot be blank'
      }
      if(!validator.isEmail(email)){
        errors.email = 'Invalid email id,Enter a valid email id'
      }
      if(password.length <8){
        errors.password = 'Password cannot be less than 8 characters'
      }
      if(businessName.length ===0){
        errors.businessName = 'Business name cannot be blank'
      }
      if(address.length === 0){
        errors.address = 'Address cannot be blank'
      }

      setFormErrors(errors)
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
      validation();
      if(Object.keys(errors).length===0){
        const formData = {
          username : username[0].toUpperCase() + username.slice(1),
          email : email,
          password : password,
          businessName : businessName,
          address : address
        }
        dispatch(asyncRegister(formData,handleChangeTabValue))
      }

    } 

     return (
       <Grid container justify='center'>
         <Box display='block' width ={350}>
           <Typography variant='h6'>Fill in the details to register</Typography>
           <form noValidate autoComplete='off' onSubmit={handleSubmit}>  
              <TextField 
                margin = 'dense'
                variant = 'outlined'
                name = 'username'
                label = 'Username'
                value = {username}
                onChange = {handleChange}
                fullWidth
                helperText = {formErrors.username ? formErrors.username : null}
                error = {formErrors.username ? true : false}
                required
              /><br/>
              <TextField 
                margin = 'dense'
                variant = 'outlined'
                name = 'email'
                label = 'Email'
                value = {email}
                onChange = {handleChange}
                fullWidth
                helperText = {formErrors.email ? formErrors.email : null}
                error = {formErrors.email ? true : false}
                required
              /><br/>
              <TextField 
                margin = 'dense'
                variant = 'outlined'
                name = 'password'
                label = 'Password'
                value = {password}
                onChange = {handleChange}
                fullWidth
                helperText = {formErrors.password? formErrors.password: null}
                error = {formErrors.password ? true : false}
                required
              /><br/>
              <TextField 
                margin = 'dense'
                variant = 'outlined'
                name = 'businessName'
                label = 'Business Name'
                value = {businessName}
                onChange = {handleChange}
                fullWidth
                helperText = {formErrors.businessName ? formErrors.businessName : null}
                error = {formErrors.businessName ? true : false}
                required
              /><br/>
              <TextField 
                margin = 'dense'
                variant = 'outlined'
                name = 'address'
                label = 'Address'
                value = {address}
                onChange = {handleChange}
                fullWidth
                helperText = {formErrors.address ? formErrors.address : null}
                error = {formErrors.address ? true : false}
                required
              /><br/>
              <Box display='flex' flexDirection='row' justifyContent='flex-end'>
                <Button 
                  className = {classes.formElements}
                  type = 'submit'
                  variant = 'contained'
                  color = 'primary'
                >
                  Register
                  </Button>
              </Box>
           </form>
         </Box>
       </Grid>
     )
   }
   
   export default RegisterForm
