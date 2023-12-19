import { hierarchyValues } from "@/app/validations/userSchema";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "El nombre es requerido"],
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "El nombre es requerido"],
    trim: true
  },
  password: {
    type: String,
    required: [true, "El password es requerido"],
    minLength: [6, "Al menos debe tener 3 caracteres"],
  },
  hierarchy: {
    type: String,
    required: [true, "La jerarquía es requerida"],
    enum: hierarchyValues,
  },
  lastLogin: Date,
}, {
  timestamps: true
});

export default models.User || model('User', userSchema, 'user2')
