const { List, Card, Tag } = require("./app/models");

async function testModels() {
  //                                                       Fonction asynchrone qui effectue des requete pour récupérer toutes les listes avec leurs cartes associées, et les tags associés à chaque carte.
  const lists = await List.findAll({
    //                                                     Effectue une requete pour récupérer toutes les listes avec leurs cartes et tags associés.
    include: [
      {
        association: "cards", //                           Inclus la relation "cards" définie dans le modèle List, qui récupère toutes les cartes associées à chaque liste.
        include: ["tags"], //                              Inclus la relation "tags" définie dans le modèle Card, qui récupère tous les tags associés à chaque carte.
      },
    ],
    order: [["position", "ASC"]], //                       Ordonne les résultats par la colonne "position" en ordre croissant (ASC).
  });

  for (const list of lists) {
    //                                                     Boucle for-of pour parcourir toutes les listes récupérées.
    console.log(`La liste "${list.name}" contient les cartes suivantes :`); // Affiche le nom de la liste et les cartes associées avec les tags associés pour chaque carte.

    list.cards.forEach((card) => {
      //                                                   Boucle forEach pour parcourir toutes les cartes associées à la liste.
      console.log(`"${card.title}" avec les tags : `); //  Affiche le titre de la carte et les noms des tags associés à cette carte.

      let tags = card.tags.map((tag) => tag.name); //      Utilise la méthode map pour extraire les noms des tags de chaque carte et les stocke dans un tableau "tags".
      console.log(tags);
    });
  }
}

testModels(); //                                           Appelle la fonction testModels pour exécuter les requêtes et afficher les résultats.
