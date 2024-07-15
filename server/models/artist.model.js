const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({
    title: { type: String, required: true },
    length: { type: String, required: true }
});

const albumSchema = new Schema({
    title: { type: String, required: true },
    songs: [songSchema],
    description: { type: String, required: true }
});

const artistSchema = new Schema({
    name: { type: String, required: true, unique: true },
    albums: [albumSchema]
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;