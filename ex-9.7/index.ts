import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import cors from 'cors';
import { calculateExercises, isNaNArray } from './exerciseCalculator';
const app = express();

app.use(cors());
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('<h1>Hello Full Stack</h1>');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;
    if (isNaN(Number(height)) || isNaN(Number(weight))) {
      res.status(400).json({ error: 'malformatted parameters' });
    }
    const bmi = bmiCalculator(Number(height), Number(weight));
    return res.json({
      height,
      weight,
      bmi,
    });
  } catch (error: unknown) {
    if (error instanceof Error) return res.status(500).json({ error });
    return res.status(500).end();
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (
    daily_exercises === undefined ||
    target === undefined ||
    daily_exercises === null ||
    target === null
  )
    return res.status(400).json({ error: 'parameters missing' });
  if (!isNaNArray(daily_exercises as number[]) || isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  try {
    const scheduleResult = calculateExercises(
      daily_exercises as number[],
      Number(target)
    );
    return res.json(scheduleResult);
  } catch (error) {
    if (error instanceof Error) return res.status(500).json({ error: error });
    return res.status(500).end();
  }
});

app.listen(3002, () => {
  console.log('LIstening on port 3002');
});
