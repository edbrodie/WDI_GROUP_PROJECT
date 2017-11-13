const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });

const Member = require('../models/member');
const Event = require('../models/event');

//release model
Member.collection.drop();
Event.collection.drop();

//Add Member models here
Member
  .create([{
    username: 'EddyB',
    email: 'ed@ed.com',
    password: 'password',
    passwordConfirmation: 'password'
  } ,
  {
    username: 'tom',
    email: 'tom@tom.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((members) => {
    console.log(`${members.length} new memebers added`);
    return Event
      .create([{
        createdBy: members [0],
        bandName: 'Alt J',
        image: 'http://ksassets.timeincuk.net/wp/uploads/sites/55/2016/07/alt-J-Live-At-Red-Rocks-01-1.jpg',
        location: 'https://goo.gl/u62MUA',
        price: '£45'
      },{
        createdBy: members [0],
        bandName: 'Kings of Leon',
        image: 'http://mybuyticket.info/wp-content/uploads/2017/05/81106-tap-94037.jpg',
        location: 'https://goo.gl/vqHtQE',
        price: '£105'
      },
      {
        createdBy: members [0],
        bandName: 'Kings of Leon',
        image: 'http://mybuyticket.info/wp-content/uploads/2017/05/81106-tap-94037.jpg',
        location: 'https://goo.gl/vqHtQE',
        price: '£105'
      },
      {
        createdBy: members [0],
        bandName: 'Kings of Leon',
        image: 'http://mybuyticket.info/wp-content/uploads/2017/05/81106-tap-94037.jpg',
        location: 'https://goo.gl/vqHtQE',
        price: '£105'
      },
      {
        createdBy: members [0],
        bandName: 'Kings of Leon',
        image: 'http://mybuyticket.info/wp-content/uploads/2017/05/81106-tap-94037.jpg',
        location: 'https://goo.gl/vqHtQE',
        price: '£105'
      },{
        createdBy: members [1],
        bandName: 'Vengaboys',
        image: 'https://i.ytimg.com/vi/vjlttHcMTtw/maxresdefault.jpg',
        location: 'https://goo.gl/tSzZLa',
        price: '£30'
      }]);
  })
  .then((events) => console.log(`${events.length} Cool events near you!`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
