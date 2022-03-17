import { Box, Container, Divider, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { asyncDeleteProducts } from '../../Actions/productAction';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import ProductDetails from './ProductDetails';
import ProductTable from './ProductTable';


const useStyle= makeStyles({
    container:{
        width:'100vw',
        padding:'2vh 2vw',
        marginLeft:'50px'
    },
    title:{
        fontWeight:700
    },
    divider:{
        width:'90vw'
    },
    pageContext:{
        width:'95vw',
        marginTop:'2px'
    }
})

function ProductPage() {

    const [search,setSearch] = useState('');
    const products = useSelector(state=>state.product);
    const dispatch = useDispatch();
    const [updateProduct,setUpdateProduct] = useState({});
    const [productList,setProductList] = useState(products);
    const [viewProduct, setViewProduct] = useState('');
    const classes = useStyle();  

    function handleSearchChange(e){
        setSearch(e.target.value)
        filterProducts(e.target.value)
    }

    console.log('products',products)

    useEffect(()=>{
        setProductList(products)
    },[products])

    const filterProducts=(value)=>{
        if(value.length>0){
            const filteredProducts = products.filter(prod=>prod.name.toLowerCase().includes(value.toLowerCase()));
            setProductList(filteredProducts)
        }
        else{
            setProductList(products)
        }
    }

    const resetSearch=()=>{
        setSearch('');
        filterProducts('')
    }

    const resetUpdateProduct =()=>{
        setUpdateProduct({})
    }

    const handleViewProduct =(id)=>{
        setViewProduct(id)   
    }

    const resetViewProduct=()=>{
        setViewProduct('')
    }

    const handleUpdateProduct =(data)=>{
        
        setUpdateProduct(data)
        
    }   

    // const handleUpdateProduct = useCallback((data)   =>{
    //     setUpdateProduct(data)
        // })

    const handleDeleteProduct = (id)=>{
        dispatch(asyncDeleteProducts(id))
    }

    console.log('update prod',updateProduct)

  return (
    <Container className={classes.container}>
        <Container disableGutters>
            <Typography className={classes.title} variant='h5'>Products</Typography>
            {
                
                Object.keys(updateProduct).length > 0 ? (
                <EditProduct 
                    updateProduct={updateProduct}
                    resetUpdateProduct={resetUpdateProduct}
                />
                ) : (<AddProduct/>)
            }
            <Divider className={classes.divider}/>
        </Container>
        <Grid container className={classes.pageContext} spacing={2} disableGutters>
            <Grid item lg={8}>
                    <Box display='flex' flexDirection='row' justifyContent='space-between'>
                        <Typography>List of Products - {productList.length}</Typography>
                        <TextField
                            name='search'
                            label='search'
                            value={search}
                            onChange={handleSearchChange}
                            variant='outlined'
                            margin='dense'
                            
                        />
                    </Box>
                    <ProductTable
                        products={productList}
                        handleViewProduct={handleViewProduct}
                        handleUpdateProduct={handleUpdateProduct}
                        handleDeleteProduct={handleDeleteProduct}
                        resetSearch={resetSearch}
                    />
                </Grid>
            <Grid item lg={4}>
                <ProductDetails
                    productId={viewProduct}
                    handleUpdateProduct={handleUpdateProduct}
                    resetViewProduct={resetViewProduct}
                /></Grid>
        </Grid>
    </Container>
  )
}

export default ProductPage
