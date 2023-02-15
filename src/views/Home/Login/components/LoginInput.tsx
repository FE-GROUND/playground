import {FC} from 'react';
import InputComponent, {InputComponentProps} from '@/views/common/Input';

type LoginInputType = 'email' | 'password';
interface LoginInputProps extends InputComponentProps {
  type: LoginInputType;
}

const LoginInput: FC<LoginInputProps> = ({type, inputProps, placeholder}) => {
  return (
    <>
      <InputComponent type={type} name={`login-${type}`} placeholder={placeholder} inputProps={inputProps} />
    </>
  );
};

export default LoginInput;
