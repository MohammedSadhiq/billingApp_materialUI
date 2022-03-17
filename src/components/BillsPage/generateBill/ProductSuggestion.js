import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import React, { useState } from 'react'
import { useSelector } from 'react-redux';

function ProductSuggestion(props) {

    const {handleAddLineItems} = props;
    const [value,setValue] = useState({});
    const [inputValue,setInputValue] = useState('');
    const products = useSelector(state=>state.product);

    console.log('product in add bill', products )

    const handleValue = (e,newValue)=>{
        setValue(newValue);
        const productData={...newValue,quantity:1}
        productData.subTotal = productData.quantity * productData.price;
        if(newValue){
            handleAddLineItems(productData)
            resetSuggestion();
        }
    }

    const resetSuggestion =()=>{
        setValue(null);
        setInputValue('')
    }

    const handleInputChange =(e,newInputValue)=>{
        setInputValue(newInputValue);

    }

  return (
    <Autocomplete
        value={value}
        onChange={handleValue}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={products}
        getOptionLabel={option=>Object.keys(option).length > 0 ? `${option.name}-Rs.${option.price}`:''}
        renderInput={(params)=><TextField variant='outlined' label='search product to add' margin='dense' {...params   }/>}
    />
  )
}

export default ProductSuggestion