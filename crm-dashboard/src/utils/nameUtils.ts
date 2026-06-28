/**
 * Utility functions for name parsing and validation
 */

import { regexHelper } from '@/constants/regexConstants';

export interface NameParseResult {
	firstName: string;
	lastName: string;
	isValid: boolean;
	error?: string;
}

export interface NameValidationResult {
	isValid: boolean;
	error?: string;
}

/**
 * Parses a full name string into first and last name components
 * @param fullName - The full name string to parse
 * @returns NameParseResult with parsed names and validation status
 */
export const parseFullName = (fullName: string): NameParseResult => {
	// Remove extra spaces and trim
	const cleanedName = fullName.replace(/\s+/g, ' ').trim();

	// Handle empty input
	if (!cleanedName) {
		return { firstName: '', lastName: '', isValid: false, error: 'Name is required' };
	}

	// Split by spaces
	const nameParts = cleanedName.split(' ');

	// Handle single word (first name only)
	if (nameParts.length === 1) {
		const firstName = nameParts[0];
		// Validate first name
		if (firstName.length < 2) {
			return {
				firstName,
				lastName: '',
				isValid: false,
				error: 'First name must be at least 2 characters',
			};
		}
		if (!/^[a-zA-Z\s\-']+$/.test(firstName)) {
			return {
				firstName,
				lastName: '',
				isValid: false,
				error: 'First name contains invalid characters',
			};
		}
		return { firstName, lastName: '', isValid: true };
	}

	// Handle multiple words
	const firstName = nameParts[0];
	const lastName = nameParts.slice(1).join(' ');

	// Validate first name
	if (firstName.length < 2) {
		return {
			firstName,
			lastName,
			isValid: false,
			error: 'First name must be at least 2 characters',
		};
	}
	if (!/^[a-zA-Z\s\-']+$/.test(firstName)) {
		return { firstName, lastName, isValid: false, error: 'First name contains invalid characters' };
	}

	// Validate last name
	if (lastName.length < 2) {
		return {
			firstName,
			lastName,
			isValid: false,
			error: 'Last name must be at least 2 characters',
		};
	}
	if (!/^[a-zA-Z\s\-']+$/.test(lastName)) {
		return { firstName, lastName, isValid: false, error: 'Last name contains invalid characters' };
	}

	// Check for excessive length
	if (firstName.length > 50) {
		return {
			firstName,
			lastName,
			isValid: false,
			error: 'First name is too long (max 50 characters)',
		};
	}
	if (lastName.length > 50) {
		return {
			firstName,
			lastName,
			isValid: false,
			error: 'Last name is too long (max 50 characters)',
		};
	}

	return { firstName, lastName, isValid: true };
};

/**
 * Validates a name combination (first and last name)
 * @param firstName - The first name
 * @param lastName - The last name
 * @returns NameValidationResult with validation status
 */
export const validateName = (firstName: string, lastName: string): NameValidationResult => {
	const fullName = `${firstName} ${lastName}`.trim();

	if (!fullName) {
		return { isValid: false, error: 'Name is required' };
	}

	const cleanedName = fullName.replace(/\s+/g, ' ').trim();
	const nameParts = cleanedName.split(' ');

	// Handle single word (first name only)
	if (nameParts.length === 1) {
		const firstName = nameParts[0];
		if (firstName.length < 2) {
			return { isValid: false, error: 'First name must be at least 2 characters' };
		}
		if (!/^[a-zA-Z\s\-']+$/.test(firstName)) {
			return { isValid: false, error: 'First name contains invalid characters' };
		}
		return { isValid: true };
	}

	// Handle multiple words
	const firstNamePart = nameParts[0];
	const lastNamePart = nameParts.slice(1).join(' ');

	// Validate first name
	if (firstNamePart.length < 2) {
		return { isValid: false, error: 'First name must be at least 2 characters' };
	}
	if (!/^[a-zA-Z\s\-']+$/.test(firstNamePart)) {
		return { isValid: false, error: 'First name contains invalid characters' };
	}

	// Validate last name
	if (lastNamePart.length < 2) {
		return { isValid: false, error: 'Last name must be at least 2 characters' };
	}
	if (!/^[a-zA-Z\s\-']+$/.test(lastNamePart)) {
		return { isValid: false, error: 'Last name contains invalid characters' };
	}

	// Check for excessive length
	if (firstNamePart.length > 50) {
		return { isValid: false, error: 'First name is too long (max 50 characters)' };
	}
	if (lastNamePart.length > 50) {
		return { isValid: false, error: 'Last name is too long (max 50 characters)' };
	}

	return { isValid: true };
};

/**
 * Formats a full name for display
 * @param firstName - The first name
 * @param lastName - The last name
 * @returns Formatted full name string
 */
export const formatFullName = (firstName: string, lastName: string): string => {
	const trimmedFirstName = firstName.trim();
	const trimmedLastName = lastName.trim();

	if (!trimmedFirstName && !trimmedLastName) {
		return '';
	}

	if (!trimmedLastName) {
		return trimmedFirstName;
	}

	return `${trimmedFirstName} ${trimmedLastName}`;
};

/**
 * Validates email format
 * @param email - The email to validate
 * @returns Validation result
 */
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
	if (!email.trim()) {
		return { isValid: false, error: 'Email is required' };
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return { isValid: false, error: 'Please enter a valid email address' };
	}

	if (email.length > 100) {
		return { isValid: false, error: 'Email is too long (max 100 characters)' };
	}

	return { isValid: true };
};

/**
 * Validates phone number format
 * @param phoneNumber - The phone number to validate
 * @returns Validation result
 */
export const validatePhoneNumber = (phoneNumber: string): { isValid: boolean; error?: string } => {
	if (!phoneNumber.trim()) {
		return { isValid: false, error: 'Phone number is required' };
	}

	// Test against the exact format first (with dashes)
	const phoneRegex = regexHelper('Phone') as RegExp;
	if (phoneRegex.test(phoneNumber.trim())) {
		return { isValid: true };
	}

	// If that fails, try cleaning and testing against digits only
	const cleanedPhone = phoneNumber.replace(/[\s\-\(\)]/g, '');
	const digitsOnlyRegex = /^\d{10}$/;

	if (digitsOnlyRegex.test(cleanedPhone)) {
		return { isValid: true };
	}

	return { isValid: false, error: 'Please enter a valid phone number (xxx) xxx-xxxx' };
};

export function getInitials(username?: string) {
	if (!username) return 'N/A';
	const parts = username.split(' ');
	if (parts.length === 1) return parts[0][0];
	return parts[0][0] + parts[1][0];
}

/**
 * build,format and send url path with params
 * @param urlPath - The url path
 * @param params - The params {key: value}
 * @param queryParams - The query params {key: value}
 * @returns The formatted url path
 */
export const replacePathParams = (
	urlPath: string,
	params?: Record<string, string | number>,
	queryParams?: Record<string, string | number | undefined>
): string => {
	let url = urlPath;

	// 🧩 Replace :path parameters
	if (params && Object.keys(params).length > 0) {
		url = Object.entries(params).reduce((acc, [key, value]) => {
			const placeholder = `:${key}`;
			return acc.replace(placeholder, encodeURIComponent(String(value)));
		}, urlPath);
	}

	// 🧩 Append query parameters (if provided)
	if (queryParams && Object.keys(queryParams).length > 0) {
		const queryString = Object.entries(queryParams)
			.filter(([_, val]) => val !== undefined && val !== null)
			.map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`)
			.join('&');

		if (queryString) {
			url += url.includes('?') ? `&${queryString}` : `?${queryString}`;
		}
	}

	return url;
};

/**normailize status string */
export const normalizeStatusString = (status: string): string => {
	if (!status) return '';
	const cleaned = status.replace(/[_-]/g, ' ');
	return cleaned
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};
