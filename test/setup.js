let ganache = require("ganache-cli");
let Web3 = require('web3')
let assert = require("assert")


before(function(done){
  this.web3 = new Web3()
  this.web3.setProvider(ganache.provider());  
  this.web3.eth.getAccounts((err, accounts) => {
    this.accounts = accounts
    done()
  })
})
