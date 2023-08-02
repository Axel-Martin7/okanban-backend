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
          //                                               Si la nouvelle valeur 'name' est présente dans le corps de la requête, met à jour la propriété 'name' de l'objet tag avec cette nouvelle valeur.
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
};

module.exports = tagController;
