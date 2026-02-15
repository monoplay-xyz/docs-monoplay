---
sidebar_position: 1
title: SDK Overview
---

# MonoPlay SDK

The MonoPlay SDK is a collection of Bevy 0.18 plugins that provide common game infrastructure for building games on the Monolythium blockchain. These production-ready crates handle everything from input management to blockchain integration, allowing developers to focus on unique game mechanics.

## Architecture

The SDK follows Bevy's plugin architecture. Each crate is a standalone Bevy plugin that can be used independently or combined with others. All plugins integrate seamlessly with Bevy's ECS (Entity Component System) and leverage Bevy's scheduling, resource management, and event systems.

## Available Crates

### Core Infrastructure

**`monoplay-sdk-core`**
Foundation plugin providing application state management, asset loading, save/load systems, and configuration management. This is the base layer used by all other SDK plugins.

**`monoplay-sdk-input`**
Action-based input system with gamepad and keyboard support. Provides rebindable input mappings, input contexts, and dead zone configuration. Designed for cross-platform input handling.

**`monoplay-sdk-physics`**
Physics integration with character controllers, collision detection, gravity systems, and raycasting utilities. Optimized for both 2D platformers and 3D movement.

### UI and Presentation

**`monoplay-sdk-ui`**
Complete UI system with menu management, HUD components, inventory panels, settings interfaces, and dialog boxes. Built on Bevy's UI framework with responsive layouts.

**`monoplay-sdk-audio`**
Spatial audio system with music management, sound effect playback, volume controls, and context-aware audio. Supports 2D and 3D positional audio.

### Multiplayer and Networking

**`monoplay-sdk-multiplayer`**
Client/server networking with state synchronization, lobby management, and matchmaking. Built on reliable UDP with client-side prediction and server reconciliation.

### Blockchain Integration

**`monoplay-sdk-mono`**
Wallet connection, LYTH token queries, NFT ownership verification, and on-chain transaction handling. Connects games to the Monolythium blockchain ecosystem.

### World Generation

**`monoplay-sdk-world`**
Voxel-based world generation with chunk streaming, block type systems, and procedural terrain generation. Optimized for large-scale destructible environments.

## Technology Stack

- **Bevy 0.18**: Modern ECS-based game engine
- **Rust 1.75+**: Systems programming language with memory safety
- **MIT License**: Free for commercial and open source use

## Integration with MonoPlay Forge

Games created with [MonoPlay Forge](../forge/getting-started.md) automatically include the SDK plugins. The Forge templates are pre-configured with sensible defaults, but all SDK features remain accessible for customization.

## Design Philosophy

The MonoPlay SDK follows these principles:

1. **Modular**: Use only what you need. Each plugin is optional.
2. **Composable**: Plugins work together but don't require each other.
3. **Extensible**: Built on Bevy's systems, allowing full customization.
4. **Performance-first**: Optimized for 60+ FPS on target platforms.
5. **Developer-friendly**: Clear APIs with comprehensive documentation.

## Getting Started

To start using the SDK, see the [Installation Guide](./installation.md). For detailed usage of each plugin, refer to the individual crate documentation pages.

## Platform Support

The SDK supports all platforms supported by Bevy 0.18:

- **Desktop**: Windows, macOS, Linux
- **Web**: WebAssembly (WASM)
- **Mobile**: iOS, Android (experimental)

Blockchain features (`monoplay-sdk-mono`) require network connectivity and are not available in offline mode.

## Community and Support

- **GitHub**: [monoplay-xyz/sdk](https://github.com/monoplay-xyz/sdk)
- **Discord**: [MonoPlay Community](https://discord.gg/monolythium)
- **Examples**: Full example games in the SDK repository

## License

All MonoPlay SDK crates are licensed under the MIT License. See [LICENSE](https://github.com/monoplay-xyz/sdk/blob/main/LICENSE) for details.
