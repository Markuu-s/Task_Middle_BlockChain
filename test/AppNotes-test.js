const { expect } = require("chai")
const { ethers } = require("hardhat")

let AppNote
let appNote
let accounts

beforeEach(async () => {
    AppNote = await ethers.getContractFactory("AppNote")
    appNote = await AppNote.deploy()
    accounts = await ethers.getSigners()
    await appNote.deployed()
})

describe("AppNote", () => {
    it("Check owner", async () => {
        expect(await appNote.owner()).to.equal(accounts[0].address)
    })
})
