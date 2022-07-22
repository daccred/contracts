from brownie import Soulbound, network, accounts, config, reverts

'''
Soulbound.sol test.
'''

def owner():
	owner_ = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
	return owner_

# Deploy function.
def deploy():
	deploy_ = Soulbound.deploy("MyToken", "MTK", {"from":owner()})
	return deploy_

def test_name():
	C = deploy()
	assert C.name() == "MyToken"

def test__getBaseURI():
	C = deploy()
	baseURI = ""
	with reverts():
		baseURI = C._getBaseURI()
	assert baseURI == ""

## The other functions are internal.