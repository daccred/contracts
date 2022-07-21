from brownie import *

### Testing deployment.
def test_deploy():
    account = getAccount()
    SoulboundRedeemable.deploy("Token", "TKN", account, 100, "8 gwei", "4 gwei", {"from":account})
    

def getAccount():
    if (network.show_active() == "development"):
        return accounts[0]
    else:
        return accounts.add(config["wallets"]["from_key"])
