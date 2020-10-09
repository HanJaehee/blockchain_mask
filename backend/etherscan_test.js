const request = require('request');
const util = require('util');

const myApi = '';
const contractaddress = "0x2727b026EdB116B20196a1abF32e0cA8311E93e2";

function getHistory(address){ //제조사 생성내역, 거래내역 조회
    let url = util.format('https://api-ropsten.etherscan.io/api?module=account&action=tokennfttx&contractaddress=%s&address=%s&page=1&offset=100&sort=asc&apikey=%s', contractaddress, address, myApi);
    let data = new Object();
    request(url, (err, response, body) =>{
        if(!err && response.statusCode == 200){
            let json = JSON.parse(body);
            let result = json['result'];

            let entered = new Array();
            let released = new Array();
            let stock = new Array();

            for(tmp in result){
                //console.log('now : ' + tmp + ', ' + result[tmp]['to']);
                let txInfo = {
                    time: result[tmp]['timeStamp'],
                    tokenId: result[tmp]['tokenID'],
                    num: '1',
                    from: result[tmp]['from'],
                    to: result[tmp]['to']
                }
                if(result[tmp]['to'] == address.toLowerCase()){ //생성내역, 지금은 거래완료한 토큰도 보이는방식, 거래한토큰은 거르는식으로 구현해야함.
                    entered.push(txInfo);
                }else{ //거래내역
                    released.push(txInfo);
                }
            }

            if(!released || !entered){ // 입고, 출고내역이 없을 수도 있음
                stock = entered;
                data = {
                    status: "Success",
                    enteredHistory: entered,
                    releasedHistory: released,
                    stockList: stock
                }
            }else{
                for(e_idx in entered){
                    let token = entered[e_idx].tokenId;
                    let chk = 0;
                    for(r_idx in released){
                        if(token === released[r_idx].tokenId) chk++;
                    }
                    if(chk == 0) stock.push(entered[e_idx]);
                }
        
                data = {
                    status: "Success",
                    enteredHistory: entered,
                    releasedHistory: released,
                    stockList: stock
                }
            }

        }else{
            data = {
                status: "Fail",
                errMsg: "Fail to access API",
                errDetail: err
            };
        };
        console.log(JSON.stringify(data));
        
    });
};

getHistory("0xc2988556ae24daf3a20b16d3eb4d970e43e3546d")
