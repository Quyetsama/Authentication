const mongoose  = require("mongoose")

async function connect(){

    try{
        await mongoose.connect('mongodb://localhost/nodejsapistarter', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log("Connect successfully!!!");
    } catch(error){
        console.log("Connect failure!!!");
        console.log(error)
    }

}
// mongodb+srv://quyetsama:a123456789@apistarter.2nmvi.mongodb.net/QLUsers?retryWrites=true&w=majority
module.exports = {connect};
