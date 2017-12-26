let shell = require('shelljs');
let assert = require("assert")
let Contract = require("./contract")  

describe("test erc20 contract",  function(){
  it("should create successfully", function(done){
    const file = "./contracts/01b_erc20better.bbo"
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
  
})
