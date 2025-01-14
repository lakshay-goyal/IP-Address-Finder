import express from 'express';
import dns from 'dns';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/lookup', (req, res) => {
  const domain = req.query.domain;
  dns.lookup(domain, (err, address) => {
    if (err) {
      res.status(400).json({ error: 'Unable to resolve IP address' });
    } else {
      res.json({ ip: address });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

console.log('Server code loaded successfully');

