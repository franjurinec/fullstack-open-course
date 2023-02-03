import patientData from '../../data/patients';
import { NewPatient, Patient, PublicPatient } from '../types';
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

export default {
  getPublicPatients,
  getPatientDetails,
  addPatient
};