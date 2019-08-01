import Contract from 'Contract'
import Problem from './problem'
import Process from './process'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Interest_document',
    'get_Deposit_process',
    'get_With_draw_process',
    'get_Cash_library',
    'get_Deposit_book_cash',
    'get_Deposit_book',
    'get_Depositor',
    'get_Deposit_book_deposit_and_with_draw_slip',
    'get_Business_Category',
  ]
  static authenticationFuncs = [
    'Deposit_process',
    'With_draw_process',
    'Cash_library',
    'Deposit_book_cash',
    'Deposit_book',
    'Depositor',
    'Deposit_book_deposit_and_with_draw_slip',
    'Business_Category',
    'With_draw_slip',
    'Deposit_book_deposit_slip',
  ]
  static publicFuncs = [
    'Interest_document',
    'get_Interest_document',
    'Deposit_process',
    'get_Deposit_process',
    'With_draw_process',
    'get_With_draw_process',
    'Cash_library',
    'get_Cash_library',
    'Deposit_book_cash',
    'get_Deposit_book_cash',
    'Deposit_book',
    'get_Deposit_book',
    'Depositor',
    'get_Depositor',
    'Deposit_book_deposit_and_with_draw_slip',
    'get_Deposit_book_deposit_and_with_draw_slip',
    'Business_Category',
    'get_Business_Category',
    'With_draw_slip_deposit_book',
    'Deposit_book_deposit_slip'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'BANKING_SYSTEM'
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
    this._problem = new Ploblem(data)
    this._process = new Process(data)
  }
  //---------------------Interest_document------------------------------

  async Interest_document() {
    let Interes = await this._problem.createPre_school('INTEREST_DOCUMENT')
    return Interes

  }
  get_Interest_document() {
    let Interes = this._problem.getProblemByType('INTEREST_DOCUMENT')
    return Interes
  }
  // --------------------Deposit_process---------------------------
  checkDeposit_process(address) {
    let checkDeposit_process = this.getDeposit_processByAddress(address)
    if (!checkDeposit_process || checkDeposit_process.type !== 'DEPOSIT_PROCESS') throw `DEPOSIT_PROCESS IS NOT EXIST`
    return true
  }
  getDeposit_processByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Deposit_process() {
    await this._problem.checkProblem(this.sender, 'INTEREST_DOCUMENT')
    let deposit = await this._process.createProcess('DEPOSIT_PROCESS')
    return deposit
  }
  get_Deposit_process() {
    return this._problem.getProblemByType('DEPOSIT_PROCESS')
  }
  // --------------------Cash_library---------------------------
  checkCash_library(address) {
    let checkCash_library = this.getCash_libraryByAddress(address)
    if (!checkCash_library || checkCash_library.type !== 'CASH_LIBRARY') throw `CASH_LIBRARY IS NOT EXIST`
    return true
  }
  getCash_libraryByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Cash_library() {
    await this.checkDeposit_process(this.sender, 'DEPOSIT_PROCESS')
    let nd2_grade = awaitthis._process.createProcess('CASH_LIBRARY')
    return nd2_grade
  }
  get_Cash_library() {
    return this._problem.getProblemByType('CASH_LIBRARY')
  }
  // --------------------Deposit_book---------------------------
  checkDeposit_book(address) {
    let checkDeposit_book = this.getDeposit_bookByAddress(address)
    if (!checkDeposit_book || checkDeposit_book.type !== 'DEPOSIT_BOOK') throw `DEPOSIT_BOOK IS NOT EXIST`
    return true
  }
  getDeposit_bookByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Deposit_book() {
    await this.checkDeposit_process(this.sender, 'DEPOSIT_PROCESS')
    let rd3_grade = await this._process.createProcess('DEPOSIT_BOOK')
    return rd3_grade
  }

  get_Deposit_book() {
   return this._problem.getProblemByType('3RD_GRADE')
  }

  // --------------------With_draw_process--------------------------

  checkWith_draw_process(address) {
    let checkWith_draw_process = this.getWith_draw_processByAddress(address)
    if (!checkWith_draw_process || checkWith_draw_process.type !== 'WITH_DRAW_PROCESS') throw `WITH_DRAW_PROCESS IS NOT EXIST`
    return true
  }
  getWith_draw_processByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async With_draw_process() {
    await this._problem.checkProblem(this.sender, 'INTEREST_DOCUMENT')
    let draw = await this._process.createProcess('WITH_DRAW_PROCESS')
    return draw
  }

  get_With_draw_process() {
    return this._problem.getProblemByType('WITH_DRAW_PROCESS')
  }

  // --------------------Deposit_book_cash---------------------------
  checkDeposit_book_cash(address) {
    let checkDeposit_book_cash = this.getDeposit_book_cashByAddress(address)
    if (!checkDeposit_book_cash || checkDeposit_book_cash.type !== 'DEPOSIT_BOOK_CASH') throw `DEPOSIT_BOOK_CASH IS NOT EXIST`
    return true
  }
  getDeposit_book_cashByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Deposit_book_cash() {
    await this.checkDeposit_process(this.sender, 'DEPOSIT_PROCESS')
    let Deposit1 = await this._process.createProcess('DEPOSIT_BOOK_CASH')
    return Deposit1
  }
  get_Deposit_book_cash() {
    return this._problem.getProblemByType('DEPOSIT_BOOK_CASH')
  }
  // --------------------Depositor ---------------------------
  checkDeposit(address) {
    this.checkDeposit_book_cash = this.getDeposit_book_cashByAddress(address);
    this.checkDeposit = this.geDeposit_bookrByAddress(address);

    if (this.checkDeposit_book_cash.type == 'DEPOSIT_BOOK_CASH') {
      return true;
    }
    else if (this.checkDeposit.type == 'DEPOSIT_BOOK') {
      return true;
    }
    else {
      throw `DEPOSIT_BOOK_CASH_OR_DEPOSIT_BOOK IS NOT EXIST`;
    }

  }
  checkDepositor(address) {
    let checkDepositor = this.getDepositorByAddress(address)
    if (!checkDepositor || checkDepositor.type !== 'DEPOSITOR') throw `DEPOSITOR IS NOT EXIST`
    return true
  }
  getDepositorByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Depositor() {
    await this.checkDeposit(this.sender, 'DEPOSIT_BOOK_CASH_OR_DEPOSIT_BOOK')
    let Depositor = await this._process.createProcess('DEPOSITOR')
    return Depositor
  }
  get_Depositor() {
    return this._problem.getProblemByType('DEPOSITOR')
  }
  // --------------------Deposit_book_deposit_and_with_draw_slip ---------------------------
  checkDeposit_book_deposit_and_with_draw_slip(address) {
    let checkDeposit_book_deposit_and_with_draw_slip = this.getDeposit_book_deposit_and_with_draw_slipByAddress(address)
    if (!checkDeposit_book_deposit_and_with_draw_slip || checkDeposit_book_deposit_and_with_draw_slip.type !== 'DEPOSIT_BOOK_DEPOSIT_AND_WITH_DRAW_SLIP') throw `DEPOSIT_BOOK_DEPOSIT_AND_WITH_DRAW_SLIP IS NOT EXIST`
    return true
  }
  getDeposit_book_deposit_and_with_draw_slipByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Deposit_book_deposit_and_with_draw_slip() {
    await this.checkDepositor(this.sender, 'DEPOSITOR')
    let deposit2 = await this._process.createProcess('DEPOSIT_BOOK_DEPOSIT_AND_WITH_DRAW_SLIP  ')
    return deposit2
  }
  get_Deposit_book_deposit_and_with_draw_slip() {
    return this._problem.getProblemByType('DEPOSIT_BOOK_DEPOSIT_AND_WITH_DRAW_SLIP')
  }
  // --------------------Business_Category ---------------------------
  checkBusiness_Category(address) {
    let checkBusiness_Category = this.getBusiness_CategoryByAddress(address)
    if (!checkBusiness_Category || checkBusiness_Category.type !== 'BUSINESS_CATEGORY') throw `BUSINESS_CATEGORY IS NOT EXIST`
    return true
  }
  getBusiness_CategoryByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Business_Category() {
    await this.checkDeposit_book_deposit_and_with_draw_slip(this.sender, 'DEPOSIT_BOOK_DEPOSIT_AND_WITH_DRAW_SLIP')
    let business = await this._process.createProcess('BUSINESS_CATEGORY')
    return business
  }
  get_Business_Category() {
    return this._problem.getProblemByType('BUSINESS_CATEGORY')
  }
  // --------------------With_draw_slip_deposit_book ---------------------------
  async With_draw_slip_deposit_book() {
    await this.checkBusiness_Category(this.sender, 'BUSINESS_CATEGORY')
    let slip = await this._process.createProcess('WITH_DRAW_SLIP_DEPOSIT_BOOK')
    this.setToAddress(slip.address)
    return 'SUCCESS'
  }
  // --------------------Deposit_book_deposit_slip ---------------------------
  async Deposit_book_deposit_slip() {
    await this.checkBusiness_Category(this.sender, 'BUSINESS_CATEGORY')
    let book = await this._process.createProcess('DEPOSIT_BOOK_FEPOSIT_SLIP')
    this.setToAddress(book.address)
    return 'SUCCESS'
  }
}
export default TokenMain;
