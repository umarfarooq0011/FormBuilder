import Form from '../Models/Form.model.js';
import Submission from '../Models/Submission.model.js';

export const getPublicForm = async (req, res, next) => {
    try {
        const form = await Form.findOneAndUpdate(
            { 'published.slug': req.params.slug, 'published.isPublished': true },
            { $inc: { views: 1 } },
            { new: true }
        );
         if (!form) return res.status(404).json({ message: 'Public form not found' });
         res.json({
      form: {
        id: form._id,
        title: form.title,
        fields: form.published.fields,
      },
    });
    } catch (error) {
        console.error('Error fetching public form:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        next(error);
    }
};

export const postSubmission = async (req, res, next) => {
     try {
    const form = await Form.findOne({ 'published.slug': req.params.slug, 'published.isPublished': true });
    if (!form) return res.status(404).json({ message: 'Public form not found' });

    // Data Validation
    for (const field of form.published.fields) {
      if (field.config.required && !req.body.answers[field.id]) {
        return res.status(400).json({ message: `Field "${field.config.label}" is required.` });
      }
    }
    
    // Increment submissions count
    form.submissions += 1;
    await form.save();

    const sub = await Submission.create({
      form: form._id,
      answers: req.body?.answers || {},
      meta: {
        ip: req.ip,
        userAgent: req.headers['user-agent'] || '',
      },
    });
    res.status(201).json({ message: 'Submission received', submissionId: sub._id });
  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};