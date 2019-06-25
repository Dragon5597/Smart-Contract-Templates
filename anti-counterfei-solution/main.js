import Contract from 'Contract'
import User from './user'
import Stage from './stage'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Wholesaler',
    'get_Retailer',
    'get_Customer',
    'get_Place_PO_on_Manufacturer',
    'get_Create_WO',
    'get_Manufacturer_Goods',
    'get_Blockchain_Token_for_Finished_Good',
    'get_Order_Fulfillment_ship_the_goods_with_Generated_Token',
    'get_Receive_PO_and_verify_Tag',
    'get_Place_PO_on_wholesaler',
    'get_Sales_Order_Generated_for_Ratailer',
    'get_Fulfillment_of_Sales_Order_Shipment_to_Retailer',
    'get_Change_of_ownership_and_tranfer_for_Token_to_Retailer',
    'get_PO_Receipt_on_Verification_of_Token',
    'get_Purchase_Product_from_Retailer',
    'get_Product_sold_to_customer',
    'get_Ships_Goods_to_Customer',
    // 'get_Receipt_and_Verify_the_Product_and_track_hitory_using_Token'

  ]
  static authenticationFuncs = [
    'Place_PO_on_Manufacturer',
    'Create_WO',
    'Manufacturer_Goods',
    'Blockchain_Token_for_Finished_Good',
    'Order_Fulfillment_ship_the_goods_with_Generated_Token',
    'Receive_PO_and_verify_Tag',
    'Place_PO_on_wholesaler',
    'Sales_Order_Generated_for_Ratailer',
    'Fulfillment_of_Sales_Order_Shipment_to_Retailer',
    'Change_of_ownership_and_tranfer_for_Token_to_Retailer',
    'PO_Receipt_on_Verification_of_Token',
    'Purchase_Product_from_Retailer',
    'Product_sold_to_customer',
    'Ships_Goods_to_Customer',
    'Receipt_and_Verify_the_Product_and_track_history_using_Token'

  ]
  static publicFuncs = [



    'create_Wholesaler',
    'get_Wholesaler',
    'create_Retailer',
    'get_Retailer',
    'create_Customer',
    'get_Customer',
    'Place_PO_on_Manufacturer',
    'get_Place_PO_on_Manufacturer',
    'Create_WO',
    'get_Create_WO',
    'Manufacturer_Goods',
    'get_Manufacturer_Goods',
    'Blockchain_Token_for_Finished_Good',
    'get_Blockchain_Token_for_Finished_Good',
    'Order_Fulfillment_ship_the_goods_with_Generated_Token',
    'get_Order_Fulfillment_ship_the_goods_with_Generated_Token',
    'Receive_PO_and_verify_Tag',
    'get_Receive_PO_and_verify_Tag',
    'Place_PO_on_wholesaler',
    'get_Place_PO_on_wholesaler',
    'Sales_Order_Generated_for_Retailer',
    'get_Sales_Order_Generated_for_Retailer',
    'Fulfillment_of_Sales_Order_Shipment_to_Retailer',
    'get_Fulfillment_of_Sales_Order_Shipment_to_Retailer',
    'Change_of_ownership_and_tranfer_for_Token_to_Retailer',
    'get_Change_of_ownership_and_tranfer_for_Token_to_Retailer',
    'PO_Receipt_on_Verification_of_Token',
    'get_PO_Receipt_on_Verification_of_Token',
    'Purchase_Product_from_Retailer',
    'get_Purchase_Product_from_Retailer',
    'Product_sold_to_customer',
    'get_Product_sold_to_customer',
    'Ships_Goods_to_Customer',
    'get_Ships_Goods_to_Customer',
    'Receipt_and_Verify_the_Product_and_track_history_using_Token'


  ]
  static schemas = {
    name: {
      type: String,
      default: 'ANTI_COUNTERFEIT'
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
    this._stage = new Stage(data)
  }
  //---------------------USER------------------------------
  async create_Wholesaler() {
    let Wholesaler = await this._user.createUser('WHOLESALER')
    return Wholesaler
  }
  get_Wholesaler() {
    let Wholesaler = this._user.getUserByType('WHOLESALER')
    return Wholesaler
  }
  async create_Retailer() {
    let Retailer = await this._user.createUser('RETAILER')
    return Retailer
  }
  get_Retailer() {
    let Retailer = this._user.getUserByType('RETAILER')
    return Retailer
  }

  async create_Customer() {
    let Customer = await this._user.createUser('CUSTOMER')
    return Customer
  }
  get_Customer() {
    let Customer = this._user.getUserByType('CUSTOMER')
    return Customer
  }
  


  // --------------------Place_PO_on_Manufacturer---------------------------
  check_Place_PO_on_Manufacturer(address) {
    let check_Place_PO_on_Manufacturer = this.get_Place_PO_on_ManufacturerByAddress(address)
    if (!check_Place_PO_on_Manufacturer || check_Place_PO_on_Manufacturer.type !== 'PLACE_PO_ON_MANUFACTURER') throw `PLACE_PO_ON_MANUFACTURER IS NOT EXIST`
    return true
  }
  get_Place_PO_on_ManufacturerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }

  async Place_PO_on_Manufacturer() {
    await this._user.checkUser(this.sender, 'WHOLESALER')
    let good = await this._stage.createStage('PLACE_PO_ON_MANUFACTURER')
    return good
  }
  get_Place_PO_on_Manufacturer() {
    return this._stage.getStageByType('PLACE_PO_ON_MANUFACTURER')
  }

  // --------------------Create_WO---------------------------

  check_Create_WO(address) {
    let check_Create_WO = this.get_Create_WOByAddress(address)
    if (!check_Create_WO || check_Create_WO.type !== 'CREATE_WO') throw `CREATE_WO IS NOT EXIST`
    return true
  }
  get_Create_WOByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }


  async Create_WO() {
    await this.check_Place_PO_on_Manufacturer(this.sender, 'ORDER_GOODS_WITH_THE_OUTSOURCER')
    let Create_WO = await this._stage.createStage('CREATE_WO')
    return Create_WO
  }
  get_Create_WO() {
    return this._stage.getStageByType('CREATE_WO')
  }


  // --------------------Manufacturer_Goods---------------------------
  check_Manufacturer_Goods(address) {

    let check_Manufacturer_Goods = this.get_Manufacturer_GoodsByAddress(address)
    if (!check_Manufacturer_Goods || check_Manufacturer_Goods.type !== 'MANUFACTURER_GOODS') throw `MANUFACTURER_GOODS IS NOT EXIST`
    return true
  }
  get_Manufacturer_GoodsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Manufacturer_Goods() {
    await this.check_Create_WO(this.sender, 'CREATE_WO')
    let Manufacturer_Goods = await this._stage.createStage('MANUFACTURER_GOODS')
    return Manufacturer_Goods
  }
  get_Manufacturer_Goods() {
    return this._stage.getStageByType('MANUFACTURER_GOODS')
  }

  // --------------------Blockchain_Token_for_Finished_Good---------------------------
  check_Blockchain_Token_for_Finished_Good(address) {
    let check_Blockchain_Token_for_Finished_Good = this.get_Blockchain_Token_for_Finished_GoodByAddress(address)
    if (!check_Blockchain_Token_for_Finished_Good || check_Blockchain_Token_for_Finished_Good.type !== 'BLOCKCHAIN_TOKEN_FOR_FINISHED_GOOD') throw `BLOCKCHAIN_TOKEN_FOR_FINISHED_GOOD IS NOT EXIST`
    return true
  }
  get_Blockchain_Token_for_Finished_GoodByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Blockchain_Token_for_Finished_Good() {
    await this.check_Manufacturer_Goods(this.sender, 'MANUFACTURER_GOODS')
    let Blockchain_Token_for_Finished_Good = await this._stage.createStage('BLOCKCHAIN_TOKEN_FOR_FINISHED_GOOD')
    return Blockchain_Token_for_Finished_Good
  }

  get_Blockchain_Token_for_Finished_Good() {
    return this._stage.getStageByType('BLOCKCHAIN_TOKEN_FOR_FINISHED_GOOD')
  }

  // --------------------Order_Fulfillment_ship_the_goods_with_Generated_Token---------------------------
  
  check_Order_Fulfillment_ship_the_goods_with_Generated_Token(address) {
    let check_Order_Fulfillment_ship_the_goods_with_Generated_Token = this.get_Order_Fulfillment_ship_the_goods_with_Generated_TokenByAddress(address)
    if (!check_Order_Fulfillment_ship_the_goods_with_Generated_Token || check_Order_Fulfillment_ship_the_goods_with_Generated_Token.type !== 'ORDER_FULFILLMENT_SHIP_THE_GOODS_WITH_GENERATED_TOKEN') throw `ORDER_FULFILLMENT_SHIP_THE_GOODS_WITH_GENERATED_TOKEN IS NOT EXIST`
    return true
  }
  get_Order_Fulfillment_ship_the_goods_with_Generated_TokenByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  
  async Order_Fulfillment_ship_the_goods_with_Generated_Token() {
    await this.check_Blockchain_Token_for_Finished_Good(this.sender, 'BLOCKCHAIN_TOKEN_FOR_FINISHED_GOOD')
    let Order_Fulfillment_ship_the_goods_with_Generated_Token = await this._stage.createStage('ORDER_FULFILLMENT_SHIP_THE_GOODS_WITH_GENERATED_TOKEN')
    return Order_Fulfillment_ship_the_goods_with_Generated_Token
  }

  get_Order_Fulfillment_ship_the_goods_with_Generated_Token() {
    return this._stage.getStageByType('ORDER_FULFILLMENT_SHIP_THE_GOODS_WITH_GENERATED_TOKEN')
  }
  // --------------------Receive_PO_and_verify_Tag---------------------------
  check_Receive_PO_and_verify_Tag(address) {
    let check_Receive_PO_and_verify_Tag = this.get_Receive_PO_and_verify_TagByAddress(address)
    if (!check_Receive_PO_and_verify_Tag || check_Receive_PO_and_verify_Tag.type !== 'RECEIVE_PO_AND_VERIFY_TAG') throw `RECEIVE_PO_AND_VERIFY_TAG IS NOT EXIST`
    return true
  }
  get_Receive_PO_and_verify_TagByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Receive_PO_and_verify_Tag() {
    await this.check_Order_Fulfillment_ship_the_goods_with_Generated_Token(this.sender, 'ORDER_FULFILLMENT_SHIP_THE_GOODS_WITH_GENERATED_TOKEN')
    let Receive_PO_and_verify_Tag = await this._stage.createStage('RECEIVE_PO_AND_VERIFY_TAG')
    return Receive_PO_and_verify_Tag
  }

  get_Receive_PO_and_verify_Tag() {
    return this._stage.getStageByType('RECEIVE_PO_AND_VERIFY_TAG')
  }

  // --------------------Place_PO_on_wholesaler---------------------------
  check_Place_PO_on_wholesaler(address) {
    let check_Place_PO_on_wholesaler = this.get_Place_PO_on_wholesalerByAddress(address)
    if (!check_Place_PO_on_wholesaler || check_Place_PO_on_wholesaler.type !== 'PLACE_PO_ON_WHOLESALER') throw `PLACE_PO_ON_WHOLESALER IS NOT EXIST`
    return true
  }
  get_Place_PO_on_wholesalerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Place_PO_on_wholesaler() {
    await this._user.checkUser(this.sender, 'RETAILER')
    let Place_PO_on_wholesaler = await this._stage.createStage('PLACE_PO_ON_WHOLESALER')
    return Place_PO_on_wholesaler
  }

  get_Place_PO_on_wholesaler() {
    return this._stage.getStageByType('PLACE_PO_ON_WHOLESALER')
  }
 

  // --------------------Sales_Order_Generated_for_Ratailer---------------------------
  check_Sales_Order_Generated_for_Retailer(address) {
    let check_Sales_Order_Generated_for_Retailer = this.get_Sales_Order_Generated_for_RetailerByAddress(address)
    if (!check_Sales_Order_Generated_for_Retailer || check_Sales_Order_Generated_for_Retailer.type !== 'SALES_ORDER_GENERATED_FOR_RETAILER') throw `SALES_ORDER_GENERATED_FOR_RETAILER IS NOT EXIST`
    return true
  }
  get_Sales_Order_Generated_for_RetailerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Sales_Order_Generated_for_Retailer() {
    await this.check_Place_PO_on_wholesaler(this.sender, 'PLACE_PO_ON_WHOLESALER')
    let Sales_Order_Generated_for_Retailer = await this._stage.createStage('SALES_ORDER_GENERATED_FOR_RETAILER')
    return Sales_Order_Generated_for_Retailer
  }

  get_Sales_Order_Generated_for_Retailer() {
    return this._stage.getStageByType('SALES_ORDER_GENERATED_FOR_RETAILER')
  }
    // --------------------Fulfillment_of_Sales_Order_Shipment_to_Retailer---------------------------
  check_Fulfillment_of_Sales_Order_Shipment_to_Retailer(address) {
    let check_Fulfillment_of_Sales_Order_Shipment_to_Retailer = this.get_Fulfillment_of_Sales_Order_Shipment_to_RetailerByAddress(address)
    if (!check_Fulfillment_of_Sales_Order_Shipment_to_Retailer || check_Fulfillment_of_Sales_Order_Shipment_to_Retailer.type !== 'FULFILLMENT_OF_SALES_ORDER_SHIPMENT_TO_RETAILER') throw `FULFILLMENT_OF_SALES_ORDER_SHIPMENT_TO_RETAILER IS NOT EXIST`
    return true
  }
  get_Fulfillment_of_Sales_Order_Shipment_to_RetailerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  checkSale(address) {
    this.check_Sales_Order_Generated_for_Retailer = this.get_Sales_Order_Generated_for_RetailerByAddress(address);
    this.check_Receive_PO_and_verify_Tag = this.get_Receive_PO_and_verify_TagByAddress(address);

    if (this.check_Sales_Order_Generated_for_Retailer.type == 'SALES_ORDER_GENERATED_FOR_RETAILER') {
      return true;
    }
    else if (this.check_Receive_PO_and_verify_Tag.type == 'RECEIVE_PO_AND_VERIFY_TAG') {
      return true;
    }
    else {
      throw `SALES_ORDER_GENERATED_FOR_RETAILER_OR_RECEIVE_PO_AND_VERIFY_TAG IS NOT EXIST`;

    }

  }
  async Fulfillment_of_Sales_Order_Shipment_to_Retailer() {
    await this.checkSale(this.sender, 'SALES_ORDER_GENERATED_FOR_RETAILER_OR_RECEIVE_PO_AND_VERIFY_TAG')
    let Fulfillment_of_Sales_Order_Shipment_to_Retailer = await this._stage.createStage('FULFILLMENT_OF_SALES_ORDER_SHIPMENT_TO_RETAILER')
    return Fulfillment_of_Sales_Order_Shipment_to_Retailer
  }

  get_Fulfillment_of_Sales_Order_Shipment_to_Retailer() {
    return this._stage.getStageByType('FULFILLMENT_OF_SALES_ORDER_SHIPMENT_TO_RETAILER')
  }

  // --------------------Change_of_ownership_and_tranfer_for_Token_to_Retailer---------------------------
  check_Change_of_ownership_and_tranfer_for_Token_to_Retailer(address) {
    let check_Change_of_ownership_and_tranfer_for_Token_to_Retailer = this.get_Change_of_ownership_and_tranfer_for_Token_to_RetailerByAddress(address)
    if (!check_Change_of_ownership_and_tranfer_for_Token_to_Retailer || check_Change_of_ownership_and_tranfer_for_Token_to_Retailer.type !== 'CHANGE_OF_OWNERSHIP_AND_TRANFER_FOR_TOKEN_TO_RETAILER') throw `CHANGE_OF_OWNERSHIP_AND_TRANFER_FOR_TOKEN_TO_RETAILER IS NOT EXIST`
    return true
  }
  get_Change_of_ownership_and_tranfer_for_Token_to_RetailerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Change_of_ownership_and_tranfer_for_Token_to_Retailer() {
    await this.check_Fulfillment_of_Sales_Order_Shipment_to_Retailer(this.sender, 'FULFILLMENT_OF_SALES_ORDER_SHIPMENT_TO_RETAILER')
    let Change_of_ownership_and_tranfer_for_Token_to_Retailer = await this._stage.createStage('CHANGE_OF_OWNERSHIP_AND_TRANFER_FOR_TOKEN_TO_RETAILER')
    return Change_of_ownership_and_tranfer_for_Token_to_Retailer
  }

  get_Change_of_ownership_and_tranfer_for_Token_to_Retailer() {
    return this._stage.getStageByType('CHANGE_OF_OWNERSHIP_AND_TRANFER_FOR_TOKEN_TO_RETAILER')
  }

  // --------------------PO_Receipt_on_Verification_of_Token---------------------------
  check_PO_Receipt_on_Verification_of_Token(address) {
    let check_PO_Receipt_on_Verification_of_Token= this.get_PO_Receipt_on_Verification_of_TokenByAddress(address)
    if (!check_PO_Receipt_on_Verification_of_Token || check_PO_Receipt_on_Verification_of_Token.type !== 'PO_RECEIPT_ON_VERIFICATION_OF_TOKEN') throw `PO_RECEIPT_ON_VERIFICATION_OF_TOKEN IS NOT EXIST`
    return true
  }
  get_PO_Receipt_on_Verification_of_TokenByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async PO_Receipt_on_Verification_of_Token() {
    await this.check_Change_of_ownership_and_tranfer_for_Token_to_Retailer(this.sender, 'CHANGE_OF_OWNERSHIP_AND_TRANFER_FOR_TOKEN_TO_RETAILER')
    let PO_Receipt_on_Verification_of_Token = await this._stage.createStage('PO_RECEIPT_ON_VERIFICATION_OF_TOKEN')
    return PO_Receipt_on_Verification_of_Token
  }

  get_PO_Receipt_on_Verification_of_Token() {
    return this._stage.getStageByType('PO_RECEIPT_ON_VERIFICATION_OF_TOKEN')
  }
   // --------------------Purchase_Product_from_Retailer---------------------------
   check_Purchase_Product_from_Retailer(address) {
    let check_Purchase_Product_from_Retailer= this.get_Purchase_Product_from_RetailerByAddress(address)
    if (!check_Purchase_Product_from_Retailer || check_Purchase_Product_from_Retailer.type !== 'PURCHASE_PRODUCT_FROM_RETAILER') throw `PURCHASE_PRODUCT_FROM_RETAILER IS NOT EXIST`
    return true
  }
  get_Purchase_Product_from_RetailerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Purchase_Product_from_Retailer() {
    await this._user.checkUser(this.sender, 'CUSTOMER')
    let Purchase_Product_from_Retailer = await this._stage.createStage('PURCHASE_PRODUCT_FROM_RETAILER')
    return Purchase_Product_from_Retailer
  }

  get_Purchase_Product_from_Retailer() {
    return this._stage.getStageByType('PURCHASE_PRODUCT_FROM_RETAILER')
  }
   // --------------------Product_sold_to_customer---------------------------
   check_Product_sold_to_customer(address) {
    let check_Product_sold_to_customer= this.get_Product_sold_to_customerByAddress(address)
    if (!check_Product_sold_to_customer || check_Product_sold_to_customer.type !== 'PRODUCT_SOLD_TO_CUSTOMER') throw `PRODUCT_SOLD_TO_CUSTOMER IS NOT EXIST`
    return true
  }
  get_Product_sold_to_customerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async Product_sold_to_customer() {
    await this.check_Purchase_Product_from_Retailer(this.sender, 'PURCHASE_PRODUCT_FROM_RETAILER')
    let Product_sold_to_customer = await this._stage.createStage('PRODUCT_SOLD_TO_CUSTOMER')
    return Product_sold_to_customer
  }

  get_Product_sold_to_customer() {
    return this._stage.getStageByType('PRODUCT_SOLD_TO_CUSTOMER')
  }
   // --------------------Ships_Goods_to_Customer---------------------------
   check_Ships_Goods_to_Customer(address) {
    let check_Ships_Goods_to_Customer= this.get_Ships_Goods_to_CustomerByAddress(address)
    if (!check_Ships_Goods_to_Customer || check_Ships_Goods_to_Customer.type !== 'SHIPS_GOODS_TO_CUSTOMER') throw `SHIPS_GOODS_TO_CUSTOMER IS NOT EXIST`
    return true
  }
  get_Ships_Goods_to_CustomerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  checkShip(address) {
    this.check_Product_sold_to_customer = this.get_Product_sold_to_customerByAddress(address);
    this.check_PO_Receipt_on_Verification_of_Token = this.get_PO_Receipt_on_Verification_of_TokenByAddress(address);

    if (this.check_Product_sold_to_customer.type == 'PRODUCT_SOLD_TO_CUSTOMER') {
      return true;
    }
    else if (this.check_PO_Receipt_on_Verification_of_Token.type == 'PO_RECEIPT_ON_VERIFICATION_OF_TOKEN') {
      return true;
    }
    else {
      throw `PRODUCT_SOLD_TO_CUSTOMER_OR_PO_RECEIPT_ON_VERIFICATION_OF_TOKEN IS NOT EXIST`;
    }

  }
  async Ships_Goods_to_Customer() {
    await this.checkShip(this.sender, 'PRODUCT_SOLD_TO_CUSTOMER_OR_PO_RECEIPT_ON_VERIFICATION_OF_TOKEN')
    let Ships_Goods_to_Customer = await this._stage.createStage('SHIPS_GOODS_TO_CUSTOMER')
    return Ships_Goods_to_Customer
  }

  get_Ships_Goods_to_Customer() {
    return this._stage.getStageByType('SHIPS_GOODS_TO_CUSTOMER')
  }

  // --------------------Receipt_and_Verify_the_Product_and_track_history_using_Token---------------------------
  //this.getShips_Goods_to_CustomerByAddress 
  async Receipt_and_Verify_the_Product_and_track_history_using_Token() {
  
    await this.check_Ships_Goods_to_Customer(this.sender, 'SHIPS_GOODS_TO_CUSTOMER')
    let Receipt_and_Verify_the_Product_and_track_history_using_Token = await this._stage.createStage('RECEIPT_AND_VERIFY_THE_PRODUCT_AND_TRACK_HISTORY')
    this.setToAddress(Receipt_and_Verify_the_Product_and_track_history_using_Token.address)
    return 'SUCCESS'
  }

  

  
}
export default TokenMain;
