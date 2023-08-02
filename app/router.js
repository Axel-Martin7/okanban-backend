const express = require("express"); //                                           charge express.

/*--------------- Controllers ---------------*/
const listController = require("./controllers/listController"); //               appel notre futur controller
const cardController = require("./controllers/cardController");
const tagController = require("./controllers/tagController");

/*--------------- Routes ---------------*/
const router = express.Router(); //                                              charge mon routeur.

router.get("/", (req, res) => {
  //                                                                             Création d'une route basique
  res.send("Hello");
});

/* Lists */
router.get("/lists", listController.getAllLists); //                             Recupére toutes les listes.
router.get("/lists/:id", listController.getOneList); //                          Récupére une liste.
router.post("/lists", listController.createList); //                             Crée une liste.
router.put("/lists/:id", listController.modifyList); //                          Modifie une liste.
router.delete("/lists/:id", listController.deleteList); //                       Supprime une liste.

/* Cards */
router.get("/lists/:id/cards", cardController.getCardsInList); //                Récupère toutes les cartes d'une liste.
router.get("/cards/:id", cardController.getOneCard); //                          Récupère une carte.
router.post("/cards", cardController.createCard); //                             Crée une carte.
router.put("/cards/:id", cardController.modifyCard); //                          Modifie une carte.
router.delete("/cards/:id", cardController.deleteCard); //                       Supprime une carte.

/* Tags */
router.get("/tags", tagController.getAllTags); //                                Récupère tous les tags.
router.get("/tags/:id", tagController.getOneTag); //                             Récupère un tag.
router.post("/tags", tagController.createTag); //                                Crée un tag.
router.put("/tags/:id", tagController.modifyTag); //                             Modifie un tag.
router.delete("/tags/:id", tagController.deleteTag); //                          Supprime un tag.
router.post("/cards/:id/tags", tagController.associateTagToCard); //             Associe un tag a une carte.
router.delete("/cards/:cardid/tags/:tagid", tagController.removeTagFromCard); // Dissocie un tag d'une carte.

/* Export */
module.exports = router;
