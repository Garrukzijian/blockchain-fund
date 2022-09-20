pragma solidity ^0.4.0;

contract zhongchou{

    struct funder{
        address funderaddress;
        uint Tomoney;
    }


    struct needer{
        address Neederaddress;
        uint goal;
        uint amount;
        uint funderAccount;
        mapping(uint => funder) map;
    }
    uint neederAmount;
    mapping(uint=>needer) needmap;

    function NewNeeder(address _Neederaddress, uint _goal)public {
        neederAmount++;
        needmap[neederAmount] = needer (_Neederaddress, _goal, 0, 0);

    }

    function contribute(address _address, uint _neederAmount) public payable{
        needer storage _needer = needmap[_neederAmount];
        _needer.amount += msg.value;
        _needer.funderAccount++;
        _needer.map[_needer.funderAccount] = funder(_address, msg.value);
    }

    function IScompelete( uint _neederAmount)public{
        needer storage _needer = needmap[_neederAmount];

        if (_needer.amount >= _needer.goal ){
            _needer .Neederaddress.transfer(_needer.amount);
        }
    }
    function test()public view returns(uint,uint,uint){
        return(needmap[0].goal,needmap[0].amount, needmap[0].funderAccount);
    }
}