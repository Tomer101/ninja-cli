const mongoose = require('mongoose');
//Map global promise - rid of warning
mongoose.Promise = global.Promise;
//connect to db
mongoose.connect('mongodb://localhost:27017/ninjacli', {useMongoClient: true});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//import model
const Ninja = require ('./models/ninja')

//Add ninja
const addNinja = (ninja) => {
   Ninja.create(ninja).then(ninja => {
       console.info('New Ninja Added');
       //close the connection to the database
       db.close();
   });
}

//Find ninja
const findNinja = (ninjaName) => {
    //make case insenseitive
    const search =  new RegExp(ninjaName, 'i');
    //search the name by first name $or last name
    Ninja.find({$or: [{firstName: search}, {lastName: search}]})
    //ninja is the reVal from the find() and then we output it
    .then(ninja => {
        console.info(ninja);
        console.info(`${ninja.length} matches`);
        db.close();
    });
}


//Update ninja
const updateNinja = (ninjaName, newNinja) => {
    const search =  new RegExp(ninjaName, 'i');
    //search the name by first name $or last name
    Ninja.findOneAndUpdate({$or: [{firstName: search}, {lastName: search}]}, newNinja )
    .then(retVal => {
        //console.info(retVal)
        console.info('Ninja updated');
        db.close();
    })
}

//Delete ninja
const deleteNinja = (ninjaName) => {
    const search =  new RegExp(ninjaName, 'i');
    //search the name by first name $or last name
    Ninja.remove({$or: [{firstName: search}, {lastName: search}]})
    .then(retVal => {
        //console.info(retVal)
        console.info('Ninja deleted');
        db.close();
    })
}


//Show ninja collection
const listNinjas = () => {
    Ninja.find().then(ninjas => {
        console.info(ninjas);
        console.info(`${ninjas.length} matches`);
        db.close();
    })
}

module.exports = {
    addNinja,
    findNinja,
    updateNinja,
    deleteNinja,
    listNinjas
}