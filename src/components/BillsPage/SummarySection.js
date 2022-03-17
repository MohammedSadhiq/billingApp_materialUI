import { Box, Paper,makeStyles, Typography, Divider, Tooltip, Fab } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import { useSelector } from 'react-redux';


const useStyle = makeStyles({
    

    summaryTitle:{
        textAlign: 'center',
        fontWeight: 600
    },

    summaryContainer:{
        height: '40vh'
    },

    summaryContent:{
        height: '40%',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'

    },

    summary:{
        height: '85vh'
    },

    addIcon:{
        position: 'fixed',
        botton: "50px",
        right: '60px'
    }
    // summaryTitle:{
    //     textAlign: 'center',
    //     fontWeight: 600
    // },
    // summaryContainer:{
    //     height: '40vh'
    // },
    // summaryContent:{
    //     height: '40%',
    //     padding: '15px',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     justifyContent:'space-evenly'
    // },
    // summary:{
    //     height: '85vh'
    // },
    // addIcon:{
    //     position: 'fixed',
    //     bottom: "50px",
    //     right: '60px'
    // }

})

function SummarySection() {

    const classes = useStyle();
    const bills = useSelector(state=>state.bills)

    const calculateTotal=(data)=>{
        let total = 0;

        data.forEach(bill=>total=total+bill.total);

        return total
    }

  return (
    <Box
        className={classes.summary}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
    >
        <Box>
            <Paper className={classes.summaryContainer}>
                <Typography className={classes.summaryTitle} variant='h5'>Orders Summar</Typography>
                <Divider variant='middle'/>
                <Box className={classes.summaryContent} display='block'>
                    <Typography>No of Orders : {bills.length}</Typography>
                    <Typography>Total : {calculateTotal(bills)}</Typography>
                </Box>
            </Paper>
        </Box>
        <Link to='/addBill'>
            <Tooltip title='Add New Bill'>
                <Fab className={ classes.addIcon} color='primary'>
                    <AddIcon/>
                </Fab>
            </Tooltip>
        </Link>
    </Box>
  )
}

export default SummarySection