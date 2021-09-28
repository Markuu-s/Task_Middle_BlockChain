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

    it("Check functions addNote and getNote", async () => {
        const addressNote = accounts[1].address
        const nameNote = "Mark"
        const surnameNote = "Esayan"
        const ageNote = 18

        await appNote.connect(accounts[1]).addNote(nameNote, surnameNote, ageNote)
        data = await appNote.connect(accounts[5]).getNote(accounts[1].address)

        checkData = () => {
            expect(data['accountAddr']).to.equal(addressNote)
            expect(data['name']).to.equal(nameNote)
            expect(data['surname']).to.equal(surnameNote)
            expect(data['age']).to.equal(ageNote)
        }
        checkData()

        data = await appNote.connect(accounts[0]).getNote(accounts[1].address)
        console.log(data)
        checkData()
    })
    
})
