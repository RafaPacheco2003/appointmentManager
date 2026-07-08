require('dotenv').config();
const startSubscriptionExpirationJob = require('./modules/subscription/jobs/subscriptionExpirationJob');
const {uploadImage,ensureStorageBucket} = require('./modules/storage/services/storageService');
const express = require("express");
const v1UserRoutes = require("./v1/routes/userRoutes");
const v1OrganizationRoutes = require("./v1/routes/organizationRouter");
const v1PlanRoutes = require("./v1/routes/planRoutes");
const v1BranchRoutes = require("./v1/routes/branchRouter");
const v1OrganizationBrandingRoutes = require("./v1/routes/organizationBrandingRouter");
const v1SubscriptionRoutes = require("./v1/routes/subscriptionRoutes");
const v1StorageRoutes = require("./v1/routes/storageRoutes");
const v1RolRoutes = require("./v1/routes/rolRouter");
const v1AuthRoutes = require("./v1/routes/authRouter");
const sequelize = require("./databases/sequelize");
require("./models/associations");





const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/v1/users", v1UserRoutes);
app.use("/api/v1/organizations", v1OrganizationRoutes);
app.use("/api/v1/plans", v1PlanRoutes);
app.use("/api/v1/branches", v1BranchRoutes);
app.use("/api/v1/organization-branding", v1OrganizationBrandingRoutes);
app.use("/api/v1/subscriptions", v1SubscriptionRoutes);
app.use("/api/v1/storage", v1StorageRoutes);
app.use("/api/v1/roles", v1RolRoutes);
app.use("/api/v1/auth", v1AuthRoutes);





sequelize.sync({ force: false, alter: true }) 
  .then(async () => {
    console.log('Base de datos sincronizada');

    await ensureStorageBucket();

    startSubscriptionExpirationJob();

    app.listen(port, () => {
        console.log(` Servidor en puerto ${port}`);
    });
  })
  .catch(err => console.error('Error sincronizando:', err));