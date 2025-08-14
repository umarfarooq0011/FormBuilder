import { Router } from 'express';
import { getPublicForm, postSubmission } from "../Controllers/publicController.js";

const router = Router();
router.get('/forms/:slug', getPublicForm);
router.post('/forms/:slug/submit', postSubmission);

export default router;