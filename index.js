/*--------------- DotEnv ---------------*/
const dotenv = require("dotenv"); //                  On charge et stock dotenv dans une variable dotenv.
dotenv.config(); //                                   A partir de la variable dotenv, on execute la méthode config().

/*--------------- Express ---------------*/
const express = require("express"); //                Import du module express
const router = require("./app/router"); //            Import du fichier router
const middlewares = require("./app/middlewares"); //  Import du dossier 'middlewares' qui va chercher l'index du dossier.

const PORT = process.env.PORT || 3000; //             Récupération du port à utiliser depuis les variables d'environnement ou utilisation du port 3000 par défaut
const app = express(); //                             Création d'une instance d'application Express

app.use(express.json()); //                           Utilisation du middleware express.json pour permettre à l'application de reconnaître les requêtes au format JSON

/*--------------- Middlewares ---------------*/
app.use(router); //                                   Utilisation du middleware router qui contient les définitions des routes de l'application
app.use(middlewares.notFound); //                     A partir de l'index, j'importe la méthode notFound (404).

/*--------------- App ---------------*/
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
