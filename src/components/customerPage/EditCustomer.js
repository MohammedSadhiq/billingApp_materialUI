import { Container, Typography } from '@material-ui/core'
import React from 'react'
import CustomerForm from './CustomerForm'

function EditCustomer(props) {

  const {updateCust,resetUpdateCust} = props;


  return (
    <Container>
      <Typography variant='h5'>Edit Customer</Typography>
      <CustomerForm 
        name={updateCust.name}
        mobile={updateCust.mobile}
        email={updateCust.email}
        _id={updateCust._id}
        resetUpdateCust={resetUpdateCust}
      />
    </Container>
  )
}

export default EditCustomer