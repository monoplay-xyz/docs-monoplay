---
sidebar_position: 3
title: Core Plugin
---

# Core Plugin

The `monoplay-sdk-core` plugin provides the foundational systems for MonoPlay games: application state management, asset loading, save/load systems, and configuration.

## Installation

```toml
[dependencies]
monoplay-sdk-core = "0.1"
```

Add to your Bevy app:

```rust
use bevy::prelude::*;
use monoplay_sdk_core::CorePlugin;

fn main() {
 App::new()
 .add_plugins(DefaultPlugins)
 .add_plugins(CorePlugin)
 .run();
}
```

## Application States

The core plugin defines standard game states using Bevy's state system:

```rust
use monoplay_sdk_core::GameState;

#[derive(Debug, Clone, Copy, Default, Eq, PartialEq, Hash, States)]
pub enum GameState {
 #[default]
 Loading, // Initial asset loading
 MainMenu, // Main menu
 Playing, // Active gameplay
 Paused, // Game paused
 GameOver, // End state
}
```

### State Transitions

Transition between states using Bevy's `NextState`:

```rust
fn start_game(mut next_state: ResMut<NextState<GameState>>) {
 next_state.set(GameState::Playing);
}

fn pause_game(
 keyboard: Res<ButtonInput<KeyCode>>,
 mut next_state: ResMut<NextState<GameState>>,
) {
 if keyboard.just_pressed(KeyCode::Escape) {
 next_state.set(GameState::Paused);
 }
}
```

### State-Conditional Systems

Run systems only in specific states:

```rust
app.add_systems(Update, update_player.run_if(in_state(GameState::Playing)));
app.add_systems(OnEnter(GameState::MainMenu), setup_main_menu);
app.add_systems(OnExit(GameState::Playing), cleanup_game);
```

## Asset Loading

### Loading Screen

The core plugin provides a built-in loading screen:

```rust
use monoplay_sdk_core::{AssetLoader, LoadingAssets};

fn setup_assets(
 mut loader: ResMut<AssetLoader>,
 asset_server: Res<AssetServer>,
) {
 loader.add(asset_server.load("textures/player.png"));
 loader.add(asset_server.load("audio/music.ogg"));
 loader.add(asset_server.load("fonts/main.ttf"));
}
```

The plugin automatically transitions from `GameState::Loading` to `GameState::MainMenu` when all assets finish loading.

### Asset Collections

Organize related assets into collections:

```rust
use monoplay_sdk_core::AssetCollection;

#[derive(Resource)]
struct PlayerAssets {
 texture: Handle<Image>,
 walk_animation: Handle<AnimationClip>,
 jump_sound: Handle<AudioSource>,
}

impl AssetCollection for PlayerAssets {
 fn load(asset_server: &AssetServer) -> Self {
 Self {
 texture: asset_server.load("player/texture.png"),
 walk_animation: asset_server.load("player/walk.anim"),
 jump_sound: asset_server.load("player/jump.ogg"),
 }
 }
}

// Register the collection
app.init_asset_collection::<PlayerAssets>();
```

## Save System

### Persistent Data

Mark components for automatic saving:

```rust
use monoplay_sdk_core::Persistent;
use serde::{Deserialize, Serialize};

#[derive(Component, Serialize, Deserialize)]
#[component(storage = "SparseSet")]
struct PlayerProgress {
 level: u32,
 score: u64,
 inventory: Vec<String>,
}

// Spawn with Persistent marker
commands.spawn((
 PlayerProgress {
 level: 1,
 score: 0,
 inventory: vec![],
 },
 Persistent, // Marks for auto-save
));
```

### Save Operations

```rust
use monoplay_sdk_core::{SaveSystem, SaveSlot};

fn save_game(save_system: Res<SaveSystem>) {
 if let Err(e) = save_system.save(SaveSlot::Auto) {
 error!("Save failed: {}", e);
 }
}

fn load_game(save_system: Res<SaveSystem>) {
 if let Err(e) = save_system.load(SaveSlot::Auto) {
 warn!("No save file found");
 }
}
```

### Save Slots

Multiple save slots are supported:

```rust
pub enum SaveSlot {
 Auto, // Auto-save slot
 Manual(u8), // Manual save (0-9)
 Quicksave, // Quick save slot
}

// Save to slot 1
save_system.save(SaveSlot::Manual(1))?;

// Load from quick save
save_system.load(SaveSlot::Quicksave)?;
```

### Save Location

Save files are stored in platform-specific directories:

- **Windows**: `%APPDATA%/MonoPlay/<game_name>/saves/`
- **macOS**: `~/Library/Application Support/MonoPlay/<game_name>/saves/`
- **Linux**: `~/.local/share/MonoPlay/<game_name>/saves/`

## Configuration

### Game Config

Define game-wide configuration:

```rust
use monoplay_sdk_core::GameConfig;
use serde::{Deserialize, Serialize};

#[derive(Resource, Serialize, Deserialize)]
struct MyGameConfig {
 #[serde(default = "default_difficulty")]
 difficulty: Difficulty,
 #[serde(default = "default_volume")]
 master_volume: f32,
}

fn default_difficulty() -> Difficulty {
 Difficulty::Normal
}

fn default_volume() -> f32 {
 0.8
}

// Load config on startup
app.add_systems(Startup, load_config);

fn load_config(mut commands: Commands) {
 let config = MyGameConfig::load()
 .unwrap_or_else(|_| MyGameConfig::default());
 commands.insert_resource(config);
}
```

### Config Persistence

Configurations are automatically saved when modified:

```rust
fn update_volume(
 mut config: ResMut<MyGameConfig>,
 keyboard: Res<ButtonInput<KeyCode>>,
) {
 if keyboard.just_pressed(KeyCode::Plus) {
 config.master_volume = (config.master_volume + 0.1).min(1.0);
 config.save().ok(); // Persist to disk
 }
}
```

## Utilities

### Time Management

```rust
use monoplay_sdk_core::GameTime;

fn update_timer(time: Res<GameTime>) {
 let delta = time.delta_seconds();
 let elapsed = time.elapsed_seconds();

 // Game time respects pause state
 println!("Delta: {}, Total: {}", delta, elapsed);
}
```

### Screen Management

```rust
use monoplay_sdk_core::ScreenManager;

fn toggle_fullscreen(
 mut screen: ResMut<ScreenManager>,
 keyboard: Res<ButtonInput<KeyCode>>,
) {
 if keyboard.just_pressed(KeyCode::F11) {
 screen.toggle_fullscreen();
 }
}
```

## Events

The core plugin emits lifecycle events:

```rust
use monoplay_sdk_core::{StateChangeEvent, SaveEvent};

fn on_state_change(mut events: EventReader<StateChangeEvent>) {
 for event in events.read() {
 info!("State changed: {:?} -> {:?}", event.from, event.to);
 }
}

fn on_save(mut events: EventReader<SaveEvent>) {
 for event in events.read() {
 info!("Game saved to slot: {:?}", event.slot);
 }
}
```

## Best Practices

1. **State Design**: Keep state enums simple. Use resources for complex state data.
2. **Asset Loading**: Load all critical assets during `GameState::Loading`.
3. **Save Frequently**: Auto-save at checkpoints, manual save on request.
4. **Config Validation**: Always provide sensible defaults for config values.
5. **Error Handling**: Log errors but don't crash on save/load failures.

## Next Steps

- [Input System](./input.md) - Handle player input
- [UI Plugin](./ui.md) - Build menus and HUD
- [Physics](./physics.md) - Add character movement
