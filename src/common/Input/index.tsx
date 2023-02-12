import {FC, HTMLInputTypeAttribute} from 'react';
import {useInput} from './useInput';

interface InputComponentProps {
	type?: HTMLInputTypeAttribute;
	name: string;
	className?: string;
	maxLength?: number;
}

const InputComponent: FC<InputComponentProps> = ({
	type = 'text',
	name,
	className,
	maxLength,
}) => {
	const {value, setFocusFlag, onChange} = useInput();

	return (
		<div className={className}>
			<label htmlFor={name}>
				<input
					type={type}
					name={name}
					value={value}
					maxLength={maxLength}
					onChange={onChange}
					onFocus={() => setFocusFlag(true)}
					onBlur={() => setFocusFlag(false)}
				/>
			</label>
		</div>
	);
};

export default InputComponent;
