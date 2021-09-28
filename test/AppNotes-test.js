const { expect } = require("chai")
const { ethers } = require("hardhat")

let AppNote
let appNote
let owner 

beforeEach(async () => {
    AppNote = await ethers.getContractFactory("AppNote")
    appNote = await AppNote.deploy()
    owner = appNote['deployTransaction']['from']
    await appNote.deployed()
})
