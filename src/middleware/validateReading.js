const { z } = require('zod');

const readingSchema = z.object({
  title: z.string().nonempty(),
  author: z.string().nonempty(),
  content: z.string().nonempty(),
});

const validateReading = (req, res, next) => {
  try {
    readingSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

module.exports = validateReading;
