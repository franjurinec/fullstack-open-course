import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection, NumberField, SelectField } from "./FormField";
import { HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";
import { isDate } from "../utils";

export interface EntryFormValues extends Omit<HospitalEntry, 'id' | 'type'>,
  Omit<HealthCheckEntry, 'id' | 'type'>,
  Omit<OccupationalHealthcareEntry, 'id' | 'type'> {
  type: "Hospital" | "HealthCheck" | "OccupationalHealthcare"
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {

  const [{ diagnoses }] = useStateValue();

  const diagnosisTypeOptions = [
    { value: "Hospital", label: "Hospital Visit" },
    { value: "HealthCheck", label: "Health Check" },
    { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
  ];

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "Hospital",
        discharge: {
          date: '',
          criteria: ''
        },
        healthCheckRating: 0,
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: ''
        }
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const dateError = "Invalid format (should match YYYY-MM-DD)";
        const healthCheckError = "Invalid format (should be between 0 and 3)";
        const errors: { [field: string]: string | [field: string] } = {};
        if (!values.description) {
          errors.description = requiredError;
        }

        if (!values.date) {
          errors.date = requiredError;
        } else if (!isDate(values.date)) {
          errors.date = dateError;
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if (!values.type) {
          errors.type = requiredError;
        }

        if (values.type === "HealthCheck") {
          if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
            errors.healthCheckRating = healthCheckError;
          }
        }

        if (values.type === "Hospital") {
          if (!isDate(values.discharge.date))
            errors['discharge.date'] = dateError;
          if (!values.discharge.criteria)
            errors['discharge.criteria'] = requiredError;
        }

        if (values.type === "OccupationalHealthcare") {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (values.sickLeave) {
            if (!isDate(values.sickLeave.startDate)) {
              errors['sickLeave.startDate'] = dateError;
            }
            if (!isDate(values.sickLeave.endDate)) {
              errors['sickLeave.endDate'] = dateError;
            }
          }

          return errors;
        }
      }}>
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {

        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="John Doe"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Occupation"
              placeholder="Occupation"
              name="occupation"
              component={TextField}
            />
            <SelectField
              label="Type"
              name="type"
              options={diagnosisTypeOptions}
            />

            {values.type === "Hospital" && (
              <>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Healed."
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            )}

            {values.type === "OccupationalHealthcare" && (
              <>
                <Field
                  label="Employer"
                  placeholder="Microsoft"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Leave Start Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick Leave End Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            )}

            {values.type === "HealthCheck" && (
              <Field
                label="Health Rating"
                placeholder={0}
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            )}

            <DiagnosisSelection diagnoses={diagnoses}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched} />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
