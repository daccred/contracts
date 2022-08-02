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
        this.signature = await this.owner.signMessage(this.hash);
        await this.erc721ExtensionWithSignature.connect(this.addr1).mint("test1");
      });

      it('mint with signature', async function () {
        await this.erc721ExtensionWithSignature.connect(this.owner).mintWithSignature(this.addr1.address, this.hash, this.signature, "test2");
        expect(await this.erc721ExtensionWithSignature.balanceOf(this.addr1.address)).to.equal(2);
      });

      it('cannot burn with invalid owner', async function () {
        const query = this.erc721ExtensionWithSignature.connect(this.addr2).burn(1);
        await expect(query).to.be.revertedWith('Caller is not owner of the token.');
      });

      it('burn with valid owner', async function () {
        await this.erc721ExtensionWithSignature.connect(this.addr1).burn(1);
        expect(await this.erc721ExtensionWithSignature.balanceOf(this.addr1.address)).to.equal(0);
      });

      it('cannot mint over capped supply', async function () {
        await this.erc721ExtensionWithSignature.connect(this.addr1).mint("test1");
        const query = this.erc721ExtensionWithSignature.connect(this.addr1).mint("test2");
        await expect(query).to.be.revertedWith("You can't mint anymore.");
      });

      it('cannot mint to zero address', async function () {
        const query = this.erc721ExtensionWithSignature
          .connect(this.owner)
          .mintWithSignature(ZERO_ADDRESS, this.hash, this.signature, "test3");
        await expect(query).to.be.revertedWith('Mint to zero address.');
      });

      it('cannot mint with invalid hash', async function () {
        const hash = await ethers.utils.hashMessage("Minting1");
        const query = this.erc721ExtensionWithSignature
          .connect(this.owner)
          .mintWithSignature(this.addr1.address, hash, this.signature, "test3");
        await expect(query).to.be.revertedWith('Invalid hash.');
      });

      it('cannot mint with Hash not signed by owner.', async function () {
        const sig = await this.addr1.signMessage(this.hash);
        const query = this.erc721ExtensionWithSignature
          .connect(this.owner)
          .mintWithSignature(this.addr2.address, this.hash, sig, "test3");
        await expect(query).to.be.revertedWith('Hash not signed by owner.');
      });

      context('owner()', function () {
        it('has the expected value', async function () {
          expect(await this.erc721ExtensionWithSignature.owner()).to.equal(this.owner.address);
        });
      });

      context('currentSupply()', function () {
        it('has the expected value', async function () {
          expect(await this.erc721ExtensionWithSignature.currentSupply()).to.equal(1);
        });
      });

      context('balanceOf()', function () {
        it('has the expected value', async function () {
          expect(await this.erc721ExtensionWithSignature.balanceOf(this.addr1.address)).to.equal(1);
        });
      });
    });
  };

describe('ERC721ExtensionSignature', createTestSuite({ contract: 'ERC721ExtensionSignature', constructorArgs: ['Daccred', 'DCD', 2 ] }));

