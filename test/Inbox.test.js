const assert = require('assert')
const ganache = require('ganache')
const Web3 = require('web3')  //This is a constructor function
const {interface, bytecode } = require('../compile')

const web3 = new Web3(ganache.provider());

let accounts;
let inbox
let initial_message = "Hey there!!";
let updated_message = "Hello Parth"
beforeEach(async () => {
    accounts = await web3.eth.getAccounts()

    inbox=await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments:[initial_message]})
    .send({from: accounts[0], gas:'1000000'})
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call()
        assert.equal(message, initial_message)
    })

    it('can update the message', async () => {
       await inbox.methods.setMessage(updated_message).send({from: accounts[0]})
       const message = await inbox.methods.message().call()
       assert.equal(message, updated_message)
    })
})