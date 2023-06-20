import React from 'react'
import { useForm } from 'react-hook-form'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
} from '@mui/material'
import { Col, Row } from 'reactstrap'
import CustomTextField from '../react-hook-components/CustomTextField'
import dayjs from 'dayjs'

const AnalyticsModal = ({
    isOpen,
    handleClose,
    changeQuery,
    openChartViewModal,
}) => {
    const { control, handleSubmit, reset } = useForm()

    const formReset = () => {
        reset({
            order_creation_date: null,
            order_currency: '',
        })
    }

    const onsubmit = (obtainedData) => {
        console.log(obtainedData)
        const keys = Object.keys(obtainedData)
        let queryValues = ''
        for (const eachKey of keys) {
            //console.log(obtainedData[eachKey] === "")
            if (
                obtainedData[eachKey] === null ||
                obtainedData[eachKey] === undefined ||
                obtainedData[eachKey] === ''
            ) {
                continue
            }
            if (eachKey !== 'order_currency') {
                queryValues += `${eachKey}=${dayjs(
                    obtainedData[eachKey]
                ).format('YYYY-MM-DD')}&`
            } else {
                queryValues += `${eachKey}=${obtainedData[eachKey]}&`
            }
        }
        console.log(queryValues)
        changeQuery(queryValues)
        formReset()
        handleClose()
        openChartViewModal()
    }

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                maxWidth={'sm'}
                fullWidth
                PaperProps={{
                    style: {
                        backgroundColor: '#818589',
                    },
                }}
            >
                <form onSubmit={handleSubmit(onsubmit)}>
                    <DialogContent>
                        <Row className='mb-5'>
                            <Col lg={12}>
                                <div style={{ color: '#fff' }}></div>
                                <CustomTextField
                                    label='DISTRIBUTION CHANNEL'
                                    name='start_clear_date'
                                    control={control}
                                    className='w-100 mb-2'
                                />
                            </Col>
                        </Row>
                        <Row className='mb-5'>
                            <Col lg={12}>
                                <div style={{ color: '#fff' }}></div>
                                <CustomTextField
                                    label='CUSTOMER NUMBER'
                                    name='start_due_date'
                                    control={control}
                                    className='w-100 mb-2'
                                />
                            </Col>
                        </Row>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            variant='outlined'
                            className='w-100'
                            type='submit'
                            size='large'
                            sx={{
                                '&.MuiButton-root': {
                                    color: '#ffffff',
                                },
                                '&.MuiButton-outlined': {
                                    borderColor: '#ffffff',
                                },
                            }}
                        >
                           VIEW
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default AnalyticsModal
