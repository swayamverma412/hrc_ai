import React, { useState, useEffect } from 'react'
import { TextField, ButtonGroup, Button } from '@mui/material'
import { Col, Row } from 'reactstrap'
//import { Refresh } from '@mui/icons-material'
import dayjs from 'dayjs'
import axios from 'axios'

const ButtonComponent = ({
    openEditInvoiceModal,
    openDeleteInvoiceModal,
    allData,
    hitTrigger,
    changeQuery,
    selectedRows,
    changeAllData,
}) => {
    const [queryValue, setQueryValue] = useState('')

    useEffect(() => {
        if (queryValue.length > 0) {
            changeQuery(`customer_number=${queryValue}`)
        } else {
            changeQuery('')
        }
    }, [queryValue, changeQuery])

    const predictFunc = async () => {
        const rowsSelectedData = allData.filter((eachInvoice) =>
            selectedRows.includes(eachInvoice.sl_no)//dekhna hoga
        )
        console.log('SELECTED ROW DATA  :', rowsSelectedData)

        for (const eachRow of rowsSelectedData) {
            const body = {
                customer_order_id: eachRow.customer_order_id,
                sales_org: eachRow.sales_org,
                distribution_channel: eachRow.distribution_channel?.toString(),
                company_code: eachRow.company_code,
                order_creation_date: dayjs(eachRow.order_creation_date).format('YYYY'),
                order_currency: eachRow.order_currency?.toString(),
                customer_number: eachRow.customer_number,
                order_amount: eachRow.order_amount,
                amount_in_usd: eachRow.amoun_in_usd,
            }
            console.log(`Row ${eachRow.sl_no} `, body)

            try {
                const res = await axios.post('http://localhost:3000/', body)
                console.log(`Result for Row ${eachRow.sl_no} : `, res.data)
                changeAllData((cur) => {
                    const idx = cur.findIndex(
                        (invoice) => invoice.sl_no === eachRow.sl_no
                    )
                    console.log(cur[idx])
                    cur[idx].aging_bucket = res.data[0].aging_bucket
                    return cur
                })
            } catch (err) {
                console.log('Errorrrrrrr', err)
            }
        }
    }


    
  return (
    <Row
        className='me-0 d-flex align-items-center'
        style={{ height: '60px',backgroundColor:'#818589' }}
    >
    <div style={{ display: 'flex', justifyContent: 'flex-start',backgroundColor:'#818589' }}>
            <Button
                variant='contained'
                size='small'
                className='me-2'
                onClick={hitTrigger}
                sx={{
                    //...styles,
                    backgroundColor:'orange',
                    color:'white'
                }}
            >
                REFRESH DATA
            </Button>
            <Button
                className='util-btn rounded'
                variant={
                    selectedRows.length > 0 ? 'outlined' : 'contained'
                }
                disabled={selectedRows.length !== 1}
                onClick={openEditInvoiceModal}
                sx={{ //...styles, 
                    marginLeft: '10px',color:'grey' }}
            >
                EDIT
            </Button>
            <Button
                className='util-btn rounded'
                variant={
                    selectedRows.length > 0 ? 'outlined' : 'contained'
                }
                disabled={selectedRows.length === 0}
                onClick={openDeleteInvoiceModal}
                sx={{ //...styles, 
                    marginLeft: '10px' }}
            >
                DELETE
            </Button>
            <Button
                className='pe-4 ps-4 util-btn rounded'
                variant='contained'
                onClick={predictFunc}
                disabled={selectedRows.length <= 0}
                sx={{ //...styles, 
                    marginLeft: '10px' }}
            >
                PREDICT
            </Button>
    </div>
</Row>
  );
};

export default ButtonComponent;
