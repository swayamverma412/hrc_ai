import React from 'react'
import DateAdapter from '@mui/lab/AdapterDayjs'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { TextField } from '@mui/material'
import DatePicker from '@mui/lab/DatePicker'
import { Controller } from 'react-hook-form'

const CustomDatePicker = ({
    label,
    className,
    name,
    control,
    rules = {},
    defaultValue = null,
}) => {
    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Controller
                name={name}
                defaultValue={defaultValue}
                control={control}
                rules={rules}
                render={({
                    field: { onChange, name, value },
                    formState: { errors },
                }) => (
                    <>
                        <DatePicker
                            label={label}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className={className}
                                    variant='filled'
                                    error={errors[name] ? true : false}
                                    helperText={
                                        errors &&
                                        errors[name] &&
                                        `${errors[name].message}`
                                    }
                                    style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '5px',
                                    }}
                                />
                            )}
                            value={value || null}
                            onChange={(date) => {
                                onChange(date?.isValid ? date : '')
                            }}
                        />
                    </>
                )}
            />
        </LocalizationProvider>
    )
}

export default CustomDatePicker
