let assert = require("assert")
let Contract = require("./contract")

describe("test auction contract", function(){
  it("should create successfully", function(done){
    const file = "./contracts/00b_auction_more.bbo"
    let testContract = new Contract(this.web3, file)
    this.account = this.accounts[0]
    testContract.deploy({
        from: this.account,
        arguments: [ 0, "0xff00000000000000000000000000000000000000000000000000000400000020", 0]
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
