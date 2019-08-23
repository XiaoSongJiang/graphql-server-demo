const DataLoader = require('dataloader')
// const Connector = require('./connector');
const Cat = require('../../model/cat');
const Food = require('../../model/food');

const getCats = async (parent, args, context, info) => {
    const res = await Cat.find().lean();
    console.log(res)
    return res
};
const getFoods = async function (parent, args, context, info) {
    // return await Food.findOne({ id: parent.foodId }).lean();
    console.log(123)
    return getFoodByIdBatching(parent.foodId)
}

const getFoodByIds = async ids => {
    const res = await Food.find({ id: { $in: ids } }).lean();
    console.log(res);
    return res
}

const foodLoader = new DataLoader(ids => getFoodByIds(ids), { cache: true })
const getFoodByIdBatching = foodId => foodLoader.load(foodId)

const resolvers = {
    Query: {
        cats: getCats
    },
    Cat: {
        love: getFoods
    }
}

module.exports = resolvers
