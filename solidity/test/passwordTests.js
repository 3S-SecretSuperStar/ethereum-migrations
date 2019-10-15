const Will = artifacts.require('./contracts/Will.sol');
const testOneMigration = artifacts.require('.contracts/Migrations');
contract('Password Tests', function(accounts) {

  it("Should payout since the passwords are correct", function(){
    return Will.deployed().then(function(instance){
      return instance.jackWithdraw("This", "IsCool");
    })
  })
});
