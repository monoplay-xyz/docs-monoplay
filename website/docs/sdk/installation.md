---
sidebar_position: 2
title: Installation
---

# Installing the MonoPlay SDK

The MonoPlay SDK is distributed as Rust crates via crates.io. Each plugin can be installed independently or as part of the complete SDK bundle.

## Requirements

- **Rust**: 1.75.0 or later
- **Bevy**: 0.18.x (automatically included as dependency)
- **Cargo**: Latest stable version

## Quick Start

Add the SDK to your `Cargo.toml`:

```toml
[dependencies]
bevy = "0.18"
monoplay-sdk-core = "0.1"
monoplay-sdk-input = "0.1"
monoplay-sdk-physics = "0.1"
monoplay-sdk-ui = "0.1"
monoplay-sdk-audio = "0.1"
monoplay-sdk-multiplayer = "0.1"
monoplay-sdk-mono = "0.1"
monoplay-sdk-world = "0.1"
```

## Individual Plugins

You can install only the plugins you need:

```toml
[dependencies]
bevy = "0.18"
monoplay-sdk-core = "0.1"
monoplay-sdk-input = "0.1"
```

## Feature Flags

### Core Features

```toml
[dependencies]
monoplay-sdk-core = { version = "0.1", features = ["save-system", "hot-reload"] }
```

Available features:
- `save-system`: Persistent save/load functionality (default)
- `hot-reload`: Asset hot-reloading for development (default)
- `debug`: Additional debug logging and utilities

### Audio Features

```toml
[dependencies]
monoplay-sdk-audio = { version = "0.1", features = ["spatial", "streaming"] }
```

Available features:
- `spatial`: 3D positional audio (default)
- `streaming`: Stream large audio files instead of loading into memory
- `mp3`: MP3 format support (requires system codecs)
- `flac`: FLAC format support

### Multiplayer Features

```toml
[dependencies]
monoplay-sdk-multiplayer = { version = "0.1", features = ["matchmaking", "voice"] }
```

Available features:
- `matchmaking`: Integrated matchmaking system
- `voice`: Voice chat support (experimental)
- `relay`: Relay server support for NAT traversal

### Blockchain Features

```toml
[dependencies]
monoplay-sdk-mono = { version = "0.1", features = ["wallet", "nft"] }
```

Available features:
- `wallet`: Wallet connection and LYTH queries (default)
- `nft`: NFT ownership verification (default)
- `contracts`: Smart contract interaction utilities

### World Features

```toml
[dependencies]
monoplay-sdk-world = { version = "0.1", features = ["generation", "physics"] }
```

Available features:
- `generation`: Procedural terrain generation (default)
- `physics`: Voxel physics simulation
- `serialization`: World save/load support

## Platform-Specific Configuration

### WebAssembly

For WASM builds, disable features that require native threading:

```toml
[target.'cfg(target_arch = "wasm32")'.dependencies]
monoplay-sdk-multiplayer = { version = "0.1", default-features = false }
monoplay-sdk-world = { version = "0.1", default-features = false, features = ["generation"] }
```

### Mobile

Mobile platforms require additional setup. Ensure your `Cargo.toml` includes:

```toml
[target.'cfg(target_os = "android")'.dependencies]
monoplay-sdk-audio = { version = "0.1", features = ["android-audio"] }

[target.'cfg(target_os = "ios")'.dependencies]
monoplay-sdk-audio = { version = "0.1", features = ["ios-audio"] }
```

## Minimal Example

After installation, add the SDK plugins to your Bevy app:

```rust
use bevy::prelude::*;
use monoplay_sdk_core::CorePlugin;
use monoplay_sdk_input::InputPlugin;

fn main() {
 App::new()
 .add_plugins(DefaultPlugins)
 .add_plugins(CorePlugin)
 .add_plugins(InputPlugin)
 .run();
}
```

## Dependency Tree

The SDK has minimal external dependencies:

- `bevy` (0.18.x)
- `serde` (serialization)
- `tokio` (async runtime for networking)
- `ethers` (blockchain interaction)

All dependencies are pinned to stable versions for reproducible builds.

## Version Compatibility

| MonoPlay SDK | Bevy Version | Rust Version |
|--------------|--------------|--------------|
| 0.1.x | 0.18.x | 1.75+ |

Breaking changes follow semantic versioning. Minor version updates (0.1.x → 0.2.x) may introduce breaking changes until 1.0 release.

## Verification

Verify installation by running:

```bash
cargo build
cargo test --all-features
```

All SDK crates include integration tests to verify correct setup.

## Next Steps

- [Core Plugin](./core.md) - Application state and asset management
- [Input System](./input.md) - Action-based input handling
- [Physics](./physics.md) - Character controllers and collision

## Troubleshooting

### Compilation Errors

If you encounter errors about mismatched Bevy versions, ensure all dependencies use Bevy 0.18:

```bash
cargo tree | grep bevy
```

### Feature Conflicts

Some features are mutually exclusive. Consult individual plugin documentation for details.

### Platform-Specific Issues

Check the [Platform Support](https://bevyengine.org/learn/book/getting-started/setup/#platform-specific-dependencies) section in the Bevy documentation for platform-specific system dependencies.
