import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';

const app = express();

const PORT = process.env.PORT ?? 3003;

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight)
    return res.json({ error: 'malformatted parameters' });

  return res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body;

  if (!daily_exercises || !target)
    return res.json({error: 'parameters missing'});

  const isNumberArray = (value: unknown): value is number[] => {
    return Array.isArray(value) && value.every(x => typeof x === 'number');
  };

  if (typeof target !== 'number' || !isNumberArray(daily_exercises))
    return res.json({error: 'malformed parameters'});

  const result = calculateExercise(daily_exercises, target);
  return res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});