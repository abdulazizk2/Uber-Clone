import mongoose from "mongoose"


const ConnecttoDB = async ()=>{
    try {
       await mongoose.connect(`${process.env.DB_CONNECT}`,()=>{
        console.log("DB COnnected")
       })
    } catch (error) {
        console.log(error);
    }

}
module.exports = ConnecttoDB;