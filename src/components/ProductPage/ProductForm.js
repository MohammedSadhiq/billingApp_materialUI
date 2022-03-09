import { Button, makeStyles, TextField, Box } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import validator from 'validator';
import { asyncAddProducts, asyncUpdateProducts } from '../../Actions/productAction';


const useStyle = makeStyles({
    // form: {
    //     display:'flex',
    //     flexDirection:'row',
    //     flexWrap:'wrap'
    // },
    form:{
        display:'flex',
        flexDirection:'column'
    },
    nameField:{
        width:'45vw',
        marginLeft:'10px'
    },
    priceField:{
        width:'25vw',
        margingLeft:'10px'
    },
    button:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'13vw',
        alignItems:'left'
        
    },
    addBtn:{
        width:'6vw',
        height:'40px',
        marginTop:'7px',
        marginLeft:'10px'
    },
    cancelBtn:{
        width:'6vw',
        height:'40px',
        marginTop:'7px',
        marginLeft:'10px'
    }

})

function ProductForm(props) {

    const {name:prodName,price:prodPrice,_id, resetUpdateProduct} = props;
    const [nameField, setName ] = useState(prodName ? prodName :'');
    const [priceField,setPrice] = useState(prodPrice ? prodPrice :'');
    const errors={};
    const [formErrors,setFormErrors] = useState({});
    const dispatch = useDispatch();
    const classes = useStyle();

    const handleChange =(e)=>{
        const eventName = e.target.name;
        const value = e.target.value;
        if(eventName==='namefield'){
            setName(value)
        }
        else if(eventName==='pricefield'){
            setPrice(value)
        }
    }

    function validate(){
        if(nameField.length <0){
            errors.nameField='Name Cannot Be Blank'
        }
        else if (priceField.length <0){
            errors.priceField ='Enter valid Amount'
        }
        setFormErrors(errors)
        }

    function handleSubmit(e){
        e.preventDefault();
        validate();
        
        if(Object.keys(errors).length === 0){
            const formData={
                name : nameField[0].toUpperCase() + nameField.slice(1),
                price : priceField
            }
            if(_id){
                dispatch(asyncUpdateProducts(_id,formData,resetUpdateProduct))
                
            }
            else{
                dispatch(asyncAddProducts(formData,resetForm))
            }
        }
    }

    function resetForm(){
        setName('');
        setPrice('');
    }

  return (
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Box>
            <TextField
                name='namefield'
                label='Product Name'
                variant='outlined'
                className={classes.nameField}
                margin='dense'
                value={nameField}
                onChange={handleChange}
                helperText={formErrors.nameField ? formErrors.nameField : null}
                error={formErrors.nameField ? true : false}
            />
            <TextField
                name='pricefield'
                label='Product Price'
                variant='outlined'
                margin='dense'
                onChange={handleChange}
                className={classes.priceField}
                value={priceField}
                error={formErrors.nameField ? true : false}
                helperText={formErrors.nameField ? formErrors.nameField : null}
            />
            </Box>
            {
                _id ? (<div className={classes.button}>
                    <Button 
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={classes.addBtn}
                    >Update</Button>
                    <Button
                    className={classes.cancelBtn}
                    variant='contained'
                    color='secondary'
                    onClick={resetUpdateProduct}
                    >Cancel</Button>
                </div>):(<div>
                    <Button 
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={classes.addBtn}
                    >Add</Button>
                    {
                        (nameField.length > 0 || priceField.length >0) && (
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={resetForm}
                            className={classes.cancelBtn}
                        >Cancel</Button>)
                    }
                </div>)
            }
        </form>
  )
}

export default ProductForm