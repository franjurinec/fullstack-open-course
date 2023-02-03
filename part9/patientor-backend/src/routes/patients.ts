import express from 'express';
import patientService from '../services/patientService';
import { NewEntry, NewPatient } from '../types';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientDetails(req.params.id);

  if (!patient) {
    res.status(404)
      .send({ error: `Patient with ID ${req.params.id} not found.` });
    return;
  }

  res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatient: NewPatient = toNewPatient({
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      ssn: req.body.ssn,
      gender: req.body.gender,
      occupation: req.body.occupation
    });

    const patient = patientService.addPatient(newPatient);

    res.send(patient);

  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

router.post('/:id/entry', (req, res) => {
  try {
    const newEntry: NewEntry = toNewEntry({
      description: req.body.description,
      date: req.body.date,
      specialist: req.body.specialist,
      diagnosisCodes: req.body.diagnosisCodes,
      type: req.body.type,
      healthCheckRating: req.body.healthCheckRating,
      discharge: req.body.discharge,
      employerName: req.body.employerName,
      sickLeave: req.body.sickLeave
    });
    const patient = patientService.addPatientEntry(req.params.id, newEntry);
    res.send(patient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400)
        .send({ error: e.message });
    }
  }
});

export default router;