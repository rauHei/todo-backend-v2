const express = require('express')
const router = express.Router();
const note = require('../containers/notecontainer')


router.get('/', note.getAllNotes)

router.post('/', note.addNote)

router.get('/:id', note.getCertainNote)

router.put('/:id', note.updateNoteContent)

router.delete('/:id', note.deleteNote)

module.exports = router;
