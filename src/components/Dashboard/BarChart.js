import React from 'react'; 
import {useSelector} from 'react-redux';
import Chart from 'react-google-charts';

function BarChart() {

    const bills = (state=>state.bills);
    const customers  = useSelector(state=>state.customers);
    const products = useSelector(state=>state.product);

    const charData = [['Customers',customers.length],['Products',products.length],['Bills',bills.length]]

  return (
    <Chart
        width={'100%'}
        height={'300px'}
        chartType='Bar'
        options={{
            chart:{
                title:'Complete Statistics',
                subTitle:'Customers,Products.Sales'

            }
        }}
        data={[['category','total in numbers'],...charData]}
    />
  )
}

export default BarChart