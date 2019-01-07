import Contract from 'Contract'
import Payment from 'Payment'
// ICO
class TokenMain extends Contract {
  static viewFuncs = ['getAddresses', 'getTokenName', 'getWalletByAddress']
  static authenticationFuncs = ['transfer', 'buyToken']
  static owner = ['setPrice']
  static publicFuncs = [
    'getAddresses',
    'createAccount',
    'getTokenName',
    'getWalletByAddress',
    'getMyAccount',
    'transfer',
    'buyToken'
  ]
  static schemas = {
    tokenName: 'CSE Token',
    tokenSymbol: 'CSE',
    totalSupply: {
      type: Number,
      default: 10000000
    },
    price: {
      type: Number,
      default: 0.3
    },
    accounts: [
      {
        balance: {
          type: Number,
          default: 0
        },
        address: {
          type: String,
          required: true
        }
      }
    ],
    balances: {
      type: Array,
      default: []
    }
  }

  constructor(data) {
    super(data)
    this._payment = new Payment(data)
  }

  getAddresses() {
    return this.accounts
  }

  getTokenName() {
    return this.tokenName
  }

  transfer(to, amount) {
    const fromAddress = this.sender // from headers // privatekey => public key
    const walletFrom = this.getWalletByAddress(fromAddress)
    try {
      if (walletFrom.balance < amount) throw 'not foudskfsd '
      const walletTo = this.getWalletByAddress(to)
      // subtract from wallet
      walletFrom.balance -= amount
      // add to wallet
      walletTo.balance += amount
      // this.onSuccess('Tranfer success')
    } catch (error) {
      this.onError(error)
    }
    return fromAddress
  }

  getWalletByAddress(address) {
    return this.accounts.find(account => (account.address = address))
  }

  async createAccount() {
    // create address
    const address = await this.generateAddress()
    // save to db
    const rs = {
      address: address.address,
      balance: 0
    }
    this.accounts.push(rs)
    return address
  }

  async buyToken(amount) {
    const CSEPrice = Number(amount) * this.price
    const addressSender = this.sender
    const isOK = await this._payment.payment(CSEPrice)
    if (!isOK) return false
    let wallet = this.getWalletByAddress(addressSender)
    wallet.balance += amount
    return isOK
  }

  setPrice(price) {
    this.price = price
  }

  getMyAccount(address) {
    return this.accounts.find(account => account.address === address)
  }

  getCurrentBlock() {
    const block = this.getLastestBlock()
    return block
  }
}

export default TokenMain
