import mongoose from "mongoose";

const ConnecttoDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Database Connection Failed:", error);
        process.exit(1);
    }
};

export default ConnecttoDB;
