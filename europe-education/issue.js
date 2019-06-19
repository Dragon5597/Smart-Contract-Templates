import Contract from 'Contract'
const types = ['ISSUE','LEDGERFIRST']
class Issue extends Contract {
  async createIssue (type) {
    if (!types.includes(type)) throw 'CREATE ISSUE FAIL'
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
  checkIssue (address, type) {
    let checkIssue = this.getIssueByAddress(address)
    if (!checkIssue || checkIssue.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getIssueByAddress (address) {
    return this.accounts.find(account => account.address === address)
  }
  getIssueByType (type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Issue;