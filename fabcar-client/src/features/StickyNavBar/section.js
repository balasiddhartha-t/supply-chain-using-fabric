const orderLinks = {
  1: 'Show All Orders',
  2: 'Update an Order',
  3: 'Create an Order',
  4: 'Order History'
};
const vehicleLinks = { 1: 'Show All Vehicles', 2: 'Update a Vehicle' };
const customerLinks = { 1: 'Show All Customers', 2: 'Update a Customer' };
const supplierLinks = { 1: 'Show All Suppliers', 2: 'Update a Supplier' };
const getSections = (activeLink, owner) => {
  let links = {};
  switch (activeLink) {
    case 'orders':
      switch (owner) {
        case 'cbp.gov':
          links = { 1: orderLinks[1], 4: orderLinks[4] };
          break;
        default:
          links = orderLinks;
      }
      break;
    case 'vehicles':
      switch (owner) {
        case 'cbp.gov':
          links = { 1: vehicleLinks[1] };
          break;
        default:
          links = vehicleLinks;
      }
      break;
    case 'customers':
      switch (owner) {
        case 'cbp.gov':
          links = { 1: customerLinks[1] };
          break;
        default:
          links = customerLinks;
      }
      break;
    case 'suppliers':
      switch (owner) {
        case 'cbp.gov':
          links = { 1: supplierLinks[1] };
          break;
        default:
          links = supplierLinks;
      }
      break;
    default:
      links = {};
  }
  return links;
};

export default getSections;
