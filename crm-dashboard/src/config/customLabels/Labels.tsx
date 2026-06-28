// labels.tsx
export const dmeRentalLabel = (
	<span className="text-sm">
		<strong className="font-bold">DME Rentals:</strong> Provide information for patients on rental
		process.
	</span>
);
export const dmeRentalPurchaseLabel = (
	<span className="text-sm">
		<strong className="font-bold">DME Purchases:</strong> Provide information for patients on
		purchase process
	</span>
);
export const virtualServicesLabel = (
	<div className="flex items-start flex-col gap-1">
		<hr className="border-t border-gray-300 w-auto min-w-full" />
		<h3 className="text-subheading-5 text-secondary-gold py-2" style={{ fontSize: '1rem' }}>
			Virtual Services
		</h3>
		<p className="text-body-bold font-medium">
			Please add the fixed rate OR the price range for each service
		</p>
	</div>
);
export const professionalLicenseLabel = (
	<div className="flex w-full">
		<h3 className="heading-4 text-primary-navy text-base sm:text-lg md:text-xl font-semibold tracking-tight">
			Professional License
		</h3>
	</div>
);
export const providerPrimaryEmailAddressLabel = (
	<div className="flex w-full flex-col">
		<label className={`inline-block font-medium align-middle form-label text-xs sm:text-primary-medium`}>
			Primary Email Address
			<span className="text-sm text-neutral-dark font-medium">*</span>
		</label>
		<span className="text-sm text-gray-500">
			We will use this email to create a centralized account to manage all your practices
		</span>
	</div>
);
export const termsAndConditionsLabel = (
	<span className="text-sm sm:text-primary-medium text-neutral-dark-grey font-secondary font-medium">
		I agree that the information I provided is true and correct. I agree that I will keep our
		practice detail up to current.
	</span>
);

export const CustomRegularBussinessHrs = (
	<div className="flex items-start flex-col gap-2 md:pt-4 w-full min-w-full">
		<label className="text-sm sm:text-base font-primary font-medium">
			Regular Business Hours{' '}
			{/* <small className="text-xs text-gray-500 font-secondary font-medium">
				(Please enter the business hours in 24 hrs format.)
			</small> */}
		</label>
	</div>
);
