import axios from "axios";
import { Application, Request, Response } from "express";

export const loadApiEndpoints = async (app: Application): Promise<void> => {
  app.get("/api", (req: Request, res: Response) => {
    return res.status(200).send("Succeed");
  });

  //Get User Info for Torre with id
  app.get("/TorreUserInfo", async (req: Request, res: Response) => {
    try {
      const axiosResponse = await axios.get(
        "https://bio.torre.co/api/bios/cristiansanchez9824"
      );

      return res.status(200).send(axiosResponse.data);
    } catch (err) {
      console.log(err);
    }
  });
};
