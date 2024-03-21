const { List, Card, Tag } = require('./app/models');

async function testModels() {
  const lists = await List.findAll({
    include: [
      {
        association: 'cards',
        include: ['tags'],
      },
    ],
    order: [['position', 'ASC']],
  });

  for (list of lists) {
    console.log(`La liste "${list.name}" contient les cartes suivantes :`);

    list.cards.forEach((card) => {
      console.log(`"${card.title}" avec les tags : `);

      let tags = card.tags.map((tag) => tag.name);
      console.log(tags);
    });
  }
}

testModels();
