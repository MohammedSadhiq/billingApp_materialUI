import { Box, Drawer as MUIDrawer, List, ListItem, ListItemIcon,ListItemText, makeStyles } from '@material-ui/core'
import React,{useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {asyncGetBills} from '../../Actions/billsAction'
import { asyncGetProducts} from '../../Actions/productAction'
import {asyncGetCustomers} from '../../Actions/customerAction'
import {asyncGetUser} from '../../Actions/userAction'
import {setLogout} from '../../Actions/loginAction';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom';

const useStyle = makeStyles({
  menuItem : {
    paddingLeft : 0,
    paddingRight : 0
  },
  menuIcon : {
    margin : 0,
    justifyContent : 'center'
  },
  menuText :{
    paddingRight : 25,
    fontWeight : 600
  },
  menuLink : {
    textDecoration : 'none',
    color : 'black'
  },
  menuLogOut : {
    position : 'absolute',
    top: '80%'
  }
})

function Drawer() {

  const classes = useStyle();
  const dispatch = useDispatch();
  const [open,setOpen] = useState(false)

  useEffect(()=>{
    dispatch(asyncGetBills())
    dispatch(asyncGetCustomers())
    dispatch(asyncGetProducts())
    dispatch(asyncGetUser())
  },[dispatch])


  function handleDrawerOpen(){
    setOpen(true)
  }

  function handleDrawerClose(){
    setOpen(false)
  }

  function handleLogout(){
    localStorage.removeItem('token');
    dispatch(setLogout())
  }

  const menuItems = [
    {
      name : 'User Profile',
      icon : <AccountCircleIcon fontSize= 'large' />,
      link : '/user'
    },
    {
      name : 'Dashboard',
      icon : <BarChartIcon fontSize='large' />,
      link : '/dashboard'
    },
    {
      name : 'Customers',
      icon : <PeopleIcon fontSize='large' />,
      link : '/customers'
    },
    {
      name :'Products',
      icon : <LocalOfferIcon fontSize='large' />,
      link : '/products'
    },
    {
      name : 'Bills',
      icon : <ReceiptIcon fontSize ='large' />,
      link : '/bills'
    }
  ]

  return (
    <MUIDrawer
    variant ='permanent'
    >
        <List>
          <Box display='flex' flexDirection ='column' justifyContent='space-between' minHeight='90vh'> 
            <Box>
              <ListItem className={classes.menuItem } button onClick={open ? handleDrawerClose : handleDrawerOpen}> 
                <ListItemIcon className={classes.menuIcon}>
                  <MenuIcon fontSize='large' />
                </ListItemIcon>
                {
                  open && <ListItemText><span className={classes.menuText}>Menu</span></ListItemText>
                }
              </ListItem>
              {
                menuItems.map((menu,i)=>{
                  const {name,icon,link} = menu;
                  return(
                  <Link key={i} to={link} className = {classes.menuLink}>
                    <ListItem className = {classes.menuItem} button onClick={open ? handleDrawerClose : null} >
                      <ListItemIcon className={classes.menuIcon}>
                          {icon}
                      </ListItemIcon>
                      {
                  open && <ListItemText><span className={classes.menuText}>{name}</span></ListItemText>
                }
                    </ListItem>
                  </Link>)
                })
              }
            </Box>

            <Link to='/login-or-register' className ={classes.menuLink} >
              <ListItem className={`${classes.menuItem} ${classes.menuLogOut}`}  button onClick={handleLogout}>
                <ListItemIcon className={classes.menuIcon}>
                  <ExitToAppIcon />
                </ListItemIcon>
              </ListItem>
            </Link>
          </Box>
        </List>
    </MUIDrawer>
  )
}

export default Drawer