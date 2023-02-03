import { Gender, HealthCheckRating, NewEntry, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).some((value: string) => value === gender);
};

const isStringArray = (arr: unknown): arr is string[] => {
    return Array.isArray(arr) && arr.every(value => isString(value));
};

const isDischarge = (dischargeUnknown: unknown): dischargeUnknown is { date: string, criteria: string } => {
    if (!dischargeUnknown) return false;
    const discharge = dischargeUnknown as { date: unknown, criteria: unknown };
    return isString(discharge.date) && isDate(discharge.date) && isString(discharge.criteria);
};

const isHealthCheckRating = (rating: unknown): rating is HealthCheckRating => {
    return isString(rating) && Object.values(HealthCheckRating).includes(rating);
};

const isSickLeave = (sickLeaveUnknown: unknown): sickLeaveUnknown is { startDate: string, endDate: string } | undefined => {
    if (!sickLeaveUnknown) return true;
    const sickLeave = sickLeaveUnknown as { startDate: unknown, endDate: unknown };
    return isString(sickLeave.startDate)
        && isDate(sickLeave.startDate)
        && isString(sickLeave.endDate)
        && isDate(sickLeave.endDate);
};

// Patient validation

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


export type EntryFields = HealthCheckEntryFields | OccupationalHealthcareEntryFields | HospitalEntryFields;

interface BaseEntryFields {
    description: unknown;
    date: unknown;
    specialist: unknown;
    diagnosisCodes: unknown;
}

interface HealthCheckEntryFields extends BaseEntryFields {
    type: unknown;
    healthCheckRating: unknown
}

interface HospitalEntryFields extends BaseEntryFields {
    type: unknown;
    discharge: unknown;
}

interface OccupationalHealthcareEntryFields extends BaseEntryFields {
    type: unknown;
    employerName: unknown;
    sickLeave?: unknown;
}

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description))
        throw new Error('Incorrect or missing description: ' + description);
    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist))
        throw new Error('Incorrect or missing specialist: ' + specialist);
    return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
    if (!diagnosisCodes || !isStringArray(diagnosisCodes))
        throw new Error('Incorrect or missing diagnosis codes: ' + diagnosisCodes);
    return diagnosisCodes;
};

const parseType = (type: unknown): "Hospital" | "HealthCheck" | "OccupationalHealthcare" => {
    if (!type || !isString(type)
        || !(type === "Hospital"
            || type === "HealthCheck"
            || type === "OccupationalHealthcare"))
        throw new Error('Incorrect or missing entry type: ' + type);
    return type;
};

const parseDischarge = (discharge: unknown): { date: string, criteria: string } => {
    if (!discharge || !isDischarge(discharge))
        throw new Error('Incorrect or missing hospital discharge: ' + discharge);

    return discharge;
};

const parseHealthCheckRating = (healthCheckRating: unknown) => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating))
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName))
        throw new Error('Incorrect or missing employer name: ' + employerName);
    return employerName;
};

const parseSickLeave = (sickLeave: unknown): { startDate: string, endDate: string } | undefined => {
    if (!sickLeave || !isSickLeave(sickLeave))
        throw new Error('Incorrect or missing sick leave: ' + sickLeave);
    return sickLeave;
};

export const toNewEntry = (data: EntryFields): NewEntry => {
    const description = parseDescription(data.description);
    const date = parseDate(data.date);
    const specialist = parseSpecialist(data.specialist);
    const diagnosisCodes = parseDiagnosisCodes(data.diagnosisCodes);
    const type = parseType(data.type);

    const baseFields = {
        description,
        date,
        specialist,
        diagnosisCodes,
    };

    switch (type) {
        case "Hospital":
            const hospitalData = data as HospitalEntryFields;
            return {
                ...baseFields,
                type,
                discharge: parseDischarge(hospitalData.discharge)
            };
        case "HealthCheck":
            const healthCheckData = data as HealthCheckEntryFields;
            return {
                ...baseFields,
                type,
                healthCheckRating: parseHealthCheckRating(healthCheckData.healthCheckRating)
            };
        case "OccupationalHealthcare":
            const occupationalHealthcareData = data as OccupationalHealthcareEntryFields;
            return {
                ...baseFields,
                type,
                employerName: parseEmployerName(occupationalHealthcareData.employerName),
                sickLeave: parseSickLeave(occupationalHealthcareData.sickLeave)
            };
        default:
            return assertNever(type);
    }


};

export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};