const User = require('../modules/user/models/userModel');
const Organization = require('../modules/organization/models/organizationModel');
const Branch = require('../modules/branch/models/branchModel');
const Plan = require('../modules/plan/models/planModel');
const Subscription = require('../modules/subscription/models/subscriptionModel');
const OrganizationBranding = require('../modules/organizationBranding/models/organizationBrandingModel');
const EmailVerification = require('../modules/email/models/emailVerificationModel');

User.hasMany(Organization, { foreignKey: 'ownerId', as: 'organizations' });
Organization.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });


Organization.hasMany(Branch, { foreignKey: 'organizationId', as: 'branches' });
Branch.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });


Plan.hasMany(Subscription, { foreignKey: 'planId', as: 'subscriptions' });
Subscription.belongsTo(Plan, { foreignKey: 'planId', as: 'plan' });

User.hasMany(Subscription, {foreignKey: 'userId', as: 'subscriptions' });
Subscription.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(EmailVerification, {foreignKey: 'userId', as: 'emailVerifications' })
EmailVerification.belongsTo(User, {foreignKey: 'userId', as: 'user'});


Organization.hasOne(OrganizationBranding, { foreignKey: 'organizationId', as: 'branding' });
OrganizationBranding.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });

module.exports = { User, Organization, OrganizationBranding, Branch, Plan, Subscription };
