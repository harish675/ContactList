
const mongoose =require('mongoose');

const contactSchema = new mongoose.Schema({
     name:{

          type:String,
          require:true
          //put validation declare hare
     },
     phone :{

          type: String,
          require :true
     }
});


//collection called in database
//collection name keep it capitle
const Contact = mongoose.model('Contact',contactSchema);

module.exports = Contact