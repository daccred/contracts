from brownie import Allowlist, network, accounts, config, reverts

'''
Allowlist.sol test.
'''

def owner():
	owner_ = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
	return owner_

# Deploy function.
def deploy():
	deploy_ = Allowlist.deploy(owner(), {"from":owner()})
	return deploy_

'''
Test 1: getAllowlistOwner() :: Expected to return allowlist owner.
'''
def test_getAllowlistOwner():
	C = deploy()
	assert C.getAllowlistOwner() == owner()
	# Assert allowlistowner == owner [defined by function].
	# Ref Line 8.

'''
Test 2: verifySignature() :: expected to return true if signer is
the address returned by the getAllowlistOwner() function.
'''
def test_verifySigner():
	# Deploy with owner as accounts[0].
	C = deploy()

	# Hash and signature.
	trueHash = "0xfc559c2fb3691b61c7664629e67f3eac134cb83955be099081efde4830e1adb2"
	trueSign = "0x1b812f130223bb62611f195347989a1ac73b2ea97b581572eb0c9d3009677cc07979eed04b92d0d8bdc4dc4f2810b3688d0876d6626429ff20a1e03d042909df1b"

	# Fake hash and sign
	fakeHash = "0xfc559c2fb3691b61c7664629e67f3eac134cb83955be099081efde4830e1adb2"
	fakeSign = "0x90f9301222fd8fdbd26a123d797d1ed9357256bbe9ca1f50cbe3e136667d986d4f02099db7c8f7a554d5e05b3759e90c25b5785324f510269a0e9211467ad5791c"

	# Check that the owner signed the fake hashes, this should fail.
	f = C.verifySigner(owner(), trueHash, trueSign)
	j = C.verifySigner(owner(), fakeHash, fakeSign)
	assert f == True
	assert j == False