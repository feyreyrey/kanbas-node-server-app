import mongoose from "mongoose";        // load the mongoose library
const userSchema = new mongoose.Schema(
    {        // create the schema
        username: { type: String, required: true, unique: true },       // String field that is required and unique
        password: { type: String, required: true },         // String field that in required but not unique
        firstName: String,      // String fields
        email: String,      // with no additional
        lastName: String,       // configurations
        dob: Date,       // Date field with no configurations
        role: {
            type: String,       // String field

            enum: ["STUDENT", "FACULTY", "ADMIN", "USER", "GUEST"],      // allowed string values

            default: "USER"         // default value if not provided
        },
    },
    { collection: "users" }
);

export default userSchema;      // store data in "users" collection













