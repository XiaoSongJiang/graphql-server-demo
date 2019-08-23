module.exports = {
    url: `mongodb://localhost:27017/graphql`,
    options: {
        useFindAndModify: false,
        useNewUrlParser: true,
        native_parser: true,
        poolSize: 2,
        autoIndex: false,
    },
}