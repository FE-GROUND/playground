import {FC, HTMLInputTypeAttribute} from 'react';
import {InputPropsType} from './useInput';

interface InputComponentProps {
	type?: HTMLInputTypeAttribute;
	name: string;
	className?: string;
	inputProps: InputPropsType;
}

const InputComponent: FC<InputComponentProps> = ({
	type = 'text',
	name,
	className,
	inputProps,
}) => {
	const {onChange, setFocusFlag, value} = inputProps;

	return (
		<div className={className}>
			<label htmlFor={name}>
				<input
					type={type}
					name={name}
					value={value}
					onChange={onChange}
					onFocus={() => setFocusFlag(true)}
					onBlur={() => setFocusFlag(false)}
				/>
			</label>
		</div>
	);
};

export default InputComponent;
