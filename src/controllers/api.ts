import axios from "axios";
import { Application, Request, Response } from "express";
import { createClient } from "redis";

const client = createClient();

export const loadApiEndpoints = async (app: Application): Promise<void> => {
  //Open Redis Connection
  await client.connect();

  app.get("/api", (req: Request, res: Response) => {
    return res.status(200).send("Succeed");
  });

  //Get User Info for Torre with id
  app.get("/TorreUserInfo", async (req: Request, res: Response) => {
    try {
      const value = await client.get("TorreUserInfo");
      if (value) {
        return res.status(200).send(JSON.parse(value));
      }

      const axiosResponse = await axios.get(
        "https://bio.torre.co/api/bios/cristiansanchez9824"
      );

      await client.set("TorreUserInfo", JSON.stringify(axiosResponse.data));

      return res.status(200).send(axiosResponse.data);
    } catch (err) {
      console.log(err);
    }
  });

  client.quit();
};
