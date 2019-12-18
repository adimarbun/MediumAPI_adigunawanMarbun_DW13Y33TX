"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "articles",
      [
        {
          title: "Mastering JS console.log like a Pro",
          category: 1,
          content:
            "Printing messages in the browser console have definitely come to rescue to all the developers out there. console.log( ) messages are like medicines for most of your diseases while debugging some wired problems in your code.",
          img: "https://miro.medium.com/max/1280/1*dahHaMDlEHzN_oXTam7Ibw.jpeg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "How To Start Using .map() .filter() and .reduce()",
          category: 1,
          content:
            "TypeScript is exploding: the amazing chart here that shows x5 increase in TypeScript PRs remove any doubt, researches tell that it prevents errors and the community is in love.",
          img: "https://miro.medium.com/max/9200/1*5IwI3UFT8BmTwyY9k_vcbg.jpeg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "20 ways to become a better Node.js developer in 2020",
          category: 1,
          content:
            "I’ve compiled below 20 skills, technologies and considerations on choosing between them. Picking the right tools became one of our greatest challenges — the Node.js ecosystem has matured and present attractive options in almost every field. Vanilla or TypeScript? Ava, Mocha or Jest? Express, Fastify or Koa? or maybe Nest? should I include ES6 modules in my next project or stick to good-old ‘require’? ",
          img: "https://miro.medium.com/max/2643/1*PYBhcIuCopivLOiBBvG0cw.png",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    Example: return queryInterface.bulkDelete("articles", null, {});
  }
};
