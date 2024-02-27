const {User} = require(`../models/index`);

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getAUser(req, res){
        try {
            const user = await User.findOne({_id: req.params.userId})
            if (!user){
                return res.status(404).json({message: `No user with that ID found.`});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res){
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            res.json(500).json(err);
        }
    },
    async updateUser(req, res){
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {runValidators: true, new: true}
            )
            if (!user){
                return res.status(404).json({message: `No user with that ID found.`});
            }
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async removeUser(req, res){
        try {
            const user = await User.findOneAndRemove({_id: req.params.userId});
            if (!user){
                return res.status(404).json({message: `No user with that ID found.`});
            }
            res.json({message: `User successfully removed.`})
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },
    async addFriend(req, res){
        try {
            const friend = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.body.friendId}},
                {runValidators: true, new: true}
            );
            if (!friend){
                return res.status(404).json({message: `No user with that ID found.`});
            }
            res.json(friend)
        } catch (err) {
           res.status(500).json(err)
        }
    },
    async removeFriend(req, res){
        try {
            const friend = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: req.params.friendId}},
                {runValidators: true, new: true}
            );
            if (!friend){
            
                return res.status(404).json({message: `No user with that ID found.`});
            }
            res.json(friend)
        } catch (err) {
            res.status(500).json(err)
        }
    }
};