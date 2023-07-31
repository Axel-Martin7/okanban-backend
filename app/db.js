const { Sequelize } = require("sequelize"); //                                     J'importe Sequelize

const PG_URL =
  process.env.PG_URL || "postgres://okanban1:okanban1@localhost:5432/okanban1"; // On charge l'url PG.
//                                                                                 Si je met en place dotenv sur le fichier, il va chercher le fichier .env dans /app. Or le .env est à la racine du projet.
//                                                                                 Je metterais en place le dotenv plus tard dans mon index.js (point d'entrée)
//                                                                                 En attendant, je met une valeur de secour.
const defineAttributes = {
  define: {
    underscored: true, //                                                          On indique à Sequelize de passer en mode snake case.
    createdAt: "created_at", //                                                    On indique à Sequelize la syntaxe pour nos timestampz
    updatedAt: "updated_at",
  },
};

const sequelize = new Sequelize(PG_URL, defineAttributes); //                      Création de l'instance Sequelize en utilisant l'URL de la BDD et les options définie.

module.exports = sequelize; //                                                     On exporte Sequelize
