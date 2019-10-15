// Scott Wilder, Allen Williams, Emily Mizell
var Will = artifacts.require('./contracts/Will.sol');
contract('Verify Passwords', function(accounts) {
  it("Correct Password = $", function(){
    return Will.deployed().then(function(instance){
      return instance.Withdraw();
    })
  })
});
