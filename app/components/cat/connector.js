
// 'use strict';

// const DataLoader = require('dataloader');

// class UserConnector {
//     constructor() {
//         console.log(mongoose)
//         this.loader = new DataLoader(this.fetch.bind(this));
//     }

//     async fetch(ids) {
//         const cats = await Cat.find({ id: { $in: ids } })
//         return cats;
//     }

//     fetchByIds(ids) {
//         return this.loader.loadMany(ids);
//     }

//     fetchById(id) {
//         return this.loader.load(id);
//     }
// }

// module.exports = new UserConnector()