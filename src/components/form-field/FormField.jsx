import React from 'react'
import "./FormField.scss"

const FormField = ({label, inputOptions}) => {
    return (
        <div className='group'>
            <input className='form-input' {...inputOptions} />
            <label 
                className='form-input-label'
                // since the shrink mixin will be applied when form input is in focus
                // there is no need to check for whether some value exists to apply that class
                // className={`form-input-label ${inputOptions.value.length && 'shrink'}`}
                htmlFor={inputOptions.name}>
                {label}
            </label>
        </div>
  )
}

export default FormField