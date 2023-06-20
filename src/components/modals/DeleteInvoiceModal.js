import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import React from 'react'
import API from '../../utils/api'

const DeleteInvoiceModal = ({
    isOpen,
    handleClose,
    selectedRows,
    changeAllData,
}) => {
    const deleteRows = async () => {
        for (const eachRow of selectedRows) {
            const { data, status } = await API(
                `/Delete?sl_no=${eachRow}`,
                { body: {} },
                'DELETE'
            )
            if (status === 200) {
                changeAllData((cur) =>
                    cur.filter((eachInvoice) => eachInvoice.sl_no !== eachRow)
                )
            } else {
                console.log('ERROR : : : :', data)
            }
        }

        handleClose()
    }

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            maxWidth={'xs'}
            fullWidth
            PaperProps={{ style: { backgroundColor: '#ffffff' } }}
        >
            <DialogTitle>Delete Records ?</DialogTitle>
            <DialogContent>
                <div style={{ color: '#fff' }}>
                    Are you sure to delete these record[s] ?
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='outlined'
                    className='w-50'
                    onClick={deleteRows}
                    sx={{
                        '&.MuiButton-root': {
                            color: '#818589',
                        },
                        '&.MuiButton-outlined': {
                            borderColor: '#818589',
                        },
                    }}
                >
                    CANCEL
                </Button>
                <Button
                    variant='outlined'
                    className='w-50'
                    onClick={() => {
                        handleClose()
                    }}
                    sx={{
                        '&.MuiButton-root': {
                            color: '#818589',
                        },
                        '&.MuiButton-outlined': {
                            borderColor: '#818589',
                        },
                    }}
                >
                    DELETE
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteInvoiceModal
