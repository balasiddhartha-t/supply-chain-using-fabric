/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function invokeBullshit( contractvalue, channel, username, owner) {

    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'first-network', 'connection-'+ owner+'.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        //console.log(`Wallet path: ${walletPath}`);
    
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(username);
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
    
        }
        
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });
    
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channel);
    
        // Get the contract from the network.
        const contract = network.getContract(contractvalue);
        const siddhartha = ['CAR121', 'Spider man'];
        const result =  await contract.submitTransaction('changeCarOwner', ...siddhartha);
        // Disconnect from the gateway.
        await gateway.disconnect();
    
     
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        response.send({
            "status":0
        })
    }
}

invokeBullshit("fabcar", "logisticschannel", 'admin', 'jeep');