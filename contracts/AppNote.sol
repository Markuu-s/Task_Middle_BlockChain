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

    constructor() {
        owner = msg.sender;
    }
    
    function addNote(
        address accountAddr,
        string memory name,
        string memory surname,
        uint8 age
    ) public {
        require(accountAddr != address(0));
        require(bytes(name).length > 0);
        require(bytes(surname).length > 0);
        require(age != 0);

        Note memory newNote = Note(accountAddr, name, surname, age);

        notes[msg.sender] = newNote;
    }
    
    function changeNote(
        address accountAddr,
        string memory name,
        string memory surname,
        uint8 age
    ) public {
        require(
            notes[msg.sender].accountAddr != address(0) &&
                (msg.sender == owner ||
                    msg.sender == notes[accountAddr].accountAddr)
        );

        if (accountAddr != address(0)) {
            notes[msg.sender].accountAddr = accountAddr;
        }

        if (bytes(name).length != 0) {
            notes[msg.sender].name = name;
        }

        if (bytes(surname).length != 0) {
            notes[msg.sender].surname = surname;
        }

        if (age > 0) {
            notes[msg.sender].age = age;
        }
    }

    function getNote(address accountAddr) public view returns (Note memory) {
        require(notes[msg.sender].accountAddr != address(0));
        return notes[accountAddr];
    }

}
