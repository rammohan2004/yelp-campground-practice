const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price=Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
           
            description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora nam ab dolor! Veniam tenetur illo inventore sunt eos quia quaerat nobis, repudiandae neque accusantium atque ducimus vero voluptates omnis molestias.',
            price:price,
            image:`https://picsum.photos/400?random=${Math.random()}`
            
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})