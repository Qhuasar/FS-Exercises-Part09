import { DiagnoseEntry } from '../types';
import diagnoseData from '../data/diognoses';

export const getAllDiagnoses = (): DiagnoseEntry[] => {
  return diagnoseData;
};
