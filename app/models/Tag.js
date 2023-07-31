const { Model, DataTypes } = require("sequelize"); // Importe les classes Model et DataTypes de Sequelize.
const sequelize = require("../db"); //                Importe le fichier de configuration et d'instanciation de Sequelize.

class Tag extends Model {} //                         Crée la classe Tag et indique qu'elle sera la classe fille de la classe Model (héritage).

Tag.init(
  //                                                  Méthode founie par Sequelize pour initialiser le modèle Tag avec ses attributs et options de configuration
  {
    name: DataTypes.TEXT,
    color: DataTypes.TEXT,
  },
  {
    sequelize, //                                     Utilise l'instance de Sequelize pour la configuration de la classe List.
    tableName: "tag", //                              Spécifie le nom de la table associée à la classe Tag dans la base de données (ici, "tag").
  }
);

module.exports = Tag; //                              Exporte la classe Tag pour pouvoir l'utiliser ailleurs dans l'app.
