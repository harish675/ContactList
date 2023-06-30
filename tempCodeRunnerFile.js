
app.get('/',function(req,res){
    res.send('cool it is running!');
})






app.listen(port,function(err){
    if(err){
        console.log('Error in running server ',err);
    }
    console.log('my express server is running on port ', port);
});