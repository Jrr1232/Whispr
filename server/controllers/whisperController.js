const { User, Whisper } = require('../models')
module.exports = {
    async addComment(req, res) {
        try {
            comment = req.body
            const whispr = await Whispr.findOneAndUpdate(
                { _id: req.params.whisprId },
                { $push: { comments: comment } },
                { new: true }
            );

            if (!whispr) {
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
            const whisprId = req.params.whisprId;
            console.log(reactionId, whisprId)
            await Whispr.findByIdAndUpdate(
                { _id: whisprId },
                { $pull: { reactions: { reactionId } } },
                { new: true }
            );

            if (!whisprId) {
                return res
                    .status(404)
                    .json({ message: 'No whispr found with that id' });
            }

            res.json('Deleted the reaction 🎉');

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}