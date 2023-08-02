const { Card } = require("../models"); //                                  Import du modèle depuis l'index des models.

const cardController = {
  /*---------- Récupération de toutes les cartes d'une liste ------------  et les tags associés aux cartes --------- */
  getCardsInList: async (req, res) => {
    try {
      const listId = req.params.id; //                                     Récupération de l'ID de la liste à partir des paramètres de la requête.
      const cards = await Card.findAll({
        where: {
          list_id: listId, //                                              Filtre les cartes en fonction de l'ID de la liste.
        },
        include: "tags", //                                                Inclut les tags associés à chaque carte.
        order: [
          ["position", "ASC"], //                                          Trie les cartes par leur position en ordre croissant.
        ],
      });
      if (!cards) {
        res.status(404).json("Can't find cards with list_id" + listId); // Si aucune carte n'est trouvée, renvoyer une réponse avec code 404 (Not Found).
      } else {
        res.json(cards); //                                                Sinon, renvoie les cartes au format JSON en réponse à la requête.
      }
    } catch (error) {
      console.trace(error); //                                             En cas d'erreur, afficher l'erreur en console.
      res.status(500).json(error.toString()); //                           Renvoi d'une réponse avec code 500 (Internal Server Error) et envoi de l'erreur au format JSON.
    }
  },

  /*---------- Récupération d'une carte ---------------------------------  avec les tags qui lui sont associés --------- */
  getOneCard: async (req, res) => {
    try {
      const cardId = req.params.id; //                                     Récupération de l'ID de la carte à partir des paramètres de la requête.
      const card = await Card.findByPk(cardId, {
        include: "tags", //                                                Inclut les tags associés à la carte.
        order: [["position", "ASC"]], //                                   Trie les tags par leur position en ordre croissant.
      });
      if (!card.length) {
        //                                                                 J'utilise le .length car 'card' est un objet représentant une seule carte, on vérifie si c'est 'null'.
        //                                                                 Dans la méthode 'getCardsInList' j'utilise seulement '(!cards)' car 'cards' est un tableau de cartes, et je vérifie si il est vide.
        res.status(404).json("Can't find card with id" + cardId); //       Si aucune carte n'est trouvée, renvoie une réponse avec le code 404 (Not Found).
      } else {
        res.json(card); //                                                 Sinon, renvoie la carte trouvée au format JSON en réponse à la requête.
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  /*---------- Création d'une carte ----------------------------------- */
  createCard: async (req, res) => {
    try {
      const { title, color, position, list_id } = req.body; //            Récupération des paramètres du corps de la requête
      let bodyErrors = []; //                                             Création d'un tableau pour stocker les éventuelles erreurs liées aux paramètres du corps de la requête.
      if (!title) {
        bodyErrors.push("title can not be empty"); //                     Vérification si le paramètre 'title' est présent dans le corps de la requête. Si non, on ajoute une erreur au tableau 'bodyErrors'.
      }
      if (!list_id) {
        bodyErrors.push("list_id can not be empty"); //                   Vérification si le paramètre 'list_id' est présent dans le corps de la requête. Si non, on ajoute une erreur au tableau 'bodyErrors'.
      }

      if (bodyErrors.length) {
        res.status(400).json(bodyErrors); //                              Si le tableau 'bodyErrors' contient des erreurs, on renvoie une réponse avec le code d'erreur 400 (Bad Request) et on envoie les erreurs au format JSON.
      } else {
        let newCard = Card.build({ title, list_id }); //                  Sinon, si les paramètres sont valides, on crée une nouvelle instance de la classe 'Card' avec les paramètres 'title' et 'list_id'.
        if (color) {
          newCard.color = color; //                                       Si le paramètre 'color' est présent dans le corps de la requête, on l'ajoute à la nouvelle carte.
        }
        if (position) {
          newCard.position = position; //                                 Si le paramètre 'position' est présent dans le corps de la requête, on l'ajoute à la nouvelle carte.
        }
        await newCard.save(); //                                          On enregistre la nouvelle carte dans la base de données.
        res.json(newCard); //                                             Une fois la carte enregistrée, on renvoie la nouvelle carte au format JSON en réponse à la requête.
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
  /*---------- Modification d'une carte ----------------------------- */
  modifyCard: async (req, res) => {
    try {
      const cardId = req.params.id; //                                    Récupération de l'ID de la carte à modifier depuis les paramètres de la requête.
      const card = await Card.findByPk(cardId); //                        Recherche de la carte dans la base de données en utilisant son ID.
      if (!card) {
        res.status(404).send("cant find card" + cardId); //               Si la carte n'existe pas dans la base de données, Réponse avec un code 404 (Not Found) et un message indiquant que la carte n'a pas été trouvée.
      } else {
        const { title, color, list_id, position } = req.body; //          Récupération des nouvelles informations de la carte à partir du corps de la requête.
        if (title) {
          card.title = title; //                                          Si 'title' est présent dans le corps de la requête, on met à jour le titre de la carte avec la nouvelle valeur.
        }
        if (list_id) {
          card.list_id = list_id; //                                      Si 'list_id' est présent dans le corps de la requête, on met à jour l'ID de la liste associée à la carte avec la nouvelle valeur.
        }
        if (color) {
          card.color = color; //                                          Si 'color' est présent dans le corps de la requête, on met à jour la couleur de la carte avec la nouvelle valeur.
        }
        if (position) {
          card.position = position; //                                    Si 'position' est présent dans le corps de la requête, on met à jour la position de la carte avec la nouvelle valeur.
        }
        await card.save(); //                                             Enregistrement des modifications de la carte dans la base de données.
        res.status(200).json(card); //                                    Réponse avec un code 200 (OK) et renvoie de la carte mise à jour sous forme de JSON.
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};
