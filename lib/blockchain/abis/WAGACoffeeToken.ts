export const WAGACoffeeTokenABI = [
  // Only including essential functions for brevity
  "function createBatch(string memory ipfsUri, uint256 productionDate, uint256 expiryDate) external returns (uint256)",
  "function updateBatchStatus(uint256 batchId, bool isVerified) external",
  "function updateInventory(uint256 batchId, uint256 newQuantity) external",
  "function mintBatch(address to, uint256 batchId, uint256 amount) external",
  "function burnForRedemption(address account, uint256 batchId, uint256 amount) external",
  "function isBatchCreated(uint256 batchId) external view returns (bool)",
  "function batchInfo(uint256 batchId) external view returns (uint256, uint256, bool, uint256)",
  "function getActiveBatchIds() external view returns (uint256[] memory)",
  "function balanceOf(address account, uint256 id) external view returns (uint256)",
  "function uri(uint256 tokenId) external view returns (string memory)",
  "event BatchCreated(uint256 indexed batchId, string ipfsUri)",
  "event BatchStatusUpdated(uint256 indexed batchId, bool isVerified)",
  "event InventoryUpdated(uint256 indexed batchId, uint256 newQuantity)",
  "event BatchExpired(uint256 indexed batchId)",
]

export const WAGAProofOfReserveABI = [
  "function requestReserveVerification(uint256 batchId, uint256 quantity, address recipient, string calldata source) external returns (bytes32)",
  "event ReserveVerificationRequested(bytes32 indexed requestId, uint256 indexed batchId, uint256 quantity)",
  "event ReserveVerificationCompleted(bytes32 indexed requestId, uint256 indexed batchId, bool verified)",
]

export const WAGACoffeeRedemptionABI = [
  "function requestRedemption(uint256 batchId, uint256 quantity, string memory deliveryAddress) external",
  "function updateRedemptionStatus(uint256 redemptionId, uint8 status) external",
  "function getRedemptionDetails(uint256 redemptionId) external view returns (address, uint256, uint256, string memory, uint256, uint8, uint256)",
  "function getConsumerRedemptions(address consumer) external view returns (uint256[] memory)",
  "event RedemptionRequested(uint256 indexed redemptionId, address indexed consumer, uint256 batchId, uint256 quantity)",
  "event RedemptionStatusUpdated(uint256 indexed redemptionId, uint8 status)",
  "event RedemptionFulfilled(uint256 indexed redemptionId, uint256 fulfillmentDate)",
]

export const WAGAInventoryManagerABI = [
  "function requestInventoryVerification(uint256 batchId, uint256 expectedQuantity, string calldata source) external returns (bytes32)",
  "function manuallyVerifyBatch(uint256 batchId, uint256 actualQuantity) external",
  "event VerificationRequested(bytes32 indexed requestId, uint256 indexed batchId, uint256 expectedQuantity)",
  "event VerificationCompleted(bytes32 indexed requestId, uint256 indexed batchId, bool verified)",
  "event InventorySynced(uint256 indexed batchId, uint256 actualQuantity)",
  "event BatchExpired(uint256 indexed batchId)",
  "event BatchExpiryWarning(uint256 indexed batchId, uint256 daysRemaining)",
  "event LowInventoryWarning(uint256 indexed batchId, uint256 currentQuantity)",
]

