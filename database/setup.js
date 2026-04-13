require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const isProduction = process.env.NODE_ENV === 'production';
const dbStorage = isProduction
  ? process.env.PROD_DB_STORAGE || 'music_library.prod.db'
  : process.env.DEV_DB_STORAGE || 'music_library.db';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbStorage,
  logging: false,
});

const Track = sequelize.define(
  'Track',
  {
    trackId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    songTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    artistName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    albumName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    releaseYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1800,
      },
    },
  },
  {
    tableName: 'tracks',
    timestamps: false,
  }
);

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    await sequelize.sync({ force: true });
    console.log('Database and tables created successfully.');
  } catch (error) {
    console.error('Unable to initialize database:', error);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
}

if (require.main === module) {
  initializeDatabase();
}

module.exports = { sequelize, Track, initializeDatabase };
