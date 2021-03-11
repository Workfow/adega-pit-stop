const express = require('express');
const cors = require('cors');
const routes = require('./routes');

require('./database');

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);

app.get('/test', (req, resp) => {
  return resp.json({ message: "Funcionou" });
})

app.listen(3333, () => console.log('Server running on port 3333'));