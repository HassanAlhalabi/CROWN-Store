import { InputHTMLAttributes } from 'react';
import { FormGroup, FormInputLabel, Input } from './style';

interface FormInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
}

const FormInput = (props: FormInput) => {

  const {label, ...rest} = props;

  return  <FormGroup>
            <FormInputLabel shrink={rest?.value ? true : false}>{label}</FormInputLabel>
            <Input {...rest} />
          </FormGroup>
}

export default FormInput
