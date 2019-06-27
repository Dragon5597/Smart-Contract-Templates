import Contract from 'Contract'
import Tax from './tax'
import QS from './QS'
class TokenMain extends Contract {
  static viewFuncs = [
    'getPeople',
    'getQuestion',
    'getAre_you_single  ',
    'getAre_you_under_65_year_of_age',
    'getIs_your_gross_income_less_than_$8450',
    'getIs_your_gross_income_less_than_$9700',


  ]
  static authenticationFuncs = [
    'createQuestion',
    'Are_you_single',
    'B',
    'Are_you_under_65_year_of_age',
    'Are_you_under_65_year_of_age',
    'Is_your_gross_income_less_than_$8450',
    'Is_your_gross_income_less_than_$9700',

    'You_do_not_have_to_file_an_income_tax_return',
    'Youdo_not_have_to_file_an_income_tax_return',
    'You_have_to_file_an_income_tax_return',
    'Youhave_to_file_an_income_tax_return'

  ]
  static publicFuncs = [
    'createPeople',
    'getPeople',
    'createQuestion',
    'getQuestion',
    'Are_you_single',
    'getAre_you_single',
    'B',
    'Are_you_under_65_year_of_age',
    'getAre_you_under_65_year_of_age',
    'Is_your_gross_income_less_than_$8450',
    'getIs_your_gross_income_less_than_$8450',
    'Youdo_not_have_to_file_an_income_tax_return',
    'Youhave_to_file_an_income_tax_return',
    'Is_your_gross_income_less_than_$9700',
    'getIs_your_gross_income_less_than_$9700',
    'You_have_to_file_an_income_tax_return',
    'You_do_not_have_to_file_an_income_tax_return',

  ]
  static schemas = {
    name: {
      type: String,
      default: 'TAX'
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
    this._tax = new Tax(data)
    this._QS = new QS(data)
  }

  //---------------------createPeople------------------------------

  async createPeople() {
    let people = await this._tax.createTax('PEOPLE')
    return people

  }
  getPeople() {
    let people = this._tax.getTaxByType('PEOPLE')
    return people
  }
  // --------------------createMachine---------------------------
 
  async createQuestion() {
    await this._tax.checkTax(this.sender, 'PEOPLE')
    let createQuestion = await this._QS.createQS('QUESTION')
    return createQuestion
  }
  getQuestion() {
    return this._QS.getQSByType('QUESTION')
  }
  // --------------------Are_you_single---------------------------
  
  async Are_you_single(address_Question) {
    this._tax.checkTax(this.sender, 'PEOPLE')
    let check_Question = this._QS.getQSByAddress(address_Question)
    if (!check_Question || check_Question.type !== 'QUESTION')
      throw 'QUESTION IS NOT EXIST'
    let Are_you_single = await this._QS.createQS('ARE_YOU_SINGLE')
    return Are_you_single
  }
  getAre_you_single() {
    return this._QS.getQSByType('ARE_YOU_SINGLE')
  }
  // --------------------B--------------------------

  async B(address_Are_you_single) {
    this._tax.checkTax(this.sender, 'PEOPLE')
    let check_Are_you_single = this._QS.getQSByAddress(address_Are_you_single)
    if (!check_Are_you_single || check_Are_you_single.type !== 'ARE_YOU_SINGLE')
      throw 'ARE_YOU_SINGLE IS NOT EXIST'
    let B = await this._QS.createQS('B')
    this.setToAddress(B.address)
    return 'FINISH'

  }


  // --------------------Are_you_under_65_year_of_age---------------------------

  async Are_you_under_65_year_of_age(address_Are_you_single) {
    this._tax.checkTax(this.sender, 'PEOPLE')
    let check_Are_you_single = this._QS.getQSByAddress(address_Are_you_single)
    if (!check_Are_you_single || check_Are_you_single.type !== 'ARE_YOU_SINGLE')
      throw 'ARE_YOU_SINGLE IS NOT EXIST'
    let Are_you_under_65_year_of_age = await this._QS.createQS('ARE_YOU_UNDER_65_YEAR_OF_AGE')
    return Are_you_under_65_year_of_age
  }
  getAre_you_under_65_year_of_age() {
    return this._QS.getQSByType('ARE_YOU_UNDER_65_YEAR_OF_AGE')
  }
  // --------------------Is_your_gross_income_less_than_$8450?---------------------------

  async Is_your_gross_income_less_than_$8450(address_Are_you_under_65_year_of_age) {
    this._tax.checkTax(this.sender, 'PEOPLE')
    let check_Are_you_under_65_year_of_age = this._QS.getQSByAddress(address_Are_you_under_65_year_of_age)
    if (!check_Are_you_under_65_year_of_age || check_Are_you_under_65_year_of_age.type !== 'ARE_YOU_UNDER_65_YEAR_OF_AGE')
      throw 'ARE_YOU_UNDER_65_YEAR_OF_AGE IS NOT EXIST'
    let Is_your_gross_income_less_than_A = await this._QS.createQS('IS_YOUR_GROSS_INCOME_LESS_THAN_$8450')
    return Is_your_gross_income_less_than_A
  }
  getIs_your_gross_income_less_than_$8450() {

    return this._QS.getQSByType('IS_YOUR_GROSS_INCOME_LESS_THAN_$8450')
  }
  // --------------------Youdo_not_have_to_file_an_income_tax_return ---------------------------

  async Youdo_not_have_to_file_an_income_tax_return(address_Is_your_gross_income_less_than_$8450) {
    this._tax.checkTax(this.sender, 'PEOPLE')
    let check_Is_your_gross_income_less_than_$8450= this._QS.getQSByAddress(address_Is_your_gross_income_less_than_$8450)
    if (!check_Is_your_gross_income_less_than_$8450 || check_Is_your_gross_income_less_than_$8450.type !== 'IS_YOUR_GROSS_INCOME_LESS_THAN_$8450')
      throw 'IS_YOUR_GROSS_INCOME_LESS_THAN_$8450 NOT EXIST'
    let Youdo_not_have_to_file_an_income_tax_return = await this._QS.createQS('YOU_DO_NOT_HAVE_TO_FILE_AN_INCOME_TAX_RETURN')
    this.setToAddress(Youdo_not_have_to_file_an_income_tax_return.address)
    return 'YES'
  }


  // --------------------createYouhave_to_file_an_income_tax_return ---------------------------

  async Youhave_to_file_an_income_tax_return(address_Is_your_gross_income_less_than_$8450) {
    this._tax.checkTax(this.sender, 'PEOPLE')
    let check_Is_your_gross_income_less_than_$8450= this._QS.getQSByAddress(address_Is_your_gross_income_less_than_$8450)
    if (!check_Is_your_gross_income_less_than_$8450 || check_Is_your_gross_income_less_than_$8450.type !== 'IS_YOUR_GROSS_INCOME_LESS_THAN_$8450')
      throw 'IS_YOUR_GROSS_INCOME_LESS_THAN_$8450 NOT EXIST'
    let Youhave_to_file_an_income_tax_return = await this._QS.createQS('_YOU_HAVE_TO_FILE_AN_INCOME_TAX_RETURN')
    this.setToAddress(Youhave_to_file_an_income_tax_return.address)
    return 'NO'
  }


  // --------------------Is_your_gross_income_less_than_$9700---------------------------

  async Is_your_gross_income_less_than_$9700(address_Are_you_under_65_year_of_age) {
    this._tax.checkTax(this.sender, 'PEOPLE')
    let check_Are_you_under_65_year_of_age = this._QS.getQSByAddress(address_Are_you_under_65_year_of_age)
    if (!check_Are_you_under_65_year_of_age || check_Are_you_under_65_year_of_age.type !== 'ARE_YOU_UNDER_65_YEAR_OF_AGE')
      throw 'ARE_YOU_UNDER_65_YEAR_OF_AGE IS NOT EXIST'
       let Is_your_gross_income_less_than_B = await this._QS.createQS('IS_YOUR_GROSS_INCOME_LESS_THAN_$9700')
    return Is_your_gross_income_less_than_B
  }

  getIs_your_gross_income_less_than_$9700() {
    return this._QS.getQSByType('IS_YOUR_GROSS_INCOME_LESS_THAN_$9700')
  }

  // --------------------You_have_to_file_an_income_tax_return ---------------------------

  async You_have_to_file_an_income_tax_return(address_Is_your_gross_income_less_than_$9700) {
    this._tax.checkTax(this.sender, 'PEOPLE')
    let check_Is_your_gross_income_less_than_$9700= this._QS.getQSByAddress(address_Is_your_gross_income_less_than_$9700)
    if (!check_Is_your_gross_income_less_than_$9700 || check_Is_your_gross_income_less_than_$9700.type !== 'IS_YOUR_GROSS_INCOME_LESS_THAN_$9700')
      throw 'IS_YOUR_GROSS_INCOME_LESS_THAN_$9700 NOT EXIST'
   
    let You_have_to_file_an_income_tax_return = await this._QS.createQS('YOU_HAVE_TO_FILE_AN_INCOME_TAX_RETURN')
    this.setToAddress(You_have_to_file_an_income_tax_return.address)
    return 'NO'
  }
  // --------------------You_do_not_have_to_file_an_income_tax_return ---------------------------

  async You_do_not_have_to_file_an_income_tax_return(address_Is_your_gross_income_less_than_$9700) {
    let check_Is_your_gross_income_less_than_$9700= this._QS.getQSByAddress(address_Is_your_gross_income_less_than_$9700)
    if (!check_Is_your_gross_income_less_than_$9700 || check_Is_your_gross_income_less_than_$9700.type !== 'IS_YOUR_GROSS_INCOME_LESS_THAN_$9700')
      throw 'IS_YOUR_GROSS_INCOME_LESS_THAN_$9700 NOT EXIST'
   
    let You_do_not_have_to_file_an_income_tax_return = await this._QS.createQS('YOU_DO_NOT_HAVE_TO_FILE_AN_INCOME_TAX_RETURN')
    this.setToAddress(You_do_not_have_to_file_an_income_tax_return.address)
    return 'YES'
  }



}
export default TokenMain;
