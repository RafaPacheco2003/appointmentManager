const { z } = require('zod');

const createRoleSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional()
});

const updateRoleSchema = z.object({
    name: z.string().min(1, 'Name is required').optional(),
    description: z.string().optional()
});

module.exports = {
    createRoleSchema,
    updateRoleSchema
};