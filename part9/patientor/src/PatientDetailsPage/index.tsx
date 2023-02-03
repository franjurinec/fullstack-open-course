import { Box, List, ListItemText, Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { addPatient, useStateValue } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { grey } from "@material-ui/core/colors";

const PatientDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();

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

                            {(entry.diagnosisCodes && entry.diagnosisCodes.length > 0) &&
                                <>
                                    <Typography align="left" variant="subtitle1">
                                        <b>Diagnosis Codes:</b>
                                    </Typography>
                                    <List>
                                        {entry.diagnosisCodes.map(code => (<ListItemText inset key={code}>{code}</ListItemText>))}
                                    </List>
                                </>
                            }

                        </Box>
                    ))}
                </>
            }

        </Box>
    );
};

export default PatientDetailsPage;