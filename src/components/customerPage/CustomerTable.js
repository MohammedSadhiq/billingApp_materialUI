import { Button, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncDeleteCustomer } from '../../Actions/customerAction';


const useStyle = makeStyles({
  table:{
    position:'fixed',
    width:'90vw',
    marginTop:'5px',
    maxHeight:'380px'
  },
  nameColumn:{
    width:'25%'
  },
  emailColumn:{
    width:'25%'
  },
  tableBtns:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  tableHeader:{
    backgroundColor:'black',
    color:'white'
  },
  headerName:{
    color:'white'
  },
  viewLink:{
    textDecoration:'white'
  }
})


function CustomerTable(props) {

  const{handleUpdateCustomer,customers,resetSearch} = props;
  const dispatch = useDispatch();
  const classes = useStyle();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>View</TableCell>
              <TableCell>Action</TableCell>

          </TableRow>
        </TableHead>

        <TableBody>
            {
              customers.map((cust,index)=>{
                return(<TableRow hover key={cust._id}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{cust.name}</TableCell>
                  <TableCell>{cust.mobile}</TableCell>
                  <TableCell>{cust.email}</TableCell>
                  <TableCell>
                    <Link to={`/customers/${cust._id}`} className={classes.viewLink}>
                      <Button
                        variant='contained'
                        color='primary'
                      >
                        View
                      </Button>
                      </Link>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={()=>{handleUpdateCustomer(cust);resetSearch()}}
                    >
                      Update
                    </Button>
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={()=>{dispatch(asyncDeleteCustomer(cust._id));resetSearch()}}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>)
              })
            }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CustomerTable