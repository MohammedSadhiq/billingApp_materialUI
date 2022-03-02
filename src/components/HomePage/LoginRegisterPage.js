import { Box, Container, Paper, Tab, Zoom, makeStyles} from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import React, { useState } from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useHistory } from "react-router-dom";

const useStyle = makeStyles({
    tabs : {
        position : 'relative',
        marginTop : '110px'
    },
    tabName : {
        fontWeight : 'bolder'
    }
})

function LoginRegisterPage(props) {
    
    const [errorNotify,setErrorNotify] = useState({error:false,errorMessage:''})
    const [value,setValue] = useState('login');
    const classes = useStyle();
    const history = useHistory();

    const handleChange = (event,newValue)=>{
        setValue(newValue);
    }
    
    const handleErrorNotify = (value) =>{
        setErrorNotify(value)
    }

    function handleChangeTabValue (tabName){
        setValue(tabName)
    }


  return (
    <Box className = 'loginPage'>
        {
            errorNotify.error === true &&(
                <div className='errorMessage'>
                    <p>{errorNotify.errorMessage}</p>
                    <button onClick={()=>{handleErrorNotify({error:false,errorMessage:''})}}>X</button>
                </div>
            )
        }
        <Zoom in timeout={700}> 
            <Container className ={classes.tabs} maxWidth={'sm'}>
                <Paper >
                    <TabContext value={value}>
                        
                        <TabList
                            value = {value}
                            onChange = {handleChange}
                            indicatorColor='primary'
                            textColor='primary'
                            variant='fullWidth'
                        >
                            <Tab className = {classes.tabName} label='login' value ={'login'}/>
                            <Tab className = {classes.tabName} label ='Register' value = {'register'}/>
                        </TabList>

                        <TabPanel value ={'login'}>
                            <LoginForm handleErrorNotify = {handleErrorNotify} {...props}/>
                        </TabPanel>
                        <TabPanel value ={'register'}>
                            <RegisterForm handleChangeTabValue={handleChangeTabValue} />
                        </TabPanel>
                    </TabContext>
                </Paper>
            </Container>
        </Zoom>
    </Box>
  )
}

export default LoginRegisterPage