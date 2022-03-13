import React from 'react';
import{Typography,Box, Container} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import  Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import moment from 'moment';
import ViewOrderTable from './ViewOrderTable';


// const Accordion1 = withStyles({
//     root:{
//         border:'1px solid rgba(0,0,0,.125)'
//     }
// })(Accordion)

// const AccordionSummary1 = withStyles({
    
//     root:{
//         backgroundColor:'rgba(0,0,0,.03)',
//         borderBottom: '1px solid rgba(0, 0, 0, .125)',
//         marginBottom:-1,
//         minHeight:56,
//         '&$expanded':{
//             minHeight: 56
//         }
//     }

// })(AccordionSummary)


const Accordion1 = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(Accordion);
  
const AccordionSummary1 = withStyles({
    root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
        minHeight: 56,
    },
    },
    content: {
    '&$expanded': {
        margin: '12px 0',
    },
    },
    expanded: {},
})(AccordionSummary);
  
const AccordionDetails1 = withStyles((theme) => ({
    root: {
    padding: theme.spacing(2)
    },
}))(AccordionDetails);


function CustomerOrder(props) {

    const {customerBills} = props;

  return (
    <>
        <Typography variant='h5' align='center'>List of Orders- {customerBills.length}</Typography>
            {
                customerBills.map(bill=>{
                    return (
                        <Accordion1 key={bill._id} >
                            <AccordionSummary1 >
                                <Box width='100%' display='flex' flexDirection='row' justifyContent='space-between'>
                                    <Typography variant='h6'>{moment(bill.date).format('DD/MM/YYYY,hh:mm A')}</Typography>
                                    <Typography variant='h6'>Order ID- {bill._id}</Typography>
                                    <Typography variant='h6'>Total - Rs{bill.total}</Typography>
                                </Box>
                            </AccordionSummary1>
                            <AccordionDetails>
                                <Container>
                                    <ViewOrderTable lineItems={bill.lineItems} total={bill.total}/>
                                </Container>
                            </AccordionDetails>
                        </Accordion1>
                    )
                })
            }
    </>
  )
}

export default CustomerOrder