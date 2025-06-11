import Game from '../models/game.js';

const getGamesByDate = async (date, direction, limit = 30) => {
  const inputDate = new Date(date);

  for (let i = 0; i <= limit; i++) {
    const queryDate = new Date(inputDate);
    if (direction === 'down') {
      queryDate.setDate(inputDate.getDate() - i);
    } else {
      queryDate.setDate(inputDate.getDate() + i);
    }

    const startOfDay = new Date(queryDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(queryDate);
    endOfDay.setHours(23, 59, 59, 999);

    const games = await Game.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    }).exec();

    if (games.length > 0) {
      return games;
    }
  }

  return null;
};

export const getGamesByDateHandler = async (req, res) => {
  try {
    const { date, direction, limit } = req.query;

    if (!date || !direction || (direction !== 'up' && direction !== 'down')) {
      return res.status(400).json({
        error: '"date" and "direction" (up/down) query params are required.',
      });
    }

    const limitNumber = limit ? parseInt(limit, 10) : 30;

    const games = await getGamesByDate(date, direction, limitNumber);

    if (!games) {
      return res.status(404).json({ message: 'No games found in given range.' });
    }

    return res.status(200).json(games);
  } catch (error) {
    console.error('Error in getGamesByDateHandler:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
