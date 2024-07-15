const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
const Artist = require('./models/artist.model');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// MongoDB connection
mongoose.connect('mongodb://localhost/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const { connection } = mongoose;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Input validation middleware
const validateArtistInput = [
  body('name').trim().isLength({ min: 1 }).escape(),
];
const validateAlbumInput = [
  body('title').trim().isLength({ min: 1 }).escape(),
  body('description').trim().isLength({ min: 1 }).escape(),
];

// Routes
const artistsRouter = express.Router();

artistsRouter.get('/:index/details', async (req, res) => {
  try {
    const albumIndex = parseInt(req.params.index, 10); // Parse index as integer
    const albumDetails = await getAlbumDetailsByIndex(albumIndex);

    if (!albumDetails) {
      return res.status(404).json({ error: 'Album not found' });
    }

    res.json(albumDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

const getAlbumDetailsByIndex = async (albumIndex) => {
  try {
    const artists = await Artist.find();
    const albums = [];

    // Gather all albums from all artists into a single array
    artists.forEach(artist => {
      artist.albums.forEach(album => {
        albums.push(album);
      });
    });

    if (albumIndex < 0 || albumIndex >= albums.length) {
      return null; // Index out of bounds
    }

    const album = albums[albumIndex];
    return {
      title: album.title,
      description: album.description,
      songs: album.songs.map(song => ({
        title: song.title,
        length: song.length
      })),
    };
  } catch (err) {
    throw new Error(`Error: ${err.message}`);
  }
};

// Get all artists
artistsRouter.route('/').get((req, res) => {
  Artist.find()
    .then((artists) => res.json(artists))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});
artistsRouter.route('/suggestions').get(async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.json([]);
  }

  try {
    const artists = await Artist.find({ name: new RegExp(query, 'i') }).limit(10);
    const albums = await Artist.aggregate([
      { $unwind: '$albums' },
      { $match: { 'albums.title': new RegExp(query, 'i') } },
      { $project: { _id: 0, title: '$albums.title' } },
      { $limit: 10 }
    ]);
    const songs = await Artist.aggregate([
      { $unwind: '$albums' },
      { $unwind: '$albums.songs' },
      { $match: { 'albums.songs.title': new RegExp(query, 'i') } },
      { $project: { _id: 0, title: '$albums.songs.title' } },
      { $limit: 10 }
    ]);

    const suggestions = [
      ...artists.map(artist => ({ type: 'Artist', name: artist.name })),
      ...albums.map(album => ({ type: 'Album', title: album.title })),
      ...songs.map(song => ({ type: 'Song', title: song.title }))
    ];

    res.json(suggestions);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});


// Add a new artist
// eslint-disable-next-line consistent-return
artistsRouter.route('/add').post(validateArtistInput, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const newArtist = new Artist({ name, albums: [] });

  newArtist.save()
    .then(() => res.json('Artist added!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Update an artist
// eslint-disable-next-line consistent-return
artistsRouter.route('/update/:id').post(validateArtistInput, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Artist.findById(req.params.id)
    .then((artist) => {
      artist.name = req.body.name;
      artist.albums = req.body.albums || artist.albums;

      artist.save()
        .then(() => res.json('Artist updated!'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Add an album to an artist
// eslint-disable-next-line consistent-return
artistsRouter.route('/:id/albums/add').post(validateAlbumInput, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Artist.findById(req.params.id)
    .then((artist) => {
      const newAlbum = {
        title: req.body.title,
        description: req.body.description,
        songs: [],
      };
      artist.albums.push(newAlbum);

      artist.save()
        .then(() => res.json('Album added!'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Delete an artist
artistsRouter.route('/:id').delete((req, res) => {
  Artist.findByIdAndDelete(req.params.id)
    .then(() => res.json('Artist deleted.'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Delete an album from an artist
artistsRouter.route('/:artistId/albums/:albumId').delete((req, res) => {
  Artist.findById(req.params.artistId)
    .then((artist) => {
      artist.albums.id(req.params.albumId).remove();
      artist.save()
        .then(() => res.json('Album deleted.'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

artistsRouter.route('/albums').get((req, res) => {
  Artist.find()
    .then((artists) => {
      const allAlbumNames = artists.flatMap(artist => artist.albums.map(album => album.title));
      res.json(allAlbumNames);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

app.use('/api/artists', artistsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
