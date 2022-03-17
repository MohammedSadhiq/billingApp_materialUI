import { Container, Typography } from '@material-ui/core'
import React from 'react'
import CustomerForm from './CustomerForm'

function AddCustomer(props) {
  return (
    <Container>
        <Typography variant='h5'>Add Customer</Typography>
        <CustomerForm  {...props}/>
    </Container>
  )
}

export default AddCustomer