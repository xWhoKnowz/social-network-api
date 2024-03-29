const router = require('express').Router();
const {
    getThoughts,
    getAThought,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require(`../../controllers/thoughtController`)

router.route(`/`).get(getThoughts).post(createThought)

router.route(`/:thoughtId`).get(getAThought).put(updateThought).delete(removeThought)

router.route(`/:thoughtId/reactions`).post(addReaction)

router.route(`/:thoughtId/reactions/:reactionId`).delete(removeReaction)

module.exports = router;