import { InputHTMLAttributes, ReactNode } from 'react';
import './style.scss'

interface FormInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
}

const FormInput = (props: FormInput) => {

  const {label, ...rest} = props;

  return  <div className="group">
            <label className={`form-input-label ${rest.value && 'shrink'}`}>{label}</label>
            <input className='form-input' {...rest} />
          </div>
}

export default FormInput
