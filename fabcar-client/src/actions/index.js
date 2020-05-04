/* eslint-disable no-console */
import Axios from 'axios';
import alert from 'src/components/Message/alert';
import staticValues from 'src/constants/methods';

const {
  domainUrl,
  methodNames,
  vehicleKeys,
  orderKeys,
  customerKeys,
  supplierKeys,
  mspMap
} = staticValues;

const massageData = (carNumber, obj, keys, list) => {
  const item = {};
  keys.forEach(key => {
    item[key] = obj[key];
  });
  item.carNumber = carNumber;
  list.push(item);
};

export const fetchData = store => {
  const { user } = store.state;
  console.log(store);
  Axios.post(`${domainUrl}/invoke/queryAllCars`, user).then(response => {
    console.log(response.data);
    if (!response.data) return;
    const { data } = response;
    const orders = [];
    const suppliers = [];
    const customers = [];
    const vehicles = [];
    const carNumbers = [];
    data.forEach(obj => {
      massageData(obj.Key, obj.Record, vehicleKeys, vehicles);
      massageData(obj.Key, obj.Record, customerKeys, customers);
      massageData(obj.Key, obj.Record, supplierKeys, suppliers);
      massageData(obj.Key, obj.Record, orderKeys, orders);
      carNumbers.push(obj.Key);
    });
    store.setState({ vehicles, orders, suppliers, customers, carNumbers });
  });
};

export const login = (store, data) => {
  Axios.post(`${domainUrl}/login`, data)
    .then(response => {
      if (response.data.status === 200) {
        const { username, owner } = data;
        const { channel, contractvalue } = response.data;
        const user = { username, owner, channel, contractvalue };
        sessionStorage.setItem('user', JSON.stringify(user));
        store.setState({ user });
      } else {
        alert('failure', 'Invalid user credentials. Try again!');
      }
    })
    .catch(err => alert('failure', err));
};

export const logout = store => {
  store.setState({ user: { username: '' } });
  sessionStorage.removeItem('user');
};

export const signup = (store, data) => {
  data.msp = mspMap[data.owner];
  console.log(data);
  Axios.post(`${domainUrl}/register`, data)
    .then(response => {
      if (response.data.status === 200) {
        alert('success', 'User registered. Welcome!');
      } else {
        alert('failure', 'User was unable to register. Try again!');
      }
    })
    .catch(err => alert('failure', err));
};

export const submitForms = (store, item, data) => {
  const fields = Object.keys(data).map(field => data[field]);
  const { user } = store.state;
  Axios.post(`${domainUrl}/invoke/${methodNames[item]}`, { ...user, data: fields })
    .then(response => {
      console.log(response);
    })
    .catch(err => alert('failure', err));
};

export const activeLinkChange = (store, link) => {
  store.setState({ activeLink: link });
};

export const activeNavChange = (store, nav) => {
  store.setState({ activeNav: nav });
};

export const toggleChange = store => {
  const toggle = !store.state.toggle;
  store.setState({ toggle });
};

export const getCarHistory = (store, carNumber, setCarHistory) => {
  const { user } = store.state;
  Axios.post(`${domainUrl}/invoke/getItemHistoryForCar`, { ...user, data: [carNumber] })
    .then(({ data }) => {
      setCarHistory(data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const createOrder = (store, data) => {
  const { user } = store.state;
  const fields = Object.keys(data).map(field => data[field]);
  Axios.post(`${domainUrl}/invoke/createOrder`, { ...user, data: fields })
    .then(response => {
      console.log(response);
    })
    .catch(err => alert('failure', err));
};
