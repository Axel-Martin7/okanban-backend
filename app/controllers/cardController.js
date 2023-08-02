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
};
