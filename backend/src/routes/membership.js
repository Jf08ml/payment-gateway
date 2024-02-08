import { Router } from "express";
import { createMembership, getMemberships } from "../controllers/membershipController";

const router = Router();

router.post("/createmembership", createMembership);
router.get("/getmemberships", getMemberships);
export default router;
