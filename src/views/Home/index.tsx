import InputComponent from '@/views/common/Input';
import {useInput} from '../common/Input/useInput';

export const HomeScreen = () => {
	const testInput = useInput();

	return (
		<div>
			<InputComponent name={'headless-input'} inputProps={testInput} />
		</div>
	);
};
