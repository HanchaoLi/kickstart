pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    function  createCampaign(uint minium) public  {
        address newCampaign = new Campaign(minium, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipent;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    //pass param to a function, it's a hard copy of param, so change value inside function, cannot change param value, so storage can make it like java, memory cannot, the default keyword is memory
    Request[] public requests;
    address public manager;
    uint public miniumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minium, address creator) public {
        manager = creator;
        miniumContribution = minium;
    }

    function contribute() public payable {
        require(msg.value > miniumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value,address recipent) public restricted {
        require(approvers[msg.sender]);
        Request memory newRequest = Request ({
            description : description,
            value : value,
            recipent : recipent,
            complete : false,
            approvalCount: 0

        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;

    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipent.transfer(request.value);
        request.complete = true;
    }

}
