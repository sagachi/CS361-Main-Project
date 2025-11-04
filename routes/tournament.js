// routes/tournament.js
import express from 'express';
import Tournament from '../models/Tournament.js';

const router = express.Router();

// Create tournament
router.post('/create', async (req, res) => {
  try {
    const { name, location, date, time, logo, userId } = req.body;

    // Validate required fields
    if (!name || !location || !date || !time || !userId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new tournament
    const newTournament = new Tournament({
      name,
      location,
      date,
      time,
      logo,
      userId,
    });

    await newTournament.save();

    res.status(201).json({
      message: 'Tournament created successfully',
      tournament: newTournament,
    });
  } catch (error) {
    console.error('Create tournament error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all tournaments for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const tournaments = await Tournament.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      tournaments,
    });
  } catch (error) {
    console.error('Get tournaments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete tournament
router.delete('/:tournamentId', async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const tournament = await Tournament.findByIdAndDelete(tournamentId);

    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    res.status(200).json({
      message: 'Tournament deleted successfully',
    });
  } catch (error) {
    console.error('Delete tournament error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;