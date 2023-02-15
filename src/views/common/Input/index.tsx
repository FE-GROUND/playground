import {FC, HTMLInputTypeAttribute} from 'react';
import {InputPropsType} from './useInput';

export interface InputComponentProps {
  type?: HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  className?: string;
  inputProps: InputPropsType;
}

const InputComponent: FC<InputComponentProps> = ({type = 'text', name, className, inputProps, placeholder}) => {
  const {onChange, onBlur, onFocus, value} = inputProps;

  return (
    <div className={className}>
      <label htmlFor={name}>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </label>
    </div>
  );
};

export default InputComponent;
