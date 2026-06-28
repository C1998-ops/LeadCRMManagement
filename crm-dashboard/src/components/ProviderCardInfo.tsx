import { useUserProfile } from '@/hooks/queries/useUserProfile';
import { useEffect, useState } from 'react';

interface ProviderInfoCardProps {
	provider?: {
		organizationName?: string;
		facilityType?: string;
		accountType?: string;
	};
}

const ProviderInfoCard: React.FC<ProviderInfoCardProps> = ({
	provider = {
		organizationName: '',
		facilityType: '',
		accountType: '',
	},
}) => {
	const [facilityName, setFacilityName] = useState('');
	const [subfacilityName, setSubfacilityName] = useState('');
	const [accountType, setAccountType] = useState('');
	const { data: userProfile, isLoading } = useUserProfile();

	useEffect(() => {
		const organisationName = provider?.organizationName || userProfile?.profile?.organizationName || '';
		const accountType =
			provider?.accountType || userProfile?.isPaid
				? 'Paid Listing · Claimed'
				: 'Free Listing · Claimed';
		setFacilityName(organisationName?.charAt(0).toUpperCase() + organisationName?.slice(1) || '');
		setSubfacilityName('Care Facility');
		setAccountType(accountType);
	}, [provider, userProfile]);

	return (
		<div className="flex py-4 mb-2 w-full md:max-w-[400px] whitespace-nowrap">
			<div className="flex flex-col gap-y-1 flex-wrap items-start justify-center text-left font-primary transition duration-150 ease-in-out space-x-0 space-y-1">
				<h3 className="text-primary-navy heading-3 font-semibold truncate">{facilityName}</h3>
				<h6 className="text-secondary-purple font-semibold text-xl">{subfacilityName}</h6>
				<p className="text-sm font-medium text-neutral-dark-grey">
					<strong className="font-bold mr-2">Account Type:</strong>
					{accountType}
				</p>
			</div>
		</div>
	);
};

export default ProviderInfoCard;
