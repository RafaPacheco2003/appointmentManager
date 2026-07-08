const Organization = require('../models/organizationModel');
const User = require('../../user/models/userModel');

const createOrganization = async (orgData) => {


    const existingSlug = await getOrganizationBySlug(orgData.slug);

    if (existingSlug) {
        throw new Error('Slug already exists');
    }
    
    const organization = await Organization.create(orgData);
    return await Organization.findByPk(organization.id, {
        include: [{ model: User, as: 'owner' }]
    });
};



const getAllOrganizations = async () => {
    return await Organization.findAll({
        include: [{ model: User, as: 'owner' }]
    });
};

const getOrganizationById = async (id) => {
    return await Organization.findByPk(id, {
        include: [{ model: User, as: 'owner' }]
    });
};


const getOrganizationByOwnerId = async (ownerId) => {
    //Number of organizations per user id
    const numberOfOrganizations = await Organization.count({
        where: { ownerId }
    });

    return numberOfOrganizations;
};

const getOrganizationBySlug = async (slug) => {

    const organization = await Organization.findOne({
        where: { slug }
    });

    return !!organization;
}

module.exports = {
    createOrganization,
    getAllOrganizations,
    getOrganizationById,
    getOrganizationBySlug
};