require('dotenv').config();
const express = require('express');
const { sequelize, Track } = require('./database/setup');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/tracks', async (req, res) => {
  try {
    const tracks = await Track.findAll();
    return res.json(tracks);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch tracks.', error: error.message });
  }
});

app.get('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (!track) {
      return res.status(404).json({ message: 'Track not found.' });
    }
    return res.json(track);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch track.', error: error.message });
  }
});

app.post('/api/tracks', async (req, res) => {
  try {
    const { songTitle, artistName, albumName, genre, duration, releaseYear } = req.body;

    if (!songTitle || !artistName || !albumName || !genre) {
      return res.status(400).json({
        message: 'songTitle, artistName, albumName, and genre are required fields.',
      });
    }

    const newTrack = await Track.create({
      songTitle,
      artistName,
      albumName,
      genre,
      duration,
      releaseYear,
    });

    return res.status(201).json(newTrack);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create track.', error: error.message });
  }
});

app.put('/api/tracks/:id', async (req, res) => {
  try {
    const [updatedRows] = await Track.update(req.body, {
      where: { trackId: req.params.id },
    });

    if (!updatedRows) {
      return res.status(404).json({ message: 'Track not found.' });
    }

    const updatedTrack = await Track.findByPk(req.params.id);
    return res.json(updatedTrack);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update track.', error: error.message });
  }
});

app.delete('/api/tracks/:id', async (req, res) => {
  try {
    const deletedRows = await Track.destroy({
      where: { trackId: req.params.id },
    });

    if (!deletedRows) {
      return res.status(404).json({ message: 'Track not found.' });
    }

    return res.status(200).json({ message: 'Track deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete track.', error: error.message });
  }
});

async function startServer() {
  try {
    await sequelize.authenticate();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to database:', error);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = app;
