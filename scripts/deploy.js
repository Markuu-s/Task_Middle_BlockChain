require("@nomiclabs/hardhat-waffle");

secret = require("secret.js")

const ALCHEMY_API_KEY = secret.alcemy;
const RINKEBY_PRIVATE_KEY = secret.rinkebyKey;

module.exports = {
    solidity: "0.8.4",
    networks: {
        rinkeby: {
            url = 'https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}',
            accounts: [`0x${RINKEBY_PRIVATE_KEY}`],
        },
    },
};