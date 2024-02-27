const router = require('express').Router();
const {
    getUsers,
    getAUser,
    createUser,
    updateUser,
    removeUser,
    addFriend,
    removeFriend
} = require(`../../controllers/userController`)

router.route(`/`).get(getUsers).post(createUser)

router.route(`/:userId`).get(getAUser).put(updateUser).delete(removeUser)

router.route(`/:userId/friends`).post(addFriend)

router.route(`/:userId/friends/:friendId`).delete(removeFriend)

module.exports = router;