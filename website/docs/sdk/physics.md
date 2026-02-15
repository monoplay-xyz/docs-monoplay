---
sidebar_position: 5
title: Physics
---

# Physics Plugin

The `monoplay-sdk-physics` plugin provides character controllers, collision detection, gravity systems, and raycasting utilities. Optimized for both 2D platformers and 3D movement-based games.

## Installation

```toml
[dependencies]
monoplay-sdk-physics = "0.1"
```

Add to your Bevy app:

```rust
use bevy::prelude::*;
use monoplay_sdk_physics::PhysicsPlugin;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_plugins(PhysicsPlugin)
        .run();
}
```

## Character Controllers

### 3D Character Controller

```rust
use monoplay_sdk_physics::{CharacterController, ControllerSettings};

#[derive(Component)]
struct Player;

fn spawn_player(mut commands: Commands) {
    commands.spawn((
        Player,
        CharacterController {
            radius: 0.5,
            height: 2.0,
            step_height: 0.4,
            slope_limit: 45.0,
            ..default()
        },
        ControllerSettings {
            gravity: -20.0,
            max_speed: 10.0,
            acceleration: 50.0,
            friction: 0.8,
            ..default()
        },
        Transform::from_xyz(0.0, 5.0, 0.0),
        GlobalTransform::default(),
    ));
}
```

### Movement

```rust
use monoplay_sdk_physics::{CharacterVelocity, GroundState};

fn move_player(
    input: Res<InputState<PlayerAxis>>,
    mut query: Query<(&mut CharacterVelocity, &GroundState), With<Player>>,
    time: Res<Time>,
) {
    for (mut velocity, ground) in query.iter_mut() {
        let move_x = input.axis_value(PlayerAxis::MoveX);
        let move_z = input.axis_value(PlayerAxis::MoveY);

        let movement = Vec3::new(move_x, 0.0, move_z);

        velocity.linear.x = movement.x * 10.0;
        velocity.linear.z = movement.z * 10.0;

        // Jump only when grounded
        if input.just_pressed(PlayerAction::Jump) && ground.is_grounded {
            velocity.linear.y = 8.0;
        }
    }
}
```

### Ground Detection

```rust
use monoplay_sdk_physics::GroundState;

fn check_landing(
    mut query: Query<(&GroundState, &mut Player), Changed<GroundState>>,
) {
    for (ground, mut player) in query.iter_mut() {
        if ground.just_landed {
            // Play landing animation/sound
        }

        if ground.just_left_ground {
            // Start falling animation
        }
    }
}
```

## Collision Detection

### Colliders

```rust
use monoplay_sdk_physics::{Collider, CollisionGroups};

fn spawn_wall(mut commands: Commands) {
    commands.spawn((
        Collider::Box {
            width: 10.0,
            height: 5.0,
            depth: 1.0,
        },
        CollisionGroups {
            memberships: 0b0001,  // Layer 0
            filters: 0b1111,      // Collides with all layers
        },
        Transform::from_xyz(0.0, 2.5, 0.0),
        GlobalTransform::default(),
    ));
}

fn spawn_trigger(mut commands: Commands) {
    commands.spawn((
        Collider::Sphere { radius: 2.0 },
        Sensor,  // Trigger, not solid
        Transform::from_xyz(5.0, 0.0, 5.0),
        GlobalTransform::default(),
    ));
}
```

### Collision Events

```rust
use monoplay_sdk_physics::{CollisionEvent, ContactEvent};

fn handle_collisions(mut events: EventReader<CollisionEvent>) {
    for event in events.read() {
        match event {
            CollisionEvent::Started(e1, e2) => {
                info!("Collision started: {:?} with {:?}", e1, e2);
            }
            CollisionEvent::Stopped(e1, e2) => {
                info!("Collision ended: {:?} with {:?}", e1, e2);
            }
        }
    }
}

fn handle_triggers(
    mut events: EventReader<ContactEvent>,
    players: Query<&Player>,
    triggers: Query<&TriggerZone>,
) {
    for event in events.read() {
        if players.contains(event.entity1) && triggers.contains(event.entity2) {
            // Player entered trigger zone
        }
    }
}
```

## Raycasting

### Basic Raycast

```rust
use monoplay_sdk_physics::{RaycastQuery, RaycastHit};

fn aim_system(
    raycast: Res<RaycastQuery>,
    query: Query<&Transform, With<Player>>,
) {
    let transform = query.single();

    let origin = transform.translation;
    let direction = transform.forward();
    let max_distance = 100.0;

    if let Some(hit) = raycast.cast_ray(origin, direction, max_distance) {
        info!("Hit entity {:?} at distance {}", hit.entity, hit.distance);
        info!("Hit point: {:?}", hit.point);
        info!("Hit normal: {:?}", hit.normal);
    }
}
```

### Filtered Raycast

```rust
use monoplay_sdk_physics::{RaycastFilter, QueryFilter};

fn raycast_enemies(
    raycast: Res<RaycastQuery>,
    player_transform: Query<&Transform, With<Player>>,
) {
    let transform = player_transform.single();

    let filter = QueryFilter {
        groups: Some(CollisionGroups {
            memberships: 0b0010,  // Only hit layer 1 (enemies)
            filters: 0b0010,
        }),
        exclude_entity: None,
    };

    if let Some(hit) = raycast.cast_ray_filtered(
        transform.translation,
        transform.forward(),
        50.0,
        &filter,
    ) {
        // Hit an enemy
    }
}
```

### Shape Casting

```rust
use monoplay_sdk_physics::ShapeCast;

fn sphere_cast(raycast: Res<RaycastQuery>) {
    let shape = Collider::Sphere { radius: 1.0 };

    if let Some(hit) = raycast.cast_shape(
        shape,
        Vec3::new(0.0, 5.0, 0.0),
        Quat::IDENTITY,
        Vec3::NEG_Y,
        10.0,
    ) {
        info!("Shape hit at distance: {}", hit.distance);
    }
}
```

## Gravity

### Global Gravity

```rust
use monoplay_sdk_physics::Gravity;

fn setup_physics(mut commands: Commands) {
    commands.insert_resource(Gravity(Vec3::new(0.0, -20.0, 0.0)));
}
```

### Per-Entity Gravity

```rust
use monoplay_sdk_physics::GravityScale;

fn spawn_floating_object(mut commands: Commands) {
    commands.spawn((
        RigidBody::Dynamic,
        GravityScale(0.1),  // 10% of global gravity
        Transform::default(),
    ));
}

fn spawn_zero_g_object(mut commands: Commands) {
    commands.spawn((
        RigidBody::Dynamic,
        GravityScale(0.0),  // No gravity
        Transform::default(),
    ));
}
```

## Physics Materials

### Friction and Restitution

```rust
use monoplay_sdk_physics::PhysicsMaterial;

fn spawn_bouncy_ball(mut commands: Commands) {
    commands.spawn((
        RigidBody::Dynamic,
        Collider::Sphere { radius: 0.5 },
        PhysicsMaterial {
            friction: 0.1,
            restitution: 0.95,  // Very bouncy
            ..default()
        },
        Transform::default(),
    ));
}

fn spawn_sticky_surface(mut commands: Commands) {
    commands.spawn((
        Collider::Box {
            width: 10.0,
            height: 1.0,
            depth: 10.0,
        },
        PhysicsMaterial {
            friction: 2.0,      // High friction
            restitution: 0.0,   // No bounce
            ..default()
        },
        Transform::default(),
    ));
}
```

## Kinematic Bodies

### Moving Platforms

```rust
use monoplay_sdk_physics::{RigidBody, KinematicVelocity};

#[derive(Component)]
struct MovingPlatform {
    start: Vec3,
    end: Vec3,
    speed: f32,
    direction: f32,
}

fn update_platforms(
    mut query: Query<(&mut Transform, &mut MovingPlatform, &mut KinematicVelocity)>,
    time: Res<Time>,
) {
    for (mut transform, mut platform, mut velocity) in query.iter_mut() {
        let target = if platform.direction > 0.0 {
            platform.end
        } else {
            platform.start
        };

        let direction = (target - transform.translation).normalize();
        velocity.linear = direction * platform.speed;

        if transform.translation.distance(target) < 0.1 {
            platform.direction *= -1.0;
        }
    }
}
```

## 2D Physics

### Platformer Controller

```rust
use monoplay_sdk_physics::{CharacterController2D, PlatformerSettings};

fn spawn_2d_player(mut commands: Commands) {
    commands.spawn((
        CharacterController2D {
            width: 1.0,
            height: 2.0,
            ..default()
        },
        PlatformerSettings {
            jump_height: 3.0,
            time_to_jump_apex: 0.4,
            max_speed: 8.0,
            acceleration: 50.0,
            coyote_time: 0.15,      // Grace period after leaving ledge
            jump_buffer_time: 0.1,  // Pre-jump input buffer
            ..default()
        },
        Transform::from_xyz(0.0, 2.0, 0.0),
    ));
}
```

### Wall Sliding

```rust
use monoplay_sdk_physics::WallState;

fn wall_slide(
    mut query: Query<(&mut CharacterVelocity, &WallState), With<Player>>,
) {
    for (mut velocity, wall) in query.iter_mut() {
        if wall.is_on_wall && velocity.linear.y < 0.0 {
            velocity.linear.y *= 0.5;  // Slow fall when sliding
        }
    }
}

fn wall_jump(
    input: Res<InputState<PlayerAction>>,
    mut query: Query<(&mut CharacterVelocity, &WallState), With<Player>>,
) {
    for (mut velocity, wall) in query.iter_mut() {
        if wall.is_on_wall && input.just_pressed(PlayerAction::Jump) {
            velocity.linear.y = 10.0;
            velocity.linear.x = wall.wall_normal.x * 8.0;
        }
    }
}
```

## Query System

### Overlap Queries

```rust
use monoplay_sdk_physics::{OverlapQuery, OverlapShape};

fn check_area(overlap: Res<OverlapQuery>) {
    let shape = OverlapShape::Sphere {
        center: Vec3::new(0.0, 0.0, 0.0),
        radius: 5.0,
    };

    for entity in overlap.query_shape(shape) {
        info!("Entity {:?} in range", entity);
    }
}
```

## Performance

### Spatial Queries Optimization

```rust
use monoplay_sdk_physics::SpatialQuery;

fn spatial_query(query: Res<SpatialQuery>) {
    // Broad phase: fast AABB check
    let candidates = query.query_aabb(
        Vec3::new(-10.0, -10.0, -10.0),
        Vec3::new(10.0, 10.0, 10.0),
    );

    // Narrow phase: precise collision test
    for entity in candidates {
        // Process candidates
    }
}
```

## Best Practices

1. **Use Character Controllers**: For player movement, prefer controllers over rigid bodies.
2. **Layer Collision Groups**: Organize entities into layers to reduce collision checks.
3. **Continuous Collision**: Enable for fast-moving objects to prevent tunneling.
4. **Kinematic for Platforms**: Use kinematic bodies for moving platforms and elevators.
5. **Raycast Sparingly**: Cache results when possible; avoid per-frame raycasts.
6. **Profile Physics**: Use Bevy's diagnostic plugin to monitor physics performance.

## Next Steps

- [Input System](/docs/sdk/input) - Connect input to movement
- [Core Plugin](/docs/sdk/core) - State management
- [World Plugin](/docs/sdk/world) - Voxel physics integration
