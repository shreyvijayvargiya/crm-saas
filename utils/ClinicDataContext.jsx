import React, { createContext, useContext, useMemo, useState } from "react";
import {
	DOCTORS,
	DRUG_CATALOG,
	INITIAL_APPOINTMENTS,
	INITIAL_FOLLOW_UPS,
	INITIAL_PATIENTS,
	INITIAL_PAYMENTS,
	INITIAL_PRESCRIPTIONS,
} from "../app/Clinic/clinicSeedData";

const ClinicDataContext = createContext(null);

export function ClinicDataProvider({ children }) {
	const [patients, setPatients] = useState(INITIAL_PATIENTS);
	const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
	const [prescriptions, setPrescriptions] = useState(INITIAL_PRESCRIPTIONS);
	const [payments, setPayments] = useState(INITIAL_PAYMENTS);
	const [followUps, setFollowUps] = useState(INITIAL_FOLLOW_UPS);

	const value = useMemo(
		() => ({
			doctors: DOCTORS,
			drugs: DRUG_CATALOG,
			patients,
			setPatients,
			appointments,
			setAppointments,
			prescriptions,
			setPrescriptions,
			payments,
			setPayments,
			followUps,
			setFollowUps,
		}),
		[patients, appointments, prescriptions, payments, followUps]
	);

	return (
		<ClinicDataContext.Provider value={value}>{children}</ClinicDataContext.Provider>
	);
}

export function useClinicData() {
	const ctx = useContext(ClinicDataContext);
	if (!ctx) {
		throw new Error("useClinicData must be used within ClinicDataProvider");
	}
	return ctx;
}
