const { Model, DataTypes } = require("sequelize"); // Importe les classes Model et DataTypes de Sequelize.
const sequelize = require("../db"); //                Importe le fichier de configuration et d'instanciation de Sequelize.

class List extends Model {} //                        Crée la classe List et indique qu'elle sera la classe fille de la classe Model (héritage).

List.init(
  //                                                  Méthode founie par Sequelize pour initialiser le modèle List avec ses attributs et options de configuration
  {
    name: DataTypes.TEXT, //                          Définit la colonne "name" et son type.
    position: DataTypes.INTEGER, //                   Définit la colonne "position" et son type.
  },
  {
    sequelize, //                                     Utilise l'instance de Sequelize pour la configuration de la classe List.
    tableName: "list", //                             Spécifie le nom de la table associée à la classe List dans la base de données (ici, "list").
  }
);

module.exports = List; //                             Exporte la classe List pour pouvoir l'utiliser ailleurs dans l'app.
