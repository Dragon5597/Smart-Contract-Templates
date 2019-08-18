import Contract from 'Contract'
const types = ['SECURITY_TOKEN_TRANSACTION']
class Security extends Contract {
  async createSecurity (type) {
    if (!types.includes(type)) throw 'CREATE SECURITY_TOKEN_TRANSACTION FAIL'
    const address = await this.generateAddress()
    console.log({ address })
    let rs = {
      type: type,
      address: address.address,
      timestamp: this.timestamp()
    }
    this.accounts.push(rs)
    return address
  }
  checkSecurity(address, type) {
    let checkSecurity= this.getSecurityByAddress(address)
    if (!checkSecurity || checkSecurity.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getSecurityByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getSecurityByType (type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Security;