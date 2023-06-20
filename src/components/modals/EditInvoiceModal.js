import React, { useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { Col, Row } from 'reactstrap'
import CustomTextField from '../react-hook-components/CustomTextField'
import API from '../../utils/api'

const EditInvoiceModal = ({
    isOpen,
    handleClose,
    selectedRow,
    changeAllData,
    allData,
}) => {
    const { control, handleSubmit, reset } = useForm()
    const [selectedRowData, setSelectedRowData] = useState({})
    useEffect(() => {
        setSelectedRowData(
            allData.filter(
                (eachInvoice) => eachInvoice.sl_no === selectedRow
            )[0]
        )
    }, [selectedRow, allData])

    useEffect(() => {
        console.log('Selected Row Data', selectedRowData)
        if (selectedRowData) {
            reset({
                order_currency: selectedRowData.order_currency,
                company_code: selectedRowData.company_code,
            })
        }
    }, [selectedRowData, reset])

    const onSubmit = async (newData) => {
        console.log(newData)
        const { data, status } = await API(
            '/Read',
            { body: { sl_no: selectedRowData.sl_no, ...newData } },
            'PUT'
        )
        if (status !== 200) {
            console.log(data)
            alert('ERROR!!!')
            return
        }
        changeAllData((cur) => {
            const idx = cur.findIndex(
                (invoice) => invoice.sl_no === selectedRow
            )
            console.log(cur[idx])
            cur[idx].order_currency = newData.order_currency
            cur[idx].company_code = newData.company_code
            return cur
        })
        handleClose()
    }

    const formReset = () => {
        reset({
            order_currency: '',
            company_code: '',
        })
    }
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            maxWidth={'sm'}
            fullWidth
            PaperProps={{ style: { backgroundColor: '#ffffff' } }}
        >
            <DialogTitle>Edit</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Row>
                        <Col sm={6}>
                            <CustomTextField
                                control={control}
                                name='order_currency'
                                label={'Order Currency'}
                                className='w-100'
                            />
                        </Col>
                        <Col sm={6}>
                            <CustomTextField
                                control={control}
                                name='company_code'
                                label={'Company Code'}
                                className='w-100'
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <CustomTextField
                                control={control}
                                name='distribution_channel'
                                label={'Distribution Channel'}
                                className='w-100'
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
                                color: '#818589',
                                backgroundColor: '#fff',
                            },
                            '&.MuiButton-outlined': {
                                borderColor: '#818589',
                            },
                        }}
                    >
                        EDIT
                    </Button>
                    <Button
                        variant='outlined'
                        className='w-50'
                        onClick={() => {
                            formReset()
                            handleClose()
                        }}
                        sx={{
                            '&.MuiButton-root': {
                                color: '#818589',
                                backgroundColor: '#ffffff',
                            },
                            '&.MuiButton-outlined': {
                                borderColor: '#818589',
                            },
                        }}
                    >
                        CANCEL
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default EditInvoiceModal
