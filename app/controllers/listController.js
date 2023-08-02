const { List } = require("../models"); //                    Import du modèle depuis l'index des models.

const listController = {
  //                                                         Définition du controler avec différentes actions pour gérer les requetes liées aux listes.
  /*---------- Récupération de toutes les listes ----------- Avec leurs cartes et les tags associés --------- */
  getAllLists: async (req, res) => {
    try {
      const lists = await List.findAll({
        //                                                   Recupération de toutes les listes avec leurs cartes et tags associés en utilisant la méthode 'findAll' du modèle List.
        include: {
          association: "cards", //                           On inclue l'Association "cards" définie dans le modèle List.
          include: "tags", //                                Pour chaques card, on inclue l'association "tags" définie dans le modèle Card.
        },
        order: [
          ["position", "ASC"], //                            Trier les listes par position (Ascendante).
          ["cards", "position", "ASC"], //                   Trier les cartes de chaque liste par position (Ascendante).
        ],
      });

      res.status(200).json(lists); //                        Renvoie de la réponse avec un code 200 et envoie les listes récupèrées au format JSON.
    } catch (error) {
      console.trace(error); //                               En cas d'erreur, afficher l'erreur en console.
      res.status(500).json(error.toString()); //             Renvoi d'une réponse avec code 500 (Internal Server Error) et envoi de l'erreur au format JSON.
    }
  },

  /*---------- Récupération d'une liste -------------------- Avec ses cartes et les tags associés ---------- */
  getOneList: async (req, res) => {
    try {
      const listId = req.params.id; //                        On récupère l'ID de la liste à partir des paramètres de la requete (l'ID est passé dans l'URL)
      const list = await List.findByPk(listId, {
        include: {
          association: "cards", //                           On inclue l'association cards (une liste avec ses cartes).
          include: "tags", //                                Pour chaque carte, on inclue l'association tags (une carte avec ses tags).
        },
        order: [
          ["cards", "position", "ASC"], //                   On trie les cartes par position ascendante.
        ],
      });
      if (list) {
        res.status(200).json(list); //                       Si on a bien récupèré la liste, on renvoie la liste avec un code 200
      } else {
        res.status(404).json("Can't find list" + listId); // Sinon réponse avec un code 404 (Not found) et renvoi un message d'erreur.
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  /*---------- Création d'une liste ---------------------- */
  createList: async (req, res) => {
    try {
      const { name, position } = req.body; //                Recupération les données (name,position) envoyées dans le body (le corp de la requete).
      const bodyErrors = []; //                              Création d'un array dans lequel on glissera les erreurs eventuelles.
      if (!name) {
        bodyErrors.push("name can not be empty"); //         Si le 'name' est absent de la requete, on glisse l'erreur dans l'array bodyErrors.
        //                                                   Si il y avait d'autres erreurs a tester, on pourrait glisser les erreurs. Cela permet de lister les différentes erreurs
        //                                                   Et de renvoyer le tout au front-end. Ex: 'Name Can't be empty' + 'Position can't be empty? ...
      }

      if (bodyErrors.length) {
        res.status(400).json(bodyErrors); //                 Si il y a qqch dans le tableau, donc une (ou plusieurs) erreurs, on envoie la liste d'erreur avec le code 400: Requete incorrecte.
      } else {
        //                                                   Sinon, si il n'y pas d'erreurs, on crée une instance de la liste avec .build().
        let newList = List.build({
          name,
          position,
        });
        await newList.save(); //                             On enregistre l'instance crée dans la BDD.
        res.status(201).json(newList); //                    On répond avec la liste crée.
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  /*---------- Modification d'une liste ----------------- */
  modifyList: async (req, res) => {
    try {
      const listId = req.params.id; //                       Récupération de l'ID de la liste à modifier.
      const list = await List.findByPk(listId); //           On va chercher la liste dans la BDD.
      if (!list) {
        res.status(404).send("Can't find list" + listId); // Si la liste n'existe pas, on retourne une erreur 404 (Not Found).
      } else {
        const { name, position } = req.body; //              Sinon, si la liste existe, on récupère les nouvelles infos dans le body.
        //                                                   On ne change que les paramètres présents.
        if (name) {
          list.name = name; //                               Si 'name' est présent dans le body, on change le 'name' de l'objet instancié 'list'.
        }
        if (position) {
          list.position = position; //                       Si 'position' est présent dans le body, on change la position de l'objet instancé 'list'.
        }
        await list.save(); //                                Une fois toutes les modifications faites, on enregistre l'instance dans la BDD.
        res.status(200).json(list); //                       Une fois l'instance enregistrée, on envoi la liste en réponse à la requete.
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  /*---------- Suppression d'une liste ----------------- */
  deleteList: async (req, res) => {
    try {
      const listId = req.params.id; //                       Récupération de l'ID de la liste à partir des paramètres de la requête (l'identifiant est passé dans l'URL).
      const list = await List.findByPk(listId); //           Recherche de la liste spécifique dans la base de données en utilisant la méthode findByPk du modèle List.
      if (list) {
        await list.destroy(); //                             Si la liste existe, supprimer la liste de la base de données en utilisant la méthode destroy().
        res.status(200).json("Ok"); //                       Puis, Répondre avec un code HTTP 200 (OK) et envoyer une réponse 'Ok' au format JSON.
      } else {
        res.status(404).json(`List with ID ${listId} not found`); // Si la liste n'est pas trouvée Réponse avec un code 404 (Not Found) et un message indiquant que la liste n'a pas été trouvée.
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = listController; //                         Exportation du controller listController.
