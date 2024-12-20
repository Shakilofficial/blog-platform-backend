import { z } from 'zod';
// Validation schemas for blog operations

// Create blog validation schema for creating a new blog
const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    }),
    content: z.string({
      required_error: 'Content is required',
      invalid_type_error: 'Content must be a string',
    }),
  }),
});

// Update blog validation schema for updating a blog
const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    }),
    content: z.string({
      required_error: 'Content is required',
      invalid_type_error: 'Content must be a string',
    }),
  }),
});

export const blogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
