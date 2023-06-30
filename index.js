 const express = require('express');
 const path=require('path');
 const port = 8000;

 const db = require('./config/mongoose');

 //accessing schema
 const Contact=require('./models/contact');
 const app = express();

 app.set('view engine','ejs');
 app.set('views',path.join(__dirname,'views'));
 app.use(express.urlencoded());
 app.use(express.static('assets'));

//routers
app.get('/', function(req, res) {
  Contact.find({})
    .then((contacts) => {
      return res.render('home', {
        title: "Contact List",
        contact_List: contacts
      });
    })
    .catch((err) => {
      console.log("Error in fetching contacts from db:", err);
      return res.status(500).send("Internal Server Error");
    });
});


//create contact
app.post('/create-contact', async function(req, res) {
    try {
      const newContact = await Contact.create({
        name: req.body.name,
        phone: req.body.phone
      });
      console.log('Created contact:', newContact);
      return res.redirect('back');
    } catch (err) {
      console.error('Error in creating the Contact', err);
      return;
    }
  });
  
       


//delete contact

app.get('/delete-contact',function(req,res){

     //get the id from  query in the url
     console.log(req.query);
     let id=req.query.id;

     //find the contact in the database using id and delete it 
     Contact.findByIdAndDelete(id)
    .then(function(deletedContact){
     if(deletedContact){
       console.log("Contact Deleted Successfully:", deletedContact);
       return res.redirect('back');
      }
     else{
      console.log("Contact not found !");
      }
  })
  .catch(function(err){
    console.log('Error deleting Contact:', err);
  });
    
});



//server running  
app.listen(port,function(err){
    if(err){
        console.log('Error in running server ',err);
    }
    console.log('my express server is running on port ', port);
});