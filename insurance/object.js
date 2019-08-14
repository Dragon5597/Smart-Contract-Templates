import Contract from 'Contract'
const types =[ 'COMPANY','CUSTOMER']
class Object extends Contract {
  async createProcess(type) {
    if (!types.includes(type)) throw 'CREATE OBJECT FAIL'
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
  checkObject(address, type) {
    let checObject = this.getObjectByAddress(address)
    if (!checObject || checObject.type !== type) throw `${type} IS NOT EXIST`
    return true
  }
  getObjectByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  getObjectByType(type) {
    let lists = []
    this.accounts.find(account => {
      if (account.type === type) lists.push(account)
    })
    return lists
  }
}
export default Object;