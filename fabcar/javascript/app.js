const express = require('express')
var cors = require('cors')
const app = express()
const port = 8081;
app.use(express.json());
app.use(cors())
var axios = require('axios');


'use strict';
const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const FabricCAServices = require('fabric-ca-client');


app.post('/register', async function(request, response){

let username = request.body.username; 
let msp = request.body.msp; //JeepMSP
let owner= request.body.owner;
let pass = request.body.pass;
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'first-network', 'connection-'+owner+'.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        let certificateAuthority;
        if(owner == 'cbp.gov'){
             certificateAuthority = 'ca.'+ owner;
        }
        else{
             certificateAuthority = 'ca.'+ owner +'.fca.com';

        }
        console.log(certificateAuthority);
        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities[certificateAuthority];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const couchdbValue = owner === 'cbp.gov' ? "cbpdb" : owner+"_db"; 

        const wallet = await Wallets.newCouchDBWallet("http://admin:password@127.0.0.1:5984", couchdbValue); 
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get(username);
        if (identity) {
            console.log('An identity for the admin user "admin" already exists in the wallet');
            response.send({
                "status":"An identity for the admin user "+username+" already exists in the wallet"
            })
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: msp,
            type: 'X.509',
        };
        await wallet.put(username, x509Identity);
        console.log('Successfully enrolled admin user '+ username +' and imported it into the wallet');
        passurl = "http://admin:password@127.0.0.1:5984/pass_db/"+username;
        console.log(passurl);
        axios.put(passurl,{
            "pass" : pass,
            "owner": owner
            });
        response.send({
            "status":200
        });

    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
        response.send({
            "status":400
        });
    }
});



app.post('/login', async function(request, response){
    let username = request.body.username; 
    let owner= request.body.owner;
    let pass = request.body.pass;
    console.log(owner);
    axios.get("http://admin:password@127.0.0.1:5984/pass_db/"+username).then(
        response1 => {

            if(pass == response1.data.pass && owner == response1.data.owner){
               response.send({
                   "status":200,
                   "contractvalue":"fabcar",
                   "channel":"logisticschannel"
               });
           }else {
               response.send({
                    "status":400
                });
           }
          }
    );


    const wallet = await Wallets.newCouchDBWallet("http://admin:password@127.0.0.1:5984", owner+"_db"); 
    const identity = await wallet.get(username);
    if (!identity) {
        response.send({
            "status":400
        });
    }
    

});

app.post('/invoke/:id', async function(request, response){
let id =  request.params.id;
let username = request.body.username; 
var fields = request.body.data;
let channel = request.body.channel;
let contractvalue = request.body.contractvalue;
let owner= request.body.owner;
console.log("owner", owner);
if (fields == null){
    fields = [];
}else{
    console.log(username);
}
try {
    // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'first-network', 'connection-'+owner+'.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        

    // Create a new file system based wallet for managing identities.
    //const walletPath = path.join(process.cwd(), 'wallet');

    const couchdbValue = owner === 'cbp.gov' ? "cbpdb" : owner+"_db"; 

    const wallet = await Wallets.newCouchDBWallet("http://admin:password@127.0.0.1:5984", couchdbValue); 
     //console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(username);
    if (!identity) {
        console.log("The user profile "+username+" doesn't exist for the "+ owner +" profile");
        response.send({
            "status" : 0,
            "Message":"The user profile "+username+" doesn't exist for the "+ owner +" profile"
        })
        return;

    }
    
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channel);

    // Get the contract from the network.
    const contract = network.getContract(contractvalue);
    console.log(id);
    if(id == "queryAllCars" ||id == "getItemHistoryForCar"){
        const result =  await contract.evaluateTransaction(id, ...fields);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        response.send(result.toString());
    
    }
    else{

        try{
            console.log(fields);
            const result = await contract.submitTransaction(id, ...fields);
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
            response.send({
                "status":1,
                "message":"The transaction has been successfully submitted"
            });
        }
        catch(error){
            response.send({
                "status":0
               });
        }

    }

    // Disconnect from the gateway.
    await gateway.disconnect();

 
} catch (error) {
    console.error(`Failed to submit transaction: ${id},  ${fields} :${error}`);
    response.send({
        "status":0
    })
}
  });
  
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
