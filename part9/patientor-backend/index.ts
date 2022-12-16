import express from 'express';
const app = express();
app.use(express.json());

const PORT = process.env.PORT ?? 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});