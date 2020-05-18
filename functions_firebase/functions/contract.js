var firebaseConfig = {
    apiKey: "AIzaSyBUFarAIUCHFdR-pIrYGaTNJC43CpFBZZA",
    authDomain: "maskproject-6e385.firebaseapp.com",
    databaseURL: "https://maskproject-6e385.firebaseio.com",
    projectId: "maskproject-6e385",
    storageBucket: "maskproject-6e385.appspot.com",
    messagingSenderId: "759315784284",
    appId: "1:759315784284:web:f7c963bac46cd7798cbc99",
    measurementId: "G-B4436TDC82"
  };

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/df0ff335a16c463d96038903ff43987e'));
const fb = require('firebase');
const functions = require('firebase-functions');

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
];

let contractAddress = "0x2727b026EdB116B20196a1abF32e0cA8311E93e2";

const contract = new web3.eth.Contract(contractAbi, contractAddress);

let db = fb.firestore();

	db.collection("users").doc('administrator').get()
		.then((doc) => {
			const admin_account = doc.data().addr;
			const admin_pk = doc.data().privateKey;
			global.admin_account = admin_account;
			global.admin_pk = admin_pk;

			return console.log("Success call admin");
		})
		.catch((error) => {
			let data = {
				status: "Success",
				errMsg: "Fail to bring admin account and privateKey",
				errDetail: error
			}
			res.send(JSON.stringify(data));
		})
	

exports.getMaskInfo = functions.https.onRequest((req, res) => {
    contract.methods.Masks(req.params.tokenId).call()
    	.then((result) => {
			let data = {
				statsu: "Success",
				time : result
			}
			return res.send(JSON.stringify(data));
		})
		.catch((err) => {
			let data = {
				statsu: "Fail",
				errMsg: "Fail to get mask info",
				errDetail: err
			}
			res.send(JSON.stringify(data));
		});

});

exports.MaskMaking = functions.https.onRequest((req, res) => { // param : uid
	let uid = req.params.uid;
	let usersRef = db.collection("users").doc(uid);
	usersRef.get().then(doc => {
		if(!doc.exists){
			let result = {
				status: "Fail",
				errMsg: "Don't exist user info"
			}
			return res.send(JSON.stringify(result));

		}else{
			let maker_account = doc.data().addr;

			const pk = Buffer.from(admin_pk,'hex');

			let callObject = {
				from: admin_account,
				gas: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
			}
			contract.methods.maskMaking(maker_account).call(callObject)
				.then((result) => {
					if(result === true){
						web3.eth.getTransactionCount(admin_account, (err, txCount) =>{
							if(!err){
								const txObject = {
									nonce: web3.utils.toHex(txCount),
									to: contractAddress,
									//value: web3.utils.toHex(web3.utils.toWei('0', 'ether')),
									gasLimit: web3.utils.toHex(2100000),
									gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
									data: contract.methods.maskMaking(maker_account).encodeABI()
								};
							
								const tx = new Tx(txObject, {'chain':'ropsten'});
								tx.sign(pk);
							
								const serializedTx = tx.serialize();
								const raw = '0x' + serializedTx.toString('hex');
								
								web3.eth.sendSignedTransaction(raw)
									.once('transactionHash', (hash) => {
										let data = {
											status: "Success",
											txUrl: 'https://ropsten.etherscan.io/tx/' + hash//트랜잭션 조회 url
										}
										res.send(JSON.stringify(data));
									})
									.on('error', (err) => {
										let data = {
											status: "Fail",
											errMsg: "Error to transaction sending",
											errDetail: err
										}
										return res.send(JSON.stringify(data));
									});
								}else{
									res.send(err); //추후 에러처리 추가
								}
						});
					}else{ //If result is not true
						let data = {
							status: "Fail",
							errMsg: "Failed to make mask"
						}
						return res.send(JSON.stringify(data));
					}
					return null;
				})
				.catch((err) => {
					let data = {
						status: "Success",
						errMsg: "Fail to make mask",
						errDetail: err
					}
					return res.send(JSON.stringify(data));
				})
			return null
		}
	}).catch((err)=>{
		let data = {
			status: "Fail",
			errMsg: "Failed to check UID",
			errDetail: err
		}
		return res.send(JSON.stringify(data));
	});
   
});

exports.dealMasks = functions.https.onRequest((req, res) => { //param: sender uid, receiver address, tokenId
	let send_uid = req.params.send_uid; //보내는사람 uid
	let recv_addr = req.params.recv_addr; //받는사람 지갑주소
	let token_Id = req.params.token_id; //보낼 토큰 ID

	let usersRef = db.collection("users").doc(send_uid);
	usersRef.get().then(doc => {
		let account = doc.data().addr;
		let privatekey = doc.data().privateKey;

		const pk = Buffer.from(privatekey,'hex');
		const data = contract.methods.dealMasks(recv_addr, token_Id); //컨트랙트에서 리턴값받아서 보낼수있는지없는지 체크 예정

		let callObject = {
			from: account,
			gas: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
		};
	
		contract.methods.dealMasks(recv_addr, token_Id).call(callObject)
			.then((result) => {
				if(result === true){
					web3.eth.getTransactionCount(account, (err, txCount) =>{
						if(!err){
							const txObject = {
								nonce: web3.utils.toHex(txCount),
								to: contractAddress,
								//value: web3.utils.toHex(web3.utils.toWei('0', 'ether')),
								gasLimit: web3.utils.toHex(2100000),
								gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
								data: contract.methods.dealMasks(recv_addr, token_Id).encodeABI()
							};
							const tx = new Tx(txObject, {'chain':'ropsten'});
							tx.sign(pk);
						
							const serializedTx = tx.serialize();
							const raw = '0x' + serializedTx.toString('hex');
						
							web3.eth.sendSignedTransaction(raw)
								.once('transactionHash', (hash) => {
									let data = {
										status: "Success",
										txUrl: "transactionHash: https://ropsten.etherscan.io/tx/" + hash
									}
									res.send(JSON.stringify(data));
								})
								.on('error', (err) =>{
									let data = {
										status: "Fail",
										errMsg: "Check your token in stock",
										errDetail: err
									}
									res.send(JSON.stringify(data));
								});
						}else{
							let data = {
								status: "Fail",
								errMsg: "Failed to send transaction",
								errDetail: err
							}
							res.send(JSON.stringify(data));
						}
					});

				}else{
					let data = {
						status: "Fail",
						errMsg: "Return to revert from dealMasks in contract"
					}
					res.send(JSON.stringify(data));
				}
				return null
			})
			.catch((err) => {
				let data = {
					status: "Fail",
					errMsg: "Failed to deal masks",
					errDetail: err
				}
				res.send(JSON.stringify(data));
			});
		return null
	})
	.catch((err) => {
		let data = {
			status: "Fail",
			errMsg: "Failed to check UID",
			errDetail: err
		};
		res.send(JSON.stringify(data));
	});
});

exports.getStockList = functions.https.onRequest((req, res) => {
	let uid = req.params.uid;
	let usersRef = db.collection("users").doc(uid);

	usersRef.get().then(doc => {
		let account = doc.data().addr;

		const pk = Buffer.from(admin_pk,'hex');
		let callObject = {
			from: admin_account,
			gas: web3.utils.toHex(web3.utils.toWei('20', 'gwei'))
		};
		let arr = new Array();
		contract.methods.tokenByList(account).call(callObject)
			.then((result)=> {
				const promise = result.map(async (val, index)=>{
					let time = await contract.methods.Masks(val).call(callObject);
					let tmp = {
						time: time,
						tokenId: val,
						num: '1',
					}
					arr.push(tmp); 
				});
				Promise.all(promise)
					.then(() => {
						let data = {
							status: "Success",
							stock: arr
						}
						return res.send(JSON.stringify(data));
					})
					.catch((err) => {
						let data = {
							statsu: "Fail",
							errMsg: "Failed to run Promise in stockList",
							errDetail: err
						}
						res.send(JSON.stringify(data));
					})
				return null;
			})
			.catch((err) => {
				let data = {
					status: "Fail",
					errMsg: "Failed to get tokenByList",
					errDetail: err
				}
				res.send(JSON.stringify(data));
			});
		return null;
	})
	.catch((err) => {
		let data = {
			status: "Fail",
			errMsg: "Failed to check UID",
			errDetail: err
		};
		res.send(JSON.stringify(data));
	});
});

//MaskMaking('maker A', '0xc2988556Ae24daF3A20B16d3EB4D970E43e3546D', '7D88DB82FA83B7A1418FEB4A291496E0D72DDD08E8D15162B666A12043EC6F67');
//dealMasks('0xc2988556Ae24daF3A20B16d3EB4D970E43e3546D', '7D88DB82FA83B7A1418FEB4A291496E0D72DDD08E8D15162B666A12043EC6F67', '0xb93428830a28aD774DB9A3937fC8962fb4429785', '2')
