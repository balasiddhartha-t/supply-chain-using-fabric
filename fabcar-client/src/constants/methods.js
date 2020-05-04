/* eslint-disable quote-props */
export default {
  domainUrl: 'http://localhost:8081',
  methodNames: {
    vehicle: 'changeVehicleDetails',
    order: 'changeOrderDetails',
    customer: 'changeCustomerDetails',
    supplier: 'changeSupplierDetails'
  },
  vehicleKeys: [
    'ProductID',
    'CarMaker',
    'CarModel',
    'CarColor',
    'CarModelYear',
    'CarPrice',
    'CustomerName'
  ],
  orderKeys: [
    'OrderID',
    'OrderDate',
    'SupplierName',
    'ProductID',
    'CustomerID',
    'ShipDate',
    'ShipMode',
    'Shipping',
    'Quantity'
  ],
  supplierKeys: ['SupplierName', 'SupplierAddress', 'SupplierContactDetails'],
  customerKeys: [
    'CustomerID',
    'CustomerName',
    'Gender',
    'JobTitle',
    'PhoneNumber',
    'EmailAddress',
    'City',
    'Country',
    'CountryCode',
    'State'
  ],
  mspMap: {
    jeep: 'JeepMSP',
    jeepdealer: 'JeepdealerMSP',
    jeeplogistics: 'JeeplogisticsMSP',
    jeeptrucking: 'JeeptruckingMSP',
    'cbp.gov': 'CbpMSP'
  }
};
