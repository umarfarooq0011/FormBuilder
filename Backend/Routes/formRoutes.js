
import { Router } from 'express';
import { createForm, deleteForm, getAllForms, getForm, getSubmissions, patchForm, publishForm } from '../Controllers/formController.js';

const router = Router();

// Route to get all forms
router.get('/', getAllForms);

router.post('/', createForm);
router.get('/:id', getForm);
router.patch('/:id', patchForm);
router.put('/:id/publish', publishForm);
router.get('/:id/submissions', getSubmissions);

// Route to delete a form
router.delete('/:id', deleteForm); 

export default router;