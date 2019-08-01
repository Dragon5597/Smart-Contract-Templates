import Contract from 'Contract'
const types = ['INTEREST_DOCUMENT']
class Problem extends Contract {
  async createProblem (type) {
    if (!types.includes(type)) throw 'CREATE PROBLEM FAIL'
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
  checkProblem (address, type) {
    let checkProblem = this.getProblewByAddress(address)
    if (!checkProblem || checkProblem.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getProblenByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getProblemByType (type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Problem;