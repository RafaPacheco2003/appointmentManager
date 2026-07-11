const { z } = require('zod');
const { roleE_VALUES } = require('../../role/models/role');

const createUserSchema = z.object({
    role: z.enum(roleE_VALUES),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password min 6 characters')
});

const updateUserSchema = z.object({
    role: z.enum(roleE_VALUES).optional(),
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional()
});

module.exports = {
    createUserSchema,
    updateUserSchema
};
