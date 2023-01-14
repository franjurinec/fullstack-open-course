import { Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { addPatient, useStateValue } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

const PatientDetailsPage = () => {
    const { id } = useParams<{id: string}>();
    const [{patients}, dispatch] = useStateValue();

    const patient = id ? patients[id] : undefined;

    React.useEffect(() => {
        const fetchPatientDetails = async () => {
            if (patient && !patient.ssn) {
                try {
                    const { data: patientWithDetails } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${patient.id}`
                    );
                    dispatch(addPatient(patientWithDetails));
                } catch (e) {
                    console.error(e);
                }
            }
        };

        void fetchPatientDetails();
    }, [patient, dispatch]);

    if (!patient) return (
        <Typography align="left" variant="h5" style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
            Patient not found.
        </Typography>
    );

    

    return (
        <>
            <Typography align="left" variant="h5" style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
                {patient.name}
            </Typography>
            {patient.ssn && <Typography align="left" variant="subtitle1">
                SSN: {patient.ssn}
            </Typography>}
            <Typography align="left" variant="subtitle1">
                Gender: {patient.gender.toUpperCase()}
            </Typography>
            {patient.dateOfBirth && <Typography align="left" variant="subtitle1">
                Date of birth: {patient.dateOfBirth}
            </Typography>}
            <Typography align="left" variant="subtitle1">
                Occupation: {patient.occupation}
            </Typography>
        </>
    );
};

export default PatientDetailsPage;