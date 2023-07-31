const List = require("./List"); //              Import de nos modèles
const Card = require("./Card");
const Tag = require("./Tag");

/* Associations */
// One-to-one : hasOne + belongsTo
// One-to-Many : hasMany + belongsTo
// Many-to-Many: belongsToMany (through) + belongsToMany (through)

/* List <-> Card (One-To-Many) */
List.hasMany(Card, {
  foreignKey: "list_id", //                     Définit la clé étrangère "list_id" dans la table Card pour la relation One-To-Many.
  as: "cards", //                               Spécifie le nom de l'alias "cards" pour la relation List <-> Card. L'alias va désigner les cartes qui sont contenues dans une liste
});
Card.belongsTo(List, {
  foreignKey: "list_id", //                     Foreign key = Le point commun entre list et card. Définit la clé étrangère "list_id" dans la table Card pour la relation One-To-Many.
  as: "list", //                                Spécifie le nom de l'alias "list" pour la relation List <-> Card
});

/* Card <-> Tag (Many-to-Many) */
Card.belongsToMany(Tag, {
  foreignKey: "card_id", //                     Définit la clé étrangère "card_id" dans la table intermédiaire "card_has_tag"
  otherKey: "tag_id", //                        Définit la clé étrangère "tag_id" dans la table intermédiaire "card_has_tag"
  as: "tags", //                                Spécifie le nom de l'alias "tags" pour la relation Card <-> Tag
  through: "card_has_tag", //                   Spécifie la table intermédiaire qui relie les tables Card et Tag
});
Tag.belongsToMany(Card, {
  foreignKey: "tag_id",
  otherKey: "card_id",
  as: "cards",
  through: "card_has_tag",
});

module.exports = { List, Card, Tag }; //        Exporte les modèles pour les utiliser dans l'application
