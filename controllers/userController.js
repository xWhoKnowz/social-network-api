const User = require(`../models/user`);

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
            .select(`-__v`);
            if (!user){
                return res.status(404).json({message: `No user with that ID found.`});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createdUser(req, res){
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            res.json(500).json(err);
        }
    },
    async updateUser(req, res){
        try {
            const update = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body}
            )
            res.json(update)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async removeUser(req, res){
        try {
            const removed = await User.FindOneAndRemove(
                {students:req.params.userId},
                {$pull: {students: req.params}},
                {new: true}
            );
            res.json({message: `Student successfully removed.`})
        } catch (err) {
            res.status(500).json(err)
        }
    }
};