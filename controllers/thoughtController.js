const {User, Thought, Reaction} = require(`../models/index`)

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getAThought(req, res){
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId})
            if (!thought){
                return res.status(404).json({message: `No Thought with that ID found.`});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res){
        try {
            const newThought = await Thought.create(req.body);
            res.json(newThought);
        } catch (err) {
            res.json(500).json(err);
        }
    },
    async updateThought(req, res){
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true}
            )
            if (!thought){
                return res.status(404).json({message: `No Thought with that ID found.`});
            }
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async removeThought(req, res){
        try {
            const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId});
            if (!thought){
                return res.status(404).json({message: `No Thought with that ID found.`});
            }
            res.json({message: `Thought successfully removed.`})
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async addReaction(req, res){
        try {
            const reaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
            );
            if (!reaction){
                return res.status(404).json({message: `No thought with that ID found.`});
            }
            res.json(reaction)
        } catch (err) {
            console.log(err);
           res.status(500).json(err)
        }
    },
    async removeReaction(req, res){
        try {
            const reaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {runValidators: true, new: true}
            );
            if (!reaction){
                return res.status(404).json({message: `No user with that ID found.`});
            }
            res.json(reaction)
        } catch (err) {
            res.status(500).json(err)
        }
    }
};