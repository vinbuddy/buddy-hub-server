import mongoose from "mongoose";

function isEmail(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            min: 3,
            max: 20,
        },
        nickname: {
            type: String,
            require: true,
            min: 3,
            max: 18,
        },
        email: {
            type: String,
            max: 50,
            unique: true,
            required: "Email address is required",
            validate: [isEmail, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        profilePicture: {
            type: String,
            default: "",
        },
        followers: {
            type: Array,
            default: [],
        },
        followings: {
            type: Array,
            default: [],
        },
        bio: { type: String, default: "" },
        links: {
            facebook: String,
            instagram: String,
            github: String,
            twitter: String,
            website: String,
        },
        tick: Boolean,
    },
    { timestamps: true }
);

// mongoose.model(collectionName - Schema)
// User -> mongooese convert 'users'
const User = mongoose.model("User", UserSchema);

export default User;
