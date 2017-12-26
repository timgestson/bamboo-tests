let shell = require('shelljs');
let assert = require("assert")
let Contract = require("./contract")  

describe("test abc contract",  function(){
  it("should abc successfully", function(done){
    const file = "./contracts/026_abc.bbo "
    let testContract = new Contract(this.web3, file)
    this.account = this.accounts[0]
    testContract.deploy({
      from: this.account,
      arguments: []
    })
    .then((contractInstance) => {
      this.contractInstance = contractInstance
      done()
    })
  })

  it("should change state", function(done){
    this.contractInstance.methods.f().send({
      from: this.account,
      gas: 6721975
    })
    .on("receipt",() => {done()})
  })
  
  it("should return 1", function(done){
    this.contractInstance.methods.f().call({
      from: this.account,
      gas: 6721975
    })
    .then((result) => { 
      assert(result == 1) 
      done()
    })
  })
  
  it("should change state", function(done){
    this.contractInstance.methods.f().send({
      from: this.account,
      gas: 6721975
    })
    .on("receipt",() => {done()})
  })
  
  it("should return 2", function(done){
    this.contractInstance.methods.f().call({
      from: this.account,
      gas: 6721975
    })
    .then((result) => { 
      assert(result == 2) 
      done()
    })
  })
})
