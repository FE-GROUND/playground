import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useCallback,
	useMemo,
	useState,
} from 'react';

/**
 * 공통으로 사용되는 Input 컴포넌트의 기본 프롭스 전달
 *
 * @returns {value, focusFlag, onFocus, onBlur, onChange}
 */

export interface InputPropsType {
	value: string;
	focusFlag: boolean;
	onFocus: () => void;
	onBlur: () => void;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const useInput = (): InputPropsType => {
	const [value, setValue] = useState<string>('');
	const [focusFlag, setFocusFlag] = useState<boolean>(false);

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}, []);

	const inputProps: InputPropsType = useMemo(() => {
		return {
			value: value,
			focusFlag: focusFlag,
			onFocus: () => setFocusFlag(true),
			onBlur: () => setFocusFlag(false),
			onChange: handleChange,
		};
	}, [focusFlag, handleChange, value]);

	return inputProps;
};
