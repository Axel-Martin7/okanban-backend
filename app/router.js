const express = require("express"); //                              charge express.

/*--------------- Controllers ---------------*/
const listController = require("./controllers/listController"); //  apelle notre futur controller

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

/* Tags */

/* Export */
module.exports = router;
