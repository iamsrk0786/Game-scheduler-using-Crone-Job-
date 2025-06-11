import cron from 'node-cron';
import axios from 'axios';
import Game from './models/game.js';

const fetchAndUpdateGameData = async () => {
  try {
    const { data } = await axios.get('https://api.example.com/games');

    for (const game of data) {
      const existing = await Game.findOne({
        title: game.title,
        date: new Date(game.date),
      });

      if (!existing) {
        await Game.create({
          title: game.title,
          date: new Date(game.date),
          teams: game.teams,
        });
      }
    }

    console.log('Game data updated successfully');
  } catch (err) {
    console.error('Failed to update game data:', err);
  }
};

cron.schedule('0 0 * * *', fetchAndUpdateGameData);
