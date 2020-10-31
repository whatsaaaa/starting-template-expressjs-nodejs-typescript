import express from "express";

import { env } from "../env";

export const expressLoader = async () => {
  const app = express();

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(env.app.port);
};
