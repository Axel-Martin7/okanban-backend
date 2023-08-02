const { Tag, Card } = require("../models");

const tagController = {
  /*---------- Récupération de tous les tags ----------- */
  getAllTags: async (req, res) => {
    try {
      const tags = await Tag.findAll();
      res.status(200).json(tags);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  /*---------- Récupération d'un tag ----------- */
  getOneTag: async (req, res) => {
    try {
      const tagId = req.params.id;
      const tag = await Tag.findByPk(tagId, {
        include: "cards",
      });
      if (!tag) {
        res.status(404).json("can not find tag with id" + tagId);
      } else {
        res.status(200).json(tag);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  /*---------- Création d'un tag ----------- */
  createTag: async (req, res) => {
    try {
      const { name, color } = req.body; //                            Récupération des valeurs 'name' et 'color' à partir du corps de la requête. Ces valeurs seront utilisées pour créer un nouveau tag.
      let bodyErrors = []; //                                         Initialisation d'un tableau vide pour stocker les erreurs de validation du corps de la requête.
      if (!name) {
        bodyErrors.push("name can not be empty"); //                  Si le champ 'name' est vide, ajoute un message d'erreur au tableau des erreurs.
      }
      if (!color) {
        bodyErrors.push("color can not be empty"); //                 Si le champ 'color' est vide, ajoute un message d'erreur au tableau des erreurs.
      }

      if (bodyErrors.length) {
        res.status(400).json(bodyErrors); //                          Si des erreurs de validation sont présentes dans le tableau, renvoie une réponse avec un code 400 (Bad Request) et envoie les erreurs au format JSON en réponse à la requête.
      } else {
        let newTag = Tag.build({ name, color }); //                   Si aucune erreur de validation n'est présente, crée un nouvel objet de modèle 'Tag' avec les valeurs 'name' et 'color' récupérées du corps de la requête.
        await newTag.save(); //                                       Enregistre le nouveau tag dans la base de données en utilisant la méthode 'save()'.
        res.status(201).json(newTag); //                              Réponse avec un code 201 (Created) pour indiquer que le tag a été créé avec succès, et envoie le nouveau tag créé au format JSON en réponse à la requête.
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  /*---------- Modification d'un tag ----------- */
  modifyTag: async (req, res) => {
    try {
      const tagId = req.params.id;
      const { name, color } = req.body;

      let tag = await Tag.findByPk(tagId);
      if (!tag) {
        res.status(404).json("Can not find tag with id" + tagId);
      } else {
        if (name) {
          //                                                         Si la nouvelle valeur 'name' est présente dans le corps de la requête, met à jour la propriété 'name' de l'objet tag avec cette nouvelle valeur.
          tag.name = name;
        }
        if (color) {
          tag.color = color;
        }
        await tag.save();
        res.status(200).json(tag);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  /*---------- Supression d'un tag ----------- */
  deleteTag: async (req, res) => {
    try {
      const tagId = req.params.id; //                                Récupération de l'ID du tag à supprimer à partir des paramètres de la requête (l'identifiant est passé dans l'URL).
      let tag = await Tag.findByPk(tagId);
      if (!tag) {
        res.status(404).json("Can not find tag with id" + tagId);
      } else {
        await tag.destroy();
        res.status(200).json("Ok");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  /*---------- Association d'un tag à une carte ----------- */
  associateTagToCard: async (req, res) => {
    try {
      console.log(req.body);
      const cardId = req.params.id; //                                Récupération de l'ID de la carte à partir des paramètres de la requête (l'identifiant est passé dans l'URL).
      const tagId = req.body.tag_id; //                               Récupération de l'ID du tag à associer à la carte à partir du corps de la requête.

      let card = await Card.findByPk(cardId, {
        include: ["tags"], //                                         Recherche de la carte spécifique dans la bdd en utilisant l'ID de la carte, en incluant également ses tags associés dans le résultat.
      });
      if (!card) {
        return res.status(404).json("Can not find card with id" + cardId);
      }

      let tag = await Tag.findByPk(tagId); //                         Recherche du tag spécifique dans la base de données en utilisant l'ID du tag.
      if (!tag) {
        return res.status(404).json("Can not find card with id" + cardId);
      }

      await card.addTag(tag); //                                      Associe le tag à la carte en utilisant la méthode addTag() fournie automatiquement par Sequelize lorsqu'une relation many-to-many est définie entre les modèles.
      card = await Card.findByPk(cardId, {
        include: ["tags"], //                                         Après avoir associé le tag à la carte, on recherche à nouveau la carte dans la base de données, en incluant cette fois ses tags associés dans le résultat.
      });
      res.status(200).json(card);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  /*---------- Dissociation d'un tag d'une carte ----------- */
  removeTagFromCard: async (req, res) => {
    try {
      const { cardId, tagId } = req.params; //                        Récupération des ID de la carte et du tag à partir des paramètres de la requête (les identifiants sont passés dans l'URL).

      let card = await Card.findByPk(cardId); //                      Recherche de la carte spécifique dans la base de données en utilisant l'ID de la carte.
      if (!card) {
        return res.status(404).json("Can not find card with id" + cardId); // Si la carte n'est pas trouvée dans la base de données, renvoie une réponse avec un code de statut 404 (Not Found) et un message indiquant que la carte n'a pas été trouvée.
      }

      let tag = await Tag.findByPk(tagId); //                         Recherche du tag spécifique dans la base de données en utilisant l'ID du tag.
      if (!tag) {
        return res.status(404).json("Can not find tag with id" + tagId); // Si le tag n'est pas trouvé dans la base de données, renvoie une réponse avec un code de statut 404 (Not Found) et un message indiquant que le tag n'a pas été trouvé.
      }

      await card.removeTag(tag); //                                   Dissocie le tag de la carte en utilisant la méthode removeTag() fournie automatiquement par Sequelize lorsqu'une relation many-to-many est définie entre les modèles.
      card = await Card.findByPk(cardId, {
        include: ["tags"], //                                         Après avoir dissocié le tag de la carte, on recherche à nouveau la carte dans la base de données, en incluant cette fois ses tags associés dans le résultat.
      });
      res.status(200).json(card);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = tagController;
