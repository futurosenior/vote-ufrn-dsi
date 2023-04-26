const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const votes = [];

app.post("/vote", (req, res) => {
  const vote = req.body;
  votes.push(vote);
  res.status(201).json(vote);
});

app.get("/votes", (req, res) => {
  res.status(200).json(votes);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
