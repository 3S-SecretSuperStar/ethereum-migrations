const Promise = require("bluebird");
const truffleContract = require("truffle-contract");
const $ = require("jquery");
const willJson = require("../../build/contracts/Will.json");
const fileLoader = require("file-loader?name=../index.html!../index.html");
const Web3 = require('web3')

//wallet support
if (typeof web3 !== 'undefined') {
  // Use the Mist/wallet/Metamask provider.
  window.web3 = new Web3(web3.currentProvider);
}
else {
  
  window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

web3.eth.getTransactionReceiptMined = require("./utils.js");

//From class
function sequentialPromise(promiseArray) {

    const result = promiseArray.reduce(
        (reduced, promise, index) => {
            reduced.results.push(undefined);
            return {
                chain: reduced.chain
                    .then(() => promise)
                    .then(result => reduced.results[ index ] = result),
                results: reduced.results
           };
        },
        {
            chain: Promise.resolve(),
            results: []
        });
    return result.chain.then(() => result.results);
}

sequentialPromise([
    Promise.resolve(web3.eth), Promise.resolve({ suffix: "Promise" })
]).then(console.log);
web3.eth.getAccountsPromise = function () {
    return new Promise(function (resolve, reject) {
        web3.eth.getAccounts(function (e, accounts) {
            if (e != null) {
                reject(e);
            } else {
                resolve(accounts);
            }
        });
    });
};

const Will = truffleContract(willJson);
Will.setProvider(web3.currentProvider);
//Default owner = 0
Will.defaults({
  from:web3.eth.accounts[0]
})
window.addEventListener('load', function(){
  $("#withdrawButton").click(function(){
    console.log("I heard your click");
    try{
      return withdrawFunction().then(updated=>{
        window.location.reload();
      });
    }
    catch(exception){
      alert("Password Incorrect. Nice try.");
    }
  });
});

//So I kind of copied the code from the example on this one, but not super hard.
//I assume that what is happening is that we are getting the Will that we deployed
// If it's deployed then what we do is we call the jackWithdraw function with the
//inputs that the user provided by using Jquery library functions.
//the .val() may or may not be needed. Not sure yet.
const withdrawFunction = function(){
    return Will.deployed().then(_deployed=>{
      deployed = _deployed;
      console.log("deployed = _deployed");
      return deployed.jackWithdraw.call($("input[name='FirstHalf']").val(), $("input[name='SecondHalf']").val()).then(authenticated=>{
        if(authenticated){
          alert("Passwords correct, your ether is on its way son.");
          return deployed.jackWithdraw.call($("input[name='FirstHalf']").val(), $("input[name='SecondHalf']").val());
        }
        else{
          alert("Password Incorrect. Nice try.");
        }
      });
  });
}
