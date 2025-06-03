import { InputField } from './InputField';

export const FullNameFields = () => {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<InputField
				htmlFor="firstName"
				labelName="Имя"
				id="firstName"
				type="text"
				placeholder="Введите имя"
			/>

			<InputField
				htmlFor="lastName"
				labelName="Фамилия"
				id="lastName"
				type="text"
				placeholder="Введите фамилию"
			/>
		</div>
	);
};
