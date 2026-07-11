const planService = require('../services/planService');
const { presentPlan, presentPlans } = require('../presenters/planPresenter');
const { presentError, presentSuccess } = require('../../common/responsePresenter');

const createPlan = async (req, res) => {
    try {
        const plan = await planService.createPlan(req.body);
        res.status(201).json(presentSuccess(presentPlan(plan), 'Plan created successfully'));
    } catch (error) {
        res.status(500).json(presentError(error.message));
    }
};

const getAllPlans = async (req, res) => {
    try {
        const plans = await planService.getAllPlans();
        res.status(200).json(presentSuccess(presentPlans(plans)));
    } catch (error) {
        res.status(500).json(presentError(error.message));
    }
};

const getPlanById = async (req, res) => {
    try {
        const plan = await planService.getPlanById(req.params.planId);
        if (!plan) {
            return res.status(404).json(presentError('Plan not found'));
        }
        res.status(200).json(presentSuccess(presentPlan(plan)));
    } catch (error) {
        res.status(500).json(presentError(error.message));
    }
};

const updatePlan = async (req, res) => {
    try {
        const plan = await planService.updatePlan(req.params.planId, req.body);
        res.status(200).json(presentSuccess(presentPlan(plan), 'Plan updated successfully'));
    } catch (error) {
        res.status(500).json(presentError(error.message));
    }
};

const deletePlan = async (req, res) => {
    try {
        await planService.deletePlan(req.params.planId);
        res.status(200).json(presentSuccess('Plan deleted successfully'));
    } catch (error) {
        res.status(500).json(presentError(error.message));
    }
};

module.exports = { createPlan, getAllPlans, getPlanById, updatePlan, deletePlan };