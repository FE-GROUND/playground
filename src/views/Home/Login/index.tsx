import {FC} from 'react';
import {useInput} from '@/views/common/Input/useInput';
import LoginInput from './components/LoginInput';

export const LoginScreen: FC = () => {
  const emailInputProps = useInput();
  const passwordInputProps = useInput();

  return (
    <div>
      <LoginInput
        inputProps={emailInputProps}
        type={'email'}
        name={'login-email-input'}
        placeholder={'abcd@email.efg'}
      />
      <LoginInput
        inputProps={passwordInputProps}
        type={'password'}
        name={'login-password-input'}
        placeholder={'비밀번호를 입력해주세요'}
      />
      <button>로그인 버튼 추가</button>
      <button>회원가입 버튼 추가</button>
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
