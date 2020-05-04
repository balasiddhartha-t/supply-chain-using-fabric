import React from 'react';
import useGlobalHook from '../utilities/customHook';
import * as actions from '../actions';

const storedValue = sessionStorage.getItem('user');
const user = JSON.parse(storedValue);
const initialState = {
  activeNav: '1',
  activeLink: 'orders',
  toggle: true,
  user: user ? user : { username: '' },
  orders: [],
  vehicles: [],
  customers: [],
  suppliers: [],
  carNumbers: []
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
