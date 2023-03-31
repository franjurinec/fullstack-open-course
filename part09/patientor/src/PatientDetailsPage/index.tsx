import { Box, Button, List, ListItemText, Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { addPatient, useStateValue } from "../state";
import { Entry, Patient } from "../types";
import { assertNever } from "../utils";
import { apiBaseUrl } from "../constants";
import { green, grey, orange, red, yellow } from "@material-ui/core/colors";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients, diagnoses }, dispatch] = useStateValue();

    const getDiagnosisText = (code: string): string => {
        const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
        return diagnosis ? diagnosis.name : 'Unknown';
    };

    const patient = id ? patients[id] : undefined;

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        if (!id) return;
        try {
            const { data: newPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entry`,
                values
            );
            dispatch(addPatient(newPatient));
            closeModal();
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error(e?.response?.data || "Unrecognized axios error");
                setError(String(e?.response?.data?.error) || "Unrecognized axios error");
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };


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

    const EntrySpecificFields = ({ entry }: { entry: Entry }) => {
        switch (entry.type) {
            case "Hospital":
                return (
                    <>
                        <Typography align="left" variant="subtitle1">
                            <b>Discharged on:</b> {entry.discharge.date}
                        </Typography>
                        <Typography align="left" variant="subtitle1">
                            <b>Discharge criteria:</b> {entry.discharge.criteria}
                        </Typography>
                    </>
                );
            case "HealthCheck":
                const healthMapping = {
                    0: { color: green[700], text: "Good health condition." },
                    1: { color: yellow[800], text: "Low risk health issue." },
                    2: { color: orange[700], text: "High risk health issue." },
                    3: { color: red[700], text: "Critical health condition." }
                };

                return (
                    <Typography style={{ color: healthMapping[entry.healthCheckRating].color }} align="left" variant="subtitle1">
                        <b>{healthMapping[entry.healthCheckRating].text}</b>
                    </Typography>
                );
            case "OccupationalHealthcare":
                return (
                    <>
                        <Typography align="left" variant="subtitle1">
                            <b>Employer:</b> {entry.employerName}
                        </Typography>
                        {entry.sickLeave &&
                            <Typography align="left" variant="subtitle1">
                                <b>Sick leave:</b> {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
                            </Typography>
                        }
                    </>
                );
            default:
                return assertNever(entry);
        }
    };



    return (
        <Box p={2} mt={4} bgcolor={grey[50]} borderRadius={'8px'}>
            <Typography align="left" variant="h4" style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
                {patient.name}
            </Typography>
            {patient.ssn && <Typography align="left" variant="subtitle1">
                <b>SSN:</b> {patient.ssn}
            </Typography>}
            <Typography align="left" variant="subtitle1">
                <b>Gender:</b> {patient.gender.toUpperCase()}
            </Typography>
            {patient.dateOfBirth && <Typography align="left" variant="subtitle1">
                <b>Date of birth:</b> {patient.dateOfBirth}
            </Typography>}
            <Typography align="left" variant="subtitle1">
                <b>Occupation:</b> {patient.occupation}
            </Typography>
            {(patient.entries && patient.entries.length > 0) &&
                <>
                    <Typography align="left" variant="h5" style={{ marginTop: "0.5em" }}>
                        Entries
                    </Typography>
                    {patient.entries.map(entry => (
                        <Box key={entry.id} my={2} p={1} borderRadius={'8px'} bgcolor={grey[200]}>
                            <Typography align="left" variant="subtitle1">
                                <b>Date:</b> {entry.date}
                            </Typography>
                            <Typography align="left" variant="subtitle1">
                                <b>Description:</b> {entry.description}
                            </Typography>
                            <EntrySpecificFields entry={entry} />
                            {(entry.diagnosisCodes && entry.diagnosisCodes.length > 0) &&
                                <>
                                    <Typography align="left" variant="subtitle1">
                                        <b>Diagnosis Codes:</b>
                                    </Typography>
                                    <List>
                                        {entry.diagnosisCodes.map(code => (<ListItemText inset key={code}>{`${code} - ${getDiagnosisText(code)}`}</ListItemText>))}
                                    </List>
                                </>
                            }
                            <Typography align="left" variant="subtitle1">
                                <i>Diagnosis by {entry.specialist}</i>
                            </Typography>
                        </Box>
                    ))}
                </>
            }

            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>

        </Box>
    );
};

export default PatientDetailsPage;