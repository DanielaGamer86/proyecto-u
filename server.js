const express = require('express');
const cors = require('cors');
const registerController = require('./admin-proyect/src/controllers/register/controller_register');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Register route
app.post('/api/register', registerController.register);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
