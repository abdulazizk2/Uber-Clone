import userModel from "../model/user.model.js";

const createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !email || !password) {
        throw new Error("All fields are required");
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    // ✅ Ensure password is hashed before saving
    const hashedPassword = await userModel.hashPassword(password);

    // Create new user
    const newUser = await userModel.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password: hashedPassword, // Store hashed password
    });

    return newUser;
};

export default createUser;
