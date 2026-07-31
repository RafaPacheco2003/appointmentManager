const presentUser = (user) => {
    if (!user) return null;
    
    return {
        id: user.id,
        roleId: user.roleId,
        name: user.name,
        email: user.email
    };
};

const presentUsers = (users) => {
    return users.map(presentUser);
};
const presentUserDetails = (data) => ({
    user: data.user,
    subscription: data.subscription
});

module.exports = {
    presentUser,
    presentUsers,
    presentUserDetails
};
