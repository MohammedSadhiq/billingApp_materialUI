import React from 'react';
import {useSelector} from 'react-redux';
import  Chart  from 'react-google-charts';
import moment from 'moment';
import {Container, CircularProgress} from '@material-ui/core';


function LineChart() {

    const bills = useSelector(state=>state.bills);
    const user = useSelector(state=>state.user);


    const getDates =(start,end)=>{
        const dates=[];

        while(start.isSameOrBefore(end)){
            dates.push(start.toString());
            start.add(1,'days').endOf('day')
        }

        return dates
    }

    const calculateTotal =(data)=>{
        let total =0;
        data.forEach(bill=>{
            total = total + bill.total
        });
        return total
    }

    const billDailyWise =()=>{
        const dailyWiseBills = [];
        const dates = getDates(moment(user.createdAt).startOf('day'),moment().endOf('day'))
        dates.forEach((date)=>{
            const dailyBill ={};
            const getBills = bills.filter((bill)=>moment(bill.createdAt).isSame(date,'day'));
            dailyBill[moment(date).toString()] = calculateTotal(getBills)
            dailyWiseBills.push(dailyBill)
        })
        return dailyWiseBills
    }

    const chartData = billDailyWise().map((bill)=>{
        return [moment(Object.keys(bill)[0]).format('Do MMM'),Object.values(bill)[0]]
    })

    const options ={
        chart:{
            title:'Amount received on Daily Basis',
            subTitle:'in INR'
        },
        vAxis:{
            title:'Amount Received'
        },
        hAxis:{
            title:'Day'
        }
    }

  return (
      <Container>
    <Chart
        chartType='Line'
        width={'100%'}
        height={'300px'}
        data={[['date','Amount Received'],...chartData]}
        options ={options}
        loader={<CircularProgress/>}
    />
    </Container>
  )
}

export default LineChart