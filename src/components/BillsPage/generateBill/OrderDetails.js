import React from 'react';
import {Box, Container, Typography} from '@material-ui/core'

function OrderDetails(props) {

  const {lineItems }= props;

  const calculateTotal = (data)=>{
      let total =0;

      data.forEach(item=>total=total+item.subTotal);

      return total
  }


  return (
    <Container>
      <Box>
        <Box>
            <Typography><strong>Total Products</strong></Typography>
            <Typography><strong>{lineItems.length}</strong></Typography>
        </Box>
        <Box>
            <Typography><strong>Total Amount in (INR)</strong></Typography>
            <Typography><strong>{calculateTotal(lineItems)}</strong></Typography>
        </Box>
      </Box>
      
    </Container>

  )
}

export default OrderDetails