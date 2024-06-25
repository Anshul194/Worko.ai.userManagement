const userDao = require('../daos/userDao');

const createUser = async (userData) => {
    return await userDao.createUser(userData);
};

const getUserById = async (id) => {
    return await userDao.getUserById(id);
};

const getUsers = async () => {
    return await userDao.getUsers();
};

const updateUser = async (id, updateData) => {
    return await userDao.updateUser(id, updateData);
};

const deleteUser = async (id) => {
    return await userDao.deleteUser(id);
};

const restoreUserById = async (id) => {
    return await userDao.restoreUserById(id);
};

module.exports = {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    restoreUserById
};
