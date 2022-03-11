import React,{useState} from 'react'
import {Box, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import AddCustomerModal from './AddCustomerModal';
import ProductSuggestion from './ProductSuggestion';
import ProductListTable from './ProductListTable';
import SummaryOfBill from './SummaryOfBill';

const useStyle = makeStyles({
    title:{
        fontWeight:'700'
    },
    container:{
        width:'90vw',
        padding:"2vw 2vh"
    },
    gridContainer:{
        height:'85vh    '
    }
})

function AddBill() {
    
    const classes  = useStyle();
    const [lineItems,setLineItems] = useState([]);
    const [customerInfo,setCustomerInfo] = useState([]);

    const handleAddLineItems = (data) =>{
        const newList = [...lineItems,data]
        setLineItems(newList)
    }

    function handleCustomerInfo(value){
        setCustomerInfo(value)
    }

    const handleChangeQuantity = (data,type)=>{

        if(type==='add'){
        const newQuantityPlus = {...data,quantity:data.quantity+1}
        newQuantityPlus.subTotal = newQuantityPlus.quantity * newQuantityPlus.price;

        const newList = lineItems.map((product,index)=>{
            if(product._id===newQuantityPlus._id){
                return newQuantityPlus
            }
            else{
                return product
            }
        })
        setLineItems(newList)
        }
        else if(type==='minus'){
            const newQuantityMinus = {...data,quantity:data.quantity-1}
            newQuantityMinus.subTotal = newQuantityMinus.quantity * newQuantityMinus.price;

            const newList = lineItems.map((product,index)=>{
                if(product._id === newQuantityMinus._id){
                    return newQuantityMinus
                }
                else{
                    return product
                }
            })

            setLineItems(newList)
        }
    }

    const handleRemoveLineItem = (data)=>{
        const newList = lineItems.filter(prod=>prod._id!==data._id)
        setLineItems(newList);
    }


    console.log('line items',lineItems)

  return (
    <Container className={classes.container}>
        <Box display='flex' flexDirection='row' justifyContent='space-between'>
            <Typography className={classes.title} variant='h3'>New Bill</Typography>
            <AddCustomerModal/>
        </Box>
        <Grid>
            <Grid item>
                <ProductSuggestion
                    handleAddLineItems = {handleAddLineItems}
                />
                 <ProductListTable
                items={lineItems}
                handleChangeQuantity={handleChangeQuantity}
                handleRemoveLineItem={handleRemoveLineItem}
            />
        </Grid>
        <Grid item>
            <SummaryOfBill
                customerInfo={customerInfo}
                handleCustomerInfo={handleCustomerInfo}
                items={lineItems}
             />
        </Grid>
            </Grid>
           
    </Container>
  )
}

export default AddBill