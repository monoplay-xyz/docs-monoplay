---
sidebar_position: 7
title: Audio Plugin
---

# Audio Plugin

The `monoplay-sdk-audio` plugin provides spatial audio, music management, sound effect playback, volume controls, and context-aware audio. Supports both 2D and 3D positional audio with automatic attenuation.

## Installation

```toml
[dependencies]
monoplay-sdk-audio = "0.1"
```

Add to your Bevy app:

```rust
use bevy::prelude::*;
use monoplay_sdk_audio::AudioPlugin;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_plugins(AudioPlugin)
        .run();
}
```

## Music System

### Background Music

```rust
use monoplay_sdk_audio::{MusicController, MusicTrack};

fn play_menu_music(
    mut music: ResMut<MusicController>,
    asset_server: Res<AssetServer>,
) {
    let track = MusicTrack {
        audio: asset_server.load("music/menu_theme.ogg"),
        volume: 0.7,
        fade_in: Some(2.0),
        looping: true,
    };

    music.play(track);
}

fn stop_music(mut music: ResMut<MusicController>) {
    music.stop_with_fade(1.5);
}
```

### Crossfade

```rust
use monoplay_sdk_audio::CrossfadeSettings;

fn change_music(
    mut music: ResMut<MusicController>,
    asset_server: Res<AssetServer>,
) {
    let new_track = MusicTrack {
        audio: asset_server.load("music/battle_theme.ogg"),
        volume: 0.8,
        fade_in: Some(1.0),
        looping: true,
    };

    music.crossfade(new_track, CrossfadeSettings {
        duration: 2.0,
        curve: FadeCurve::EaseInOut,
    });
}
```

### Layered Music

```rust
use monoplay_sdk_audio::{MusicLayer, LayeredMusic};

fn setup_layered_music(
    mut commands: Commands,
    asset_server: Res<AssetServer>,
) {
    let base_layer = MusicLayer {
        audio: asset_server.load("music/ambient_base.ogg"),
        volume: 0.8,
        name: "base".to_string(),
    };

    let combat_layer = MusicLayer {
        audio: asset_server.load("music/combat_layer.ogg"),
        volume: 0.0,  // Start muted
        name: "combat".to_string(),
    };

    commands.spawn(LayeredMusic {
        layers: vec![base_layer, combat_layer],
        sync: true,  // Keep layers synchronized
    });
}

fn trigger_combat_music(mut music: Query<&mut LayeredMusic>) {
    if let Ok(mut layered) = music.get_single_mut() {
        layered.fade_layer("combat", 1.0, 2.0);  // Fade in over 2s
    }
}
```

## Sound Effects

### One-Shot Sounds

```rust
use monoplay_sdk_audio::{SoundEffects, SfxSettings};

fn play_jump_sound(
    sfx: Res<SoundEffects>,
    asset_server: Res<AssetServer>,
) {
    sfx.play(
        asset_server.load("sfx/jump.ogg"),
        SfxSettings {
            volume: 0.5,
            pitch: 1.0,
            spatial: false,
            ..default()
        },
    );
}
```

### Randomized Sounds

```rust
use monoplay_sdk_audio::RandomSoundPool;

fn setup_footstep_sounds(
    mut commands: Commands,
    asset_server: Res<AssetServer>,
) {
    let footsteps = RandomSoundPool {
        sounds: vec![
            asset_server.load("sfx/footstep_1.ogg"),
            asset_server.load("sfx/footstep_2.ogg"),
            asset_server.load("sfx/footstep_3.ogg"),
        ],
        pitch_variation: 0.1,
        volume_variation: 0.05,
    };

    commands.insert_resource(footsteps);
}

fn play_footstep(
    sfx: Res<SoundEffects>,
    pool: Res<RandomSoundPool>,
) {
    let (sound, settings) = pool.get_random();
    sfx.play(sound, settings);
}
```

## Spatial Audio

### 3D Positional Sound

```rust
use monoplay_sdk_audio::{SpatialAudioSource, AudioEmitter};

fn spawn_fire(mut commands: Commands, asset_server: Res<AssetServer>) {
    commands.spawn((
        AudioEmitter {
            audio: asset_server.load("sfx/fire_crackling.ogg"),
            volume: 1.0,
            looping: true,
            attenuation: Attenuation {
                max_distance: 20.0,
                reference_distance: 1.0,
                rolloff: 1.0,
            },
        },
        Transform::from_xyz(10.0, 0.0, 5.0),
        GlobalTransform::default(),
    ));
}
```

### Audio Listener

```rust
use monoplay_sdk_audio::AudioListener;

fn spawn_player(mut commands: Commands) {
    commands.spawn((
        Player,
        AudioListener::default(),  // Attach to camera or player
        Transform::default(),
        GlobalTransform::default(),
    ));
}

fn update_listener(
    camera: Query<&Transform, With<Camera>>,
    mut listener: Query<&mut Transform, With<AudioListener>>,
) {
    if let Ok(camera_transform) = camera.get_single() {
        if let Ok(mut listener_transform) = listener.get_single_mut() {
            *listener_transform = *camera_transform;
        }
    }
}
```

### Distance Attenuation

```rust
use monoplay_sdk_audio::{Attenuation, AttenuationCurve};

fn create_distant_sound(
    mut commands: Commands,
    asset_server: Res<AssetServer>,
) {
    commands.spawn((
        AudioEmitter {
            audio: asset_server.load("sfx/distant_bells.ogg"),
            volume: 1.0,
            looping: true,
            attenuation: Attenuation {
                max_distance: 100.0,
                reference_distance: 10.0,
                rolloff: 2.0,  // Faster falloff
                curve: AttenuationCurve::Logarithmic,
            },
        },
        Transform::from_xyz(0.0, 0.0, 50.0),
    ));
}
```

## Volume Control

### Master Volume

```rust
use monoplay_sdk_audio::{AudioSettings, VolumeChannels};

fn setup_audio(mut commands: Commands) {
    commands.insert_resource(AudioSettings {
        master_volume: 1.0,
        channels: VolumeChannels {
            music: 0.7,
            sfx: 0.8,
            voice: 1.0,
            ambient: 0.5,
        },
    });
}

fn update_master_volume(
    mut settings: ResMut<AudioSettings>,
    input: Res<InputState<PlayerAction>>,
) {
    if input.just_pressed(PlayerAction::VolumeUp) {
        settings.master_volume = (settings.master_volume + 0.1).min(1.0);
    }
    if input.just_pressed(PlayerAction::VolumeDown) {
        settings.master_volume = (settings.master_volume - 0.1).max(0.0);
    }
}
```

### Per-Channel Volume

```rust
fn toggle_music(
    mut settings: ResMut<AudioSettings>,
    keyboard: Res<ButtonInput<KeyCode>>,
) {
    if keyboard.just_pressed(KeyCode::KeyM) {
        settings.channels.music = if settings.channels.music > 0.0 {
            0.0
        } else {
            0.7
        };
    }
}
```

## Context-Aware Audio

### Ambient Zones

```rust
use monoplay_sdk_audio::{AmbientZone, ZoneTrigger};

#[derive(Component)]
struct ForestAmbience;

fn setup_forest_zone(
    mut commands: Commands,
    asset_server: Res<AssetServer>,
) {
    commands.spawn((
        ForestAmbience,
        AmbientZone {
            audio: asset_server.load("ambient/forest.ogg"),
            volume: 0.6,
            fade_in: 2.0,
            fade_out: 2.0,
        },
        ZoneTrigger {
            center: Vec3::new(0.0, 0.0, 0.0),
            radius: 30.0,
        },
        Transform::default(),
    ));
}
```

### Dynamic Mixing

```rust
use monoplay_sdk_audio::AudioMixer;

fn update_audio_intensity(
    mut mixer: ResMut<AudioMixer>,
    combat_state: Res<CombatState>,
) {
    let intensity = combat_state.danger_level;

    mixer.set_layer_volume("ambient", 1.0 - intensity);
    mixer.set_layer_volume("combat", intensity);
}
```

## Audio Events

### Sound Triggers

```rust
use monoplay_sdk_audio::AudioEvent;

fn trigger_sounds(
    mut events: EventWriter<AudioEvent>,
    asset_server: Res<AssetServer>,
) {
    events.send(AudioEvent::PlaySfx {
        audio: asset_server.load("sfx/explosion.ogg"),
        position: Some(Vec3::new(5.0, 0.0, 0.0)),
        volume: 1.0,
    });

    events.send(AudioEvent::PlayMusic {
        track: asset_server.load("music/victory.ogg"),
        fade_in: Some(1.0),
    });
}
```

## Voice Lines

### Dialog Audio

```rust
use monoplay_sdk_audio::{VoiceLine, VoiceSettings};

fn play_dialog(
    sfx: Res<SoundEffects>,
    asset_server: Res<AssetServer>,
) {
    let voice = VoiceLine {
        audio: asset_server.load("voice/npc_greeting.ogg"),
        speaker: "Village Elder".to_string(),
        subtitle: Some("Welcome, traveler!".to_string()),
        interrupt_previous: true,
    };

    sfx.play_voice(voice, VoiceSettings {
        volume: 1.0,
        channel: VoiceChannel::Dialog,
    });
}
```

## Audio Analysis

### Beat Detection

```rust
use monoplay_sdk_audio::{BeatDetector, BeatEvent};

fn setup_beat_detection(mut commands: Commands) {
    commands.spawn(BeatDetector {
        threshold: 1.5,
        cooldown: 0.1,
    });
}

fn on_beat(
    mut events: EventReader<BeatEvent>,
    mut lights: Query<&mut PointLight>,
) {
    for event in events.read() {
        for mut light in lights.iter_mut() {
            light.intensity = 1000.0 * event.strength;
        }
    }
}
```

### Spectrum Analysis

```rust
use monoplay_sdk_audio::{SpectrumAnalyzer, FrequencyBand};

fn visualize_audio(
    analyzer: Res<SpectrumAnalyzer>,
    mut bars: Query<(&mut Transform, &FrequencyBand)>,
) {
    for (mut transform, band) in bars.iter_mut() {
        let amplitude = analyzer.get_band(*band);
        transform.scale.y = 1.0 + amplitude * 10.0;
    }
}
```

## Performance

### Audio Streaming

```rust
use monoplay_sdk_audio::StreamingAudio;

fn load_large_audio(
    mut commands: Commands,
    asset_server: Res<AssetServer>,
) {
    // Stream large files instead of loading into memory
    commands.spawn((
        StreamingAudio {
            path: "music/long_track.ogg".to_string(),
            buffer_size: 4096,
        },
        MusicTrack::default(),
    ));
}
```

### Audio Pooling

```rust
use monoplay_sdk_audio::AudioPool;

fn setup_audio_pool(mut commands: Commands) {
    commands.insert_resource(AudioPool {
        max_concurrent_sounds: 32,
        priority_system: true,
    });
}
```

## Platform Support

### WebAssembly

```rust
#[cfg(target_arch = "wasm32")]
use monoplay_sdk_audio::WebAudioContext;

fn setup_web_audio(mut commands: Commands) {
    commands.insert_resource(WebAudioContext {
        // Web Audio API specific settings
        latency_hint: LatencyHint::Interactive,
    });
}
```

### Mobile

```rust
#[cfg(any(target_os = "ios", target_os = "android"))]
use monoplay_sdk_audio::MobileAudioSettings;

fn setup_mobile_audio(mut commands: Commands) {
    commands.insert_resource(MobileAudioSettings {
        interrupt_handler: true,  // Handle phone calls
        background_audio: false,  // Pause when app backgrounded
    });
}
```

## Best Practices

1. **Preload Sounds**: Load frequently used SFX during loading screen.
2. **Pool Sounds**: Limit concurrent sounds to prevent audio clipping.
3. **Use Streaming**: Stream music and long ambient tracks.
4. **Spatial Falloff**: Set appropriate max distance to reduce processing.
5. **Volume Normalization**: Ensure all audio assets have consistent levels.
6. **Format Choice**: Use OGG for music, WAV for short SFX.
7. **Ducking**: Lower music volume during dialog/important SFX.

## Supported Formats

- **OGG Vorbis**: Recommended for music (compressed, looping support)
- **WAV**: Recommended for SFX (uncompressed, low latency)
- **MP3**: Supported with feature flag (patent-free since 2017)
- **FLAC**: Lossless compression (feature flag required)

## Next Steps

- [UI Plugin](/docs/sdk/ui) - UI sound effects
- [Core Plugin](/docs/sdk/core) - Audio settings persistence
- [World Plugin](/docs/sdk/world) - Environmental audio
