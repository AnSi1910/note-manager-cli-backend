const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Category = require('./Category');

const Note = sequelize.define('Note', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

Category.hasMany(Note, { onDelete: 'CASCADE' });
Note.belongsTo(Category);

module.exports = { Note, Category };