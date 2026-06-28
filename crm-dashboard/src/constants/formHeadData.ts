import { FormSection } from '@/types';
import { localResources, ProviderApplicationForm, supplierRegistration } from '../config/configArr';
type FormInfo = {
	key?: string | undefined;
	title: string;
	subHeading: string;
	configArr: FormSection[];
	finalCheckBox?: {
		label: string;
		required: boolean;
		type: string;
		name: string;
	};
};
export const formKeyMap: Record<string, keyof typeof formInfo> = {
	'care-manager': 'careManger',
	'local-resources-verification': 'localResources',
	'supplier-registration': 'DME-Supplier',
	'set-password': 'setPassword',
	'choose-plan': 'choosePlan',
	payments: 'payments',
	'payment-complete': 'paymentComplete',
	approach: 'approach',
	'provider-application': 'providerApplication',
	'invite-user': 'inviteUser',
	'employee-registration': 'employeeRegistration',
	'set-up-account': 'setUpAccount',
};
export const formInfo: Record<string, FormInfo> = {
	careManger: {
		key: 'careManger',
		title:
			'RN Advocate, Clinical Social Worker, Care Manager or Allied Health Professional Application',
		subHeading: 'Fill out the form below.',
		configArr: [],
	},
	setPassword: {
		title: 'Account Set Up',
		subHeading: '',
		configArr: [],
	},
	choosePlan: {
		title: 'It’s time to set up your account!',
		subHeading: '',
		configArr: [],
	},
	payments: {
		title: 'Payment Options',
		subHeading: '',
		configArr: [],
	},
	paymentComplete: {
		title: 'Payment Complete',
		subHeading: '',
		configArr: [],
	},
	approach: {
		title: 'Referral Response Time & Eligibility Criteria',
		subHeading: '',
		configArr: [],
	},
	inviteUser: {
		title: 'Invite Users & Patients',
		subHeading: '',
		configArr: [],
	},
	localResources: {
		key: 'LOCAL_RESOURCES',
		title: 'Free Local Resource Listing Application',
		subHeading: 'Fill out the form below.',
		configArr: localResources,
	},
	'DME-Supplier': {
		key: 'SUPPLIER_REGISTRATION',
		title: 'Supplier Registration Form',
		subHeading: 'Fill out the form below.',
		configArr: supplierRegistration,
	},
	providerApplication: {
		key: 'PROVIDER_APPLICATION',
		title: 'Provider/Clinic Application',
		subHeading: 'Fill out the form below.',
		configArr: ProviderApplicationForm,
	},
	employeeRegistration: {
		key: 'EMPLOYEE_REGISTRATION',
		title: 'Let’s set up your account!',
		subHeading: '',
		configArr: [],
	},
	setUpAccount: {
		key: 'SET_UP_ACCOUNT',
		title: 'Let’s set up your account!',
		subHeading: '',
		configArr: [],
	},
};
