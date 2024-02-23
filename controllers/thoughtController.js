const {User, Thought} = require(`../models/user`)

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
            const thought = await Thought.findOne({_id: req.params.ThoughtId})
            .select(`-__v`);
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
            const update = await Thought.findOneAndUpdate(
                {_id: req.params.ThoughtId},
                {$set: req.body}
            )
            res.json(update)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async removeThought(req, res){
        try {
            const removed = await Thought.FindOneAndRemove(
                {students:req.params.ThoughtId},
                {$pull: {students: req.params}},
                {new: true}
            );
            res.json({message: `Student successfully removed.`})
        } catch (err) {
            res.status(500).json(err)
        }
    }
};