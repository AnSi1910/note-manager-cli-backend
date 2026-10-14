const noteService = require('../services/noteService');

class NoteController {
    // Категорії
    async getCategories(req, res, next) {
        try {
            const categories = await noteService.getAllCategories();
            res.json(categories);
        } catch (error) {
            next(error);
        }
    }

    async createCategory(req, res, next) {
        try {
            const { title } = req.body;
            if (!title) {
                return res.status(400).json({ error: 'Назва категорії є обов\'язковою' });
            }
            const category = await noteService.createCategory(title);
            res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    }

    // Нотатки
    async getNotes(req, res, next) {
        try {
            const { search } = req.query;
            const notes = await noteService.getAllNotes(search);
            res.json(notes);
        } catch (error) {
            next(error);
        }
    }

    async getNoteById(req, res, next) {
        try {
            const note = await noteService.getNoteById(req.params.id);
            if (!note) {
                return res.status(404).json({ error: 'Нотатку не знайдено' });
            }
            res.json(note);
        } catch (error) {
            next(error);
        }
    }

    async createNote(req, res, next) {
        try {
            const { title, content, CategoryId } = req.body;
            if (!title || !content) {
                return res.status(400).json({ error: 'Заголовок та вміст обов\'язкові' });
            }
            const note = await noteService.createNote(title, content, CategoryId);
            res.status(201).json(note);
        } catch (error) {
            next(error);
        }
    }

    async updateNote(req, res, next) {
        try {
            const { title, content, CategoryId } = req.body;
            const updatedNote = await noteService.updateNote(req.params.id, title, content, CategoryId);
            if (!updatedNote) {
                return res.status(404).json({ error: 'Нотатку не знайдено' });
            }
            res.json(updatedNote);
        } catch (error) {
            next(error);
        }
    }

    async deleteNote(req, res, next) {
        try {
            const deleted = await noteService.deleteNote(req.params.id);
            if (!deleted) {
                return res.status(404).json({ error: 'Нотатку не знайдено' });
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new NoteController();