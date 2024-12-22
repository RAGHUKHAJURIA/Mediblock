// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicineData {
    struct Medicine {
        string brandName;
        string genericName;
        string strength;
        string form;
        string dosageInstructions;
        string prescriptionStatus;
        string manufacturerInfo;
    }

    mapping(address => Medicine) public medicines;

    function setMedicineData(
        string memory _brandName,
        string memory _genericName,
        string memory _strength,
        string memory _form,
        string memory _dosageInstructions,
        string memory _prescriptionStatus,
        string memory _manufacturerInfo
    ) public {
        medicines[msg.sender] = Medicine(
            _brandName,
            _genericName,
            _strength,
            _form,
            _dosageInstructions,
            _prescriptionStatus,
            _manufacturerInfo
        );
    }

    function getMedicineData(address user) public view returns (Medicine memory) {
        return medicines[user];
    }
}
