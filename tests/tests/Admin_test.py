from brownie import Admin, DeployerERC721, DeployerSoulbound, DeployerSoulboundWithExtension, network, accounts, config, reverts

'''
FUNCTON SELECTORS::

-------
"deployERC721ExtensionCore(string,string)" :: 0x2ab7fabf

"deployERC721ExtensionSignature(string,string,address,uint256,uint256,uint256,uint256)" :: 0xe9181d92
------

------

"deploySoulbound(string,string)" :: 0x27a31ded

"deploySoulboundCore(string,string,address,uint256)" :: 0xd4152170
------

------

"deploySoulboundRedeemable(string,string,address,uint256,uint256,uint256)" :: 0xab184932

"deploySoulboundWithSignature(string,string,address,uint256)" :: 0x0b33c33a
------
'''


# Deployment.
def deploy():
	_deploy = Admin.deploy({"from": accounts[0]})
	return _deploy


# Deploy test.
def test_deploy():
	previousAddress = ""
	C = deploy()
	assert C.address != previousAddress


def test_addDeployerSelector():
	C = deploy()
	_zero = "0x0000000000000000000000000000000000000000"

	# Add facet from a zero address.
	# Fail.
	with reverts():
		C.addDeployerSelector(_zero, "0xed987317", {"from": accounts[0]})

	# Make transaction with non-owner address.
	# Fail.
	with reverts():
		C.addDeployerSelector(accounts[3], "0xed987317", {"from": accounts[4]})

	# Pass
	C.addDeployerSelector(accounts[2],"0xabcdef12", {"from": accounts[0]})


def test_pauseAndOwnership():
	_zero = "0x0000000000000000000000000000000000000000"

	## Deploy DeployerERC721.
	F = DeployerERC721.deploy({"from": accounts[0]})

	# ---------- Constant ------------

	# Pause by Non-admn.
	with reverts():
		F.pause({"from": accounts[2]})

	F.pause({"from": accounts[0]})

	with reverts():
		F.pause({"from": accounts[0]})

	# Unpause by Non-admn.
	with reverts():
		F.unPause({"from": accounts[2]})

	F.unPause({"from": accounts[0]})

	with reverts():
		F.unPause({"from": accounts[0]})

	with reverts():
		F.transferOwnership(accounts[1], {"from": accounts[2]})

	with reverts():
		F.transferOwnership(_zero, {"from": accounts[0]})

	event = F.transferOwnership(accounts[1], {"from": accounts[0]})

	# Pause by Non-admn.
	with reverts():
		F.pause({"from": accounts[0]})

	F.pause({"from": accounts[1]})

	with reverts():
		F.pause({"from": accounts[1]})

	# Unpause by Non-admin.
	with reverts():
		F.unPause({"from": accounts[0]})

	F.unPause({"from": accounts[1]})

	with reverts():
		F.unPause({"from": accounts[1]})

	assert 'OwnershipTransferred' in event.events

	# -------- Constant ---------


def test_pauseAndOwnership2():
	_zero = "0x0000000000000000000000000000000000000000"

	## Deploy DeployerERC721.
	F = DeployerSoulbound.deploy({"from": accounts[0]})

	# ---------- Constant ------------

	# Pause by Non-admn.
	with reverts():
		F.pause({"from": accounts[2]})

	F.pause({"from": accounts[0]})

	with reverts():
		F.pause({"from": accounts[0]})

	# Unpause by Non-admn.
	with reverts():
		F.unPause({"from": accounts[2]})

	F.unPause({"from": accounts[0]})

	with reverts():
		F.unPause({"from": accounts[0]})

	with reverts():
		F.transferOwnership(accounts[1], {"from": accounts[2]})

	with reverts():
		F.transferOwnership(_zero, {"from": accounts[0]})

	event = F.transferOwnership(accounts[1], {"from": accounts[0]})

	# Pause by Non-admn.
	with reverts():
		F.pause({"from": accounts[0]})

	F.pause({"from": accounts[1]})

	with reverts():
		F.pause({"from": accounts[1]})

	# Unpause by Non-admin.
	with reverts():
		F.unPause({"from": accounts[0]})

	F.unPause({"from": accounts[1]})

	with reverts():
		F.unPause({"from": accounts[1]})

	assert 'OwnershipTransferred' in event.events

	# -------- Constant ---------

def test_pauseAndOwnership3():
	_zero = "0x0000000000000000000000000000000000000000"

	## Deploy DeployerERC721.
	F = DeployerSoulboundWithExtension.deploy({"from": accounts[0]})

	# ---------- Constant ------------

	# Pause by Non-admn.
	with reverts():
		F.pause({"from": accounts[2]})

	F.pause({"from": accounts[0]})

	with reverts():
		F.pause({"from": accounts[0]})

	# Unpause by Non-admn.
	with reverts():
		F.unPause({"from": accounts[2]})

	F.unPause({"from": accounts[0]})

	with reverts():
		F.unPause({"from": accounts[0]})

	with reverts():
		F.transferOwnership(accounts[1], {"from": accounts[2]})

	with reverts():
		F.transferOwnership(_zero, {"from": accounts[0]})

	event = F.transferOwnership(accounts[1], {"from": accounts[0]})

	# Pause by Non-admn.
	with reverts():
		F.pause({"from": accounts[0]})

	F.pause({"from": accounts[1]})

	with reverts():
		F.pause({"from": accounts[1]})

	# Unpause by Non-admin.
	with reverts():
		F.unPause({"from": accounts[0]})

	F.unPause({"from": accounts[1]})

	with reverts():
		F.unPause({"from": accounts[1]})

	assert 'OwnershipTransferred' in event.events

	# -------- Constant ---------



def test_deployERC721ExtensionCore():
	# -------- Variable -----------

	# "deployERC721ExtensionCore(string,string)" :: 0x2ab7fabf


	# ------ Constant ----------

	C = deploy()
	_zero = "0x0000000000000000000000000000000000000000"

	# ------ Constant ----------



	# -------- Variable -----------

	# "deployERC721ExtensionCore(string,string)" :: 0x2ab7fabf

	## Deploy DeployerERC721.
	F = DeployerERC721.deploy({"from": accounts[0]})

	assert F.address != _zero

	# -------- Variable--------------



	# -------- Variable ----------

	# Deploy for inexistent facet and selector.
	with reverts():
		C.deployERC721ExtensionCore("Name", "NM", {"from": accounts[0]})

	## Add Facet address and selector.
	C.addDeployerSelector(F.address, "0x2ab7fabf", {"from": accounts[0]})


	# Deploy again.
	C.deployERC721ExtensionCore("Name", "NM", {"from": accounts[0]})
	C.deployERC721ExtensionCore("Name", "NM", {"from": accounts[2]})

	# ------------ Variable ------------


def test_deployERC721ExtensionSignature():
	# -------- Variable -----------

	# "deployERC721ExtensionSignature(string,string,address,uint256,uint256,uint256,uint256)" :: 0xe9181d92


	# ------ Constant ----------

	C = deploy()
	_zero = "0x0000000000000000000000000000000000000000"

	# ------ Constant ----------



	# -------- Variable -----------

	# "deployERC721ExtensionSignature(string,string,address,uint256,uint256,uint256,uint256)" :: 0xe9181d92

	## Deploy DeployerERC721.
	F = DeployerERC721.deploy({"from": accounts[0]})

	assert F.address != _zero

	# -------- Variable--------------



	# -------- Variable ----------

	# Deploy for inexistent facet and selector.
	with reverts():
		C.deployERC721ExtensionSignature("Name", "NM", accounts[1], 0, 0, 0, 0, {"from": accounts[0]})

	## Add Facet address and selector.
	C.addDeployerSelector(F.address,"0xe9181d92", {"from": accounts[0]})


	# Deploy again with invalid constructor.
	with reverts():
		C.deployERC721ExtensionSignature("Name", "NM", accounts[1], 0, 10, 10, 10, {"from": accounts[0]})
	
	# Deploy again with invalid constructor.
	with reverts():
		C.deployERC721ExtensionSignature("Name", "NM", accounts[1], 10, 10, 0, 10, {"from": accounts[0]})

	# Deploy again with invalid constructor.
	with reverts():
		C.deployERC721ExtensionSignature("Name", "NM", accounts[1], 10, 10, 10, 0, {"from": accounts[0]})

	# Deploy again with invalid constructor.
	C.deployERC721ExtensionSignature("Name", "NM", accounts[1], 10, 0, 10, 10, {"from": accounts[0]})

	# Deploy again.
	C.deployERC721ExtensionSignature("Name", "NM", accounts[1], 10, 10, 10, 10, {"from": accounts[0]})

	# ------------ Variable ------------



def test_deploySoulbound():
	# -------- Variable -----------

	# "deploySoulbound(string,string)" :: 0x27a31ded


	# ------ Constant ----------

	C = deploy()
	_zero = "0x0000000000000000000000000000000000000000"

	# ------ Constant ----------



	# -------- Variable -----------

	# "deploySoulbound(string,string)" :: 0x27a31ded

	## Deploy DeployerERC721.
	F = DeployerSoulbound.deploy({"from": accounts[0]})

	assert F.address != _zero

	# -------- Variable--------------



	# -------- Variable ----------

	# Deploy for inexistent facet and selector.
	with reverts():
		C.deploySoulbound("Name", "NM", {"from": accounts[0]})

	## Add Facet address and selector.
	C.addDeployerSelector(F.address,"0x27a31ded", {"from": accounts[0]})


	# Deploy again.
	C.deploySoulbound("Name", "NM", {"from": accounts[0]})

	# ------------ Variable ------------


def test_deploySoulboundCore():
	# -------- Variable -----------

	# "deploySoulboundCore(string,string,address,uint256)" :: 0xd4152170


	# ------ Constant ----------

	C = deploy()
	_zero = "0x0000000000000000000000000000000000000000"

	# ------ Constant ----------



	# -------- Variable -----------

	# "deploySoulboundCore(string,string,address,uint256)" :: 0xd4152170

	## Deploy DeployerERC721.
	F = DeployerSoulbound.deploy({"from": accounts[0]})

	assert F.address != _zero

	# -------- Variable--------------



	# -------- Variable ----------

	# Deploy for inexistent facet and selector.
	with reverts():
		C.deploySoulboundCore("Name", "NM", accounts[2], 0, {"from": accounts[0]})

	## Add Facet address and selector.
	C.addDeployerSelector(F.address,"0xd4152170", {"from": accounts[0]})


	# Deploy again.
	C.deploySoulboundCore("Name", "NM", accounts[2], 0, {"from": accounts[0]})

	with reverts():
		C.deploySoulboundCore("Name", "NM", _zero, 0, {"from": accounts[0]})

	# ------------ Variable ------------


def test_deploySoulboundRedeemable():
	# -------- Variable -----------

	# "deploySoulboundRedeemable(string,string,address,uint256,uint256,uint256)" :: 0xab184932


	# ------ Constant ----------

	C = deploy()
	_zero = "0x0000000000000000000000000000000000000000"

	# ------ Constant ----------



	# -------- Variable -----------

	# "deploySoulboundRedeemable(string,string,address,uint256,uint256,uint256)" :: 0xab184932

	## Deploy DeployerERC721.
	F = DeployerSoulboundWithExtension.deploy({"from": accounts[0]})

	assert F.address != _zero

	# -------- Variable--------------



	# -------- Variable ----------

	# Deploy for inexistent facet and selector.
	with reverts():
		C.deploySoulboundRedeemable("Name", "NM", accounts[2], 0, 0, 0, {"from": accounts[0]})

	## Add Facet address and selector.
	C.addDeployerSelector(F.address,"0xab184932", {"from": accounts[0]})


	# Deploy again.
	C.deploySoulboundRedeemable("Name", "NM", accounts[2], 0, 10, 10, {"from": accounts[0]})

	with reverts():
		C.deploySoulboundRedeemable("Name", "NM", accounts[2], 0, 5, 10, {"from": accounts[0]})

	with reverts():
		C.deploySoulboundRedeemable("Name", "NM", _zero, 0, 5, 10, {"from": accounts[0]})

	# ------------ Variable ------------



def test_deploySoulboundWithSignature():
	# -------- Variable -----------

	# "deploySoulboundWithSignature(string,string,address,uint256)" :: 0x0b33c33a


	# ------ Constant ----------

	C = deploy()
	_zero = "0x0000000000000000000000000000000000000000"

	# ------ Constant ----------



	# -------- Variable -----------

	# "deploySoulboundWithSignature(string,string,address,uint256)" :: 0x0b33c33a

	## Deploy DeployerERC721.
	F = DeployerSoulboundWithExtension.deploy({"from": accounts[0]})

	assert F.address != _zero

	# -------- Variable--------------



	# -------- Variable ----------

	# Deploy for inexistent facet and selector.
	with reverts():
		C.deploySoulboundWithSignature("Name", "NM", accounts[2], 0, {"from": accounts[0]})

	## Add Facet address and selector.
	C.addDeployerSelector(F.address,"0x0b33c33a", {"from": accounts[0]})


	# Deploy again.
	C.deploySoulboundWithSignature("Name", "NM", accounts[2], 0, {"from": accounts[0]})
	C.deploySoulboundWithSignature("Name", "NM", accounts[2], 10, {"from": accounts[0]})

	with reverts():
		C.deploySoulboundWithSignature("Name", "NM", _zero, 10, {"from": accounts[0]})

	# ------------ Variable ------------