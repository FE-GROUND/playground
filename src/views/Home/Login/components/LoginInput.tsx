import {FC} from 'react';
import InputComponent from '@/views/common/Input';
import {InputPropsType} from '@/views/common/Input/useInput';

type LoginInputType = 'email' | 'password';
interface LoginInputProps {
  inputProps: InputPropsType;
  type: LoginInputType;
}

const LoginInput: FC<LoginInputProps> = ({type, inputProps}) => {
  return (
    <>
      <InputComponent type={type} name={`login-${type}`} inputProps={inputProps} />
    </>
  );
};

export default LoginInput;
