export default {
  loginFields: [
    {
      key: 'username',
      placeholder: 'Username',
      field: 'input',
      type: 'text',
      className: 'form-input'
    },
    {
      key: 'pass',
      placeholder: 'Password',
      field: 'input',
      type: 'password',
      className: 'form-input'
    },
    {
      key: 'owner',
      placeholder: 'Owner',
      field: 'select',
      type: 'select',
      className: 'form-input',
      options: ['jeep', 'jeepDealer', 'jeepTrucking', 'jeepLogistics', 'customs']
    }
  ],
  signupFields: [
    {
      key: 'username',
      placeholder: 'Username',
      field: 'input',
      type: 'text',
      className: 'form-input'
    },
    {
      key: 'pass',
      placeholder: 'Password',
      field: 'input',
      type: 'password',
      className: 'form-input'
    },
    {
      key: 'owner',
      placeholder: 'Owner',
      field: 'select',
      type: 'select',
      className: 'form-input',
      options: ['jeep', 'jeepDealer', 'jeepTrucking', 'jeepLogistics', 'customs']
    }
  ],
  companyMap: {
    jeep: 'jeep',
    jeepDealer: 'jeepdealer',
    jeepTrucking: 'jeeptrucking',
    jeepLogistics: 'jeeplogistics',
    customs: 'cbp.gov'
  }
};
