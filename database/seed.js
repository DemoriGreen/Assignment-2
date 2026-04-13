const { sequelize, Track } = require('./setup');

const sampleTracks = [
  {
    songTitle: 'Blinding Lights',
    artistName: 'The Weeknd',
    albumName: 'After Hours',
    genre: 'Pop',
    duration: 200,
    releaseYear: 2019,
  },
  {
    songTitle: 'Levitating',
    artistName: 'Dua Lipa',
    albumName: 'Future Nostalgia',
    genre: 'Pop',
    duration: 203,
    releaseYear: 2020,
  },
  {
    songTitle: 'Bad Guy',
    artistName: 'Billie Eilish',
    albumName: 'When We All Fall Asleep, Where Do We Go?',
    genre: 'Alternative',
    duration: 194,
    releaseYear: 2019,
  },
  {
    songTitle: 'Uptown Funk',
    artistName: 'Mark Ronson ft. Bruno Mars',
    albumName: 'Uptown Special',
    genre: 'Funk',
    duration: 269,
    releaseYear: 2014,
  },
  {
    songTitle: 'Lose Yourself',
    artistName: 'Eminem',
    albumName: '8 Mile',
    genre: 'Hip-Hop',
    duration: 326,
    releaseYear: 2002,
  },
];

async function seedDatabase() {
  try {
    await sequelize.authenticate();
    await Track.bulkCreate(sampleTracks);
    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
}

if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, sampleTracks };
