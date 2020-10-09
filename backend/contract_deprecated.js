

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/df0ff335a16c463d96038903ff43987e'));
const fb = require('firebase');

fb.initializeApp(firebaseConfig);

let Tx = require('ethereumjs-tx').Transaction;

let contractAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "burnToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Message",
				"type": "string"
			}
		],
		"name": "DealEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "dealMasks",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "Illegal",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_account",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Message",
				"type": "string"
			}
		],
		"name": "Makemask",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_manuAddress",
				"type": "address"
			}
		],
		"name": "maskMaking",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_Message",
				"type": "string"
			}
		],
		"name": "SellEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "sellMasks",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "tokenByList",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_list",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Masks",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

let contractAddress = "0x2727b026EdB116B20196a1abF32e0cA8311E93e2";

const contract = new web3.eth.Contract(contractAbi, contractAddress);

let db = fb.firestore();

	db.collection("users").doc('administrator').get().then(doc => {
		const admin_account = doc.data().addr;
		const admin_pk = doc.data().privateKey;
		global.admin_account = admin_account;
		global.admin_pk = admin_pk;
	});

exports.getMaskInfo = async function(req, res){
   let maskNum = req.params.tokenId;
   try{
      const result = await contract.methods.Masks(tokenId).call();
      console.log(result);
      res.send(result);
   }catch(err){
      res.send("error");
   }
};

exports.MaskMaking = function(req, res){ // param : uid
    let uid = req.params.uid;
    
	let usersRef = db.collection("users").doc(uid);
	usersRef.get().then(doc => {
		if(!doc.exists){
			let result = new Object();
			result.status = "Fail";
			result.errMsg = "Don't exist user info";
			res.send(JSON.stringify(result));
		}else{
			let maker_account = doc.data().addr;

			const pk = Buffer.from(admin_pk,'hex');
			
			let txObject = {
				from: "0x05D38eE2B27615843961719541B3D84D63C58621",
				gas: 2100000
			}
            contract.methods.maskMaking(maker_account).call(txObject)
                .then((result) => {
                    if(result == true){
						console.log(result);
						contract.methods.maskMaking(maker_account).send(txObject)
							.on('transactionHash', (hash) => {
								let data = {
									status: "Success",
									txUrl: "https://ropsten.etherscan.io/tx/" + hash
								}

								res.send(JSON.stringify(data));
							})
							.catch((err) => {
								console.log('Error at send: ' + err);
							});
					}else{
						let data = {
							status: "Fail",
							errMsg: "Fail to making mask"
						}
						res.send(JSON.stringify(data));
					}
                })
                .catch((err) => {
                    console.log(err);
                });
		}
	}).catch((err)=>{
		console.log('Error', err);
	})
   
}

exports.dealMasks = async function(req, res){ //param: sender uid, receiver address, tokenId
	let send_uid = req.params.send_uid; //보내는사람 uid
	let recv_addr = req.params.recv_addr; //받는사람 지갑주소
	let token_Id = req.params.token_id; //보낼 토큰 ID

	//let db = fb.firestore();
	let usersRef = db.collection("users").doc(send_uid);

	usersRef.get().then(doc => {
		let account = doc.data().addr;
		let privatekey = doc.data().privateKey;

		const pk = Buffer.from(privatekey,'hex');
        contract.methods.dealMasks(recv_addr, token_Id).call() //컨트랙트에서 리턴값받아서 보낼수있는지없는지 체크 예정
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
	})
	.catch((err) => {
		console.log(err);
	});
}

exports.getStockList = function(req, res){
	let uid = req.params.uid;
	
	let usersRef = db.collection("users").doc(uid);

	usersRef.get().then((doc) => {
		let account = doc.data().addr;

		const pk = Buffer.from(admin_pk,'hex');
        contract.methods.tokenByList(account).call() //컨트랙트에서 리턴값받아서 보낼수있는지없는지 체크 예정
            .then((result) => {
                if(result == 'true'){
                    let txObject = {
                        from: admin_account,
                        gas: 5000000
                    }
                    contract.methods.tokenByList(account).send(txObject)
                        .on('transactionHash',(hash) => {
                            let data = {
                                status: 'Success',
                                txUrl: 'https://ropsten.etherscan.io/tx/' + hash
                            }

                            res.send(JSON.stringify(data));
                        })
                }
            }) 
	})
	.catch((err) => {
		console.log(err);
	});
}

//MaskMaking('maker A', '0xc2988556Ae24daF3A20B16d3EB4D970E43e3546D', '7D88DB82FA83B7A1418FEB4A291496E0D72DDD08E8D15162B666A12043EC6F67');
//dealMasks('0xc2988556Ae24daF3A20B16d3EB4D970E43e3546D', '7D88DB82FA83B7A1418FEB4A291496E0D72DDD08E8D15162B666A12043EC6F67', '0xb93428830a28aD774DB9A3937fC8962fb4429785', '2')
