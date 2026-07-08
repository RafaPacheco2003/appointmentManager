const Plan = require('../models/planModel');


const createPlan = async (planData) => {
    return await Plan.create(planData);
};

const getAllPlans = async () => {
    return await Plan.findAll();
};

const getPlanById = async (id) => {
    return await Plan.findByPk(id);
};

const getMaxOrganizationsByPlanId = async (planId) => {
    const plan = await Plan.findByPk(planId, {
        attributes: ['maxOrganizations']
    });

    if (!plan) {
        throw new Error('Plan not found');
    }

    return plan.maxOrganizations;
};
module.exports = { createPlan, getAllPlans, getPlanById, getMaxOrganizationsByPlanId };