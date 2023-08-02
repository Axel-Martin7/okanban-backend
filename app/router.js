const express = require("express"); //                              charge express.

/*--------------- Controllers ---------------*/
const listController = require("./controllers/listController"); //  appel notre futur controller
const cardController = require("./controllers/cardController");
const tagController = require("./controllers/tagController");

/*--------------- Routes ---------------*/
const router = express.Router(); //                                 charge mon routeur.

router.get("/", (req, res) => {
  //                                                                Création d'une route basique
  res.send("Hello");
});

/* Lists */
router.get("/lists", listController.getAllLists); //                Recupére toutes les listes.
router.get("/lists/:id", listController.getOneList); //             Récupére une liste.
router.post("/lists", listController.createList); //                Crée une liste.
router.put("/lists/:id", listController.modifyList); //             Modifie une liste.
router.delete("/lists/:id", listController.deleteList); //          Supprime une liste.

/* Cards */
router.get("/lists/:id/cards", cardController.getCardsInList); //   Récupère toutes les cartes d'une liste.
router.get("/cards/:id", cardController.getOneCard); //             Récupère une carte.
router.post("/cards", cardController.createCard); //                Crée une carte.
router.put("/cards/:id", cardController.modifyCard); //             Modifie une carte.
router.delete("/cards/:id", cardController.deleteCard); //          Supprime une carte.

/* Tags */
router.get("/tags", tagController.getAllTags);

/* Export */
module.exports = router;
