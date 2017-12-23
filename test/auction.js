let shell = require('shelljs');
let assert = require("assert")
  
describe("test auction contract", function(){
  it("should create successfully", function(done){
    const file = "./contracts/00b_auction_more.bbo"
    let testContract = new Contract(this.web3, file)
    this.primaryAccount = this.accounts[0]
    this.secondaryAccount = this.accounts[1]
    this.hotWallet = this.accounts[2]
    testContract.deploy({
      arguments: [this.primaryAccount, this.secondaryAccount],
      from: this.primaryAccount 
    })
    .then((contractInstance) => {
       this.contractInstance = contractInstance
       done()
    })
  })
  
  it("should accept a bid", function(done){
    this.contractInstance.methods.bid().send({
     from: this.account,
     value: 100,
     gas: 6721975
    })
    .on("receipt",(value) => {
       done()
    })
  })
})
