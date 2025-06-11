import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true, index: true },
  teams: [{ type: String, required: true }],
});

const Game = mongoose.model('Game', GameSchema);

export default Game;


