import patientData from '../../data/patients';
import { Entry, NewEntry, NewPatient, Patient, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ ssn: _ssn, entries: _entries, ...publicProps }) => publicProps);
};

const getPatientDetails = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient: Patient = {
    id: uuid(),
    ...newPatient
  };

  patients.push(patient);

  return patient;
};

const addPatientEntry = (id: string, newEntry: NewEntry): Patient => {
  const patient = patients.find(patient => patient.id === id);
  const entry: Entry = {
    id: uuid(),
    ...newEntry
  };

  if (!patient)
    throw new Error("Invalid patient ID.");

  patient.entries.push(entry);

  return patient;
};

export default {
  getPublicPatients,
  getPatientDetails,
  addPatient,
  addPatientEntry
};