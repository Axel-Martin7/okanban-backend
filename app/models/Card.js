const { Model, DataTypes } = require("sequelize"); // Importe les classes Model et DataTypes de Sequelize.
const sequelize = require("../db"); //                Importe le fichier de configuration et d'instanciation de Sequelize.

class Card extends Model {} //                        Crée la classe Card et indique qu'elle sera la classe fille de la classe Model (héritage).

Card.init(
  //                                                  Méthode founie par Sequelize pour initialiser le modèle Card avec ses attributs et options de configuration
  {
    title: DataTypes.TEXT,
    position: DataTypes.INTEGER, //                   Définit la colonne "position" et son type.
    color: DataTypes.TEXT,
    //                                                La définition de list_id se fera lorsqu'on va gérer nos associations
  },
  {
    sequelize, //                                     Utilise l'instance de Sequelize pour la configuration de la classe Card.
    tableName: "card", //                             Spécifie le nom de la table associée à la classe Card dans la base de données (ici, "card").
  }
);

module.exports = Card; //                             Exporte la classe Card pour pouvoir l'utiliser ailleurs dans l'app.
