const { Model, DataTypes } = require('sequelize');
// une autre manière d'importer le modèle
// const Model = require('sequelize').Model
const sequelize = require('../db');

class Tag extends Model {}

Tag.init({
    name: DataTypes.TEXT,
    color: DataTypes.TEXT,
}, 
{
    sequelize,
    tableName: "tag"
})

module.exports = Tag;