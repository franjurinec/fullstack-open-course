import patientData from '../data/patients.json';
import { Patient } from '../types';

const patients: Patient[] = patientData;

const getNonSensitiveEntries = (): Omit<Patient, 'ssn'>[] => {
  return patients;
};

const addDiagnose = () => {
  return null;
};

export default {
  getNonSensitiveEntries,
  addDiagnose
};