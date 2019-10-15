pragma solidity ^0.5.0;

contract Will {	
	//Days until expected graduation time
	uint deadline;
	//First half of password, hashed in keccak256, possessed by son
	bytes32 pass1;
	//Second half of password, hashed in keccak256, possessed by father
	bytes32 pass2;
	address myAddress = this;

	//Constructor function that initializes passwords, deadline, and addresses for NGO and child
	constructor (bytes32 password1, bytes32 password2, uint _deadline) public {
		deadline = _deadline;
		pass1 = password1;
		pass2 = password2;
	}


	//Allows the son to withdraw his portion of the money from the account
	function Withdraw(string PlainPass1, string PlainPass2) public returns(bool){
		//Hash plain text passwords with keccak256 and check against original pass hashes
		if(keccak256(PlainPass1) == keccak256(pass1) && keccak256(PlainPass2) == keccak256(pass2)){  //&& deadline>now
			msg.sender.send(myAddress.balance);
			return true;
		}
		else
			return false;
	}
	
	//If son does not graduate, attorney can send money to charity
	function Cancel(string PlainPass2) public returns(bool) {
		if(keccak256(PlainPass2) == pass2 && deadline>now){
			if(!msg.sender.send(myAddress.balance)) {
				return false;
			}
			return true;
		}
	}

}
