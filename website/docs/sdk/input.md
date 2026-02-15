---
sidebar_position: 4
title: Input System
---

# Input System

The `monoplay-sdk-input` plugin provides an action-based input system with gamepad and keyboard support, rebindable mappings, and input contexts. It abstracts raw input into game actions for cross-platform compatibility.

## Installation

```toml
[dependencies]
monoplay-sdk-input = "0.1"
```

Add to your Bevy app:

```rust
use bevy::prelude::*;
use monoplay_sdk_input::InputPlugin;

fn main() {
 App::new()
 .add_plugins(DefaultPlugins)
 .add_plugins(InputPlugin)
 .run();
}
```

## Actions

Define game actions instead of checking raw keys:

```rust
use monoplay_sdk_input::{Action, InputAction};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Reflect)]
pub enum PlayerAction {
 Move,
 Jump,
 Attack,
 Interact,
 Pause,
}

impl InputAction for PlayerAction {
 fn default_bindings() -> Vec<(Self, Vec<InputBinding>)> {
 vec![
 (Self::Jump, vec![
 InputBinding::Key(KeyCode::Space),
 InputBinding::GamepadButton(GamepadButtonType::South),
 ]),
 (Self::Attack, vec![
 InputBinding::Mouse(MouseButton::Left),
 InputBinding::GamepadButton(GamepadButtonType::West),
 ]),
 (Self::Pause, vec![
 InputBinding::Key(KeyCode::Escape),
 InputBinding::GamepadButton(GamepadButtonType::Start),
 ]),
 ]
 }
}
```

## Action States

Query action states in your systems:

```rust
use monoplay_sdk_input::InputState;

fn player_movement(
 input: Res<InputState<PlayerAction>>,
 mut query: Query<&mut Transform, With<Player>>,
 time: Res<Time>,
) {
 let mut transform = query.single_mut();

 // Check if action is currently pressed
 if input.pressed(PlayerAction::Jump) {
 transform.translation.y += 5.0 * time.delta_seconds();
 }

 // Check if action was just pressed this frame
 if input.just_pressed(PlayerAction::Attack) {
 // Trigger attack
 }

 // Check if action was just released
 if input.just_released(PlayerAction::Interact) {
 // End interaction
 }
}
```

## Axis Input

Handle analog input like movement sticks:

```rust
use monoplay_sdk_input::{AxisAction, InputAxis};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Reflect)]
pub enum PlayerAxis {
 MoveX,
 MoveY,
 LookX,
 LookY,
}

impl InputAxis for PlayerAxis {
 fn default_bindings() -> Vec<(Self, AxisBinding)> {
 vec![
 (Self::MoveX, AxisBinding {
 negative: vec![InputBinding::Key(KeyCode::KeyA)],
 positive: vec![InputBinding::Key(KeyCode::KeyD)],
 gamepad_axis: Some(GamepadAxisType::LeftStickX),
 }),
 (Self::MoveY, AxisBinding {
 negative: vec![InputBinding::Key(KeyCode::KeyS)],
 positive: vec![InputBinding::Key(KeyCode::KeyW)],
 gamepad_axis: Some(GamepadAxisType::LeftStickY),
 }),
 ]
 }
}

fn movement_system(
 input: Res<InputState<PlayerAxis>>,
 mut query: Query<&mut Transform, With<Player>>,
 time: Res<Time>,
) {
 let mut transform = query.single_mut();

 let move_x = input.axis_value(PlayerAxis::MoveX);
 let move_y = input.axis_value(PlayerAxis::MoveY);

 let direction = Vec3::new(move_x, 0.0, move_y).normalize_or_zero();
 transform.translation += direction * 10.0 * time.delta_seconds();
}
```

## Input Contexts

Switch between input mappings based on game state:

```rust
use monoplay_sdk_input::{InputContext, ContextManager};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum GameContext {
 Gameplay,
 Menu,
 Dialogue,
 Inventory,
}

fn enter_menu(mut context: ResMut<ContextManager>) {
 context.push(GameContext::Menu);
}

fn exit_menu(mut context: ResMut<ContextManager>) {
 context.pop();
}

// Actions only work in specific contexts
fn menu_navigation(
 input: Res<InputState<MenuAction>>,
 context: Res<ContextManager>,
) {
 if !context.is_active(GameContext::Menu) {
 return;
 }

 if input.just_pressed(MenuAction::Up) {
 // Navigate menu
 }
}
```

## Rebinding

Allow players to rebind controls:

```rust
use monoplay_sdk_input::{InputMapper, RebindEvent};

fn rebind_ui(
 mut mapper: ResMut<InputMapper<PlayerAction>>,
 mut events: EventWriter<RebindEvent>,
) {
 // Start listening for input
 mapper.start_rebind(PlayerAction::Jump);
}

fn handle_rebind(
 mut mapper: ResMut<InputMapper<PlayerAction>>,
 mut events: EventReader<RebindEvent>,
) {
 for event in events.read() {
 match event {
 RebindEvent::Success { action, binding } => {
 info!("Rebound {:?} to {:?}", action, binding);
 mapper.save().ok();
 }
 RebindEvent::Cancelled => {
 warn!("Rebind cancelled");
 }
 }
 }
}
```

## Gamepad Support

### Multiple Gamepads

```rust
use monoplay_sdk_input::{GamepadManager, GamepadId};

fn multiplayer_input(
 gamepads: Res<GamepadManager>,
 input: Res<InputState<PlayerAction>>,
) {
 for (player_id, gamepad_id) in gamepads.active_gamepads() {
 if input.pressed_for_gamepad(PlayerAction::Jump, gamepad_id) {
 // Player-specific jump
 }
 }
}
```

### Gamepad Events

```rust
use monoplay_sdk_input::GamepadEvent;

fn handle_gamepad_events(mut events: EventReader<GamepadEvent>) {
 for event in events.read() {
 match event {
 GamepadEvent::Connected(id) => {
 info!("Gamepad {} connected", id);
 }
 GamepadEvent::Disconnected(id) => {
 warn!("Gamepad {} disconnected", id);
 }
 }
 }
}
```

## Dead Zones

Configure analog stick dead zones:

```rust
use monoplay_sdk_input::DeadZoneSettings;

fn setup_input(mut commands: Commands) {
 commands.insert_resource(DeadZoneSettings {
 inner: 0.15, // Ignore input below 15%
 outer: 0.95, // Max out at 95%
 });
}
```

## Input Buffering

Buffer inputs for precise timing:

```rust
use monoplay_sdk_input::{InputBuffer, BufferSettings};

fn setup_buffer(mut commands: Commands) {
 commands.insert_resource(BufferSettings {
 window: Duration::from_millis(100),
 max_actions: 5,
 });
}

fn consume_buffered_input(
 mut buffer: ResMut<InputBuffer<PlayerAction>>,
) {
 if let Some(action) = buffer.consume(PlayerAction::Attack) {
 // Execute buffered attack
 }
}
```

## Touch Input

Handle touch input on mobile:

```rust
use monoplay_sdk_input::{TouchInput, TouchPhase};

fn touch_system(touch: Res<TouchInput>) {
 for (id, touch_data) in touch.active_touches() {
 match touch_data.phase {
 TouchPhase::Started => {
 // Touch began
 }
 TouchPhase::Moved => {
 let delta = touch_data.delta();
 // Handle drag
 }
 TouchPhase::Ended => {
 // Touch ended
 }
 }
 }
}
```

## Persistence

Input mappings are automatically saved:

```rust
use monoplay_sdk_input::InputConfig;

fn save_input_config(mapper: Res<InputMapper<PlayerAction>>) {
 if let Err(e) = mapper.save() {
 error!("Failed to save input config: {}", e);
 }
}

fn load_input_config(mut mapper: ResMut<InputMapper<PlayerAction>>) {
 if let Err(e) = mapper.load() {
 warn!("Using default input config");
 }
}
```

Config location:
- **Windows**: `%APPDATA%/MonoPlay/<game>/input.json`
- **macOS**: `~/Library/Application Support/MonoPlay/<game>/input.json`
- **Linux**: `~/.local/share/MonoPlay/<game>/input.json`

## Best Practices

1. **Use Actions**: Never check raw keys in gameplay code. Always use actions.
2. **Provide Defaults**: Ensure all actions have sensible default bindings.
3. **Support All Inputs**: Test with keyboard, gamepad, and touch (if applicable).
4. **Context Switching**: Use input contexts to prevent conflicts (gameplay vs menu).
5. **Buffer Important Inputs**: Buffer time-sensitive actions like jumps and attacks.
6. **Test Rebinding**: Ensure all actions can be rebound without conflicts.

## Examples

### Complete Movement System

```rust
use bevy::prelude::*;
use monoplay_sdk_input::*;

#[derive(Component)]
struct Player {
 speed: f32,
}

fn player_movement(
 input: Res<InputState<PlayerAxis>>,
 mut query: Query<(&mut Transform, &Player)>,
 time: Res<Time>,
) {
 for (mut transform, player) in query.iter_mut() {
 let x = input.axis_value(PlayerAxis::MoveX);
 let z = input.axis_value(PlayerAxis::MoveY);

 let movement = Vec3::new(x, 0.0, z).normalize_or_zero();
 transform.translation += movement * player.speed * time.delta_seconds();
 }
}

fn player_actions(
 input: Res<InputState<PlayerAction>>,
 mut query: Query<&mut Player>,
) {
 if input.just_pressed(PlayerAction::Jump) {
 // Trigger jump
 }

 if input.pressed(PlayerAction::Attack) {
 // Charge attack
 }

 if input.just_released(PlayerAction::Attack) {
 // Release attack
 }
}
```

## Next Steps

- [Physics](./physics.md) - Character controllers
- [UI Plugin](./ui.md) - Input-driven menus
- [Core Plugin](./core.md) - State management
