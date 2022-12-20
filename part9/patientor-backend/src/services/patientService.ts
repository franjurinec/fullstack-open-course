import patientData from '../../data/patients.json';
import { NewPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData as Patient[]; 

const getNonSensitiveEntries = (): Omit<Patient, 'ssn'>[] => {
  return patients;
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
  getNonSensitiveEntries,
  addPatient
};