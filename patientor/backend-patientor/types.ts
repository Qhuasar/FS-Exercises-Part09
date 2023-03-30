export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}

export type PublicPatient = Omit<PatientEntry, 'ssn'>;
