import { PublicPatient } from '../types';
import patientData from '../data/patients';

export const getAllPatients = (): PublicPatient[] => {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patientData.map(({ ssn, ...patient }) => {
    return patient;
  });
};
