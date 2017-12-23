let shell = require('shelljs');

// TODO: use truffle-contract?

module.exports = class Contract{
  constructor(web3, file){
    let abi = JSON.parse(
      shell.exec(
        `bamboo --abi < ${file}`,
        { silent: true }
      ).stdout
    )
    this.bytecode = shell.exec(
      `bamboo < ${file}`,
      { silent: true }
    ).stdout.trim()
    this._contract = new web3.eth.Contract(abi)
  }

  deploy(options){
    return this._contract.deploy({
       data: this.bytecode,
       arguments: options.arguments
     })
    .send({
       from: options.from,
       gas: 6721975
     }).then((contract)=> {
       // Why is this needed?
       contract.setProvider(this._contract._provider)
       return contract
     })
  }
}
