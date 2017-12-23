let shell = require('shelljs');
let assert = require("assert")
let Contract = require("./contract")  

describe("test counter contract",  function(){
  it("should create successfully", function(done){
    const file = "./contracts/027_counting.bbo"
    let testContract = new Contract(this.web3, file)
    this.account = this.accounts[0]
    testContract.deploy({
      from: this.account,
      arguments: [ 20 ]
    })
    .then((contractInstance) => {
      this.contractInstance = contractInstance
      done()
    })
  })

  it("should incremented number", function(done){
    this.contractInstance.methods.f().send({
      from: this.account,
      gas: 6721975
    })
    .on("receipt",() => {done()})
  })
  
  it("should return an incremented number", function(done){
    this.contractInstance.methods.f().call()
    .then((value) => {
      assert.equal(value, 22)
      done()
    })
  })
})
