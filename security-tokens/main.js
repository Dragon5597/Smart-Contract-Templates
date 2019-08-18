import Contract from 'Contract'
import Security from './security'
import Process from './process'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Security_Token_Transaction',
    'get_Compliance_Validation',
    'get_KYC_or_AML',
    'get_Asset_Ownership',
    'get_Financial_Validation',
  ]
  static authenticationFuncs = [
    'Compliance_Validation',
    'KYC_or_AML',
    'Asset_Ownership',
    'Capital_Requirements',
    'Financial_Validation',
    'Double_Spend'
  ]
  static publicFuncs = [
    'Security_Token_Transaction',
    'Compliance_Validation',
    'KYC_or_AML',
    'Asset_Ownership',
    'Capital_Requirements',
    'Financial_Validation',
    'Double_Spend'
  ]
  static schemas = {
    name: {
      type: String,
      default: 'SECURITY_TOKENS'
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
    this._security = new Security(data)
    this._process = new Process(data)
  }
  //---------------------Security_Token_Transaction------------------------------
  async Security_Token_Transaction () {
    let Security_Token_Transaction = await this._security.createSecurity('SECURITY_TOKEN_TRANSACTION')
    return Security_Token_Transaction
  }
  get_Security_Token_Transaction() {
    let Security_Token_Transaction = this._security.getSecurityByType('SECURITY_TOKEN_TRANSACTION')
    return Security_Token_Transaction
  }
  //---------------------Compliance_Validation------------------------------
  check_Compliance_Validation(address) {
    let check_Compliance_Validation = this.get_Compliance_ValidationByAddress(address)
    if (!check_Compliance_Validation || check_Compliance_Validation.type !== 'COMPLIANCE_VALIDATION') throw `COMPLIANCE_VALIDATION IS NOT EXIST`
    return true
  }
  get_Compliance_ValidationByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Compliance_Validation() {
    await this._security.checkSecurity(this.sender, 'SECURITY_TOKEN_TRANSACTION')
    let Compliance_Validation = await this._process.createProcess('COMPLIANCE_VALIDATION')
    return Compliance_Validation
  }
  get_Compliance_Validation() {
    return this._process.getProcessByType('COMPLIANCE_VALIDATION')
  }
  // --------------------KYC_or_AML---------------------------
  check_KYC_or_AML(address) {
    let check_KYC_or_AML = this.get_KYC_or_AMLByAddress(address)
    if (!check_KYC_or_AML || check_KYC_or_AML.type !== 'KYC_OR_AML') throw `KYC_OR_AML IS NOT EXIST`
    return true
  }
  get_KYC_or_AMLByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async KYC_or_AML() {
    await this.check_Compliance_Validation(this.sender, 'COMPLIANCE_VALIDATION')
    let KYC_or_AML = await this._process.createProcess('KYC_OR_AML')
    return KYC_or_AML
  }
  get_KYC_or_AML() {
    return this._process.getProcessByType('KYC_OR_AML')
  }
  // --------------------Asset_Ownership---------------------------
  check_Asset_Ownership(address) {
    let check_Asset_Ownership = this.get_Asset_OwnershipByAddress(address)
    if (!check_Asset_Ownership || check_Asset_Ownership.type !== 'ASSET_OWNERSHIP') throw `ASSET_OWNERSHIP IS NOT EXIST`
    return true
  }
  get_Asset_OwnershipByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Asset_Ownership() {
    await this.check_Compliance_Validation(this.sender, 'COMPLIANCE_VALIDATION')
    let Asset_Ownership = await this._process.createProcess('ASSET_OWNERSHIP')
    return Asset_Ownership
  }
  get_Asset_Ownership() {
    return this._process.getProcessByType('ASSET_OWNERSHIP')
  }
  // --------------------Capital_Requirements---------------------------
  checkProcess1(address) {
    this.check_KYC_or_AML = this.get_KYC_or_AMLByAddress(address);
    this.check_Asset_Ownership = this.get_Asset_OwnershipByAddress(address);
    if (this.check_KYC_or_AML.type == 'KYC_OR_AML') {
      return true;
    }
    else if (this.check_Asset_Ownership.type == 'ASSET_OWNERSHIP') {
      return true;
    }
    else {
      throw `KYC_OR_AML_OR_ASSET_OWNERSHIP IS NOT EXIST`;
    }
  }
  async Capital_Requirements() {
    await this.checkProcess1(this.sender, 'KYC_OR_AML_OR_ASSET_OWNERSHIP')
    let Capital_Requirements = await this._process.createProcess('CAPITAL_REQUIREMENTS')
    this.setToAddress(Capital_Requirements.address)
    return {Capital_Requirements}
  }
  // --------------------Financial_Validation---------------------------
  check_Financial_Validation(address) {
    let check_Financial_Validation = this.getFinancial_ValidationByAddress(address)
    if (!check_Financial_Validation || check_Financial_Validation.type !== 'FINANCIAL_VALIDATION') throw `FINANCIAL_VALIDATION IS NOT EXIST`
    return true
  }
  getFinancial_ValidationByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Financial_Validation() {
    await this._security.checkSecurity(this.sender, 'SECURITY_TOKEN_TRANSACTION')
    let Financial_Validation = await this._process.createProcess('FINANCIAL_VALIDATION')
    return Financial_Validation
  }
  get_Financial_Validation() {
    return this._process.getProcessByType('FINANCIAL_VALIDATION')
  }
  // --------------------Double_Spend---------------------------
  async Double_Spend() {
    await this.check_Financial_Validation(this.sender, 'FINANCIAL_VALIDATION')
    let Double_Spend = await this._process.createProcess('DOUBLE_SPEND')
    this.setToAddress(Double_Spend.address)
    return {Double_Spend}
  }
}
export default TokenMain;
