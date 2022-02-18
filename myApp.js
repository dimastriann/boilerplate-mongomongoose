require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

// connect to mongodb use mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true})

const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
})

let Person;
Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const Dimas = new Person({
    name: "Dimas", 
    age: 25,
    favoriteFoods: ["bread", "fried rice", "meat"]
  })
  Dimas.save( (err, data) => {
    if(err) return console.error(err);
    done(null, data);
  })
};

var arrayOfPeople = [
    {
      name: "Trian", 
      age: 25,
      favoriteFoods: ["Bakso", "Salad", "Singkong"]
    },
    {
      name: "Ahmad", 
      age: 28,
      favoriteFoods: ["Mie Ayam", "Sate", "Ubi"]
    },
    {
      name: "Umar", 
      age: 30,
      favoriteFoods: ["Roti Gandum", "Martabak", "Ayam Bakar"]
    }
  ]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, pers) => {
    if(err) return console.log(err);
    pers.favoriteFoods.push(foodToAdd)
    pers.save( (err, data) => {
      if(err) return console.log(err);
      done(null, data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    {name: personName}, 
    {age: ageToSet}, 
    {new: true}, (err, data) => {
      if(err) return console.log(err);
      done(null, data);
    })
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id: personId},(err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 'asc'})
    .limit(2)
    .select('-age')
    .exec( (err, data) => {
      if(err) return console.log(err);
      done(null, data);
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
