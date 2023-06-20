import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
//import Button from '@mui/material/Button';
import axios from 'axios';
import './Predict.css';

const Predict = ({ allData, changeAllData, changeSelectedRows }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/Read'); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
 const columns = [
        { field: 'sl_no', headerName: 'Sl no',width:100},
        { field: 'customer_order_id', headerName: 'Customer Order ID', width: 150 },
        { field: 'sales_org', headerName: 'Sales Org', width: 150 },
        { field: 'distribution_channel', headerName: 'Distribution Channel', width: 150 },
        { field: 'company_code', headerName: 'Company Code', width: 150},
        { field: 'order_creation_date', headerName: 'Order Creation Date', width: 150 },
        { field: 'order_amount', headerName: 'Order Amount', width: 150 },
        {
            field: 'order_currency',
            headerName: 'Order Currency',
            width: 150,
        },
        { field: 'customer_number', headerName: 'Customer Number', width: 150 },
]


  return (
    <div style={{ height: 400, width: '100%', fontWeight: 'bold', whiteSpace: 'normal', wordWrap: 'break-word'}}>
      <DataGrid
        columns={columns}
        rows={allData}
        checkboxSelection
        disableSelectionOnClick
        rowHeight={35}
        getRowId={(row) => row.sl_no}
        onSelectionModelChange={(sm) => changeSelectedRows(sm)}
        style={{ color: '#fff', border: '#fff' }}
        sx={{
            color: '#fff',
            '.MuiTablePagination-selectLabel': {
              color: '#fff',
            },
            '.MuiTablePagination-select': {
              color: '#fff',
            },
            '.MuiTablePagination-displayedRows': {
              color: '#fff',
            },
            '.MuiTablePagination-actions': {
              color: '#fff',
            },
            '.MuiTablePagination-selectIcon': {
              color: '#fff',
            },
            '.MuiCheckbox-root': {
              color: '#fff',
            },
            
          }}
        />
    </div>
  )
}

export default Predict
