let shell = require('shelljs');

module.exports = class Contract{
  constructor(web3, file){
    let abi = JSON.parse(shell.exec(`bamboo --abi < ${file}`).stdout)
    this.bytecode = shell.exec(`bamboo < ${file}`).stdout.trim()
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
     })
  }
}
