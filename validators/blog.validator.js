import Joi from "joi";

export const addBlogSchema = Joi.object({
  title: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  category: Joi.string()
    .required()
    .valid(
      "science",
      "education",
      "sports",
      "gaming",
      "books",
      "foods",
      "travel",
    )
    .messages({
      "any.only": "not valid",
    }),
  tags: Joi.string().optional(),
});

export const updateBlogSchema = Joi.object({
  title: Joi.string().trim().optional(),
  description: Joi.string().trim().optional(),
  category: Joi.string()
    .valid(
      "science",
      "education",
      "sports",
      "gaming",
      "books",
      "foods",
      "travel"
    )
    .optional(),
  tags: Joi.string().optional(),
}).min(1);


export const generateDescriptionSchema = Joi.object({
  title: Joi.string().required().trim(),
});