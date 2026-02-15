---
sidebar_position: 8
title: Multiplayer Plugin
---

# Multiplayer Plugin

The `monoplay-sdk-multiplayer` plugin provides client/server networking with state synchronization, lobby management, and matchmaking. Built on reliable UDP with client-side prediction and server reconciliation.

## Installation

```toml
[dependencies]
monoplay-sdk-multiplayer = "0.1"
```

Add to your Bevy app:

```rust
use bevy::prelude::*;
use monoplay_sdk_multiplayer::MultiplayerPlugin;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_plugins(MultiplayerPlugin)
        .run();
}
```

## Client/Server Architecture

### Server Setup

```rust
use monoplay_sdk_multiplayer::{NetworkServer, ServerConfig};

fn start_server(mut commands: Commands) {
    commands.insert_resource(NetworkServer::new(ServerConfig {
        port: 7777,
        max_players: 16,
        tick_rate: 60,
        timeout: 10.0,
        ..default()
    }));
}

fn setup_server(mut commands: Commands) {
    App::new()
        .add_plugins(MinimalPlugins)
        .add_plugins(MultiplayerPlugin::server())
        .add_systems(Startup, start_server)
        .run();
}
```

### Client Setup

```rust
use monoplay_sdk_multiplayer::{NetworkClient, ClientConfig};

fn connect_to_server(mut commands: Commands) {
    commands.insert_resource(NetworkClient::connect(ClientConfig {
        server_address: "127.0.0.1:7777".to_string(),
        timeout: 5.0,
        ..default()
    }));
}

fn setup_client() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_plugins(MultiplayerPlugin::client())
        .add_systems(Startup, connect_to_server)
        .run();
}
```

## Entity Replication

### Networked Entities

```rust
use monoplay_sdk_multiplayer::{Replicated, NetworkId, Ownership};

#[derive(Component)]
struct Player {
    health: f32,
    score: u32,
}

fn spawn_player(mut commands: Commands, server: Res<NetworkServer>) {
    let player_id = server.allocate_network_id();

    commands.spawn((
        Player {
            health: 100.0,
            score: 0,
        },
        Replicated,  // Automatically sync to clients
        NetworkId(player_id),
        Ownership::Server,
        Transform::default(),
        GlobalTransform::default(),
    ));
}
```

### Component Replication

```rust
use monoplay_sdk_multiplayer::{ReplicatedComponent, SyncMode};

#[derive(Component, Serialize, Deserialize)]
struct Position {
    x: f32,
    y: f32,
    z: f32,
}

impl ReplicatedComponent for Position {
    fn sync_mode() -> SyncMode {
        SyncMode::Interpolated {
            buffer_size: 3,
            interpolation_delay: 0.1,
        }
    }
}
```

## State Synchronization

### Server-Authoritative State

```rust
use monoplay_sdk_multiplayer::{ServerState, ClientInput};

fn handle_player_input(
    mut server: ResMut<NetworkServer>,
    mut players: Query<(&mut Transform, &NetworkId), With<Player>>,
) {
    for (client_id, inputs) in server.receive_inputs() {
        if let Some((mut transform, _)) = players
            .iter_mut()
            .find(|(_, id)| id.0 == client_id)
        {
            // Apply client input on server
            for input in inputs {
                apply_movement(&mut transform, &input);
            }
        }
    }
}
```

### Client-Side Prediction

```rust
use monoplay_sdk_multiplayer::{Predicted, InputBuffer};

fn client_prediction(
    mut client: ResMut<NetworkClient>,
    mut query: Query<&mut Transform, With<Predicted>>,
    input: Res<InputState<PlayerAction>>,
) {
    // Send input to server
    let player_input = PlayerInput {
        move_x: input.axis_value(PlayerAxis::MoveX),
        move_z: input.axis_value(PlayerAxis::MoveY),
        jump: input.pressed(PlayerAction::Jump),
    };

    client.send_input(player_input.clone());

    // Predict locally
    for mut transform in query.iter_mut() {
        apply_movement(&mut transform, &player_input);
    }
}
```

### Server Reconciliation

```rust
use monoplay_sdk_multiplayer::{ServerSnapshot, ReconciliationEvent};

fn reconcile_state(
    mut events: EventReader<ReconciliationEvent>,
    mut query: Query<&mut Transform, With<Predicted>>,
) {
    for event in events.read() {
        if let Ok(mut transform) = query.get_mut(event.entity) {
            // Server correction
            *transform = event.server_state.transform;

            // Replay inputs after correction
            for input in &event.pending_inputs {
                apply_movement(&mut transform, input);
            }
        }
    }
}
```

## Lobby System

### Creating Lobbies

```rust
use monoplay_sdk_multiplayer::{Lobby, LobbyManager, LobbySettings};

fn create_lobby(mut manager: ResMut<LobbyManager>) {
    let lobby = manager.create_lobby(LobbySettings {
        name: "My Game Room".to_string(),
        max_players: 4,
        is_private: false,
        map: "arena_1".to_string(),
        game_mode: "deathmatch".to_string(),
    });

    info!("Created lobby: {}", lobby.id);
}
```

### Joining Lobbies

```rust
use monoplay_sdk_multiplayer::LobbyEvent;

fn join_lobby(
    mut manager: ResMut<LobbyManager>,
    lobby_id: LobbyId,
) {
    if let Err(e) = manager.join_lobby(lobby_id) {
        error!("Failed to join lobby: {}", e);
    }
}

fn handle_lobby_events(mut events: EventReader<LobbyEvent>) {
    for event in events.read() {
        match event {
            LobbyEvent::PlayerJoined { lobby_id, player_id } => {
                info!("Player {} joined lobby {}", player_id, lobby_id);
            }
            LobbyEvent::PlayerLeft { lobby_id, player_id } => {
                info!("Player {} left lobby {}", player_id, lobby_id);
            }
            LobbyEvent::LobbyReady { lobby_id } => {
                info!("Lobby {} is ready to start", lobby_id);
            }
        }
    }
}
```

### Lobby Browser

```rust
use monoplay_sdk_multiplayer::LobbyList;

fn display_lobbies(
    manager: Res<LobbyManager>,
    mut ui_state: ResMut<LobbyBrowserUI>,
) {
    let lobbies = manager.get_available_lobbies();

    ui_state.lobbies = lobbies
        .iter()
        .map(|lobby| LobbyListItem {
            id: lobby.id,
            name: lobby.name.clone(),
            players: format!("{}/{}", lobby.current_players, lobby.max_players),
            map: lobby.map.clone(),
        })
        .collect();
}
```

## Matchmaking

### Matchmaking Queue

```rust
use monoplay_sdk_multiplayer::{Matchmaker, MatchmakingConfig};

fn setup_matchmaking(mut commands: Commands) {
    commands.insert_resource(Matchmaker::new(MatchmakingConfig {
        min_players: 2,
        max_players: 8,
        skill_range: 200.0,
        timeout: 60.0,
    }));
}

fn join_queue(mut matchmaker: ResMut<Matchmaker>, player: Res<LocalPlayer>) {
    matchmaker.join_queue(player.id, player.skill_rating);
}
```

### Match Events

```rust
use monoplay_sdk_multiplayer::MatchEvent;

fn handle_match_events(
    mut events: EventReader<MatchEvent>,
    mut state: ResMut<NextState<GameState>>,
) {
    for event in events.read() {
        match event {
            MatchEvent::MatchFound { lobby_id, players } => {
                info!("Match found with {} players", players.len());
                state.set(GameState::Loading);
            }
            MatchEvent::QueueTimeout => {
                warn!("Matchmaking timeout");
            }
        }
    }
}
```

## Network Messages

### Custom Messages

```rust
use monoplay_sdk_multiplayer::{NetworkMessage, Reliability};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
enum GameMessage {
    ChatMessage { sender: String, text: String },
    EmoteTriggered { player_id: u64, emote: String },
    GameEvent { event_type: String, data: Vec<u8> },
}

fn send_chat_message(
    mut client: ResMut<NetworkClient>,
    player: Res<LocalPlayer>,
    text: String,
) {
    let message = GameMessage::ChatMessage {
        sender: player.name.clone(),
        text,
    };

    client.send_message(message, Reliability::ReliableOrdered);
}
```

### Message Handling

```rust
use monoplay_sdk_multiplayer::MessageEvent;

fn handle_messages(
    mut events: EventReader<MessageEvent<GameMessage>>,
    mut chat_log: ResMut<ChatLog>,
) {
    for event in events.read() {
        match &event.message {
            GameMessage::ChatMessage { sender, text } => {
                chat_log.add_message(sender, text);
            }
            GameMessage::EmoteTriggered { player_id, emote } => {
                // Play emote animation
            }
            _ => {}
        }
    }
}
```

## Network Diagnostics

### Connection Stats

```rust
use monoplay_sdk_multiplayer::{NetworkStats, Ping};

fn display_network_stats(stats: Res<NetworkStats>) {
    info!("Ping: {}ms", stats.ping);
    info!("Packet loss: {:.2}%", stats.packet_loss * 100.0);
    info!("Bandwidth: {:.2} KB/s", stats.bandwidth_usage / 1024.0);
}
```

### Lag Compensation

```rust
use monoplay_sdk_multiplayer::LagCompensation;

fn hit_detection(
    lag_comp: Res<LagCompensation>,
    shooter: Query<(&Transform, &NetworkId), With<Player>>,
    targets: Query<(Entity, &Transform, &Hitbox)>,
) {
    for (shooter_transform, shooter_id) in shooter.iter() {
        let client_time = lag_comp.get_client_time(*shooter_id);

        // Rewind target positions to client's view
        for (entity, target_transform, hitbox) in targets.iter() {
            let rewound_pos = lag_comp.rewind_position(entity, client_time);

            if raycast_hits_hitbox(shooter_transform, rewound_pos, hitbox) {
                // Process hit
            }
        }
    }
}
```

## Voice Chat

### Voice Setup

```rust
use monoplay_sdk_multiplayer::VoiceChat;

fn setup_voice(mut commands: Commands) {
    commands.insert_resource(VoiceChat {
        enabled: true,
        push_to_talk: false,
        noise_suppression: true,
        voice_activation_threshold: 0.03,
    });
}
```

### Proximity Voice

```rust
use monoplay_sdk_multiplayer::ProximityVoice;

fn proximity_voice(
    listener: Query<&Transform, With<AudioListener>>,
    speakers: Query<(&Transform, &VoiceSpeaker)>,
) {
    let listener_pos = listener.single().translation;

    for (speaker_pos, voice) in speakers.iter() {
        let distance = listener_pos.distance(speaker_pos.translation);
        let volume = calculate_voice_volume(distance);

        // Adjust voice volume based on distance
    }
}
```

## Relay Servers

### NAT Traversal

```rust
use monoplay_sdk_multiplayer::RelayConfig;

fn setup_relay(mut commands: Commands) {
    commands.insert_resource(RelayConfig {
        relay_servers: vec![
            "relay1.monoplay.xyz:7778".to_string(),
            "relay2.monoplay.xyz:7778".to_string(),
        ],
        use_relay_fallback: true,
        prefer_direct: true,
    });
}
```

## Best Practices

1. **Server Authority**: Server validates all gameplay actions.
2. **Client Prediction**: Predict player movement for responsiveness.
3. **Input Buffering**: Send inputs ahead for smooth movement.
4. **Interpolation**: Smooth remote entity movement between updates.
5. **Bandwidth**: Only replicate changed components, not all state.
6. **Tick Rate**: Balance between smoothness and bandwidth (30-60 ticks/s).
7. **Lag Compensation**: Rewind for hit detection in fast-paced games.
8. **Graceful Degradation**: Handle disconnects and reconnects.

## Network Topology

### Dedicated Server

```
Client 1 ──┐
Client 2 ──┤── Dedicated Server
Client 3 ──┘
```

Recommended for competitive games. Server runs headless, clients connect.

### Listen Server

```
Host (Client + Server) ──┐
Client 2 ──────────────┬─┘
Client 3 ──────────────┘
```

One player hosts. Suitable for co-op games.

## Security

### Anti-Cheat

```rust
use monoplay_sdk_multiplayer::{ServerValidation, CheatDetection};

fn validate_player_movement(
    mut server: ResMut<NetworkServer>,
    mut players: Query<(&Transform, &NetworkId)>,
) {
    for (transform, net_id) in players.iter() {
        if !server.validate_position(net_id, transform.translation) {
            server.kick_player(*net_id, "Invalid movement detected");
        }
    }
}
```

## Next Steps

- [Physics](./physics.md) - Server-side physics simulation
- [Core Plugin](./core.md) - State synchronization
- [Input System](./input.md) - Input buffering
