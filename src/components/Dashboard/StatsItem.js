import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyle = makeStyles({
    statsItem :{
        backgroundColor:''
    }
})

function StatsItem(props) {

    const {statsTitle, statsNumber} = props;
    const classes = useStyle();

    

  return (
    <Grid  item lg={4} md={4} sm={4} xs={12}>
        <Paper className={classes.statsItem}>
            <Typography variant='h6' align='center'>{statsTitle}</Typography>
            <Typography variant='h2' align='center'>{statsNumber}</Typography>
        </Paper>
    </Grid>
  )
}

export default StatsItem