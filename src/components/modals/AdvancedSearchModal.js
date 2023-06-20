import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
} from '@mui/material'
import { Col, Row } from 'reactstrap'
import CustomTextField from '../react-hook-components/CustomTextField'
import { useForm } from 'react-hook-form'
import React from 'react'
import './modals.css'

const AdvancedSearchModal = ({ isOpen, handleClose, changeQuery }) => {
    const { control, handleSubmit, reset } = useForm()

    const onsubmit = (obtainedData) => {
        console.log('ADVANCED SEARCH : ', obtainedData)
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
            queryValues += `${eachKey}=${obtainedData[eachKey]}&`
        }
        console.log(queryValues)
        changeQuery(queryValues)
        //formReset()
        handleClose()
    }

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                maxWidth={'xs'}
                fullWidth
                PaperProps={{ style: { backgroundColor: '#ffffff',color:'#818589', } }}
            >
                <DialogTitle>Advance Search</DialogTitle>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <DialogContent>
                        <Row className='mt-4'>
                            <Col sm={15}>
                                <CustomTextField
                                    control={control}
                                    name='customer_order_id'
                                    label={'CUSTOMER ORDER ID'}
                                    className='w-100'
                                />
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col sm={15}>
                                <CustomTextField
                                    control={control}
                                    name='customer_number'
                                    label={'CUSTOMER NUMBER'}
                                    className='w-100'
                                />
                            </Col>
                        </Row>
                        <Row className='mt-4' >
                          <Col sm={15}>
                            <CustomTextField
                              control={control}
                              name='sales_org'
                              label={'SALES ORG'}
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
                            rounded
                            sx={{
                                '&.MuiButton-root': {
                                    color: '#818589',
                                },
                                '&.MuiButton-outlined': {
                                    borderColor: '#818589',
                                },
                            }}
                        >
                            Search
                        </Button>
                        <Button
                            variant='outlined'
                            className='w-50'
                            sx={{
                                '&.MuiButton-root': {
                                    color: '#818589',
                                },
                                '&.MuiButton-outlined': {
                                    borderColor: '#818589',
                                },
                            }}
                            onClick={() => {
                                //formReset()
                                handleClose()
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default AdvancedSearchModal
