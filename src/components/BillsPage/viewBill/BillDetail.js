import { Typography } from '@material-ui/core';
import React from 'react'

function BillDetail(props) {

    const {id,billdetail,customerDetails} = props;

  return (
    <>
        <Typography variant='h6'><strong>Order Id</strong>: {id}</Typography>
        <Typography variant='h6'><strong>Customer Name</strong>:{customerDetails.name}</Typography>
        <Typography variant='h6'><strong>Order Date & Time</strong>: {billdetail.createdAt}</Typography>
        <Typography variant='h6'><strong>Total Amount of purchase</strong>: {billdetail.total}</Typography>
    </>
  )
}

export default BillDetail