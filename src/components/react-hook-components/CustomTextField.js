import { TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

const CustomTextField = ({
    name,
    control,
    label,
    className,
    rules = {},
    defaultValue = '',
    variant = 'filled',
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            render={({
                field: { onChange, name, value },
                formState: { errors },
            }) => (
                <>
                    <TextField
                        className={className}
                        label={label}
                        variant={variant}
                        value={value}
                        onChange={onChange}
                        error={errors[name] ? true : false}
                        helperText={
                            errors && errors[name] && `${errors[name].message}`
                        }
                        style={{ backgroundColor: '#fff', borderRadius: '5px' }}
                    />
                </>
            )}
        />
    )
}

export default CustomTextField
