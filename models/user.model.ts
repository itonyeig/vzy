import { Schema, model, Error, Document } from "mongoose";
import bcrypt from "bcrypt";
import { Types } from "mongoose";

export interface UserM extends Document {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    createdAt?: Date;
    updateddAt?: Date;
    status: 'paid' | 'unpaid'
    
    isValidPassword(password: string): Promise<Error | boolean>;
  }

 const UserSchema = new Schema<UserM>(
    {
      email: { type: String, required: true, imutable: true, unique: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      password: String,
      phone: String,
      status: { type: String, default: 'unpaid', enum: ['paid', 'unpaid'] },
    },
    {
      timestamps: true,
      strict: "throw", // validates type from client
      strictQuery: false, // Turn off strict mode for query filters,
    }
  );
  
  UserSchema.pre<UserM>("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    try {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      
      next();
    } catch (error) {
      throw new Error("Failed to hash password");
    }
  });
  
  UserSchema.methods.isValidPassword = async function (
    password: string
  ): Promise<Error | boolean> {
    try {
      const isValid = await bcrypt.compare(password, this.password);
      return isValid;
    } catch (error) {
      throw new Error("Failed to compare password");
    }
  };
  
  export const User = model("User", UserSchema);