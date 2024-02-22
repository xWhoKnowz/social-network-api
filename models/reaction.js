const { schema, model } = require(`mongoose`);

const reactionSchema = new Schema(
    {
        reactionId: {type: ObjectId, default:},
        reactionBody: {type: String, required: true, maxLength: 280},
        username: {type: String, required:true},
        createdAt: {type:Date, default: date.now, get:}
    }
)