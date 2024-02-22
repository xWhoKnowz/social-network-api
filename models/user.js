const { schema, model } = require(`mongoose`);

const userSchema = new Schema(
  {
    username: { type: string, unique: true, required: true, trim: true },
    email: { type: string, unique: true, required: true, mtach:},
    thoughts: [
      {
        type: Schema.Type.ObjectId,
        ref: `thought`,
      },
    ],
    friends: [
      {
        type: Schema.Type.ObjectId,
        ref: `user`,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual(`friendCount`).get(function () {
    return this.friends.length;
});

const User = model(`user`, postSchema);

module.exports = User;
