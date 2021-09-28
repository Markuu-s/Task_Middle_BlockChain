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
        string memory name,
        string memory surname,
        uint8 age
    ) public {
        require(bytes(name).length > 0);
        require(bytes(surname).length > 0);
        require(age != 0);

        Note memory newNote = Note(msg.sender, name, surname, age);

        notes[msg.sender] = newNote;
    }
    
    function changeNote(
        address accountAddr,
        string memory name,
        string memory surname,
        uint8 age
    ) public {
        require(
            notes[accountAddr].accountAddr != address(0) &&
                (msg.sender == owner ||
                    msg.sender == accountAddr)
        );

        if (accountAddr != address(0)) {
            notes[accountAddr].accountAddr = accountAddr;
        }

        if (bytes(name).length != 0) {
            notes[accountAddr].name = name;
        }

        if (bytes(surname).length != 0) {
            notes[accountAddr].surname = surname;
        }

        if (age > 0) {
            notes[accountAddr].age = age;
        }
    }

    function getNote(address accountAddr) public view returns (Note memory) {
        require(notes[accountAddr].accountAddr != address(0));
        return notes[accountAddr];
    }

}
