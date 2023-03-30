import { Gender, PatientEntry } from "../types";
import { v1 as uuid } from 'uuid';


const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (arg: unknown): string => {
  if (!isString(arg) || !arg) {
    throw new Error('Parameter is not a string');
  }
  return arg;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).includes(gender as Gender);
};

const parseGender = (arg: unknown): Gender => {
  if (!arg || !isString(arg) || !isGender(arg)) {
    throw new Error('gender field incorrect or missing');
  }
  return arg;
};

const parsePatient = (body: unknown): PatientEntry => {
  if (!body || !(typeof body === 'object')) {
    throw new Error('Invalid body, expect an object');
  }
  if (
    'name' in body &&
    'dateOfBirth' in body &&
    'ssn' in body &&
    'gender' in body &&
    'occupation' in body
  ) {
    const newPatientEntry: PatientEntry = {
      //eslint-disable-next-line @typescript-eslint/no-unsafe-call
      id: parseString(uuid()),
      name: parseString(body.name),
      dateOfBirth: parseString(body.dateOfBirth),
      ssn: parseString(body.ssn),
      gender: parseGender(body.gender),
      occupation: parseString(body.occupation),
    };
    return newPatientEntry;
  }
  throw new Error('Invalid body, missing parameters');
};

export default parsePatient;
