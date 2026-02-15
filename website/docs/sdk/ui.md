---
sidebar_position: 6
title: UI Plugin
---

# UI Plugin

The `monoplay-sdk-ui` plugin provides a complete UI system with menu management, HUD components, inventory panels, settings interfaces, and dialog boxes. Built on Bevy's UI framework with responsive layouts.

## Installation

```toml
[dependencies]
monoplay-sdk-ui = "0.1"
```

Add to your Bevy app:

```rust
use bevy::prelude::*;
use monoplay_sdk_ui::UiPlugin;

fn main() {
 App::new()
 .add_plugins(DefaultPlugins)
 .add_plugins(UiPlugin)
 .run();
}
```

## Menu System

### Main Menu

```rust
use monoplay_sdk_ui::{Menu, MenuBuilder, MenuItem, MenuAction};

fn spawn_main_menu(mut commands: Commands, asset_server: Res<AssetServer>) {
 let font = asset_server.load("fonts/main.ttf");

 MenuBuilder::new("main_menu")
 .title("My Game")
 .font(font.clone())
 .item(MenuItem::button("Play", MenuAction::Custom("start_game")))
 .item(MenuItem::button("Settings", MenuAction::OpenMenu("settings")))
 .item(MenuItem::button("Quit", MenuAction::Quit))
 .background_color(Color::srgba(0.0, 0.0, 0.0, 0.8))
 .build(&mut commands);
}
```

### Menu Navigation

```rust
use monoplay_sdk_ui::{MenuNavigator, NavigationEvent};

fn handle_menu_input(
 input: Res<InputState<MenuAction>>,
 mut navigator: ResMut<MenuNavigator>,
) {
 if input.just_pressed(MenuAction::Up) {
 navigator.move_selection(-1);
 }
 if input.just_pressed(MenuAction::Down) {
 navigator.move_selection(1);
 }
 if input.just_pressed(MenuAction::Confirm) {
 navigator.activate_selected();
 }
}

fn handle_menu_actions(
 mut events: EventReader<NavigationEvent>,
 mut next_state: ResMut<NextState<GameState>>,
) {
 for event in events.read() {
 match event.action.as_str() {
 "start_game" => {
 next_state.set(GameState::Playing);
 }
 "quit" => {
 // Handle quit
 }
 _ => {}
 }
 }
}
```

### Pause Menu

```rust
use monoplay_sdk_ui::PauseMenu;

fn spawn_pause_menu(mut commands: Commands, asset_server: Res<AssetServer>) {
 commands.spawn((
 PauseMenu,
 MenuBuilder::new("pause_menu")
 .title("Paused")
 .item(MenuItem::button("Resume", MenuAction::Resume))
 .item(MenuItem::button("Settings", MenuAction::OpenMenu("settings")))
 .item(MenuItem::button("Main Menu", MenuAction::Custom("main_menu")))
 .build_bundle(),
 ));
}

fn toggle_pause(
 mut commands: Commands,
 input: Res<InputState<PlayerAction>>,
 pause_query: Query<Entity, With<PauseMenu>>,
 asset_server: Res<AssetServer>,
) {
 if input.just_pressed(PlayerAction::Pause) {
 if let Ok(entity) = pause_query.get_single() {
 commands.entity(entity).despawn_recursive();
 } else {
 spawn_pause_menu(commands, asset_server);
 }
 }
}
```

## HUD Components

### Health Bar

```rust
use monoplay_sdk_ui::{HealthBar, BarStyle};

#[derive(Component)]
struct Player {
 health: f32,
 max_health: f32,
}

fn spawn_health_bar(mut commands: Commands) {
 commands.spawn((
 HealthBar {
 current: 100.0,
 maximum: 100.0,
 },
 BarStyle {
 width: 200.0,
 height: 20.0,
 fill_color: Color::srgb(0.8, 0.0, 0.0),
 background_color: Color::srgb(0.2, 0.0, 0.0),
 border_color: Color::srgb(1.0, 1.0, 1.0),
 border_width: 2.0,
 },
 Node {
 position_type: PositionType::Absolute,
 left: Val::Px(20.0),
 top: Val::Px(20.0),
 ..default()
 },
 ));
}

fn update_health_bar(
 player: Query<&Player>,
 mut health_bar: Query<&mut HealthBar>,
) {
 if let Ok(player) = player.get_single() {
 if let Ok(mut bar) = health_bar.get_single_mut() {
 bar.current = player.health;
 bar.maximum = player.max_health;
 }
 }
}
```

### Hotbar

```rust
use monoplay_sdk_ui::{Hotbar, HotbarSlot};

fn spawn_hotbar(mut commands: Commands, asset_server: Res<AssetServer>) {
 let slots = (0..9)
 .map(|i| HotbarSlot {
 index: i,
 item: None,
 icon: None,
 keybind: Some(format!("{}", i + 1)),
 })
 .collect();

 commands.spawn((
 Hotbar { slots },
 Node {
 position_type: PositionType::Absolute,
 bottom: Val::Px(20.0),
 left: Val::Percent(50.0),
 ..default()
 },
 ));
}
```

### Text Display

```rust
use monoplay_sdk_ui::{HudText, TextAnimation};

fn spawn_score_display(mut commands: Commands, asset_server: Res<AssetServer>) {
 commands.spawn((
 HudText {
 text: "Score: 0".to_string(),
 font: asset_server.load("fonts/main.ttf"),
 font_size: 32.0,
 color: Color::WHITE,
 },
 Node {
 position_type: PositionType::Absolute,
 top: Val::Px(20.0),
 right: Val::Px(20.0),
 ..default()
 },
 ));
}

fn update_score(
 score: Res<GameScore>,
 mut query: Query<&mut HudText, With<ScoreDisplay>>,
) {
 if let Ok(mut text) = query.get_single_mut() {
 text.text = format!("Score: {}", score.value);
 }
}
```

## Inventory System

### Inventory UI

```rust
use monoplay_sdk_ui::{InventoryPanel, GridLayout, InventorySlot};

#[derive(Component)]
struct Inventory {
 items: Vec<Option<Item>>,
 capacity: usize,
}

fn spawn_inventory_ui(mut commands: Commands) {
 commands.spawn((
 InventoryPanel,
 GridLayout {
 columns: 5,
 rows: 4,
 spacing: 10.0,
 },
 Node {
 width: Val::Px(500.0),
 height: Val::Px(400.0),
 position_type: PositionType::Absolute,
 left: Val::Percent(50.0),
 top: Val::Percent(50.0),
 ..default()
 },
 ));
}

fn toggle_inventory(
 mut commands: Commands,
 input: Res<InputState<PlayerAction>>,
 query: Query<Entity, With<InventoryPanel>>,
) {
 if input.just_pressed(PlayerAction::Inventory) {
 if let Ok(entity) = query.get_single() {
 commands.entity(entity).despawn_recursive();
 } else {
 spawn_inventory_ui(commands);
 }
 }
}
```

### Drag and Drop

```rust
use monoplay_sdk_ui::{Draggable, DropTarget, DragEvent};

fn handle_item_drag(
 mut events: EventReader<DragEvent>,
 mut inventory: Query<&mut Inventory>,
) {
 for event in events.read() {
 match event {
 DragEvent::Started { source, .. } => {
 // Item pickup animation
 }
 DragEvent::Dropped { source, target } => {
 // Swap items
 if let Ok(mut inv) = inventory.get_single_mut() {
 inv.items.swap(*source, *target);
 }
 }
 DragEvent::Cancelled { .. } => {
 // Return item to original slot
 }
 }
 }
}
```

## Dialog System

### Simple Dialog

```rust
use monoplay_sdk_ui::{DialogBox, DialogBuilder};

fn show_dialog(mut commands: Commands, asset_server: Res<AssetServer>) {
 DialogBuilder::new()
 .speaker("Village Elder")
 .text("Welcome to our village, brave traveler!")
 .portrait(asset_server.load("portraits/elder.png"))
 .next_action(|| {
 // Advance to next dialog
 })
 .build(&mut commands);
}
```

### Branching Dialog

```rust
use monoplay_sdk_ui::{DialogChoice, DialogTree};

fn show_choice_dialog(mut commands: Commands) {
 DialogBuilder::new()
 .speaker("Merchant")
 .text("Would you like to buy or sell?")
 .choice("Buy", || {
 // Open shop UI
 })
 .choice("Sell", || {
 // Open sell UI
 })
 .choice("Leave", || {
 // Close dialog
 })
 .build(&mut commands);
}
```

## Settings UI

### Settings Panel

```rust
use monoplay_sdk_ui::{SettingsPanel, SettingWidget};

fn spawn_settings_menu(mut commands: Commands) {
 commands.spawn((
 SettingsPanel,
 MenuBuilder::new("settings")
 .title("Settings")
 .item(SettingWidget::Slider {
 label: "Master Volume",
 min: 0.0,
 max: 1.0,
 value: 0.8,
 callback: Box::new(|value| {
 // Update volume
 }),
 })
 .item(SettingWidget::Toggle {
 label: "Fullscreen",
 value: false,
 callback: Box::new(|enabled| {
 // Toggle fullscreen
 }),
 })
 .item(SettingWidget::Dropdown {
 label: "Resolution",
 options: vec!["1920x1080", "1280x720", "800x600"],
 selected: 0,
 callback: Box::new(|index| {
 // Change resolution
 }),
 })
 .build_bundle(),
 ));
}
```

## Tooltips

### Hover Tooltips

```rust
use monoplay_sdk_ui::{Tooltip, TooltipTrigger};

fn spawn_item_with_tooltip(mut commands: Commands) {
 commands.spawn((
 ItemSlot,
 TooltipTrigger {
 text: "Iron Sword\n+10 Attack\nA sturdy blade".to_string(),
 delay: 0.5,
 },
 ));
}

fn show_tooltips(
 mut commands: Commands,
 query: Query<(&Interaction, &TooltipTrigger), Changed<Interaction>>,
 time: Res<Time>,
) {
 for (interaction, trigger) in query.iter() {
 if *interaction == Interaction::Hovered {
 // Show tooltip after delay
 }
 }
}
```

## Notifications

### Toast Messages

```rust
use monoplay_sdk_ui::{Toast, ToastType, ToastManager};

fn show_notification(mut toasts: ResMut<ToastManager>) {
 toasts.show(Toast {
 message: "Item acquired!".to_string(),
 toast_type: ToastType::Success,
 duration: 3.0,
 });

 toasts.show(Toast {
 message: "Not enough gold!".to_string(),
 toast_type: ToastType::Error,
 duration: 2.0,
 });
}
```

## Responsive Layout

### Auto-Scaling

```rust
use monoplay_sdk_ui::{ResponsiveLayout, ScaleMode};

fn setup_responsive_ui(mut commands: Commands) {
 commands.insert_resource(ResponsiveLayout {
 reference_width: 1920.0,
 reference_height: 1080.0,
 scale_mode: ScaleMode::MatchHeight,
 });
}
```

### Anchoring

```rust
use monoplay_sdk_ui::Anchor;

fn spawn_anchored_ui(mut commands: Commands) {
 // Top-left corner
 commands.spawn(Node {
 position_type: PositionType::Absolute,
 left: Val::Px(10.0),
 top: Val::Px(10.0),
 ..default()
 });

 // Bottom-right corner
 commands.spawn(Node {
 position_type: PositionType::Absolute,
 right: Val::Px(10.0),
 bottom: Val::Px(10.0),
 ..default()
 });

 // Centered
 commands.spawn(Node {
 position_type: PositionType::Absolute,
 left: Val::Percent(50.0),
 top: Val::Percent(50.0),
 margin: UiRect::all(Val::Auto),
 ..default()
 });
}
```

## Styling

### Theme System

```rust
use monoplay_sdk_ui::{Theme, ThemeColors};

fn setup_theme(mut commands: Commands) {
 commands.insert_resource(Theme {
 colors: ThemeColors {
 primary: Color::srgb(0.2, 0.6, 0.8),
 secondary: Color::srgb(0.8, 0.6, 0.2),
 background: Color::srgba(0.0, 0.0, 0.0, 0.8),
 text: Color::WHITE,
 success: Color::srgb(0.0, 0.8, 0.0),
 error: Color::srgb(0.8, 0.0, 0.0),
 },
 font_size_normal: 16.0,
 font_size_large: 24.0,
 font_size_small: 12.0,
 });
}
```

## Best Practices

1. **State-Based UI**: Spawn/despawn UI based on game state.
2. **Event-Driven**: Use events for menu actions, don't poll.
3. **Responsive Design**: Support multiple resolutions with anchoring.
4. **Accessibility**: Ensure keyboard/gamepad navigation works.
5. **Performance**: Despawn unused UI to reduce entity count.
6. **Styling**: Use themes for consistent appearance.

## Next Steps

- [Input System](./input.md) - Menu navigation
- [Audio Plugin](./audio.md) - UI sound effects
- [Core Plugin](./core.md) - State management
