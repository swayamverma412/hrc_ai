import React, { useState, useEffect } from 'react'
import { TextField, Button } from '@mui/material'
import { Row } from 'reactstrap'
import './utilbar.css'
import dayjs from 'dayjs'
import axios from 'axios'

const UtilBar = ({
    openAddInvoiceModal,
    openAdvancedSearchModal,
    openAnalyticsViewModal,
    allData,
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

    const styles = {
        '&.MuiButton-root': {
            color: '#ffffff',
        },
    }
    const predictFunc = async () => {
        const rowsSelectedData = allData.filter((eachInvoice) =>
            selectedRows.includes(eachInvoice.sl_no)
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
            style={{ height: '60px',backgroundColor:'#818589'}}
        >
           <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
            <Button
                className='util-btn'
                variant='text'
                onClick={predictFunc}
                
                sx={{
                    ...styles,
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline',
                    },
                }}
            >
                HOMEPAGE
            </Button>
            <Button
                className='util-btn'
                variant='text'
                onClick={openAddInvoiceModal}
                sx={{
                    ...styles,
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline',
                    },
                }}
            >
                ADD DATA
            </Button>
            <Button
                className='util-btn'
                variant='text'
                sx={{
                    ...styles,
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline',
                    },
                }}
                onClick={openAnalyticsViewModal}
            >
                ANALYTICS VIEW
            </Button>
            <div style={{ marginLeft: 'auto',display: 'flex', alignItems: 'center' }}>
                <TextField
                    label='Search Customer Order Id'
                    value={queryValue}
                    onChange={(e) => setQueryValue(e.target.value)}
                    size='small'
                    variant='filled'
                    className='w-100'
                    style={{ backgroundColor: '#fff', marginRight: '10px' ,borderRadius: '10px',}}
                    InputProps={{
                        disableUnderline: true,
                    }}
                />
                <Button
                    className='util-btn rounded'
                    variant='filled'
                    onClick={openAdvancedSearchModal}
                    sx={{
                    ...styles,
                    backgroundColor: '#00ff00',
                    }}
                >
                    ADVANCED SEARCH
                </Button>
            </div>
            </div>

        </Row>
    )
}

export default UtilBar
