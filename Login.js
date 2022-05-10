const { ApolloServer, gql } = require('apollo-server');
const { type } = require('os');
const accounts = [
    {
        id: "1",
        name: "Ayman",
        email: "ayman@gmail.com",
        password: "!23",
    },
    {
        id: "2",
        name: "Mona",
        email: "mona@gmail.com",
        password: "456",
    },
    {
        id: "3",
        name: "Mayar",
        email: "mayar@gmail.com",
        password: "789",
    }
]

const typeDefs = gql`
type Account{
    id:String,
    name:String,
    email:String,
    password:String
}
type Query{
    accounts:[Account],
    myAccount:Account,
}
type Mutation{
    createLogin(name:String,password:String,email:String):Account
}`

const resolvers = {
    Query: {
        accounts: () => accounts,
        //Get Account:
        myAccount: (parent, args, context) => {
            // console.log(context);
            const account = accounts.filter((account) => account.password == context.userPassword)[0];
            return account;
        },
    },
    // Create Login:
    Mutation: {
        createLogin: (__, { name, password, email }) => {
            accounts.push({ id: accounts.length + 1, name, password, email });
            return accounts[accounts.length - 1];
        },
    }
}

const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: ({ req }) => {
        const authorization = req.headers.authorization;
        // console.log(authorization);
        return {
            userPassword: authorization
        }
    }
})

server.listen(7000, () => {
    console.log("Server has started on port 7000");
})