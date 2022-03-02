import React,{useState} from 'react'
import {Grid,Box,TextField,Typography,Button,makeStyles} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import validator  from 'validator'
import {asyncLogin} from '../../Actions/loginAction'

const useStyle = makeStyles({
  formElements :{
    marginTop:'15px'
    }
})



function LoginForm(props) {

  const {handleErrorNotify} = props
  const [email,setEmail] = useState('');
  const [ password,setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const errors = {};
  const classes = useStyle();
  const dispatch = useDispatch();

  const handleChange = (e) =>{
    if(e.target.name==='email'){
      
      setEmail(e.target.value.split(' ').join(''))
    }
    else if (e.target.name ==='password'){
      setPassword(e.target.value)
      
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    validation()
    if(Object.keys(errors).length ===0){
      const formData ={
        email : email,
        password : password
      }
      console.log('props in login',props)
      dispatch(asyncLogin(formData,props.history,handleErrorNotify))
    }
  }

  const validation = ()=>{
    if(!validator.isEmail(email)){
      errors.email='enter valid email id'
    }
    if(password.length===0){
      errors.password = 'enter valid password' 
    }
    else if (password.length < 8){
      errors.password = 'password must be above 8 characters' 
    }
    setFormErrors(errors)
  }

  return (
   <Grid container justifyContent='center'>
     <Box display='block' width ={320}>
      <Typography variant='h6'>Enter your credentials to login</Typography>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
        variant='outlined'
        margin='dense'
        name='email'
        label='Email Id'
        value={email}
        onChange={handleChange}
        fullWidth
        helperText = {formErrors.email ? formErrors.email : null}
        error = {formErrors.email ? true : false}
        /><br/>
          <TextField 
                        variant='outlined'
                        margin='dense'
                        className={classes.formElements}
                        name='password'
                        label='Password' 
                        value={password} 
                        onChange={handleChange} 
                        fullWidth 
                        helperText={formErrors.password ? formErrors.password : null}
                        error={formErrors.password ? true : false}
                        type='password'
                    />

        <Box display='flex' flexDirection='row'>
          <Box flexGrow={1}>
            <Typography className={classes.formElements}>Forgot password ?</Typography>
          </Box>
          <Box >
            <Button
              variant ='contained'
              type ='submit'
              color='primary'
              className={classes.formElements}
            >
              Login
            </Button>
          </Box>
        </Box> 
      </form>
     </Box>
   </Grid>
  )
}

export default LoginForm