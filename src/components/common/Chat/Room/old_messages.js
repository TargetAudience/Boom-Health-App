module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    text:
      "No problem",
    createdAt: new Date(Date.UTC(2019, 3, 5, 17, 20, 0)),
    user: {
      _id: 2,
      name: "Robert Stevenson"
    }
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "Thanks for taking my shift last week.",
    createdAt: new Date(Date.UTC(2019, 3, 5, 17, 20, 0)),
    user: {
      _id: 1,
      name: "Josh Winter"
    }
  }
];
