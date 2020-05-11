# supply-chain-using-fabric

This is a Supply chain demo built using private blockchain network called as Hyperledger Fabric.

### Prerequisites:
Docker 

Docker-compose

### Install Hyperledger Fabric Binaries

First Install Hyperledger Fabric Binaries using the following curl command.

curl -sSL https://bit.ly/2ysbOFE

This downloads the required fabric binaries. make sure you add the bin to your environmental PATH variable

Checkout this repository and navigate to the first-network folder and run the following snippet

./byfn.sh up -l javascript -c logisticschannel -a

if you're facing issues with running the scripts then change the mode 

chmod +X 777 byfn.sh

It will start the required docker images.

Once the network is booted successfully navigate to the fabcar/javascript folder and run

npm start

It will start the server side application for you.

Run the following commands to create a DB to store the passwords.

docker run --name couch-userdb -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=password -p 5984:5984 -d couchdb
curl -X PUT  http://admin:password@127.0.0.1:5984/pass_db

Then go to the fabcar-client folder and  run

npm install

npm start

It will start the client side server for you.

Now you can invoke the transaction or create the transaction using the UI.
