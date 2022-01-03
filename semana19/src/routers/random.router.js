import express from "express"
import { randomController } from "../controllers/index.js"

const router = new express.Router()

router.get('/:cant?', randomController.getRandom);

export { router }