import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    difficulty: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },

    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    instructions: [
      {
        id: {
          type: String,
          required: true,
        },
        step: {
          type: String,
          required: true,
        },
      },
    ],
  },

  { timestamps: true }
);

const Recipe = models?.Recipe || model("Recipe", schema);
export default Recipe;
