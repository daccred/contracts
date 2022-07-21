from brownie import SoulboundWithSignature,accounts, config, network, reverts

def owner():
	return "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"

def deploy(limit):
	deploy_ = SoulboundWithSignature.deploy("My Token", "MTK", owner(), limit, {"from": accounts[0]})
	return deploy_

'''
Deploy test.
'''
def test_deploy():
	C = deploy(9)
	assert C != "0x0000000000000000000000000000000000000000"

'''
ownerIssueWithSignature test
'''
def test_ownerIssueWithSignature():
	C = deploy(2)

	# Set hashes and signatures.
	trueHash = "0xfc559c2fb3691b61c7664629e67f3eac134cb83955be099081efde4830e1adb2"
	trueSign = "0x1b812f130223bb62611f195347989a1ac73b2ea97b581572eb0c9d3009677cc07979eed04b92d0d8bdc4dc4f2810b3688d0876d6626429ff20a1e03d042909df1b"

	# This hash is short of 1 byte.
	invalidHash = "0xfc559c2fb3691b61c7664629e67f3eac134cb83955be099081efde4830e1ad"
	# This signature is short of 1 byte.
	invalidSignature = "0x1b812f130223bb62611f195347989a1ac73b2ea97b581572eb0c9d3009677cc07979eed04b92d0d8bdc4dc4f2810b3688d0876d6626429ff20a1e03d042909df"

	# Fake hash and sign
	fakeHash = "0xfc559c2fb3691b61c7664629e67f3eac134cb83955be099081efde4830e1adb2"
	fakeSign = "0x90f9301222fd8fdbd26a123d797d1ed9357256bbe9ca1f50cbe3e136667d986d4f02099db7c8f7a554d5e05b3759e90c25b5785324f510269a0e9211467ad5791c"

	zeroAddress = "0x0000000000000000000000000000000000000000"
	URI = "https://ipfs/bla/blah/1"

	# Zero address test.
	with reverts():
		C.ownerIssueWithSignature(zeroAddress, trueHash, trueSign, 50, URI, {"from": accounts[0]})

	# Invalid hash test.
	with reverts():
		C.ownerIssueWithSignature(accounts[1], invalidHash, trueSign, 50, URI, {"from": accounts[0]})

	# Invalid signature test.
	with reverts():
		C.ownerIssueWithSignature(accounts[1], trueHash, invalidSignature, 50, URI, {"from": accounts[0]})

	# Empty token URI test.
	with reverts():
		C.ownerIssueWithSignature(accounts[1], trueHash, trueSign, 50, "", {"from": accounts[0]})

	# Invalid verifySignature test.
	# Should be signed by owner().
	with reverts():
		C.ownerIssueWithSignature(accounts[1], fakeHash, trueSign, 50, URI, {"from": accounts[0]})
		C.ownerIssueWithSignature(accounts[1], trueHash, fakeSign, 50, URI, {"from": accounts[0]})
		# Called by non-owner.
		C.ownerIssueWithSignature(accounts[1], trueHash, trueSign, 50, URI, {"from": accounts[7]})

	
	eventHolder = C.ownerIssueWithSignature(accounts[1], trueHash, trueSign, 5, URI, {"from": accounts[0]})

	with reverts():
		C.ownerIssueWithSignature(accounts[1], trueHash, trueSign, 50, URI, {"from": accounts[0]})
		C.ownerIssueWithSignature(accounts[1], trueHash, trueSign, 51, URI, {"from": accounts[0]})
		C.ownerIssueWithSignature(accounts[1], trueHash, trueSign, 50, URI, {"from": accounts[0]})

	hasEvent = 'IssueWithSignature' in eventHolder.events
	assert hasEvent == True

'''
ownerRevokeWithSignature test.
'''
def test_ownerRevokeWithSignature():
	C = deploy(2)

	# Set hashes and signatures.
	trueHash = "0xfc559c2fb3691b61c7664629e67f3eac134cb83955be099081efde4830e1adb2"
	trueSign = "0x1b812f130223bb62611f195347989a1ac73b2ea97b581572eb0c9d3009677cc07979eed04b92d0d8bdc4dc4f2810b3688d0876d6626429ff20a1e03d042909df1b"

	# This hash is short of 1 byte.
	invalidHash = "0xfc559c2fb3691b61c7664629e67f3eac134cb83955be099081efde4830e1ad"
	# This signature is short of 1 byte.
	invalidSignature = "0x1b812f130223bb62611f195347989a1ac73b2ea97b581572eb0c9d3009677cc07979eed04b92d0d8bdc4dc4f2810b3688d0876d6626429ff20a1e03d042909df"

	# Fake hash and sign
	fakeHash = "0xfc559c2fb3691b61c7664629e67f3eac134cb83955be099081efde4830e1adb2"
	fakeSign = "0x90f9301222fd8fdbd26a123d797d1ed9357256bbe9ca1f50cbe3e136667d986d4f02099db7c8f7a554d5e05b3759e90c25b5785324f510269a0e9211467ad5791c"

	zeroAddress = "0x0000000000000000000000000000000000000000"

	C.ownerIssueWithSignature(accounts[1], trueHash, trueSign, 5, "jdkljalke", {"from": accounts[0]})

	# Revoking invalid token.
	with reverts():
		C.ownerRevokeWithSignature(trueHash, trueSign, 4, {"from": accounts[0]})

	# Test for invalid hash
	with reverts():
		C.ownerRevokeWithSignature(invalidHash, trueSign, 5, {"from": accounts[0]})

	# Test for invalid signature.
	with reverts():
		C.ownerRevokeWithSignature(trueHash, invalidSignature, 5, {"from": accounts[0]})

	# Test for no owner call.
	with reverts():
		C.ownerRevokeWithSignature(invalidHash, trueSign, 5, {"from": accounts[4]})

	# Revoke
	C.ownerRevokeWithSignature(trueHash, trueSign, 5, {"from": accounts[0]})
	C.ownerIssueWithSignature(accounts[1], trueHash, trueSign, 6, "jdkljalke", {"from": accounts[0]})
	eventHolder = C.ownerRevokeWithSignature(trueHash, trueSign, 6, {"from": accounts[0]})

	hasEvent = 'RevokeWithSignature' in eventHolder.events
	assert hasEvent == True