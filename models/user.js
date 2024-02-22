const { schema, model } = require(`mongoose`);

const userSchema = new Schema({
  username: { type:string, unique:true, required:true, trim: true },
  email: { type:string, unique:true, required:true },
  thoughts: [{
    type: schema.Type.ObjectId,
    ref: `thought`
  }],
  friends: [{
    type: schema.Type.ObjectId,
    ref: `user`
}],
});
