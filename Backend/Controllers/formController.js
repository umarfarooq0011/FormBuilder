import crypto from 'crypto';
import Form from '../Models/Form.model.js';
import Submission from '../Models/Submission.model.js';

// generate humanish slug for published URLs

const makeSlug = () => {
     return crypto.randomBytes(6).toString('base64url');
}

export const createForm = async(req, res, next) => {
    try {
         const form = await Form.create({ title: req.body?.title || 'Untitled Form' });
         res.status(201).json({ id: form._id, form });

        
    } catch (error) {
        console.error('Error creating form:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        next(error);
    }
};

export const getForm = async(req, res, next) => {
    try {
         const form = await Form.findById(req.params.id);
         if (!form) return res.status(404).json({ message: 'Form not found' });
         res.status(200).json({ form });
    } catch (error) {
        console.error('Error fetching form:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        next(error);
    }
};

// AUTOSAVE (draft) – partial updates allowed

export const patchForm = async(req, res, next) => {
    try {
        const { fields, title } = req.body || {};
        const update = {};
        if (Array.isArray(fields)) update.fields = fields;
        if (typeof title === 'string') update.title = title;

         const form = await Form.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true }
    );
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.json({ form });
        
    } catch (error) {
        console.error('Error updating form:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        next(error);
    }
};




// Publish – freezes current draft into read-only snapshot
export const publishForm = async (req, res, next) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) return res.status(404).json({ message: 'Form not found' });

        // Generate a slug only on the first publish
        if (!form.published.slug) {
            form.published.slug = makeSlug();
        }

        form.published.fields = form.fields; // Snapshot the fields
        form.published.isPublished = true;
        form.published.publishedAt = new Date();

        await form.save();

        // --- CORRECTED RESPONSE ---
        // Send a single, combined response
        res.status(200).json({
            message: "Form published successfully!",
            slug: form.published.slug,
            url: `/form/${form.published.slug}`,
            form: form // Send the full updated form object
        });

    } catch (error) {
        console.error('Error publishing form:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        next(error);
    }
};

// Owner-side: list submissions for a form

export const getSubmissions = async(req, res, next) => {
    try {
         const subs = await Submission.find({ form: req.params.id }).sort({ createdAt: -1 });
    res.json({ submissions: subs });
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        next(error);
    }
}