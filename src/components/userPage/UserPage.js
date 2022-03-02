import { Container,Box,Typography,makeStyles } from '@material-ui/core';
import React from 'react';
import {useSelector} from 'react-redux';

const useStyle = makeStyles({
    title : {
        fontWeight : 600
    },
    keys : {
        fontWeight : 700
    }
})


function UserPage() {

    const userDetails = useSelector(state=>state.user);
    const classes = useStyle();


  return (
    <Container maxWidth='sm'>
        <Box>
            <Typography variant='h3' className={classes.title} align='center'>User Profile</Typography>
        </Box>
        <Box display='flex' flexDirection='row' variant='h3' justifyContent='space-evenly' alignItems='center' height='70vh'>
        <Box>
            <Typography className ={classes.keys} variant='h5'>Name :</Typography>
            <Typography className ={classes.keys} variant='h5'>Email :</Typography>
            <Typography className ={classes.keys} variant='h5'>Business Name :</Typography>
            <Typography className ={classes.keys} variant='h5'>Address :</Typography>  
        </Box>
        <Box>
            <Typography variant='h5'>{userDetails.username}</Typography>
            <Typography variant='h5'>{userDetails.email}</Typography>
            <Typography variant='h5'>{userDetails.businessName}</Typography>
            <Typography variant='h5'>{userDetails.address}</Typography>
        </Box>
        </Box>
    </Container>
  )
}

export default UserPage