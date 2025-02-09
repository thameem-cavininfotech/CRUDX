// controllers/noteController.js
import Note from '../models/Note.js';

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
export const createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = new Note({
      title,
      content,
      user: req.user.id, // Attach the user ID from the request object
    });

    await note.save();
    res.status(201).json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get all notes for the logged-in user
// @route   GET /api/notes
// @access  Private
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }); // Only fetch notes for the logged-in user
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get a single note by ID
// @route   GET /api/notes/:id
// @access  Private
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    // Ensure the note belongs to the logged-in user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
export const updateNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    // Ensure the note belongs to the logged-in user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    note.title = title || note.title;
    note.content = content || note.content;

    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
import mongoose from 'mongoose';

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msg: 'Invalid Note ID' });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    // Ensure the note belongs to the logged-in user
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    await Note.findByIdAndDelete(id);
    res.json({ msg: 'Note removed' });
  } catch (err) {
    console.error('Delete Note Error:', err.message);
    res.status(500).send('Server error');
  }
};
