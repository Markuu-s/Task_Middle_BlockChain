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

let addressNote
let nameNote
let surnameNote
let ageNote
let account 

const emptyAddress = '0x0000000000000000000000000000000000000000'

checkData = () => {
    expect(data['accountAddr']).to.equal(addressNote)
    expect(data['name']).to.equal(nameNote)
    expect(data['surname']).to.equal(surnameNote)
    expect(data['age']).to.equal(ageNote)
}

describe("AppNote", () => {
    it("Check owner", async () => {
        expect(await appNote.owner()).to.equal(accounts[0].address)
    })

    it("Check functions addNote and getNote", async () => {
        account = accounts[3]

        addressNote = account.address
        nameNote = "Mark"
        surnameNote = "Esayan"
        ageNote = 18

        await appNote.connect(account).addNote(nameNote, surnameNote, ageNote)
        data = await appNote.connect(account).getNote(addressNote)

        checkData()

        data = await appNote.connect(accounts[0]).getNote(addressNote)
        checkData()
    })
    
    it("Check function changeNote", async () => {
        account = accounts[7]

        addressNote = account.address
        nameNote = "Alexey"
        surnameNote = "Arushkin"
        ageNote = 24

        await appNote.connect(account).addNote(nameNote, surnameNote, ageNote)
        data = await appNote.connect(account).getNote(addressNote)

        checkData()

        ageNote = 40
        surnameNote = "Yuie"

        await appNote.connect(account).changeNote(addressNote, '', surnameNote, ageNote)
        data = await appNote.connect(account).getNote(addressNote)
        checkData()

        surname = 'Aboba'
        await appNote.connect(account).changeNote(addressNote, '', surnameNote, ageNote)
        data = await appNote.connect(accounts[0]).getNote(addressNote)
        checkData()
    })

    it("Check require of function changeNote", async () => {
        account = accounts[5]
        addressNote = account.address
        nameNote = "Kirill"
        surnameNote = "Obramov"
        ageNote = 44

        await appNote.connect(account).addNote(nameNote, surnameNote, ageNote)
        data = await appNote.connect(account).getNote(addressNote)
        checkData()


        ageNote = 13
        try {
            await appNote.connect(accounts[3]).changeNote(addressNote, '', '', ageNote)
            throw "error"
        }
        catch (e) {
            if (e == "error") {
                expect(0, "Error. Other user(not owner) could not change note").to.equal(1)
            }
        }

        // Owner can change data
        ageNote = 33
        await appNote.connect(accounts[0]).changeNote(addressNote, '', '', ageNote)
        data = await appNote.connect(accounts[0]).getNote(addressNote)
        checkData()
    })

})
