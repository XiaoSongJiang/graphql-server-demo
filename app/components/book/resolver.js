const BookStatus = {
    DELETED: 0,
    NORMAL: 1
}
const data = {
    name: '地球往事',
    price: 66.3,
    status: BookStatus.DELETED,
    created: 1199116800001
};
const resolvers = {

    BookStatus,

    Query: {

        book: (parent, args, context, info) => {
            // console.log(args, context)
            return data
        }
    }
}

module.exports = resolvers
