#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $5)
    local CP=$(one_line_pem $6)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${P1PORT}/$3/" \
        -e "s/\${CAPORT}/$4/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        -e "s/\${MSP}/$7/" \
        ccp-template.json 
}

function yaml_ccp {
    local PP=$(one_line_pem $5)
    local CP=$(one_line_pem $6)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${P1PORT}/$3/" \
        -e "s/\${CAPORT}/$4/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        -e "s/\${MSP}/$7/" \
        ccp-template.yaml | sed -e $'s/\\\\n/\\\n        /g'
}

ORG=jeep.fca.com
P0PORT=7051
P1PORT=8051
CAPORT=7054
MSP=JeepMSP
PEERPEM=crypto-config/peerOrganizations/jeep.fca.com/tlsca/tlsca.jeep.fca.com-cert.pem
CAPEM=crypto-config/peerOrganizations/jeep.fca.com/ca/ca.jeep.fca.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM $MSP)" > connection-jeep.json
echo "$(yaml_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM $MSP)" > connection-jeep.yaml

ORG=jeepdealer.fca.com
P0PORT=9051
P1PORT=10051
CAPORT=8054
MSP=JeepdealerMSP
PEERPEM=crypto-config/peerOrganizations/jeepdealer.fca.com/tlsca/tlsca.jeepdealer.fca.com-cert.pem
CAPEM=crypto-config/peerOrganizations/jeepdealer.fca.com/ca/ca.jeepdealer.fca.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM $MSP)" > connection-jeepdealer.json
echo "$(yaml_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM $MSP)" > connection-jeepdealer.yaml


ORG=jeeplogistics.fca.com
P0PORT=11051
P1PORT=12051
CAPORT=9054
MSP=JeeplogisticsMSP
PEERPEM=crypto-config/peerOrganizations/jeeplogistics.fca.com/tlsca/tlsca.jeeplogistics.fca.com-cert.pem
CAPEM=crypto-config/peerOrganizations/jeeplogistics.fca.com/ca/ca.jeeplogistics.fca.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM $MSP)" > connection-jeeplogistics.json
echo "$(yaml_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM $MSP)" > connection-jeeplogistics.yaml


ORG=jeeptrucking.fca.com
P0PORT=13051
P1PORT=14051
CAPORT=10054
MSP=JeeptruckingMSP
PEERPEM=crypto-config/peerOrganizations/jeeptrucking.fca.com/tlsca/tlsca.jeeptrucking.fca.com-cert.pem
CAPEM=crypto-config/peerOrganizations/jeeptrucking.fca.com/ca/ca.jeeptrucking.fca.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM $MSP)" > connection-jeeptrucking.json
echo "$(yaml_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM $MSP)" > connection-jeeptrucking.yaml


ORG=cbp.gov
P0PORT=15051
P1PORT=16051
CAPORT=11054
MSP=CbpMSP
PEERPEM=crypto-config/peerOrganizations/cbp.gov/tlsca/tlsca.cbp.gov-cert.pem
CAPEM=crypto-config/peerOrganizations/cbp.gov/ca/ca.cbp.gov-cert.pem

echo "$(json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM $MSP)" > connection-cbp.gov.json
echo "$(yaml_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM $MSP)" > connection-cbp.gov.yaml