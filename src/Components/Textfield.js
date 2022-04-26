import React from 'react'
import { ErrorMessage, useField } from 'formik';

function Textfield({ label, ...props }) {
        const [field, meta] = useField(props);
        return (
          <div>
            <label htmlFor={field.name}>{label}</label><br/>
            <input
              className={`R-input ${meta.touched && meta.error &&  'L-input2'}`}
              {...field} {...props}
            />
            <ErrorMessage component="div" name={field.name} className="error" />
          </div>
          
        )
}

export default Textfield