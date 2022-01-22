export enum NetworkEnum {
  ETHEREUM = '0x1',
  ROPSTEN = '0x3',
  HARMONY_TESTNET = '0x6357d2e0',
  HARMONY_MAINNET = '0x63564C40',
}


/**
 * @dev DocumentStatus
 * Use to define the publish status of the document, off-chain and on-chain
 */
export enum DocumentStatus {
  DRAFT = 'draft',
  ARCHIVED = 'archived',
  PUBLISHED = 'published',
}