import Contract from 'Contract'
import Tax from './tax'
import QS from './QS'
class TokenMain extends Contract {
  static viewFuncs = [
    'getPeople',
    'getAre_you_single  ',
    'getAre_you_under_65_year_of_age',
    'getIs_your_gross_income_less_than_$8450',
    'getIs_your_gross_income_less_than_$9700',


  ]
  static authenticationFuncs = [
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
// --------------------Are_you_single---------------------------
checkAre_you_single(address) {
  let checkAre_you_single = this.getAre_you_singleByAddress(address)
  if (!checkAre_you_single || checkAre_you_single.type !== 'ARE_YOU_SINGLE') throw `ARE_YOU_SINGLE IS NOT EXIST`
  return true
}
getAre_you_singleByAddress(address) {
  return this.accounts.find(account => account.address === address)
}
async Are_you_single() {
  await this._tax.checkTax(this.sender, 'PEOPLE')
  let Are_you_single = await this._QS.createQS('ARE_YOU_SINGLE')
  return Are_you_single
}
getAre_you_single() {
  return this._QS.getQSByType('ARE_YOU_SINGLE')
}
  // --------------------B--------------------------
  async B() {
    await this.checkAre_you_single(this.sender, 'ARE_YOU_SINGLE')
    let B = await this._QS.createQS('B')
    this.setToAddress(B.address)
    // return { Enduser }
    return 'FINISH'
  }
  // --------------------Are_you_under_65_year_of_age---------------------------
  checkAre_you_under_65_year_of_age(address) {
    let checkAre_you_under_65_year_of_age = this.getAre_you_under_65_year_of_ageByAddress(address)
    if (!checkAre_you_under_65_year_of_age || checkAre_you_under_65_year_of_age.type !== 'ARE_YOU_UNDER_65_YEAR_OF_AGE') throw `ARE_YOU_UNDER_65_YEAR_OF_AGE IS NOT EXIST`
    return true
  }
  getAre_you_under_65_year_of_ageByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Are_you_under_65_year_of_age() {
    await this.checkAre_you_single(this.sender, 'ARE_YOU_SINGLE')
    let Are_you_under_65_year_of_age = await this._QS.createQS('ARE_YOU_UNDER_65_YEAR_OF_AGE')
    return Are_you_under_65_year_of_age
  }
  getAre_you_under_65_year_of_age() {
    return this._QS.getQSByType('ARE_YOU_UNDER_65_YEAR_OF_AGE')
  }
  // --------------------Is_your_gross_income_less_than_$8450?---------------------------
  checkIs_your_gross_income_less_than_A(address) {
    let checkIs_your_gross_income_less_than_A = this.getIs_your_gross_income_less_than_AByAddress(address)
    if (!checkIs_your_gross_income_less_than_A || checkIs_your_gross_income_less_than_A.type !== 'IS_YOUR_GROSS_INCOME_LESS_THAN_$8450') throw `IS_YOUR_GROSS_INCOME_LESS_THAN_$8450 IS NOT EXIST`
    return true
  }
  getIs_your_gross_income_less_than_AByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Is_your_gross_income_less_than_$8450() {
    await this.checkAre_you_under_65_year_of_age(this.sender, 'ARE_YOU_UNDER_65_YEAR_OF_AGE')
    let Is_your_gross_income_less_than_A = await this._QS.createQS('IS_YOUR_GROSS_INCOME_LESS_THAN_$8450')
    return Is_your_gross_income_less_than_A
  }
  getIs_your_gross_income_less_than_$8450() {

    return this._QS.getQSByType('IS_YOUR_GROSS_INCOME_LESS_THAN_$8450')
  }
  // --------------------Youdo_not_have_to_file_an_income_tax_return ---------------------------

  async Youdo_not_have_to_file_an_income_tax_return() {
    await this.checkIs_your_gross_income_less_than_A(this.sender, 'IS_YOUR_GROSS_INCOME_LESS_THAN_$8450')
    let Youdo_not_have_to_file_an_income_tax_return = await this._QS.createQS('_YOU_DO_NOT_HAVE_TO_FILE_AN_INCOME_TAX_RETURN')
    this.setToAddress(Youdo_not_have_to_file_an_income_tax_return.address)
    return 'YES'
  }


// --------------------createYouhave_to_file_an_income_tax_return ---------------------------

  async Youhave_to_file_an_income_tax_return() {
    await this.checkIs_your_gross_income_less_than_A(this.sender, 'IS_YOUR_GROSS_INCOME_LESS_THAN_$8450')
    let Youhave_to_file_an_income_tax_return = await this._QS.createQS('_YOU_HAVE_TO_FILE_AN_INCOME_TAX_RETURN')
    this.setToAddress(Youhave_to_file_an_income_tax_return.address)
    return 'NO'
  }


  // --------------------Is_your_gross_income_less_than_$9700---------------------------

  checkIs_your_gross_income_less_than_B(address) {
    let checkIs_your_gross_income_less_than_B = this.getIs_your_gross_income_less_than_BByAddress(address)
    if (!checkIs_your_gross_income_less_than_B || checkIs_your_gross_income_less_than_B.type !== 'IS_YOUR_GROSS_INCOME_LESS_THAN_$9700') throw `IS_YOUR_GROSS_INCOME_LESS_THAN_$9700 IS NOT EXIST`
    return true
  }
  getIs_your_gross_income_less_than_BByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Is_your_gross_income_less_than_$9700() {
    await this.checkAre_you_under_65_year_of_age(this.sender, 'ARE_YOU_UNDER_65_YEAR_OF_AGE')
    let Is_your_gross_income_less_than_B = await this._QS.createQS('IS_YOUR_GROSS_INCOME_LESS_THAN_$9700')
    return Is_your_gross_income_less_than_B
  }

  getIs_your_gross_income_less_than_$9700() {
    return this._QS.getQSByType('IS_YOUR_GROSS_INCOME_LESS_THAN_$9700')
  }

   // --------------------You_have_to_file_an_income_tax_return ---------------------------

  async You_have_to_file_an_income_tax_return() {
    await this.checkIs_your_gross_income_less_than_B(this.sender, 'IS_YOUR_GROSS_INCOME_LESS_THAN_$9700')
    let You_have_to_file_an_income_tax_return = await this._QS.createQS('YOU_HAVE_TO_FILE_AN_INCOME_TAX_RETURN')
    this.setToAddress(You_have_to_file_an_income_tax_return.address)
    return 'NO'
  }
   // --------------------You_do_not_have_to_file_an_income_tax_return ---------------------------

  async You_do_not_have_to_file_an_income_tax_return() {
    await this.checkIs_your_gross_income_less_than_B(this.sender, 'IS_YOUR_GROSS_INCOME_LESS_THAN_$9700')
    let You_do_not_have_to_file_an_income_tax_return = await this._QS.createQS('YOU_DO_NOT_HAVE_TO_FILE_AN_INCOME_TAX_RETURN')
    this.setToAddress(You_do_not_have_to_file_an_income_tax_return.address)
    return 'YES'
  }



}
export default TokenMain;
