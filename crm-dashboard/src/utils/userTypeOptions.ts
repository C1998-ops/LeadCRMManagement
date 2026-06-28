import { getUserTypeDisplay } from './userTypeAbbreviations';

export interface UserTypeOption {
	value: string;
	label: string;
}

export const getUserTypeOptions = (userType: string): UserTypeOption[] => {
	switch (userType) {
		case 'care_manager':
		case 'provider':
			return [
				{ value: '', label: 'Choose User Type' },
				{ value: 'CHW', label: getUserTypeDisplay('CHW') },
				{ value: 'LMSW', label: getUserTypeDisplay('LMSW') },
				{ value: 'LCSW', label: getUserTypeDisplay('LCSW') },
				{ value: 'LVN', label: getUserTypeDisplay('LVN') },
				{ value: 'RN', label: getUserTypeDisplay('RN') },
				{ value: 'NP', label: getUserTypeDisplay('NP') },
				{ value: 'DO', label: getUserTypeDisplay('DO') },
				{ value: 'MD', label: getUserTypeDisplay('MD') },
				{ value: 'care_manager', label: 'Care Manager' },
				{ value: 'field_agent', label: 'Field Agent' },
				{ value: 'manager', label: 'Manager' },
				{ value: 'sales_representative', label: 'Sales Representative' },
				{ value: 'technician', label: 'Technician' },
			];
		case 'local_resource':
			return [
				{ value: '', label: 'Choose User Type' },
				{ value: 'field_agent', label: 'Field Agent' },
				{ value: 'care_giver', label: 'Care Giver' },
				{ value: 'scheduler', label: 'Scheduler' },
				{ value: 'manager', label: 'Manager' },
			];
		case 'supplier':
			return [
				{ value: '', label: 'Choose User Type' },
				{ value: 'sales_representative', label: 'Sales Representative' },
				{ value: 'delivery_agent', label: 'Delivery Agent' },
				{ value: 'manager', label: 'Manager' },
			];
		default:
			return [
				{ value: '', label: 'Choose User Type' },
				{ value: 'CHW', label: getUserTypeDisplay('CHW') },
				{ value: 'LMSW', label: getUserTypeDisplay('LMSW') },
				{ value: 'LCSW', label: getUserTypeDisplay('LCSW') },
				{ value: 'LVN', label: getUserTypeDisplay('LVN') },
				{ value: 'RN', label: getUserTypeDisplay('RN') },
				{ value: 'NP', label: getUserTypeDisplay('NP') },
				{ value: 'DO', label: getUserTypeDisplay('DO') },
				{ value: 'MD', label: getUserTypeDisplay('MD') },
				{ value: 'care_manager', label: 'Care Manager' },
				{ value: 'field_agent', label: 'Field Agent' },
				{ value: 'manager', label: 'Manager' },
				{ value: 'sales_representative', label: 'Sales Representative' },
				{ value: 'technician', label: 'Technician' },
				{ value: 'sales_representative', label: 'Sales Representative' },
				{ value: 'delivery_agent', label: 'Delivery Agent' },
				{ value: 'care_giver', label: 'Care Giver' },
				{ value: 'scheduler', label: 'Scheduler' },
			];
	}
};
