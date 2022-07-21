from brownie import SoulboundCore, network, accounts, config, reverts

'''
Allowlist.sol test.
'''

def owner():
	owner_ = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
	return owner_

# Deploy function.
def deploy():
	deploy_ = SoulboundCore.deploy("MyToken", "MTK", owner(), 0, {"from":accounts[0]})
	return deploy_

'''
Test deployment.
'''
def test_deploy():
	deploy()

'''
issueWithSignature test.
'''
def test_issueWithSignature():
	C = deploy()

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
	# Expeted fail.
	with reverts():
		C.issueWithSignature(zeroAddress, trueHash, trueSign, 1, URI, {"from":accounts[0]})

	# Invalid hash length test.
	with reverts():
		C.issueWithSignature(accounts[1], invalidHash, trueSign, 1, URI, {"from":accounts[0]})

	# Invalid signature length test.
	with reverts():
		C.issueWithSignature(accounts[1], trueHash, invalidSignature, 1, URI, {"from":accounts[0]})

	# Empty tokenURI test.
	with reverts():
		C.issueWithSignature(accounts[1], trueHash, trueSign, 1, "", {"from":accounts[0]})

	# Invalid signature verification.
	with reverts():
		C.issueWithSignature(accounts[1], fakeHash, fakeSign, 1, URI, {"from":accounts[0]})

	# This test shall pass.
	eventHolder = C.issueWithSignature(accounts[1], trueHash, trueSign, 1, URI, {"from":accounts[0]})
	hasEvent = 'IssueWithSignature' in eventHolder.events
	assert hasEvent == True

'''
revokeWithSignature test.
'''
def test_revokeWithSignature():
	C = deploy()

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

	URI = "https://ipfs/bla/blah/1"

	# Invalid token test.
	with reverts():
		C.revokeWithSignature(trueHash, trueSign, 9, {"from":accounts[0]})

	# First issue with signature.
	C.issueWithSignature(accounts[1], trueHash, trueSign, 1, URI, {"from":accounts[0]})

	# Invalid hash test.
	with reverts():
		C.revokeWithSignature(invalidHash, trueSign, 1, {"from":accounts[0]})

	# Invalid signature test.
	with reverts():
		C.revokeWithSignature(trueHash, invalidSignature, 1, {"from":accounts[0]})

	# Invalid signer test.
	with reverts():
		C.revokeWithSignature(fakeHash, fakeSign, 1, {"from":accounts[0]})

	eventHolder = C.revokeWithSignature(trueHash, trueSign, 1, {"from":accounts[0]})
	notHasEvent = 'IssueWithSignature' in eventHolder.events
	assert notHasEvent == False

	hasEvent = 'RevokeWithSignature' in eventHolder.events
	assert hasEvent == True

'''
setBaseURI test.
'''
def test_setBaseURI():
	C = deploy()
	baseURI = ""
	newBaseURI = "https://daccred.co/"

	# Caller test.
	with reverts():
		C.setBaseURI(accounts[2], newBaseURI, {"from":accounts[0]})

	# OnlyOwner test.
	with reverts():
		C.setBaseURI(owner(), newBaseURI, {"from":accounts[1]})

	# Empty URI test.
	with reverts():
		C.setBaseURI(owner(), "", {"from":accounts[0]})

	# Invalid type test.
	with reverts():
		C.setBaseURI(owner(), 56, {"from":accounts[1]})
		C.setBaseURI(owner(), "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", {"from":accounts[1]})
		C.setBaseURI(owner(), "0x1b812f130223bb62611f195347989a1ac73b2ea97b581572eb0c9d3009677cc07979eed04b92d0d8bdc4dc4f2810b3688d0876d6626429ff20a1e03d042909df", {"from":accounts[1]})

	C.setBaseURI(owner(), newBaseURI, {"from": accounts[0]})
	assert C._getBaseURI() == newBaseURI
	assert C._getBaseURI() != baseURI

'''
generateTokenURI test.
'''
def test_generateTokenURI():
	C = deploy()
	baseURI = ""
	newBaseURI = "https://daccred.co/"
	newTokenURI = newBaseURI + "567"

	# generateTokenURI on empty baseURI
	with reverts():
		C.generateTokenURI(5)

	C.setBaseURI(owner(), newBaseURI, {"from": accounts[0]})

	assert C.generateTokenURI(567) == newTokenURI
	assert C.generateTokenURI(56) != newTokenURI
	assert C.generateTokenURI(67) != newTokenURI
	assert C.generateTokenURI(57) != newTokenURI