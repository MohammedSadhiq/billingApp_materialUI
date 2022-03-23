import { Box,TextField,Button,makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import validator from 'validator';
import { asyncAddCustomer, asyncUpdateCustomer } from '../../Actions/customerAction';


const useStyle = makeStyles({

    form:{
      display:'flex',
      flexDirection:'column',
      flexWrap:'wrap'
    },

    formField :{
        width: '20vw',
        marginRight : '1vw'
    },
    button:{
      display : 'flex',
      width:'13vw',
      flexDirection:'row',
      justifyContent:'space-evenly'
    },
    addBtn : {
      width:'6vw',
      height:'40px',
      marginTop:'7px'
    },
    cancelBtn:{
      width:'6vw',
      height:'40px',
      marginTop:'7px'
    },
    formButton:{
      display:'flex',
      justifyContent:'center',
      padding :'2%'
    }
})

function CustomerForm(props) {

  const { name:custName, mobile: custMobile, email: custEmail, _id, resetUpdateCust, handleClose } = props;   

    const[name,setName] = useState(custName ? custName :'');
    const [email,setEmail] = useState(custEmail ? custEmail :'');
    const [mobile,setMobile] = useState(custMobile ? custMobile :'');
    const [formErrors,setFormErrors] = useState({});
    const errors={};
    const dispatch = useDispatch();
    const classes = useStyle();
    

    const handleChange=(e)=>{

          const eventName=e.target.name;
          const fieldValue = e.target.value;
          if(eventName==='name'){
            setName(fieldValue)
          }
          else if(eventName==='mobile'){
            if(Number(fieldValue)||fieldValue===''){
              if(fieldValue.length<=10){
                  setMobile(fieldValue)
              }
            }
          }
          else if(eventName==='email'){
            setEmail(fieldValue.split(' ').join(''))
          }
    }

    const validate = () =>{
        if(name.length===0){
          errors.name='Name cannot be blank'
        }
        if(mobile.length !==10){
          errors.mobile ='Enter valid Mobile Number'
        }
        if(!validator.isEmail(email)){
          errors.email='Enter valid Email id'
        }
        setFormErrors(errors)
    }

    const resetForm=()=>{
      setName('');
      setEmail('');
      setMobile('');
      if(handleClose){
        handleClose()
      }
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
      validate();
      if(Object.keys(errors).length===0){
        const formData ={
          name : name[0].toUpperCase() + name.slice(1),
          mobile : mobile,
          email: email
        }
        if(_id){
          dispatch(asyncUpdateCustomer(_id,formData,resetUpdateCust))
        }
        else{
          dispatch(asyncAddCustomer(formData,resetForm,handleClose))
        }
      }
    }

  return (
    <form className={classes.form} autoComplete='off' onSubmit={handleSubmit}>
      <Box display='flex' flexDirection='row' flexWrap='wrap'>
          <TextField
          className={classes.formField}
          name='name'
          label='Name'
          value={name}
          onChange={handleChange}
          helperText={formErrors.name ? formErrors.name : null}
          error={formErrors.name ? true : false}
          variant='outlined'
          margin ='dense'
          ></TextField>
          <TextField
          className = {classes.formField}
          variant='outlined'
          name='mobile'
          label='Mobile'
          value={mobile}
          onChange={handleChange}
          helperText={formErrors.mobile ? formErrors.mobile : null}
          error = { formErrors.moble ? true : false}
          margin = 'dense'
          ></TextField>
          <TextField
          className={classes.formField}
          name='email'
          label='Email'
          variant='outlined'
          helperText={formErrors.email ? formErrors.email :null}
          error = {formErrors.email ? true : false}
          value={email}
          onChange={handleChange}
          marging = 'dense'
          ></TextField>
               </Box>

               <Box className={classes.formButton}>
          {
            _id ? (
              <div className={classes.button}>
                <Button
                className={classes.addBtn}
                type='submit'
                variant='contained'
                color='primary'
                >Update</Button>
                <Button
                className={classes.cancelBtn}
                onClick={resetUpdateCust}
                variant='contained'
                color='secondary'

                >Cancel</Button>
              </div>
            ):(
              <div className={classes.button}>
                <Button
                className={classes.addBtn}
                variant='contained'
                color='primary'
                type='submit'
                >Add</Button>
                <Button
                  className={classes.cancelBtn}
                  onClick={resetForm}
                  color='secondary'
                  variant='contained'
                >Cancel</Button>
              </div>
            )
          }
      </Box>
    </form>
  )
}

export default CustomerForm