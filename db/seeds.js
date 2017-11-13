const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { db } = require('../config/environment');
const app = require('express')();
const environment = app.get('env');

mongoose.connect(db[environment], { useMongoClient: true });

const Member = require('../models/member');
const Event = require('../models/event');

//release model
Member.collection.drop();
Event.collection.drop();

//Add Member models here
Member
  .create([{
    name: 'EddyB',
    email: 'ed@ed.com',
    username: 'ed123',
    password: 'password',
    passwordConfirmation: 'password'
  } ,
  {
    name: 'tom',
    email: 'tom@tom.com',
    username: 'tom123',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((members) => {
    console.log(`${members.length} new members added`);
    return Event
      .create([{
        createdBy: members[0],
        bandName: 'Alt J',
        image: 'http://ksassets.timeincuk.net/wp/uploads/sites/55/2016/07/alt-J-Live-At-Red-Rocks-01-1.jpg',
        location: 'https://goo.gl/u62MUA',
        locationName: 'The Roundhouse',
        description: 'Alt-J (stylised as alt-J) are an English indie rock band formed in 2007 in Leeds, by Gwil Sainsbury (guitar/bass), Joe Newman (guitar/lead vocals), Thom Sonny Green (drums) and Gus Unger-Hamilton (keyboards/vocals).The band\'s debut album An Awesome Wave was released in May 2012 in Europe, and in September 2012 in the United States, and won the 2012 British Mercury Prize. Gwil Sainsbury amicably departed the band in early 2014. Their second album, This Is All Yours, was released on 22 September 2014 and went straight to UK number one. As a replacement for Sainsbury, Cameron Knight became a supporting member for alt-J\'s live shows, playing guitar, bass and sampler. In 2017, the band released their third studio album, Relaxer, and are currently playing as a trio.',
        price: '£45'
      },{
        createdBy: members[0],
        bandName: 'Kings of Leon',
        image: 'http://mybuyticket.info/wp-content/uploads/2017/05/81106-tap-94037.jpg',
        location: 'https://goo.gl/vqHtQE',
        locationName: 'Brixton O2',
        description: 'Kings of Leon is an American rock band that formed in Nashville, Tennessee, in 1999. The band is composed of brothers Caleb Followill (b. January 14, 1982, lead vocals, rhythm guitar), Nathan Followill (b. June 26, 1979, drums, percussion, backing vocals) and Jared Followill (b. November 20, 1986, bass guitar, backing vocals), with their cousin Matthew Followill (b. September 10, 1984, lead guitar, backing vocals).The band\'s early music was a blend of Southern rock and blues influences, but it has gradually expanded throughout the years to include a variety of genres and a more alternative, arena rock sound. Kings of Leon achieved initial success in the United Kingdom with nine Top 40 singles, two BRIT Awards in 2008, and all three of the band\'s albums at the time peaked in the top five of the UK Albums Chart. ',
        price: '£105'
      },
      {
        createdBy: members[0],
        bandName: 'Enya',
        image: 'http://leostavern.com/lt01/wp-content/uploads/2016/05/Eithne.jpg',
        location: 'https://goo.gl/xBeqjC',
        locationName: 'XOYO London',
        description: 'Eithne Pádraigín Ní Bhraonáin (anglicised as Enya Patricia Brennan; born 17 May 1961), known as Enya, is an Irish singer, songwriter, musician, and producer. Born into a musical family and raised in the Irish speaking area of Gweedore in County Donegal, Enya began her music career when she joined her family\'s Celtic band Clannad in 1980 on keyboards and backing vocals. She left in 1982 with their manager and producer Nicky Ryan to pursue a solo career, with Ryan\'s wife Roma Ryan as her lyricist. Enya developed her distinct sound over the following four years with multi-tracked vocals and keyboards with elements of new age, Celtic, classical, church, and folk music. She has sung in ten languages.',
        price: '£22'
      },
      {
        createdBy: members[0],
        bandName: 'Scratch Perverts',
        image: 'https://www.residentadvisor.net/images/profiles/scratchperverts.jpg',
        location: 'https://goo.gl/Uvxovb',
        locationName: 'Ally Pally',
        description: 'The Scratch Perverts are a collective of turntablist DJs from London, formed in 1996 by Tony Vegas, Prime Cuts and DJ Renegade. The team won the first DMC Team championships in 1999, claiming it again in the \'Perverted Allies\' alias (a fusion of the Perverts and the Allies DJ crews). Additionally Prime Cuts won 2 consecutive ITF World Scratching titles, first beating A-Trak in Hawaii in 1999 and then defending the title in Los Angeles the following year. Plus One won the Vestax battle in 2000, after a hiatus of 10 years. Their technical contributions include the \'feedback\' technique, inspired by Jimi Hendrix. They have now retired from competition and gone on to regular live DJing, touring and holding a residency at Fabric in London. They have also gone on to produce their own music.',
        price: '£45'
      },
      {
        createdBy: members[0],
        bandName: 'Rick Astley',
        image: 'https://img.maximummedia.ie/joe_co_uk/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtam9lY291ay5tYXhpbXVtbWVkaWEuaWUuczMuYW1hem9uYXdzLmNvbVxcXC93cC1jb250ZW50XFxcL3VwbG9hZHNcXFwvMjAxNlxcXC8wNlxcXC8yMDEwMjIwMVxcXC9SaWNrQXN0bGV5LnBuZ1wiLFwid2lkdGhcIjo2NDcsXCJoZWlnaHRcIjozNDAsXCJkZWZhdWx0XCI6XCJodHRwczpcXFwvXFxcL3d3dy5qb2UuY28udWtcXFwvYXNzZXRzXFxcL2ltYWdlc1xcXC9qb2Vjb3VrXFxcL25vLWltYWdlLnBuZz92PTRcIn0iLCJoYXNoIjoiY2MwNmI0ODU2YTUzM2E5MTczMjk4ZDc4ZDcyZmU3OGQxMDYwZTEwZiJ9/rickastley.png',
        location: 'https://goo.gl/evWvVg',
        locationName: 'Clapham Common',
        description: 'Richard Paul "Rick" Astley (born 6 February 1966) is an English singer, songwriter and radio personality. His 1987 song "Never Gonna Give You Up" was a No. 1 hit single in 25 countries and won the 1988 Brit Award for Best British Single. By the time of his retirement in 1993, Astley had sold approximately 40 million records worldwide.Astley made a comeback in 2007, becoming an Internet phenomenon when the music video for "Never Gonna Give You Up" became integral to the meme known as "rickrolling". Astley was voted "Best Act Ever" by Internet users at the MTV Europe Music Awards 2008, and his 2016 album 50 debuted in the UK at No. 1.',
        price: '£75'
      },{
        createdBy: members[1],
        bandName: 'Vengaboys',
        image: 'https://i.ytimg.com/vi/vjlttHcMTtw/maxresdefault.jpg',
        location: 'https://goo.gl/tSzZLa',
        locationName: 'The o2',
        description: 'The Vengaboys are a Dutch Eurodance group based in Rotterdam. The brainchild of two Dutch producers Wessel van Diepen and Dennis van den Driesschen (Danski and Delmundo), the group consists of lead vocalist Kim Sasabone, vocalist Denise Post-Van Rijswijk and male vocalists Robin Pors and Donny Latupeirissa. Contrary to what the group\'s name suggests, the Vengaboys features male and female performers. The Vengaboys enjoyed commercial success in the late 1990s. They are best known for their hit singles "We Like to Party", "Boom, Boom, Boom, Boom!!" and "We\'re Going to Ibiza" the latter two of which topped the charts in the United Kingdom. They have sold an estimated 25 million records worldwide. On 2 May 2001, the World Music Awards awarded Vengaboys with the award for best-selling dance group of the year.',
        price: '£50'
      }]);
  })
  .then((events) => console.log(`${events.length} Cool events near you!`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
