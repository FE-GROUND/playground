import {FC} from 'react';
import {useInput} from '@/views/common/Input/useInput';
import LoginInput from './components/LoginInput';

export const LoginScreen: FC = () => {
  const emailInputProps = useInput();
  const passwordInputProps = useInput();

  return (
    <div>
      <LoginInput inputProps={emailInputProps} type={'email'} />
      <LoginInput inputProps={passwordInputProps} type={'password'} />
    </div>
  );
};

/**
 * id 인풋
 * password 인풋
 * 로그인 버튼
 * 회원가입 버튼
 * 자동 로그인
 */
