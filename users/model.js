import mongoose from "mongoose";        // load mongoose library
import schema from "./schema.js";       // load users schema
const model = mongoose.model("users", schema);      // create mongoose model from the schema
export default model;       // export so it can be used elsewhere
