let assert = require("assert")
let Contract = require("./contract")

describe("test vault contract", function(){
  it("should create successfully", function(done){
    const file = "./contracts/024_vault.bbo"
    let testContract = new Contract(this.web3, file)
    this.primaryAccount = this.accounts[0]
    this.secondaryAccount = this.accounts[1]
    this.hotWallet = this.accounts[2]
    testContract.deploy({
      from: this.primaryAccount,
      arguments: [ this.primaryAccount, this.secondaryAccount ]
    })
    .then((contractInstance) => {
      this.contractInstance = contractInstance
      done()
    })
  })

  it("should accept money", function(done){
    this.web3.eth.sendTransaction({
      to: this.contractInstance.options.address,
      from: this.primaryAccount,
      value: 1000
    }, done)
  })

  it("should unvault", function(done){
    this.contractInstance.methods.unvault(100, this.hotWallet)
    .send({
      from: this.primaryAccount,
      gas: 6721975
    })
    .then(()=>{
      done()
    })
  })

  it("should redeem", function(done){
    this.contractInstance.methods.redeem()
     .send({
       from: this.primaryAccount,
       gas: 6721975
     })
    .then(()=>{
      done()
    })
  })

  it("should deny recover from non-secondary key", function(done){
    this.contractInstance.methods.recover()
    .call({
      gas: 6721975,
      from: this.primaryAccount
    })
    .then((result)=>{
      console.log(result)
      done()
    })
  })
})
