import { Schema, model } from "mongoose";
import { owner } from "../interfaces/interface";

const activities = new Schema({
  userId: { type: String, required: true },
  activity: { type: String, required: true },

  date: {
    type: String,
    default: () => {
      const date = new Date();
      const pad = (n:any) => n.toString().padStart(2, '0');
      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
    }
  },

  time: {
    type: String,
    default: () => {
      const date = new Date();
      const pad = (n:any) => n.toString().padStart(2, '0');
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());
      return `${hours}:${minutes}:${seconds}`; // Format: HH:MM:SS
    }
  }
});

export const activities_model = model("owneractivities", activities)