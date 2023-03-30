const {Sequelize} = require('sequelize');

// Si on met en place dotenv sur ce fichier, il va chercher le fichier .env dans /app. Or le fichier .env est à la racine du projet. 
// On attendra de finir l'atelier jour 3 pour mettre en place dotenv dans notre index.js (c'est a dire le fichier point d'entrée)

// On charge l'url PG
const PG_URL = process.env.PG_URL || "postgres://okanban2:okanban@localhost:5432/okanban2";

const defineAttributes = {
    define: {
        underscored: true,          // On indique à sequelize de passer en mode snake case
        createdAt: "created_at",    // On indique à sequelize la syntaxe pour nos timestamps
        updatedAt: "updated_at",
    }
}

const sequelize = new Sequelize(PG_URL, defineAttributes);

module.exports = sequelize;