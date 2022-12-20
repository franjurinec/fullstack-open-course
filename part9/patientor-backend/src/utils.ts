import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).some((value: string) => value === gender);
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) 
        throw new Error('Incorrect or missing name: ' + name);
    return name;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) 
        throw new Error('Incorrect or missing ssn: ' + ssn);
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) 
        throw new Error('Incorrect or missing occupation: ' + occupation);
    return occupation;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender))
        throw new Error('Incorrect or missing gender: ' + gender);
    return gender;
};

type NewPatientFields = {
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    gender: unknown;
    occupation: unknown;
};

export const toNewPatient = (data: NewPatientFields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(data.name),
        dateOfBirth: parseDate(data.dateOfBirth),
        ssn: parseSSN(data.ssn),
        gender: parseGender(data.gender),
        occupation: parseOccupation(data.ssn),
        entries: []
    };

    return newPatient;
};