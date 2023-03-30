import express from 'express';
import cors from 'cors';
import { getAllPatients } from './services/patients';
import { getAllDiagnoses } from './services/diagnoses';
import parsePatient from './utlis/parsePatient';
import patientData from './data/patients';

const app = express();

app.use(express.json());
//eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get('/api/ping', (_req, res) => {
  res.send('<h1>Pong</h1>').end();
});

app.get('/api/diagnoses', (_req, res) => {
  res.json(getAllDiagnoses());
});

app.get('/api/patients', (_req, res) => {
  res.json(getAllPatients());
});

app.post('/api/patients', (req, res) => {
  try {
    const parsedPatient = parsePatient(req.body);
    patientData.push(parsedPatient);
    res.json(parsedPatient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
