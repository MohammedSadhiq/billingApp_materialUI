import React,{useState} from 'react';
import {Paper,Typography,Container, Divider,Button,makeStyles} from '@material-ui/core';
import CustomerSuggestion from './CustomerSuggestion';
import OrderDetails from './OrderDetails';
import {useDispatch} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { asyncAddBill } from '../../../Actions/billsAction';
import { v4 as uuidv4 } from 'uuid';

const useStyle = makeStyles({
    summaryContainer:{  
        height:'65vh'
    },
    title:{
        fontWeight:'700',
        textAlign:'center'
    }
})

function SummaryOfBill(props) {

    const {lineItems, customerInfo,   handleCustomerInfo } = props;
    const classes = useStyle();
    const dispatch= useDispatch();
    const [totalAmount, setTotalAmount] = useState(0);
    const razorpay_API_KEY="rzp_live_tQGlNubk4DGzuA";
    const razorpay_API_SECRET="zcHBGKNizWXxgFxaK9vEgvJL";

    const getTotal =(amount)=>{setTotalAmount(amount)};

    console.log('line Items in  in summary bill',lineItems);

    const productInfo = ()=>{
        
        const productToBeBilled = lineItems.map(data=>data.name);

        return productToBeBilled.toString();
    }

    console.log('customer info in product Info', customerInfo);

    const handleGenerateBill =()=>{
        const items = [];

        lineItems.forEach(item=>{
            items.push({product:item._id,quantity:item.quantity})
        })

        if(items.length<=0){
            alert('select the products to be billes')
        }

        else if(Object.keys(customerInfo).length <= 0){
            alert('select the customer to be billed for')
        }

        if(items.length > 0 && Object.keys(customerInfo).length > 0){
            const billData = {
                date : new Date(),
                customer : customerInfo._id,
                lineItems : items
            }

            // var instance = new window.Razorpay({key: razorpay_API_KEY, key_secret: razorpay_API_SECRET});

            // const orderId = instance.orders.create({
            //     amount: totalAmount * 100,
            //     currency: "INR",
            //     receipt: uuidv4(),
            //     notes: {
            //      total: totalAmount,
            //       time: new Date()
            //     }
            //   })

            //   console.log({orderId})
             
            // var options = {
            //     "key": razorpay_API_KEY, // Enter the Key ID generated from the Dashboard
            //     "key_secret":razorpay_API_SECRET,
            //     "amount": totalAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            //     "currency": "INR",
            //     "name": productInfo(),
            //     "description": "Test Transaction",
                
            //     "order_id": uuidv4(), //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            //     "handler": function (response){
            //         alert(response.razorpay_payment_id);
            //         alert(response.razorpay_order_id);
            //         alert(response.razorpay_signature)
            //         dispatch(asyncAddBill(billData,props.history))
            //     },
            //     "prefill": {
            //         "name": customerInfo.name,
            //         "email": customerInfo.email,
            //         "contact": customerInfo.mobile
            //     },
            //     "notes": {
            //         "address": "Razorpay Corporate Office"
            //     },
            //     "theme": {
            //         "color": "#3399cc"
            //     }
            // };
             var options = {
                key: razorpay_API_KEY, // Enter the Key ID generated from the Dashboard
                key_secret:razorpay_API_SECRET,
                amount: totalAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: productInfo(),
                description: "Test Transaction",
                
                //order_id: uuidv4(), //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                handler: function (response){
                    alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id);
                    // alert(response.razorpay_signature)
            dispatch(asyncAddBill(billData,props.history))
                },
                prefill: {
                    name: customerInfo.name,
                    email: customerInfo.email,
                    contact: customerInfo.mobile
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const pay = new window.Razorpay(options);

            pay.open()
           
        }
    }



  return (
   <Paper className={classes.summaryContainer}>
       <Typography>Summary of Bill</Typography>
       <Divider/>
       <Container>
           <CustomerSuggestion
            handleCustomerInfo={handleCustomerInfo}
           />
       </Container>
       <Divider />
       <Container>
           <OrderDetails lineItems={lineItems} getTotal={getTotal}/>
       </Container>
       <Button
        variant='contained'
        color='primary'
        fullWidth
        onClick={handleGenerateBill}
       >
           Generate Bill
       </Button>
   </Paper>
  )
}

export default withRouter(SummaryOfBill)