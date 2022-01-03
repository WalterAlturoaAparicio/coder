import { fork } from "child_process";
import path from "path";
import {randomService} from '../services/index.js';
//const randoms = fork(path.resolve() + "/src/services/random.service.js");

export function getRandom(req, res) {
  const { cant } = req.query;
  // randoms.send({cant: cant ? Number(cant) : 10000});
  // randoms.on("message", (resultado) => {
  //   logger.info(`Method: ${req.method} Url: ${req.url}`)
  //   res.status(200).json({resultado})
  // });
  const randoms = randomService.randomNumbers(cant ? Number(cant):100000000);
  res.status(200).json({resultado: randoms});
}
