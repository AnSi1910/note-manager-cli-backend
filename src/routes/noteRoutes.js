const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Отримати список усіх категорій
 *     responses:
 *       200:
 *         description: Список категорій успішно отримано
 */
router.get('/categories', noteController.getCategories);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Створити нову категорію
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Категорія створена
 */
router.post('/categories', noteController.createCategory);

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Отримати список нотаток (з можливістю пошуку)
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Ключове слово для пошуку
 *     responses:
 *       200:
 *         description: Список нотаток
 */
router.get('/notes', noteController.getNotes);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Отримати нотатку за ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Знайдена нотатка
 *       404:
 *         description: Не знайдено
 */
router.get('/notes/:id', noteController.getNoteById);

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Створити нову нотатку
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               CategoryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Нотатка створена
 */
router.post('/notes', noteController.createNote);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Оновити нотатку
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               CategoryId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Нотатка оновлена
 */
router.put('/notes/:id', noteController.updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Видалити нотатку
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Видалено успішно
 */
router.delete('/notes/:id', noteController.deleteNote);

module.exports = router;