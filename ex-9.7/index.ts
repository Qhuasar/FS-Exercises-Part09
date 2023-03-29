import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import cors from 'cors';
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
    res.json({
      height,
      weight,
      bmi,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(3000, () => {
  console.log('LIstening on port 3000');
});
