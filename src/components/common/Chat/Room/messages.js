module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Sure, please send over a request and I\'ll approve it.',
    createdAt: new Date(Date.UTC(2019, 4, 12, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Josh Winter',
    },
    // sent: true,
    // received: true,
    // location: {
    //   latitude: 48.864601,
    //   longitude: 2.398704
    // },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Can you take my shifts on Thursday?',
    createdAt: new Date(Date.UTC(2019, 4, 12, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'Robert Stevenson',
    },
  }
];
