import { regexHelper } from "@/constants/regexConstants";
import { ValidationRule } from "@/types";

export interface AccountConfig {
	type: string;
	name: string;
	label: string;
	placeholder: string;
	value: string;
	required: boolean;
	validation?: ValidationRule
}

const AccountConfig: AccountConfig[] = [
	{
		type: 'text',
		name: 'firstName',
		label: 'Name',
		placeholder: 'Enter your full name',
		value: '',
		required: true,
	},
	{
		type: 'text',
		name: 'email',
		label: 'Email',
		placeholder: 'Enter your email',
		value: '',
		required: true,
	},
	{
		type: 'text',
		name: 'phoneNumber',
		label: 'Phone Number',
		placeholder: 'Enter your phone',
		value: '',
		required: true,
		validation:
		{
			pattern: {
				value: regexHelper('Phone'),
				message: 'Please enter a valid phone number',
			},
		},
	},
	{
		type: 'text',
		name: 'password',
		label: 'Password',
		placeholder: 'Enter your password',
		value: '',
		required: true,
	},
];
export { AccountConfig };
