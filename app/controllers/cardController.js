const { Card } = require("../models"); //                                  Import du modèle depuis l'index des models.

const cardController = {
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

  // getOneCard:
};
