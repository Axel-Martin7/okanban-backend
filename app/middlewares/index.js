const notFound = require("./notFound"); // Import du middleware notFound (404).

module.exports = {
  notFound, //                            Export du MW notFound pour pouvoir l'appeler dans le point d'entrée de l'app.
};
