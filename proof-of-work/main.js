import Contract from 'Contract'
import User from './user'
import Process from './process'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_User',
    'get_Transactions',
    'get_Miners',
    'get_Block',
    'get_Block_Puzzle',
    'get_Proof_of_work',
    'get_Verification'
    
  ]
  static authenticationFuncs = [
    'Transactions',
    'Miners',
    'Block',
    'Block_Puzzle',
    'Proof_of_work',
    'Verification'
  ]
  static publicFuncs = [
    'User',
    'Transactions',
    'Miners',
    'Block',
    'Block_Puzzle',
    'Proof_of_work',
    'Verification'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'PROOF_OF_WORK'
    },
    accounts: [
      {
        type: {
          type: String,
          default: 0
        },
        address: {
          type: String,
          required: true
        }
      }
    ]
  }
  constructor(data) {
    super(data)
    this._user = new User(data)
    this._process = new Process(data)
  }
  //---------------------User------------------------------
  async User() {
    let User = await this._user.createUser('USER')
    return User
  }
  get_User() {
    let User = this._user.getUserByType('USER')
    return User
  }
  //---------------------Transaction------------------------------
  checkProcess1(address) {
    this._user.checkUser = this.get_UserByAddress(address);
    this.checkVerification = this.get_VerificationByAddress(address);
    if (this._user.this.checkUser.type == 'USER') {
      return true;
    }
    else if (this.checkVerification.type == 'VERIFICATION') {
      return true;
    }
    else {
      throw `USER_OR_VERIFICATION IS NOT EXIST`;
    }
  }
  check_Transaction(address) {
    let check_Transaction = this.get_TransactionByAddress(address)
    if (!check_Transaction || check_Transaction.type !== 'TRANSACTION') throw `TRANSACTION IS NOT EXIST`
    return true
  }
  get_TransactionByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Transaction() {
    await this.checkProcess1(this.sender, 'USER_OR_VERIFICATION')
    let Transaction = await this._process.createProcess('TRANSACTION')
    return Transaction
  }
  get_Transaction() {
    return this._process.getProcessByType('TRANSACTION')
  }
  // --------------------Miners---------------------------
  checkProcess2(address) {
    this.check_Transaction = this.get_TransactionByAddress(address);
    this.checkVerification = this.get_VerificationByAddress(address);
    if (this._check_Transaction.type == 'TRANSACTION') {
      return true;
    }
    else if (this.check_Proof_of_work.type == 'PROOF_OF_WORK') {
      return true;
    }
    else {
      throw `TRANSACTION_OR_PROOF_OF_WORK IS NOT EXIST`;
    }
  }
  check_Miners(address) {
    let check_Miners = this.get_MinersByAddress(address)
    if (!check_Miners || check_Miners.type !== 'MINERS') throw `MINERS IS NOT EXIST`
    return true
  }
  get_MinersByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Miners() {
    await this.checkProcess2(this.sender, 'TRANSACTION_OR_PROOF_OF_WORK')
    let Miners = await this._process.createProcess('CRIMES_AND_SECURITY_INCIDENT')
    return Miners
  }
  get_Crimes_and_Security_Incident() {
    return this._process.getProcessByType('CRIMES_AND_SECURITY_INCIDENT')
  }

  // --------------------Block---------------------------
  check_Block(address) {
    let check_Block = this.get_BlockByAddress(address)
    if (!check_Block || check_Block.type !== 'BLOCK') throw `BLOCK IS NOT EXIST`
    return true
  }
  get_BlockByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Block() {
    await this.check_Miners(this.sender, 'MINERS')
    let block = await this._process.createProcess('BLOCK')
    return block
  }
  get_Block() {
    return this._process.getProcessByType('BLOCK')
  }
  // --------------------Block_Puzzle---------------------------
  check_Block_Puzzle(address) {
    let check_Block_Puzzle = this.get_Block_PuzzleByAddress(address)
    if (!check_Block_Puzzle || check_Block_Puzzle.type !== 'BLOCK_PUZZLE') throw `BLOCK_PUZZLE IS NOT EXIST`
    return true
  }
  get_Block_PuzzleByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Block_Puzzle() {
    await this.check_Block(this.sender, 'BLOCK')
    let Block_Puzzle = await this._process.createProcess('BLOCK_PUZZLE')
    return Block_Puzzle
  }
  get_Block_Puzzle() {
    return this._process.getProcessByType('BLOCK_PUZZLE')
  }
  // --------------------Proof_of_work---------------------------
  check_Proof_of_work(address) {
    let check_Proof_of_work = this.get_Proof_of_workByAddress(address)
    if (!check_Proof_of_work || check_Proof_of_work.type !== 'PROODF_OF_WORK') throw `PROODF_OF_WORK IS NOT EXIST`
    return true
  }
  get_Proof_of_workByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Proof_of_work() {
    await this.check_Block_Puzzle(this.sender, 'SECURITY_PERSONNEL')
    let Proof_of_work = await this._process.createProcess('PROODF_OF_WORK')
    return Proof_of_work
  }
  get_Proof_of_work() {
    return this._process.getProcessByType('PROODF_OF_WORK')
  }
  // --------------------Verification---------------------------
  check_Verification(address) {
    let check_Verification = this.get_VerificationByAddress(address)
    if (!check_Verification || check_Verification.type !== 'VERIFICATION') throw `VERIFICATION IS NOT EXIST`
    return true
  }
  get_VerificationByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Verification() {
    await this.check_Proof_of_work(this.sender, 'PROODF_OF_WORK')
    let Verification = await this._process.createProcess('VERIFICATION')
    return Verification
  }
  get_Verification() {
    return this._process.getProcessByType('VERIFICATION')
  }
}
export default TokenMain;
