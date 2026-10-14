const { Note, Category } = require('../models/Note');

class NoteService {
    // Категорії
    async getAllCategories() {
        return await Category.findAll();
    }

    async createCategory(title) {
        return await Category.create({ title });
    }

    // Нотатки
    async getAllNotes(search) {
        const options = { include: Category };
        const notes = await Note.findAll(options);

        if (search) {
            const query = search.toLowerCase();
            return notes.filter(note => 
                note.title.toLowerCase().includes(query) || 
                note.content.toLowerCase().includes(query)
            );
        }
        return notes;
    }

    async getNoteById(id) {
        return await Note.findByPk(id, { include: Category });
    }

    async createNote(title, content, CategoryId) {
        return await Note.create({ title, content, CategoryId });
    }

    async updateNote(id, title, content, CategoryId) {
        const note = await Note.findByPk(id);
        if (!note) return null;
        
        note.title = title !== undefined ? title : note.title;
        note.content = content !== undefined ? content : note.content;
        note.CategoryId = CategoryId !== undefined ? CategoryId : note.CategoryId;
        
        await note.save();
        return note;
    }

    async deleteNote(id) {
        const note = await Note.findByPk(id);
        if (!note) return false;
        await note.destroy();
        return true;
    }
}

module.exports = new NoteService();