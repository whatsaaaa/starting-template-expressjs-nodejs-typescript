import express from "express";
/**
 * EXPRESSJS NODEJS TYPESCRIPT Template
 * ----------------------------------------------
 */
const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.send("Express + Node + Typescript Server");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
