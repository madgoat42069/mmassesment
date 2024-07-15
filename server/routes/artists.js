const router = require('express').Router();
const Artist = require('../models/artist.model');

// Get artist, album, and song suggestions
router.route('/suggestions').get((req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.json([]);
  }

  const regex = new RegExp(query, 'i'); // case-insensitive regex search

  Artist.find({
    $or: [
      { name: regex },
      { 'albums.title': regex },
      { 'albums.songs.title': regex }
    ]
  })
    .limit(10) // limit to 10 results
    .then((artists) => {
      const artistNames = new Set();
      const albumTitles = new Set();
      const songTitles = new Set();

      artists.forEach(artist => {
        if (regex.test(artist.name)) {
          artistNames.add(artist.name);
        }

        artist.albums.forEach(album => {
          if (regex.test(album.title)) {
            albumTitles.add(album.title);
          }

          album.songs.forEach(song => {
            if (regex.test(song.title)) {
              songTitles.add(song.title);
            }
          });
        });
      });

      const suggestions = [
        ...Array.from(artistNames).map(name => ({ type: 'Artist', name })),
        ...Array.from(albumTitles).map(title => ({ type: 'Album', title })),
        ...Array.from(songTitles).map(title => ({ type: 'Song', title }))
      ];

      res.json(suggestions);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
