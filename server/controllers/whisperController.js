const { User, Whisper } = require('../models')
module.exports = {
    async addComment(req, res) {
        try {
            comment = req.body
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { comments: comment } },
                { new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'No whisper found with that id' });
            }

            res.json('Created the reaction 🎉');

        } catch (err) {
            console.log(err)
        }
    },
    async deleteReaction(req, res) {
        try {
            const reactionId = req.params.reactionId;
            const thoughtId = req.params.thoughtId;
            console.log(reactionId, thoughtId)
            await Thought.findByIdAndUpdate(
                { _id: thoughtId },
                { $pull: { reactions: { reactionId } } },
                { new: true }
            );

            if (!thoughtId) {
                return res
                    .status(404)
                    .json({ message: 'No thought found with that id' });
            }

            res.json('Deleted the reaction 🎉');

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}