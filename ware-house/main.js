import Contract from 'Contract'
import User from './user'
import Ware from './ware'
class TokenMain extends Contract {
  static viewFuncs = [
    'get_Supplier',
    'get_Order_goods_with_the_outsourcer',
    'get_Update_order_with_the_outsourcer',
    'get_Update_shipment_requests',
    'get_Send_update_shipment_request_information_to_LSP',
    'get_Update_SO_shipping_info_based_on_SO',
    'get_Send_delivery_information_to_OTM',
    'get_Plan_deliveries_and_send_trip_information_to_LSP',
    'get_Update_delivery_information_create_trips',
    'get_Picking_wave',
    'get_Allocate_material_matching_outsourcer_inventory',
    'get_Planned_stock_suggestions_replenishments',
    'get_Run_tasks_manage_resources',
    'get_Pick_pack_print_labels_for_material_to_outsourcers_customers',
    'get_Ship_material_to_outsourcers_customer',
    'get_Send_shipment_confirmation_to_outsourcer',
    'get_Perform_shipping_and_raise_invoice_to_customer',
    'get_Invoice_for_customer'



  ]
  static authenticationFuncs = [
    'create_Order_goods_with_the_outsourcer',
    'create_Update_order_with_the_outsourcer',
    'create_Update_shipment_requests',
    'create_Send_update_shipment_request_information_to_LSP',
    'create_Update_SO_shipping_info_based_on_SO',
    'create_Send_delivery_information_to_OTM',
    'create_Plan_deliveries_and_send_trip_information_to_LSP',
    'create_Update_delivery_information_create_trips',
    'create_Picking_wave',
    'create_Allocate_material_matching_outsourcer_inventory',
    'create_Planned_stock_suggestions_replenishments',
    'create_Run_tasks_manage_resources',
    'create_Pick_pack_print_labels_for_material_to_outsourcers_customers',
    'create_Ship_material_to_outsourcers_customer',
    'create_Send_shipment_confirmation_to_outsourcer',
    'create_Perform_shipping_and_raise_invoice_to_customer',
    'create_Invoice_for_customer',
    'create_Reaceive_goods_from_LSP_and_pay_outsourcer'

  ]
  static publicFuncs = [
    'create_Supplier',
    'get_Supplier',
    'create_Order_goods_with_the_outsourcer',
    'get_Order_goods_with_the_outsourcer',
    'create_Update_order_with_the_outsourcer',
    'get_Update_order_with_the_outsourcer',
    'create_Update_shipment_requests',
    'get_Update_shipment_requests',
    'create_Send_update_shipment_request_information_to_LSP',
    'get_Send_update_shipment_request_information_to_LSP',
    'create_Update_SO_shipping_info_based_on_SO',
    'get_Update_SO_shipping_info_based_on_SO',
    'create_Send_delivery_information_to_OTM',
    'get_Send_delivery_information_to_OTM',
    'create_Plan_deliveries_and_send_trip_information_to_LSP',
    'get_Plan_deliveries_and_send_trip_information_to_LSP',
    'create_Update_delivery_information_create_trips',
    'get_Update_delivery_information_create_trips',
    'create_Picking_wave',
    'get_Picking_wave',
    'create_Allocate_material_matching_outsourcer_inventory',
    'get_Allocate_material_matching_outsourcer_inventory',
    'create_Planned_stock_suggestions_replenishments',
    'get_Planned_stock_suggestions_replenishments',
    'create_Run_tasks_manage_resources',
    'get_Run_tasks_manage_resources',
    'create_Pick_pack_print_labels_for_material_to_outsourcers_customers',
    'get_Pick_pack_print_labels_for_material_to_outsourcers_customers',
    'create_Ship_material_to_outsourcers_customer',
    'get_Ship_material_to_outsourcers_customer',
    'create_Send_shipment_confirmation_to_outsourcer',
    'get_Send_shipment_confirmation_to_outsourcer',
    'create_Perform_shipping_and_raise_invoice_to_customer',
    'get_Perform_shipping_and_raise_invoice_to_customer',
    'create_Invoice_for_customer',
    'get_Invoice_for_customer',
    'create_Reaceive_goods_from_LSP_and_pay_outsourcer'





  ]
  static schemas = {
    name: {
      type: String,
      default: 'WARE_HOUSE'
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
    this._ware = new Ware(data)
  }
  //---------------------USER------------------------------
  async create_Supplier() {
    let Supplier = await this._user.createUser('SUPPLIER')
    return Supplier
  }
  get_Supplier() {
    let Suppliers = this._user.getUserByType('SUPPLIER')
    return Suppliers
  }
  async create_Client() {
    let Client = await this._user.createUser('CLIENT')
    return Client
  }
  
  // --------------------create_Order_goods_with_the_outsourcer---------------------------
  check_Order_goods_with_the_outsourcer(address) {
    let check_Order_goods_with_the_outsourcer = this.get_Order_goods_with_the_outsourcerByAddress(address)
    if (!check_Order_goods_with_the_outsourcer || check_Order_goods_with_the_outsourcer.type !== 'ORDER_GOODS_WITH_THE_OUTSOURCER') throw `ORDER_GOODS_WITH_THE_OUTSOURCER IS NOT EXIST`
    return true
  }
  get_Order_goods_with_the_outsourcerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }

  async create_Order_goods_with_the_outsourcer() {
    await this._user.checkUser(this.sender, 'SUPPLIER')
    let good = await this._ware.createWare('ORDER_GOODS_WITH_THE_OUTSOURCER')
    return good
  }
  get_Order_goods_with_the_outsourcer() {
    return this._ware.getWareByType('ORDER_GOODS_WITH_THE_OUTSOURCER')
  }



  // --------------------create_Update_order_with_the_outsourcer---------------------------
  check_Update_order_with_the_outsourcer(address) {
    let check_Update_order_with_the_outsourcer = this.get_Update_order_with_the_outsourcerByAddress(address)
    if (!check_Update_order_with_the_outsourcer || check_Update_order_with_the_outsourcer.type !== 'UPDATE_ORDER_WITH_THE_OUTSOURCER') throw `UPDATE_ORDER_WITH_THE_OUTSOURCER IS NOT EXIST`
    return true
  }
  get_Update_order_with_the_outsourcerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_Update_order_with_the_outsourcer() {
    await this._user.checkUser(this.sender, 'SUPPLIER')
    let up = await this._ware.createWare('UPDATE_ORDER_WITH_THE_OUTSOURCER')
    return up
  }
  get_Update_order_with_the_outsourcer() {
    return this._ware.getWareByType('UPDATE_ORDER_WITH_THE_OUTSOURCER')
  }

  //--------------------create_Update_shipment_requests---------------------------
  check_Update_shipment_requests(address) {
    let check_Update_shipment_requests= this.get_Update_shipment_requestsByAddress(address)
    if (!check_Update_shipment_requests || check_Update_shipment_requests.type !== 'UPDATE_SHIPMENT_REQUESTS') throw `UPDATE_SHIPMENT_REQUESTS IS NOT EXIST`
    return true
  }
  get_Update_shipment_requestsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_Update_shipment_requests() {
    await this.check_Update_order_with_the_outsourcer(this.sender, 'UPDATE_ORDER_WITH_THE_OUTSOURCER')||this.check_Order_goods_with_the_outsourcer(this.sender, 'ORDER_GOODS_WITH_THE_OUTSOURCER')
    let _Update_shipment_requests = await this._ware.createWare('UPDATE_SHIPMENT_REQUESTS')
    return _Update_shipment_requests
  }
  get_Update_shipment_requests() {
    return this._ware.getWareByType('UPDATE_SHIPMENT_REQUESTS')
  }


  // --------------------create_Send_update_shipment_request_information_to_LSP---------------------------
  check_Send_update_shipment_request_information_to_LSP(address) {
    let check_Send_update_shipment_request_information_to_LSP= this.get_Send_update_shipment_request_information_to_LSPByAddress(address)
    if (!check_Send_update_shipment_request_information_to_LSP || check_Send_update_shipment_request_information_to_LSP.type !== 'SEND_UPDATE_SHIPMENT_REQUEST_INFORMATION_TO_LSP') throw `SEND_UPDATE_SHIPMENT_REQUEST_INFORMATION_TO_LSP IS NOT EXIST`
    return true
  }
  get_Send_update_shipment_request_information_to_LSPByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_Send_update_shipment_request_information_to_LSP() {
    await this.check_Update_shipment_requests(this.sender, 'UPDATE_SHIPMENT_REQUESTS')
    let _Send_update_shipment_request_information_to_LSP = await this._ware.createWare('SEND_UPDATE_SHIPMENT_REQUEST_INFORMATION_TO_LSP')
    return _Send_update_shipment_request_information_to_LSP
  }
  get_Send_update_shipment_request_information_to_LSP() {
    return this._ware.getWareByType('SEND_UPDATE_SHIPMENT_REQUEST_INFORMATION_TO_LSP')
  }

  // --------------------create_Update_SO_shipping_info_based_on_SO---------------------------
  check_Update_SO_shipping_info_based_on_SO(address) {
    let check_Update_SO_shipping_info_based_on_SO = this.get_Update_SO_shipping_info_based_on_SOByAddress(address)
    if (!check_Update_SO_shipping_info_based_on_SO || check_Update_SO_shipping_info_based_on_SO.type !== 'UPDATE_SO_SHIPPING_INFO_BASED_ON_SO') throw `UPDATE_SO_SHIPPING_INFO_BASED_ON_SO IS NOT EXIST`
    return true
  }
  get_Update_SO_shipping_info_based_on_SOByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_Update_SO_shipping_info_based_on_SO() {
    await this.check_Send_update_shipment_request_information_to_LSP(this.sender, 'SEND_UPDATE_SHIPMENT_REQUEST_INFORMATION_TO_LSP')
    let _Update_SO_shipping_info_based_on_SO = await this._ware.createWare('UPDATE_SO_SHIPPING_INFO_BASED_ON_SO')
    return _Update_SO_shipping_info_based_on_SO
  }

  get_Update_SO_shipping_info_based_on_SO() {
    return this._ware.getWareByType('UPDATE_SO_SHIPPING_INFO_BASED_ON_SO')
  }
  // --------------------create_Send_delivery_information_to_OTM---------------------------
  check_Send_delivery_information_to_OTM(address) {
    let check_Send_delivery_information_to_OTM = this.get_Send_delivery_information_to_OTMByAddress(address)
    if (!check_Send_delivery_information_to_OTM || check_Send_delivery_information_to_OTM.type !== 'SEND_DELIVERY_INFORMATION_TO_OTM') throw `UPDATE_SO_SHIPPING_INFO_BASED_ON_SO IS NOT EXIST`
    return true
  }
  get_Send_delivery_information_to_OTMByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_Send_delivery_information_to_OTM() {
    await this.check_Update_SO_shipping_info_based_on_SO (this.sender, 'UPDATE_SO_SHIPPING_INFO_BASED_ON_SO')
    let _Send_delivery_information_to_OTM = await this._ware.createWare('SEND_DELIVERY_INFORMATION_TO_OTM')
    return _Send_delivery_information_to_OTM
  }

  get_Send_delivery_information_to_OTM() {
    return this._ware.getWareByType('SEND_DELIVERY_INFORMATION_TO_OTM')
  }

  // --------------------create_Plan_deliveries_and_send_trip_information_to_LSP---------------------------
  check_Plan_deliveries_and_send_trip_information_to_LSP(address) {
    let check_Plan_deliveries_and_send_trip_information_to_LSP = this.get_Plan_deliveries_and_send_trip_information_to_LSPByAddress(address)
    if (!check_Plan_deliveries_and_send_trip_information_to_LSP || check_Plan_deliveries_and_send_trip_information_to_LSP.type !== 'PLAN_DELIVERIES_AND_SEND_TRIP_INFORMATION_TO_LSP') throw `PLAN_DELIVERIES_AND_SEND_TRIP_INFORMATION_TO_LSP IS NOT EXIST`
    return true
  }
  get_Plan_deliveries_and_send_trip_information_to_LSPByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_Plan_deliveries_and_send_trip_information_to_LSP() {
    await this.check_Send_delivery_information_to_OTM(this.sender, 'SEND_DELIVERY_INFORMATION_TO_OTM')
    let _Plan_deliveries_and_send_trip_information_to_LSP = await this._ware.createWare('PLAN_DELIVERIES_AND_SEND_TRIP_INFORMATION_TO_LSP')
    return _Plan_deliveries_and_send_trip_information_to_LSP
  }

  get_Plan_deliveries_and_send_trip_information_to_LSP() {
    return this._ware.getWareByType('PLAN_DELIVERIES_AND_SEND_TRIP_INFORMATION_TO_LSP')
  }

  // --------------------create_Update_delivery_information_create_trips---------------------------
  check_Update_delivery_information_create_trips(address) {
    let check_Update_delivery_information_create_trips = this.get_Update_delivery_information_create_tripsByAddress(address)
    if (!check_Update_delivery_information_create_trips || check_Update_delivery_information_create_trips.type !== 'UPDATE_DELIVERY_INFORMATION_CREATE_TRIPS') throw `UPDATE_DELIVERY_INFORMATION_CREATE_TRIPS IS NOT EXIST`
    return true
  }
  get_Update_delivery_information_create_tripsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_Update_delivery_information_create_trips() {
    await this.check_Plan_deliveries_and_send_trip_information_to_LSP(this.sender, 'PLAN_DELIVERIES_AND_SEND_TRIP_INFORMATION_TO_LSP')
    let _Update_delivery_information_create_trips = await this._ware.createWare('UPDATE_DELIVERY_INFORMATION_CREATE_TRIPS')
    return _Update_delivery_information_create_trips
  }

  get_Update_delivery_information_create_trips() {
    return this._ware.getWareByType('UPDATE_DELIVERY_INFORMATION_CREATE_TRIPS')
  }


  // --------------------create_Picking_wave---------------------------
  check_Picking_wave(address) {
    let check_Picking_wave = this.get_Picking_waveByAddress(address)
    if (!check_Picking_wave || check_Picking_wave.type !== 'PICKING_WARE') throw `PICKING_WARE IS NOT EXIST`
    return true
  }
  get_Picking_waveByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_Picking_wave() {
    (await this.check_Update_delivery_information_create_trips(this.sender, 'UPDATE_DELIVERY_INFORMATION_CREATE_TRIPS'))||(await this.check_Update_SO_shipping_info_based_on_SO(this.sender, 'UPDATE_SO_SHIPPING_INFO_BASED_ON_SO'))
    let _Picking_wave = await this._ware.createWare('PICKING_WARE')
    return _Picking_wave
  }

  get_Picking_wave() {
    return this._ware.getWareByType('PICKING_WARE')
  }

  //--------------------Create_Allocate_material_matching_outsourcer_inventory---------------------------
  check_Allocate_material_matching_outsourcer_inventory(address) {
    let check_Allocate_material_matching_outsourcer_inventory = this.get_Allocate_material_matching_outsourcer_inventoryByAddress(address)
    if (!check_Allocate_material_matching_outsourcer_inventory || check_Allocate_material_matching_outsourcer_inventory.type !== 'ALLOCATE_MATERIAL_MATCHING_OUTSOURCER_INVENTORY') throw `ALLOCATE_MATERIAL_MATCHING_OUTSOURCER_INVENTORY IS NOT EXIST`
    return true
  }
  get_Allocate_material_matching_outsourcer_inventoryByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_Allocate_material_matching_outsourcer_inventory() {
    await this.check_Picking_wave(this.sender, 'PICKING_WARE')
    let _Allocate_material_matching_outsourcer_inventory = await this._ware.createWare('ALLOCATE_MATERIAL_MATCHING_OUTSOURCER_INVENTORY')
    return _Allocate_material_matching_outsourcer_inventory
  }

  get_Allocate_material_matching_outsourcer_inventory() {
    return this._ware.getWareByType('UPDATE_DELIVERY_INFORMATION_CREATE_TRIPS')
  }
  //--------------------create_Planned_stock_suggestions_replenishments---------------------------
  check_Planned_stock_suggestions_replenishments(address) {
    let check_Planned_stock_suggestions_replenishments = this.get_Planned_stock_suggestions_replenishmentsByAddress(address)
    if (!check_Planned_stock_suggestions_replenishments || check_Planned_stock_suggestions_replenishments.type !== 'PLANED_STOCK_SUGGESTIONS_REPLENISHMENTS') throw `PLANED_STOCK_SUGGESTIONS_REPLENISHMENTS IS NOT EXIST`
    return true
  }
  get_Planned_stock_suggestions_replenishmentsByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_Planned_stock_suggestions_replenishments() {
    await this.check_Allocate_material_matching_outsourcer_inventory(this.sender, 'ALLOCATE_MATERIAL_MATCHING_OUTSOURCER_INVENTORY')
    let _Planned_stock_suggestions_replenishments = await this._ware.createWare('PLANED_STOCK_SUGGESTIONS_REPLENISHMENTS')
    return _Planned_stock_suggestions_replenishments
  }

  get_Planned_stock_suggestions_replenishments() {
    return this._ware.getWareByType('PLANED_STOCK_SUGGESTIONS_REPLENISHMENTS')
  }
  //--------------------create_Run_tasks_manage_resources---------------------------
  check_Run_tasks_manage_resources(address) {
    let check_Run_tasks_manage_resources = this.get_Run_tasks_manage_resourcesByAddress(address)
    if (!check_Run_tasks_manage_resources || check_Run_tasks_manage_resources.type !== 'RUN_TASKS_MANAGE_RESOURCES') throw `RUN_TASKS_MANAGE_RESOURCES IS NOT EXIST`
    return true
  }
  get_Run_tasks_manage_resourcesByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_Run_tasks_manage_resources() {
    await this.check_Planned_stock_suggestions_replenishments(this.sender, 'PLANED_STOCK_SUGGESTIONS_REPLENISHMENTS')
    let _Run_tasks_manage_resources = await this._ware.createWare('RUN_TASKS_MANAGE_RESOURCES')
    return _Run_tasks_manage_resources
  }

  get_Run_tasks_manage_resources() {
    return this._ware.getWareByType('RUN_TASKS_MANAGE_RESOURCES')
  }
  //--------------------create_Pick_pack_print_labels_for_material_to_outsourcers_customers---------------------------
  check_Pick_pack_print_labels_for_material_to_outsourcers_customers(address) {
    let check_Pick_pack_print_labels_for_material_to_outsourcers_customers = this.get_Pick_pack_print_labels_for_material_to_outsourcers_customersByAddress(address)
    if (!check_Pick_pack_print_labels_for_material_to_outsourcers_customers || check_Pick_pack_print_labels_for_material_to_outsourcers_customers.type !== 'PICK_PACK_PRINT_LABEL_FOR_MATERRIAL_TO_OUTSOURCERS_CUTOMERS') throw `PICK_PACK_PRINT_LABEL_FOR_MATERRIAL_TO_OUTSOURCERS_CUTOMERS IS NOT EXIST`
    return true
  }
  get_Pick_pack_print_labels_for_material_to_outsourcers_customersByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_Pick_pack_print_labels_for_material_to_outsourcers_customers() {
    await this.check_Run_tasks_manage_resources(this.sender, 'RUN_TASKS_MANAGE_RESOURCES')
    let _Pick_pack_print_labels_for_material_to_outsourcers_customers = await this._ware.createWare('PICK_PACK_PRINT_LABEL_FOR_MATERRIAL_TO_OUTSOURCERS_CUTOMERS')
    return _Pick_pack_print_labels_for_material_to_outsourcers_customers
  }

  get_Pick_pack_print_labels_for_material_to_outsourcers_customers() {
    return this._ware.getWareByType('PICK_PACK_PRINT_LABEL_FOR_MATERRIAL_TO_OUTSOURCERS_CUTOMERS')
  }

  //--------------------create_Ship_material_to_outsourcers_customer---------------------------
  check_Ship_material_to_outsourcers_customer(address) {
    let check_Ship_material_to_outsourcers_customer = this.get_Ship_material_to_outsourcers_customerByAddress(address)
    if (!check_Ship_material_to_outsourcers_customer || check_Ship_material_to_outsourcers_customer.type !== 'SHIP_MATERIAL_TO_OUTSOURCERS_CUSTOMER') throw `SHIP_MATERIAL_TO_OUTSOURCERS_CUSTOMER IS NOT EXIST`
    return true
  }
  get_Ship_material_to_outsourcers_customerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_Ship_material_to_outsourcers_customer() {
    await this.check_Pick_pack_print_labels_for_material_to_outsourcers_customers(this.sender, 'PICK_PACK_PRINT_LABEL_FOR_MATERRIAL_TO_OUTSOURCERS_CUTOMERS')
    let _Ship_material_to_outsourcers_customer = await this._ware.createWare('SHIP_MATERIAL_TO_OUTSOURCERS_CUSTOMER')
    return _Ship_material_to_outsourcers_customer
  }

  get_Ship_material_to_outsourcers_customer() {
    return this._ware.getWareByType('SHIP_MATERIAL_TO_OUTSOURCERS_CUSTOMER')
  }
  //--------------------create_Send_shipment_confirmation_to_outsourcer---------------------------
  check_Send_shipment_confirmation_to_outsourcer(address) {
    let check_Send_shipment_confirmation_to_outsourcer = this.get_Send_shipment_confirmation_to_outsourcerByAddress(address)
    if (!check_Send_shipment_confirmation_to_outsourcer || check_Send_shipment_confirmation_to_outsourcer.type !== 'SEND_SHIPMENT_CONFIRMATION_TO_OUTSOURCER') throw `SEND_SHIPMENT_CONFIRMATION_TO_OUTSOURCER IS NOT EXIST`
    return true
  }
  get_Send_shipment_confirmation_to_outsourcerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_Send_shipment_confirmation_to_outsourcer() {
    await this.check_Ship_material_to_outsourcers_customer(this.sender, 'SHIP_MATERIAL_TO_OUTSOURCERS_CUSTOMER')
    let _Send_shipment_confirmation_to_outsourcer = await this._ware.createWare('SEND_SHIPMENT_CONFIRMATION_TO_OUTSOURCER')
    return _Send_shipment_confirmation_to_outsourcer
  }

  get_Ship_material_to_outsourcers_customer() {
    return this._ware.getWareByType('SEND_SHIPMENT_CONFIRMATION_TO_OUTSOURCER')
  }
  //--------------------create_Perform_shipping_and_raise_invoice_to_customer---------------------------
  check_Perform_shipping_and_raise_invoice_to_customer(address) {
    let check_Perform_shipping_and_raise_invoice_to_customer = this.get_Perform_shipping_and_raise_invoice_to_customerByAddress(address)
    if (!check_Perform_shipping_and_raise_invoice_to_customer || check_Perform_shipping_and_raise_invoice_to_customer.type !== 'PERFORM_SHIPPING_AND_RAISE_INVOICE_TO_CUSTOMER') throw `PERFORM_SHIPPING_AND_RAISE_INVOICE_TO_CUSTOMER IS NOT EXIST`
    return true
  }
  get_Perform_shipping_and_raise_invoice_to_customerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_Perform_shipping_and_raise_invoice_to_customer() {
    await this.check_Ship_material_to_outsourcers_customer(this.sender, 'SEND_SHIPMENT_CONFIRMATION_TO_OUTSOURCER')
    let _Perform_shipping_and_raise_invoice_to_customer = await this._ware.createWare('PERFORM_SHIPPING_AND_RAISE_INVOICE_TO_CUSTOMER')
    return _Perform_shipping_and_raise_invoice_to_customer
  }

  get_Perform_shipping_and_raise_invoice_to_customer() {
    return this._ware.getWareByType('PERFORM_SHIPPING_AND_RAISE_INVOICE_TO_CUSTOMER')
  }
  //--------------------create_Invoice_for_customer---------------------------
  check_Invoice_for_customer(address) {
    let check_Invoice_for_customer = this.get_Invoice_for_customerByAddress(address)
    if (!check_Invoice_for_customer || check_Invoice_for_customer.type !== 'INVOICE_FOR_CUSTOMER') throw `INVOICE_FOR_CUSTOMER IS NOT EXIST`
    return true
  }
  get_Invoice_for_customerByAddress(address) {
    return this.accounts.find(account => account.address === address)
  }
  async create_Invoice_for_customer() {
    await this.check_Ship_material_to_outsourcers_customer(this.sender, 'PERFORM_SHIPPING_AND_RAISE_INVOICE_TO_CUSTOMER')
    let _Invoice_for_customer = await this._ware.createWare('INVOICE_FOR_CUSTOMER')
    return _Invoice_for_customer
  }

  get_Invoice_for_customer() {
    return this._ware.getWareByType('INVOICE_FOR_CUSTOMER')
  }
   //--------------------create_Reaceive_goods_from_LSP_and_pay_outsourcer---------------------------
  async create_Reaceive_goods_from_LSP_and_pay_outsourcer() {
    (await this.check_Invoice_for_customer(this.sender, 'INVOICE_FOR_CUSTOMER'))||(await this.check_Ship_material_to_outsourcers_customer(this.sender, 'SHIP_MATERIAL_TO_OUTSOURCERS_CUSTOMER'))
    let _Reaceive_goods_from_LSP_and_pay_outsourcer = await this._grade.createGrade('REACEIVE_GOODS_FROM_LSP_AND_PAY_OUTSOURCER')
    this.setToAddress(_Reaceive_goods_from_LSP_and_pay_outsourcer.address)
    return 'SUCCESS'




}}
export default TokenMain;
