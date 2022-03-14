import React,{useState} from 'react';
import {useSelector} from 'react-redux';
import { Autocomplete } from '@material-ui/lab';
import {TextField,Box,Typography} from '@material-ui/core';

function CustomerSuggestion(props) { 
 
  const {handleCustomerInfo} = props;
  const customers = useSelector(state=>state.customers);
  const [value,setValue] = useState({});
  const [inputValue,setInputValue] = useState('');


  function handleValue (e,newvalue) {
    setValue(newvalue);
    handleCustomerInfo(newvalue);
    console.log('handle value in customer suggestion', newvalue);
    console.log('handle value event in customer suggestion',e)

  }

  function handleInputChange(e,newInputValue){
    setInputValue(newInputValue)
    console.log('handle input in customer',newInputValue);
    console.log('event in handle input customer suggestion',e)
  }

  return (<>
    <Autocomplete 
      value={value}
      onChange={handleValue}
      inputValue={inputValue}
      onInputChange ={handleInputChange}
      options={customers}
      getOptionLabel={option =>Object.keys(option).length > 0 ? `${option.mobile}-${option.name}`:''}
      renderInput={(params)=><TextField {...params} margin='dense' variant='outlined' label='Search Customer'/>}
     />
     {
       (value!==null && Object.keys(value).length>0) ? (<Box>
         <Typography><strong>Name :</strong>{value.name}</Typography>
         <Typography><strong>Email :</strong>{value.email}</Typography>
         <Typography><strong>Mobile :</strong>{value.mobile}</Typography>
       </Box>)
       :(<Box>
         <Typography>Enter Mobile Number of customer</Typography>
       </Box>)
     }
     </>
  )
}

export default CustomerSuggestion