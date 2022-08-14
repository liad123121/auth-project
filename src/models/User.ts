import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import { EncryptionError } from "../errors/encryptionError";

export interface UserAttrs {
  username: string;
  password: string;
}

interface UserDoc extends mongoose.Document {
  username: string;
  password: string;
  comparePasswords(password: string): Promise<boolean>;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.methods.comparePasswords = async function (
  password: string
): Promise<boolean> {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

userSchema.pre("save", async function (done) {
  try {
    const password = await bcrypt.hash(this.password, 10);
    this.set({ password });
  } catch (error) {
    throw new EncryptionError("The password encryption failed!");
  }
  done();
});

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
