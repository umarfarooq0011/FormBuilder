
import { Router } from 'express';
import { createForm, getForm, getSubmissions, patchForm, publishForm } from '../Controllers/formController.js';

const router = Router();

router.post('/', createForm);
router.get('/:id', getForm);
router.patch('/:id', patchForm);
router.put('/:id/publish', publishForm);
router.get('/:id/submissions', getSubmissions);

export default router;