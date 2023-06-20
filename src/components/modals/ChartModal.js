import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
    CircularProgress,
} from '@mui/material'
import API from '../../utils/api'
import { Pie, Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    ArcElement,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
}

const ChartModal = ({ isOpen, handleClose, viewQuery }) => {
    console.log('View Query : ', viewQuery)

    const [loading, setLoading] = useState(false)
    const [viewData, setViewData] = useState([])
    const [curDet, setCurDet] = useState({ USD: 0, CAD: 0 })
    const [busName, setBusName] = useState([])
    const [custNum, setCustNum] = useState([])
    const [toAm, setToAm] = useState([])

    useEffect(() => {
        console.log('VIEW DATA', viewData)
    }, [viewQuery, viewData])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const { data, status } = await API(`/Read?${viewQuery}`)
            if (status !== 200) {
                console.log('Error')
                return null
            } else {
                return data
            }
        }
        fetchData().then((data) => {
            setViewData(data)

            const usdData = data.filter(
                (eachInvoice) => eachInvoice.order_currency === 'USD'
            )
            const eurData = data.filter(
                (eachInvoice) => eachInvoice.order_currency === 'EUR'
            )

            setCurDet(() => {
                return { USD: usdData.length, EUR: eurData.length }
            })

            console.log(`USD : ${usdData.length}, EUR : ${eurData.length}`)
            const groups = data.reduce((groups, item) => {
                const group = groups[item.customer_order_id] || []
                group.push(item)
                groups[item.customer_order_id] = group
                return groups
            }, {})
            console.log(groups)
            let order_det = {}
            const keys = Object.keys(groups)
            console.log(keys)
            for (let eachKey of keys) {
                let sum = 0
                groups[eachKey].forEach((each) => {
                    sum += Number(each.order_amount)
                })
                order_det[eachKey] = {
                    custNumbers: groups[eachKey].length,
                    totalAmount: sum,
                }
            }
            console.log(order_det)

            const order_name = Object.keys(groups)

            let custNumbers = []
            let orderAmount = []

            for (let eachKey of keys) {
                custNumbers.push(order_det[eachKey].custNumbers)
                orderAmount.push(order_det[eachKey].orderAmount)
            }

            console.log(order_name, custNumbers, orderAmount)

            setBusName(order_name)
            setCustNum(custNumbers)
            setToAm(orderAmount)
        })
        setLoading(false)
    }, [viewQuery])

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                maxWidth={'lg'}
                fullWidth
                PaperProps={{
                    style: {
                        backgroundColor: '#fff',
                    },
                }}
            >
                <DialogTitle>Analytics View</DialogTitle>
                <DialogContent>
                    {loading ? (
                        <CircularProgress color='secondary' />
                    ) : (
                        <div className='d-flex flex-column align-items-center'>
                            <div style={{ width: '70%' }} className='mb-5'>
                                <Bar
                                    options={options}
                                    data={{
                                        labels: busName,
                                        datasets: [
                                            {
                                                label: 'No.of customers',
                                                data: custNum,
                                                backgroundColor:
                                                    'rgba(255, 99, 132, 0.5)',
                                            },
                                            {
                                                label: 'Total Open Amount',
                                                data: toAm,
                                                backgroundColor:
                                                    'rgba(53, 162, 235, 0.5)',
                                            },
                                        ],
                                    }}
                                />
                            </div>
                            <div style={{ width: '30%' }}>
                                <Pie
                                    options={{
                                        plugins: {
                                            title: {
                                                text: 'Pie Chart for Currencies',
                                                display: true,
                                            },
                                        },
                                    }}
                                    data={{
                                        labels: ['USD', 'EUR'],
                                        datasets: [
                                            {
                                                label: 'Pie Chart for Currencies',
                                                data: [curDet.USD, curDet.EUR],
                                                backgroundColor: [
                                                    'rgba(255, 99, 132, 0.2)',
                                                    'rgba(54, 162, 235, 0.2)',
                                                ],
                                            },
                                        ],
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='outlined'
                        className='w-100'
                        onClick={() => {
                            handleClose()
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ChartModal
