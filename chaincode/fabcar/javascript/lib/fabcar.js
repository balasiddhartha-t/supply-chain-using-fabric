/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const initledgerfile = require('./initledgerfile.json');

class FabCar extends Contract {

    async initLedger(ctx) {


        console.info('============= START : Initialize Ledger ===========');

        for (let i = 0; i < initledgerfile.length; i++) {
            initledgerfile[i].docType = 'car';
            await ctx.stub.putState("CAR" + initledgerfile[i].SupplierID, Buffer.from(JSON.stringify(initledgerfile[i])));
            console.info('Added <--> ', initledgerfile[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCar(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    async createOrder(ctx, carNumber, SupplierID, SupplierAddress, SupplierName, SupplierContactDetails, ProductID, CarMaker, CarModel, CarColor, CarModelYear, CarPrice, CustomerID, CustomerName, Gender, JobTitle, PhoneNumber, EmailAddress, City, Country,
        CountryCode, State, CustomerAddress, OrderDate, OrderID, ShipDate, ShipMode, Shipping, PostalCode, Sales, Quantity, Discount, CreditCardType, CreditCard, CustomerFeedback) {
        console.info('============= START : Create Car ===========');

        const car = {
            SupplierID,
            SupplierAddress,
            SupplierName,
            SupplierContactDetails,
            ProductID,
            CarMaker,
            CarModel,
            CarColor,
            CarModelYear,
            CarPrice,
            CustomerID,
            CustomerName,
            Gender,
            JobTitle,
            PhoneNumber,
            EmailAddress,
            City,
            Country,
            CountryCode,
            State,
            CustomerAddress,
            OrderDate,
            OrderID,
            ShipDate,
            ShipMode,
            Shipping,
            PostalCode,
            Sales,
            Quantity,
            Discount,
            CreditCardType,
            CreditCard,
            CustomerFeedback
        };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} : Unable to create this at the moment`);
        }
        return carAsBytes.toString();
        console.info('============= END : Create Car ===========');
    }

    async queryAllCars(ctx) {
        const startKey = 'CAR0';
        const endKey = 'CAR999';
        const allResults = [];
        for await (const { key, value } of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }


   // {"data":["CAR10","0492","Subaru","Justy","Crimson","2023","798573.59","Archer Landsborough"]}
    async changeVehicleDetails(ctx, carNumber, ProductID, CarMaker, CarModel, CarColor, CarModelYear, CarPrice, CustomerName) {
        console.info('============= START : changeVehicleDetails ===========');

        const carAsBytes = await ctx.stub.getState(carNumber);
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.ProductID = ProductID;
        car.CarMaker = CarMaker;
        car.CarModel = CarModel;
        car.CarColor = CarColor;
        car.CarModelYear = CarModelYear;
        car.CarPrice = CarPrice;
        car.CustomerName = CustomerName;
        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeVehicleDetails ===========');

    }


    async changeOrderDetails(ctx, carNumber, OrderID, OrderDate, SupplierName, CustomerID, ShipDate, ShipMode, Shipping, Quantity) {
        console.info('============= START : changeOrderDetails ===========');

        const carAsBytes = await ctx.stub.getState(carNumber);
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.OrderID = OrderID;
        car.OrderDate = OrderDate;
        car.SupplierName = SupplierName;
        car.CustomerID = CustomerID;
        car.ShipDate = ShipDate;
        car.ShipMode = ShipMode;
        car.Shipping = Shipping;
        car.Quantity = Quantity;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeOrderDetails ===========');

    }


    async changeSupplierDetails(ctx, carNumber, SupplierName, SupplierAddress, SupplierContactDetails) {
        console.info('============= START : changeSupplierDetails ===========');

        const carAsBytes = await ctx.stub.getState(carNumber);
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.SupplierID = SupplierID;
        car.SupplierName = SupplierName;
        car.SupplierAddress = SupplierAddress;
        car.SupplierContactDetails = SupplierContactDetails;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeSupplierDetails ===========');

    }


    async changeCustomerDetails(ctx, carNumber, CustomerID, CustomerName, Gender, JobTitle, PhoneNumber, EmailAddress, City, Country, CountryCode, State) {
        console.info('============= START : changeSupplierDetails ===========');

        const carAsBytes = await ctx.stub.getState(carNumber);
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.CustomerID = CustomerID;
        car.CustomerName = CustomerName;
        car.Gender = Gender;
        car.JobTitle = JobTitle;
        car.PhoneNumber = PhoneNumber;
        car.EmailAddress = EmailAddress;
        car.City = City;
        car.Country = Country;
        car.CountryCode = CountryCode;
        car.State = State;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeSupplierDetails ===========');

    }


    async changeCarOwner(ctx, carNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }



    async getItemHistoryForCar(ctx, carNumber) {
        const promiseOfIterator = ctx.stub.getHistoryForKey(carNumber);
        const results = [];
        for await (const keyMod of promiseOfIterator) {
            const resp = {
                timestamp: keyMod.timestamp,
                txid: keyMod.tx_id
            }
            if (keyMod.is_delete) {
                resp.data = 'KEY DELETED';
            } else {
                resp.data = keyMod.value.toString('utf8');
            }
            results.push(resp);
        }
        return JSON.stringify(results);

    }

}

module.exports = FabCar;
