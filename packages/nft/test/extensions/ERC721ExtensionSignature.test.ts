/* always import the initializer [helper.ts] at the top */
import { deployContract,  constants } from '../helpers'
import { ethers } from 'hardhat'
import { expect } from 'chai'
const { ZERO_ADDRESS, BASE_URL } = constants;

const createTestSuite = ({ contract, constructorArgs }: any) =>
  function () {
    context(`${contract}`, function () {
      beforeEach(async function () {
        this.erc721ExtensionWithSignature = await deployContract(contract, constructorArgs);

        this.startTokenId = 0;
      });

      beforeEach(async function () {
        const [owner, addr1, addr2, spender] = await ethers.getSigners();
        this.owner = owner;
        this.addr1 = addr1;
        this.addr2 = addr2;
        this.spender = spender;

        this.hash = await ethers.utils.id("Minting");
        this.bytesDataHash = ethers.utils.arrayify(this.hash)
        this.signature = await this.owner.signMessage(this.bytesDataHash);
        await this.erc721ExtensionWithSignature.connect(this.addr1).mint("test1", { value: 10 });
      });

      it('mint with signature', async function () {
        await this.erc721ExtensionWithSignature.connect(this.owner).mintWithSignature(this.addr1.address, this.hash, this.signature, `${BASE_URL}/${this.addr1.address}`);
        expect(await this.erc721ExtensionWithSignature.balanceOf(this.addr1.address)).to.equal(2);
      });

      it('cannot burn with invalid owner', async function () {
        const query = this.erc721ExtensionWithSignature.connect(this.addr2).burn(0);
        await expect(query).to.be.revertedWith('TransferCallerNotOwnerNorApproved()');
      });

      it('burn with valid owner', async function () {
        await this.erc721ExtensionWithSignature.connect(this.addr1).burn(0);
        expect(await this.erc721ExtensionWithSignature.balanceOf(this.addr1.address)).to.equal(0);
      });

      it('cannot mint over capped supply', async function () {
        await this.erc721ExtensionWithSignature.connect(this.addr1).mint("test1", { value: 10 });
        const query = this.erc721ExtensionWithSignature.connect(this.addr1).mint("test2", { value: 10 });
        await expect(query).to.be.revertedWith("You can't mint anymore.");
      });

      it('[TODO]: Token URI is valid URL string', function() {
        console.log("Token URI is valid URL string when baseURL is not empty by default");
      })


      it('[TODO]: Cannot SetURI for existent Token', function() {
        console.log("cannot overwrite URI for already minted Token");
      })

      

      it('cannot mint to zero address', async function () {
        const query = this.erc721ExtensionWithSignature
          .connect(this.owner)
          .mintWithSignature(ZERO_ADDRESS, this.hash, this.signature, "test3");
        await expect(query).to.be.revertedWith('Mint to zero address.');
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

      context('totalSupply()', function () {
        it('has the expected value', async function () {
          expect(await this.erc721ExtensionWithSignature.totalSupply()).to.equal(1);
        });
      });

      context('balanceOf()', function () {
        it('has the expected value', async function () {
          expect(await this.erc721ExtensionWithSignature.balanceOf(this.addr1.address)).to.equal(1);
        });
      });
    });
  };

describe('ERC721ExtensionSignature', createTestSuite({ contract: 'ERC721ExtensionSignature', constructorArgs: ['Daccred', 'DCD', ZERO_ADDRESS, 1000000, 1000, 2, 10 ] }));

