import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from '@mui/material';
import { Col, Row } from 'reactstrap';
import { DatePicker } from '@mui/lab';
import dayjs from 'dayjs';
// import API from '../../utils/api'; // Uncomment this line if you have the API utility

const AddInvoiceModal = ({ isOpen, handleClose, changeAllData }) => {
  const { control, handleSubmit, reset } = useForm();

  const [formValues, setFormValues] = useState({
    customer_order_id: '',
    sales_org: '',
    distribution_channel: '',
    company_code: '',
    order_creation_date: null,
    order_currency: '',
    customer_number: '',
    amount_in_usd: '',
    order_amount: '',
  });

  const onSubmit = async (newData) => {
    const date_fields = ['order_creation_date'];
    for (const eachField of date_fields) {
      if (newData[eachField] !== null) {
        newData[eachField] = dayjs(newData[eachField]).format('YYYY-MM-DD');
      }
    }

    newData['customer_number'] = Number(newData['customer_number']);
    newData['customer_order_id'] = Number(newData['customer_order_id']);

    try {
      // const { data, status } = await API('/Add', { body: newData }, 'POST');
      // Uncomment the above line if you have the API utility
      // You need to replace '/Add' with your actual API endpoint

      // Simulating a successful API response
      const data = { ...newData };
      const status = 200;

      if (status !== 200) {
        console.log(data);
        alert('Error!!!!!');
        return;
      }
      console.log(data);
      changeAllData((cur) => {
        return [...cur, { ...data }];
      });
      formReset();
      handleClose();
    } catch (error) {
      console.error(error);
      alert('Error!!!!!');
    }
  };

  const formReset = () => {
    setFormValues({
      customer_order_id: '',
      sales_org: '',
      distribution_channel: '',
      company_code: '',
      order_creation_date: null,
      order_currency: '',
      customer_number: '',
      amount_in_usd: '',
      order_amount: '',
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth='lg'
      fullWidth
      PaperProps={{ style: { backgroundColor: '#818589' } }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className='pt-2'>
          <Row>
            <Col lg={6}>
              <Controller
                name='customer_order_id'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Customer Order ID'
                    className='w-100'
                  />
                )}
              />
            </Col>
            <Col lg={6}>
              <Controller
                name='sales_org'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Sales Org'
                    className='w-100'
                  />
                )}
              />
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col lg={6}>
              <Controller
                name='distribution_channel'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Distribution Channel'
                    className='w-100'
                  />
                )}
              />
            </Col>
            <Col lg={6}>
              <Controller
                name='company_code'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Company Code'
                    className='w-100'
                    variant='filled'
                  />
                )}
              />
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col lg={6}>
              <Controller
                name='order_currency'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Order Currency'
                    className='w-100'
                  />
                )}
              />
            </Col>
            <Col lg={6}>
              <Controller
                name='amount_in_usd'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Amount In USD'
                    className='w-100'
                    variant='filled'
                  />
                )}
              />
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col lg={6}>
              <Controller
                name='order_creation_date'
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label='Order Creation Date'
                    className='w-100'
                    renderInput={(params) => (
                      <TextField {...params} variant='filled' />
                    )}
                  />
                )}
              />
            </Col>
            <Col lg={6}>
              <Controller
                name='customer_number'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Customer Number'
                    className='w-100'
                  />
                )}
              />
            </Col>
          </Row>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            className='w-50'
            type='submit'
            sx={{
              '&.MuiButton-root': {
                color: '#ffffff',
                backgroundColor: '#fc7500',
              },
              '&.MuiButton-outlined': {
                borderColor: '#fc7500',
              },
            }}
          >
            Add
          </Button>
          <Button
            variant='outlined'
            className='w-50'
            onClick={() => {
              formReset();
              handleClose();
            }}
            sx={{
              '&.MuiButton-root': {
                color: '#fff',
                backgroundColor: '#db4437',
              },
              '&.MuiButton-outlined': {
                borderColor: '#db4437',
              },
            }}
          >
            Clear Data
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddInvoiceModal;