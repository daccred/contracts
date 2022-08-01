/* always import the initializer [helper.ts] at the top */
import { deployContract,  constants } from '../helpers'
import { ethers } from 'hardhat'
import { expect } from 'chai'
const { ZERO_ADDRESS } = constants;

const createTestSuite = ({ contract, constructorArgs }: any) =>
  function () {
    context(`${contract}`, function () {
      beforeEach(async function () {
        this.erc721ExtensionWithSignature = await deployContract(contract, constructorArgs);

        this.startTokenId = 1;
      });

      beforeEach(async function () {
        const [owner, addr1, addr2, spender] = await ethers.getSigners();
        this.owner = owner;
        this.addr1 = addr1;
        this.addr2 = addr2;
        this.spender = spender;
        this.burnedTokenId = 1;

        this.hash = await ethers.utils.hashMessage("Minting");
        this.signature = await addr1.signMessage(hash);
        await this.erc721ExtensionWithSignature.connect(this.addr1).mint(this.addr1.address, "test1");
      });

      it('mint with signature', async function () {
        const query = this.erc721ExtensionWithSignature.connect(this.addr2).mintWithSignature(this.addr1.address, this.hash, this.signature, "test2");
        await expect(query).to.equal(2);
      });

      it('cannot mint to zero address', async function () {
        const query = this.erc721ExtensionWithSignature
          .connect(this.addr2)
          .mintWithSignature("0x0000000000000000000000000000000000000000", this.hash, this.signature, "test3");
        await expect(query).to.be.revertedWith('Mint to zero address.');
      });

      it('cannot mint with invalid hash', async function () {
        const query = this.erc721ExtensionWithSignature
          .connect(this.addr2)
          .mintWithSignature(this.addr1.address, "xxx", this.signature, "test3");
        await expect(query).to.be.revertedWith('Invalid hash.');
      });

      it('cannot mint with invalid signature length', async function () {
        const query = this.erc721ExtensionWithSignature
          .connect(this.addr2)
          .mintWithSignature(this.addr1.address, this.hash, "ab", "test3");
        await expect(query).to.be.revertedWith('Invalid signature length');
      });

      it('cannot mint with Hash not signed by owner.', async function () {
        const query = this.erc721ExtensionWithSignature
          .connect(this.addr2)
          .mintWithSignature(this.addr2.address, this.hash, this.signature, "test3");
        await expect(query).to.be.revertedWith('Hash not signed by owner.');
      });

      context('currentSupply()', function () {
        it('has the expected value', async function () {
          expect(await this.erc721ExtensionWithSignature.currentSupply()).to.equal(1);
        });
      });

      context('balanceOf()', function () {
        it('has the expected value', async function () {
          expect(await this.erc721ExtensionWithSignature.balanceOf(this.addr1.address)).to.equal(2);
        });
      });
    });
  };

describe('erc721ExtensionWithSignature', createTestSuite({ contract: 'erc721ExtensionWithSignature', constructorArgs: ['Daccred', 'DCD'] }));

