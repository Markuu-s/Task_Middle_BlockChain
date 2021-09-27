pragma solidity ^0.8.4;

contract AppNote {
    address public owner;

    struct Note {
        address accountAddr;
        string name;
        string surname;
        uint8 age;
    }
    
    mapping(address => Note) notes;

}
