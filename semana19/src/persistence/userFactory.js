import UsersDaoDb from "./daos/userDao.js";
import UsersDaoMem from "./daos/userDaoMem.js";
import dotenv from "dotenv";
dotenv.config();

const cnxStr = process.env.MONGOURI;
const opcion = process.argv[2] || "Mem";

let dao;
switch (opcion) {
  case "mongo":
    dao = new UsersDaoDb(cnxStr);
    dao.init();
    break;
  default:
    dao = new UsersDaoMem();
}

export default class UsersDaoFactory {
  static getDao() {
    return dao;
  }
}