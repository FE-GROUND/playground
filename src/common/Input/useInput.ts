import {ChangeEvent, useCallback, useState} from 'react';

export const useInput = () => {
	const [value, setValue] = useState<string>();
	const [focusFlag, setFocusFlag] = useState<boolean>();

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}, []);

	return {value, focusFlag, setFocusFlag, onChange: handleChange};
};
