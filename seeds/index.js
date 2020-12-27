const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '5fdf9f955b570250b401f6f5',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci rem, repellat eos molestiae beatae earum minus totam, vero amet nihil dicta error cumque voluptatum accusamus minima ipsum aliquam dolorum laborum.Dignissimos soluta vitae officia aliquam. Libero non eligendi voluptatum dicta, odit inventore? Aspernatur odit molestiae est inventore ut a temporibus sequi beatae, facere obcaecati, ex repellendus eveniet consequuntur ducimus cupiditate.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },
            images: [
                {
                    url:
                        'https://res.cloudinary.com/frmwfidde/image/upload/v1608620874/yelpcamp/ncq9pjfvwni8wxv4fghm.jpg',
                    filename: 'yelpcamp/ncq9pjfvwni8wxv4fghm',
                },
            ],
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
