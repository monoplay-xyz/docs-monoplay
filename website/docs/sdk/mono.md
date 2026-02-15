---
sidebar_position: 9
title: Blockchain Integration
---

# Blockchain Integration (Mono Plugin)

The `monoplay-sdk-mono` plugin connects games to the Monolythium blockchain. It provides wallet connection, LYTH token queries, NFT ownership verification, and on-chain transaction handling.

## Installation

```toml
[dependencies]
monoplay-sdk-mono = "0.1"
```

Add to your Bevy app:

```rust
use bevy::prelude::*;
use monoplay_sdk_mono::MonoPlugin;

fn main() {
 App::new()
 .add_plugins(DefaultPlugins)
 .add_plugins(MonoPlugin::new(ChainConfig {
 chain_id: 11155111, // Sprintnet testnet
 rpc_url: "https://rpc.sprintnet.monolythium.com".to_string(),
 }))
 .run();
}
```

## Wallet Connection

### Connect Wallet

```rust
use monoplay_sdk_mono::{WalletManager, WalletProvider};

fn connect_wallet(mut wallet: ResMut<WalletManager>) {
 wallet.connect(WalletProvider::MetaMask);
}

fn handle_wallet_events(
 mut events: EventReader<WalletEvent>,
 mut state: ResMut<NextState<GameState>>,
) {
 for event in events.read() {
 match event {
 WalletEvent::Connected { address } => {
 info!("Wallet connected: {}", address);
 state.set(GameState::MainMenu);
 }
 WalletEvent::Disconnected => {
 warn!("Wallet disconnected");
 state.set(GameState::Login);
 }
 WalletEvent::Error(e) => {
 error!("Wallet error: {}", e);
 }
 }
 }
}
```

### Supported Wallets

```rust
pub enum WalletProvider {
 MetaMask,
 WalletConnect,
 MonoWallet, // Native MonoPlay wallet
 Ledger, // Hardware wallet
}
```

### Account Info

```rust
use monoplay_sdk_mono::Account;

fn display_account_info(account: Res<Account>) {
 if let Some(addr) = account.address() {
 info!("Connected wallet: {}", addr);
 info!("Balance: {} LYTH", account.lyth_balance());
 }
}
```

## LYTH Token Queries

### Balance Queries

```rust
use monoplay_sdk_mono::{LythToken, TokenBalance};

fn check_balance(
 lyth: Res<LythToken>,
 account: Res<Account>,
) {
 if let Some(address) = account.address() {
 let balance = lyth.balance_of(address);
 info!("LYTH Balance: {}", balance);
 }
}
```

### Async Balance Queries

```rust
use monoplay_sdk_mono::BalanceQuery;

fn query_balance(
 mut commands: Commands,
 account: Res<Account>,
) {
 if let Some(address) = account.address() {
 commands.spawn(BalanceQuery::new(address));
 }
}

fn handle_balance_result(
 mut query: Query<(Entity, &BalanceQuery), Changed<BalanceQuery>>,
 mut commands: Commands,
) {
 for (entity, query) in query.iter_mut() {
 if let Some(balance) = query.result() {
 info!("Balance: {} LYTH", balance);
 commands.entity(entity).despawn();
 }
 }
}
```

## NFT Ownership

### Check NFT Ownership

```rust
use monoplay_sdk_mono::{NftContract, TokenId};

#[derive(Resource)]
struct MonoLandsNft {
 contract: NftContract,
}

fn check_planet_ownership(
 nft: Res<MonoLandsNft>,
 account: Res<Account>,
) {
 if let Some(address) = account.address() {
 let owns_planet = nft.contract.owns_token(address, TokenId(1));

 if owns_planet {
 info!("Player owns Planet #1");
 }
 }
}
```

### Query All Owned NFTs

```rust
use monoplay_sdk_mono::OwnedTokensQuery;

fn get_player_planets(
 nft: Res<MonoLandsNft>,
 account: Res<Account>,
) {
 if let Some(address) = account.address() {
 let owned_tokens = nft.contract.tokens_of_owner(address);

 info!("Player owns {} planets", owned_tokens.len());
 for token_id in owned_tokens {
 info!(" - Planet #{}", token_id.0);
 }
 }
}
```

### NFT Metadata

```rust
use monoplay_sdk_mono::TokenMetadata;

fn load_planet_data(
 nft: Res<MonoLandsNft>,
 token_id: TokenId,
) {
 if let Some(metadata) = nft.contract.token_metadata(token_id) {
 info!("Planet name: {}", metadata.name);
 info!("Image: {}", metadata.image);
 info!("Attributes: {:?}", metadata.attributes);
 }
}
```

## On-Chain Transactions

### Sending Transactions

```rust
use monoplay_sdk_mono::{Transaction, TransactionBuilder};

fn purchase_item(
 mut wallet: ResMut<WalletManager>,
 shop_contract: Res<ShopContract>,
 account: Res<Account>,
) {
 let tx = TransactionBuilder::new()
 .to(shop_contract.address())
 .value(ethers::utils::parse_ether("10").unwrap()) // 10 LYTH
 .data(shop_contract.encode_purchase_item(42))
 .build();

 wallet.send_transaction(tx);
}
```

### Transaction Events

```rust
use monoplay_sdk_mono::TransactionEvent;

fn handle_transactions(mut events: EventReader<TransactionEvent>) {
 for event in events.read() {
 match event {
 TransactionEvent::Pending { hash } => {
 info!("Transaction pending: {}", hash);
 }
 TransactionEvent::Confirmed { hash, receipt } => {
 info!("Transaction confirmed: {}", hash);
 }
 TransactionEvent::Failed { hash, error } => {
 error!("Transaction failed: {} - {}", hash, error);
 }
 }
 }
}
```

## Smart Contract Integration

### Contract Interaction

```rust
use monoplay_sdk_mono::{Contract, ContractCall};
use ethers::contract::abigen;

abigen!(
 GameContract,
 r#"[
 function claimReward(uint256 rewardId) external
 function getPlayerScore(address player) external view returns (uint256)
 event RewardClaimed(address indexed player, uint256 rewardId)
 ]"#
);

#[derive(Resource)]
struct MyGameContract {
 contract: GameContract<Provider>,
}

fn claim_reward(
 game_contract: Res<MyGameContract>,
 account: Res<Account>,
 reward_id: u64,
) {
 let call = game_contract.contract.claim_reward(reward_id.into());
 call.send().await.ok();
}
```

### Reading Contract State

```rust
fn get_player_score(
 game_contract: Res<MyGameContract>,
 account: Res<Account>,
) {
 if let Some(address) = account.address() {
 let score = game_contract.contract
 .get_player_score(address)
 .call()
 .await
 .unwrap_or_default();

 info!("Player score: {}", score);
 }
}
```

### Event Listening

```rust
use monoplay_sdk_mono::ContractEvent;

fn listen_for_rewards(
 mut events: EventReader<ContractEvent<RewardClaimedFilter>>,
) {
 for event in events.read() {
 info!("Reward claimed by {}: {}", event.player, event.reward_id);
 }
}
```

## Token Gating

### Verify Access

```rust
use monoplay_sdk_mono::TokenGate;

#[derive(Resource)]
struct PremiumAccess {
 nft_gate: TokenGate,
}

fn check_premium_access(
 gate: Res<PremiumAccess>,
 account: Res<Account>,
) -> bool {
 if let Some(address) = account.address() {
 gate.nft_gate.has_access(address)
 } else {
 false
 }
}

fn premium_feature(
 gate: Res<PremiumAccess>,
 account: Res<Account>,
) {
 if !check_premium_access(gate, account) {
 warn!("Premium NFT required");
 return;
 }

 // Execute premium feature
}
```

### Multi-Token Gating

```rust
use monoplay_sdk_mono::{TokenRequirement, AccessPolicy};

fn setup_token_gate(mut commands: Commands) {
 commands.insert_resource(TokenGate {
 requirements: vec![
 TokenRequirement::Nft {
 contract: "0x1234...".parse().unwrap(),
 min_balance: 1,
 },
 TokenRequirement::Erc20 {
 contract: "0x5678...".parse().unwrap(),
 min_balance: 1000,
 },
 ],
 policy: AccessPolicy::Any, // OR condition
 });
}
```

## Gas Management

### Gas Estimation

```rust
use monoplay_sdk_mono::GasEstimator;

fn estimate_transaction_cost(
 estimator: Res<GasEstimator>,
 tx: Transaction,
) {
 let estimated_gas = estimator.estimate_gas(&tx).await.unwrap();
 let gas_price = estimator.get_gas_price().await.unwrap();
 let total_cost = estimated_gas * gas_price;

 info!("Estimated cost: {} LYTH", ethers::utils::format_ether(total_cost));
}
```

### Gas Price Monitoring

```rust
use monoplay_sdk_mono::GasTracker;

fn monitor_gas_prices(tracker: Res<GasTracker>) {
 info!("Current gas price: {} gwei", tracker.current_price());
 info!("Fast gas price: {} gwei", tracker.fast_price());
 info!("Slow gas price: {} gwei", tracker.slow_price());
}
```

## Signature Verification

### Sign Messages

```rust
use monoplay_sdk_mono::Signer;

fn sign_login_message(
 wallet: Res<WalletManager>,
 account: Res<Account>,
) {
 let message = format!("Sign in to My Game\nNonce: {}", generate_nonce());

 wallet.sign_message(message.as_bytes());
}

fn handle_signature(
 mut events: EventReader<SignatureEvent>,
) {
 for event in events.read() {
 match event {
 SignatureEvent::Signed { message, signature } => {
 info!("Message signed: {}", hex::encode(signature));
 // Send to server for verification
 }
 SignatureEvent::Rejected => {
 warn!("User rejected signature request");
 }
 }
 }
}
```

### Verify Signatures

```rust
use monoplay_sdk_mono::SignatureVerifier;

fn verify_player_signature(
 verifier: Res<SignatureVerifier>,
 message: &[u8],
 signature: &[u8],
 expected_address: Address,
) -> bool {
 verifier.verify(message, signature, expected_address)
}
```

## Network Management

### Chain Switching

```rust
use monoplay_sdk_mono::ChainId;

fn switch_to_mainnet(mut wallet: ResMut<WalletManager>) {
 wallet.switch_chain(ChainId::MonoMainnet);
}

fn handle_chain_change(mut events: EventReader<ChainChangedEvent>) {
 for event in events.read() {
 info!("Switched to chain {}", event.chain_id);
 }
}
```

### Multi-Chain Support

```rust
use monoplay_sdk_mono::MultiChainProvider;

fn setup_multi_chain(mut commands: Commands) {
 commands.insert_resource(MultiChainProvider::new(vec![
 ChainConfig {
 chain_id: 11155111,
 rpc_url: "https://rpc.sprintnet.monolythium.com".to_string(),
 name: "Sprintnet".to_string(),
 },
 ChainConfig {
 chain_id: 1,
 rpc_url: "https://rpc.monolythium.com".to_string(),
 name: "Monolythium".to_string(),
 },
 ]));
}
```

## Caching and Performance

### Balance Caching

```rust
use monoplay_sdk_mono::BalanceCache;

fn setup_caching(mut commands: Commands) {
 commands.insert_resource(BalanceCache::new(Duration::from_secs(30)));
}
```

### Batch Queries

```rust
use monoplay_sdk_mono::BatchQuery;

fn batch_nft_query(
 nft: Res<MonoLandsNft>,
 players: Query<&PlayerAddress>,
) {
 let addresses: Vec<_> = players.iter().map(|p| p.0).collect();

 let batch = BatchQuery::new()
 .add_balance_query(addresses.clone())
 .add_nft_balance_query(nft.contract.address(), addresses);

 batch.execute();
}
```

## Error Handling

### Transaction Errors

```rust
use monoplay_sdk_mono::TransactionError;

fn handle_transaction_errors(
 mut events: EventReader<TransactionEvent>,
 mut ui: ResMut<ErrorUI>,
) {
 for event in events.read() {
 if let TransactionEvent::Failed { error, .. } = event {
 match error {
 TransactionError::InsufficientFunds => {
 ui.show_error("Not enough LYTH for this transaction");
 }
 TransactionError::UserRejected => {
 ui.show_error("Transaction cancelled");
 }
 TransactionError::ContractError(msg) => {
 ui.show_error(&format!("Contract error: {}", msg));
 }
 _ => {
 ui.show_error("Transaction failed");
 }
 }
 }
 }
}
```

## Best Practices

1. **Error Handling**: Always handle wallet connection failures gracefully.
2. **Gas Estimation**: Estimate gas before showing transaction prompts.
3. **Caching**: Cache balance and NFT queries to reduce RPC calls.
4. **User Feedback**: Show loading states during blockchain operations.
5. **Offline Mode**: Support offline play with blockchain features disabled.
6. **Signature Security**: Never sign arbitrary data from untrusted sources.
7. **Network Detection**: Prompt users to switch to correct network.
8. **Transaction Limits**: Implement rate limiting for transaction-heavy features.

## Examples

### Complete Token-Gated Feature

```rust
use bevy::prelude::*;
use monoplay_sdk_mono::*;

#[derive(Component)]
struct PremiumZone;

fn check_zone_access(
 nft: Res<PremiumPassNft>,
 account: Res<Account>,
 player: Query<&Transform, With<Player>>,
 zones: Query<&GlobalTransform, With<PremiumZone>>,
) {
 if let Some(address) = account.address() {
 let has_pass = nft.contract.balance_of(address) > 0;

 if !has_pass {
 for player_transform in player.iter() {
 for zone_transform in zones.iter() {
 let distance = player_transform
 .translation
 .distance(zone_transform.translation());

 if distance < 5.0 {
 // Block access
 show_premium_required_message();
 return;
 }
 }
 }
 }
 }
}
```

## Next Steps

- [Core Plugin](./core.md) - Save blockchain state
- [UI Plugin](./ui.md) - Wallet connection UI
- [Multiplayer](./multiplayer.md) - On-chain leaderboards
