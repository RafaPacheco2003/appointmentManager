const { z } = require('zod');

const createUserSchema = z.object({
    roleId: z.number().int().positive(),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password min 6 characters')
});

const updateUserSchema = z.object({
    roleId: z.number().int().positive().optional(),
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional()
});

module.exports = {
    createUserSchema,
    updateUserSchema
};
