import './App.css'
import React, { useState, useEffect } from 'react'
import Topbar from './components/topbar/Topbar'
import UtilBar from './components/utilbar/UtilBar'
import Predict from './components/views/predict/Predict'
import AddInvoiceModal from './components/modals/AddInvoiceModal'
import DeleteInvoiceModal from './components/modals/DeleteInvoiceModal'
import EditInvoiceModal from './components/modals/EditInvoiceModal'
import AdvancedSearchModal from './components/modals/AdvancedSearchModal'
import API from './utils/api'
import Footer from './components/footer/Footer'
import AnalyticsModal from './components/modals/AnalyticsModal'
import ChartModal from './components/modals/ChartModal'
import InvoiceList from './components/topbar/InvoiceList'
import ButtonComponent from './components/views/predict/Button'
//import HomepageModal from './components/modals/HomePageModal'

function App() {
    //const [homepageModal,setHomepageModal]=useState(false)
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [advancedSearchModal, setAdvancedSearchModal] = useState(false)
    const [analyticsViewModal, setAnalyticsViewModal] = useState(false)
    
    const [allData, setAllData] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [query, setQuery] = useState('')

    const [viewQuery, setViewQuery] = useState('')
    const [chartViewModal, setChartViewModal] = useState(false)
    const [triggerData, setTriggerData] = useState(false)

    const toggleTrigger = () => {
        setTriggerData((cur) => !cur)
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data, status } = await API(`/Read`)
            if (status !== 200) {
                return null
            } else {
                return data
            }
        }
        fetchData().then((data) => setAllData(data))
    }, [query])
 

    useEffect(() => {
        console.log('SelectedRow', selectedRows)
    }, [selectedRows])

    useEffect(() => {
        const fetchData = async () => {
            const { data, status } = await API(`/Read`)
            if (status !== 200) {
                console.log('Error')
                return null
            } else {
                return data
            }
        }
        fetchData().then((data) => setAllData(data))
    }, [triggerData])

    return (
        <>
            <div className='App'>
                <Topbar />
                <InvoiceList/>
                <UtilBar
                    openAddInvoiceModal={() => setAddModal(true)}
                    openAdvancedSearchModal={() => setAdvancedSearchModal(true)}
                    openAnalyticsViewModal={() => setAnalyticsViewModal(true)}
                    allData={allData}
                    hitTrigger={toggleTrigger}
                    changeAllData={setAllData}
                    selectedRows={selectedRows}
                    changeQuery={setQuery}
                />
                <Predict
                    allData={allData}
                    changeAllData={setAllData}
                    changeSelectedRows={setSelectedRows}
                />
                <ButtonComponent
                    openEditInvoiceModal={() => setEditModal(true)}
                    openDeleteInvoiceModal={() => setDeleteModal(true)}
                    allData={allData}
                    hitTrigger={toggleTrigger}
                    changeAllData={setAllData}
                    selectedRows={selectedRows}
                    changeQuery={setQuery}
                />
                <Footer />
            </div>
            <AddInvoiceModal
                isOpen={addModal}
                handleClose={() => setAddModal(false)}
                changeAllData={setAllData}
            />
            <EditInvoiceModal
                isOpen={editModal}
                handleClose={() => setEditModal(false)}
                selectedRow={selectedRows[0]}
                changeAllData={setAllData}
                allData={allData}
            />
            <DeleteInvoiceModal
                isOpen={deleteModal}
                handleClose={() => setDeleteModal(false)}
                selectedRows={selectedRows}
                changeAllData={setAllData}
            />
            <AdvancedSearchModal
                isOpen={advancedSearchModal}
                handleClose={() => {
                    setAdvancedSearchModal(false)
                }}
                changeQuery={setQuery}
            />
            <AnalyticsModal
                isOpen={analyticsViewModal}
                handleClose={() => setAnalyticsViewModal(false)}
                changeQuery={setViewQuery}
                openChartViewModal={() => setChartViewModal(true)}
            />
            <ChartModal
                isOpen={chartViewModal}
                handleClose={() => setChartViewModal(false)}
                viewQuery={viewQuery}
            />
        </>
    )
}

export default App
