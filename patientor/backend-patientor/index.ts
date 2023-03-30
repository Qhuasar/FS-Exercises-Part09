import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
//eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get('/api/ping', (_req, res) => {
  res.send('<h1>Pong</h1>').end();
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
