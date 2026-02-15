---
sidebar_position: 10
title: World Plugin
---

# World Plugin

The `monoplay-sdk-world` plugin provides voxel-based world generation with chunk streaming, block type systems, and procedural terrain generation. Optimized for large-scale destructible environments.

## Installation

```toml
[dependencies]
monoplay-sdk-world = "0.1"
```

Add to your Bevy app:

```rust
use bevy::prelude::*;
use monoplay_sdk_world::WorldPlugin;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_plugins(WorldPlugin::new(WorldConfig {
            chunk_size: 16,
            render_distance: 8,
            sea_level: 64,
        }))
        .run();
}
```

## Chunk System

### Chunk Structure

Chunks are 16×16×16 voxel blocks that make up the world:

```rust
use monoplay_sdk_world::{Chunk, ChunkPos, BlockPos};

pub struct Chunk {
    position: ChunkPos,
    blocks: [[[Block; 16]; 16]; 16],
    dirty: bool,
}

impl Chunk {
    pub fn get_block(&self, pos: BlockPos) -> Block {
        self.blocks[pos.x][pos.y][pos.z]
    }

    pub fn set_block(&mut self, pos: BlockPos, block: Block) {
        self.blocks[pos.x][pos.y][pos.z] = block;
        self.dirty = true;
    }
}
```

### Chunk Loading

```rust
use monoplay_sdk_world::{ChunkManager, LoadRadius};

fn update_chunks(
    mut manager: ResMut<ChunkManager>,
    player: Query<&Transform, With<Player>>,
) {
    if let Ok(transform) = player.get_single() {
        let player_chunk = ChunkPos::from_world_pos(transform.translation);

        manager.set_center(player_chunk);
        manager.load_radius(LoadRadius::new(8));
    }
}
```

### Chunk Streaming

```rust
use monoplay_sdk_world::ChunkEvent;

fn handle_chunk_events(
    mut events: EventReader<ChunkEvent>,
    mut commands: Commands,
) {
    for event in events.read() {
        match event {
            ChunkEvent::Loaded { chunk_pos, chunk_data } => {
                info!("Chunk loaded: {:?}", chunk_pos);
                spawn_chunk_mesh(&mut commands, chunk_pos, chunk_data);
            }
            ChunkEvent::Unloaded { chunk_pos } => {
                info!("Chunk unloaded: {:?}", chunk_pos);
                despawn_chunk_mesh(&mut commands, chunk_pos);
            }
        }
    }
}
```

## Block System

### Block Types

```rust
use monoplay_sdk_world::{Block, BlockType, BlockRegistry};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum BlockType {
    Air,
    Stone,
    Dirt,
    Grass,
    Sand,
    Water,
    Wood,
    Leaves,
    Custom(u16),
}

impl Block {
    pub fn new(block_type: BlockType) -> Self {
        Self {
            block_type,
            metadata: 0,
        }
    }

    pub fn is_solid(&self) -> bool {
        !matches!(self.block_type, BlockType::Air | BlockType::Water)
    }

    pub fn is_transparent(&self) -> bool {
        matches!(self.block_type, BlockType::Air | BlockType::Water | BlockType::Leaves)
    }
}
```

### Block Registry

```rust
use monoplay_sdk_world::BlockDefinition;

fn register_custom_blocks(mut registry: ResMut<BlockRegistry>) {
    registry.register(BlockDefinition {
        id: "mymod:custom_ore".to_string(),
        name: "Custom Ore".to_string(),
        solid: true,
        transparent: false,
        light_level: 0,
        textures: BlockTextures {
            top: "textures/custom_ore_top.png".to_string(),
            bottom: "textures/custom_ore_bottom.png".to_string(),
            sides: "textures/custom_ore_side.png".to_string(),
        },
    });
}
```

### Block Placement

```rust
use monoplay_sdk_world::{WorldManager, RaycastResult};

fn place_block(
    input: Res<InputState<PlayerAction>>,
    mut world: ResMut<WorldManager>,
    player: Query<&Transform, With<Player>>,
) {
    if input.just_pressed(PlayerAction::PlaceBlock) {
        let transform = player.single();

        let origin = transform.translation;
        let direction = transform.forward();

        if let Some(hit) = world.raycast(origin, direction, 10.0) {
            let place_pos = hit.block_pos + hit.normal;
            world.set_block(place_pos, Block::new(BlockType::Stone));
        }
    }
}
```

### Block Breaking

```rust
fn break_block(
    input: Res<InputState<PlayerAction>>,
    mut world: ResMut<WorldManager>,
    player: Query<&Transform, With<Player>>,
) {
    if input.just_pressed(PlayerAction::BreakBlock) {
        let transform = player.single();

        if let Some(hit) = world.raycast(
            transform.translation,
            transform.forward(),
            10.0,
        ) {
            world.set_block(hit.block_pos, Block::new(BlockType::Air));
        }
    }
}
```

## Terrain Generation

### Noise-Based Generation

```rust
use monoplay_sdk_world::{TerrainGenerator, NoiseSettings};

fn setup_terrain_generator(mut commands: Commands) {
    commands.insert_resource(TerrainGenerator::new(NoiseSettings {
        seed: 12345,
        frequency: 0.01,
        octaves: 4,
        lacunarity: 2.0,
        persistence: 0.5,
        amplitude: 64.0,
        base_height: 64.0,
    }));
}
```

### Custom Generation

```rust
use monoplay_sdk_world::ChunkGenerator;

struct CustomGenerator {
    seed: u64,
}

impl ChunkGenerator for CustomGenerator {
    fn generate(&self, chunk_pos: ChunkPos) -> Chunk {
        let mut chunk = Chunk::new(chunk_pos);

        for x in 0..16 {
            for z in 0..16 {
                let world_x = chunk_pos.x * 16 + x;
                let world_z = chunk_pos.z * 16 + z;

                let height = self.calculate_height(world_x, world_z);

                for y in 0..16 {
                    let world_y = chunk_pos.y * 16 + y;
                    let block_pos = BlockPos::new(x as u8, y as u8, z as u8);

                    let block = if world_y < height {
                        Block::new(BlockType::Stone)
                    } else if world_y == height {
                        Block::new(BlockType::Grass)
                    } else {
                        Block::new(BlockType::Air)
                    };

                    chunk.set_block(block_pos, block);
                }
            }
        }

        chunk
    }
}
```

### Biomes

```rust
use monoplay_sdk_world::{Biome, BiomeMap};

#[derive(Debug, Clone, Copy)]
pub enum Biome {
    Plains,
    Desert,
    Forest,
    Mountains,
    Ocean,
}

impl Biome {
    pub fn surface_block(&self) -> BlockType {
        match self {
            Biome::Plains | Biome::Forest => BlockType::Grass,
            Biome::Desert => BlockType::Sand,
            Biome::Mountains => BlockType::Stone,
            Biome::Ocean => BlockType::Sand,
        }
    }

    pub fn fill_block(&self) -> BlockType {
        match self {
            Biome::Desert => BlockType::Sand,
            _ => BlockType::Dirt,
        }
    }
}

fn generate_with_biomes(
    chunk_pos: ChunkPos,
    biome_map: &BiomeMap,
) -> Chunk {
    let mut chunk = Chunk::new(chunk_pos);

    for x in 0..16 {
        for z in 0..16 {
            let world_x = chunk_pos.x * 16 + x;
            let world_z = chunk_pos.z * 16 + z;

            let biome = biome_map.get_biome(world_x, world_z);
            let height = calculate_height_for_biome(world_x, world_z, biome);

            // Generate blocks based on biome
            for y in 0..16 {
                let world_y = chunk_pos.y * 16 + y;
                let block_pos = BlockPos::new(x as u8, y as u8, z as u8);

                let block = if world_y < height - 4 {
                    Block::new(BlockType::Stone)
                } else if world_y < height {
                    Block::new(biome.fill_block())
                } else if world_y == height {
                    Block::new(biome.surface_block())
                } else {
                    Block::new(BlockType::Air)
                };

                chunk.set_block(block_pos, block);
            }
        }
    }

    chunk
}
```

## Mesh Generation

### Greedy Meshing

```rust
use monoplay_sdk_world::MeshBuilder;

fn generate_chunk_mesh(chunk: &Chunk) -> Mesh {
    let mut builder = MeshBuilder::new();

    for x in 0..16 {
        for y in 0..16 {
            for z in 0..16 {
                let pos = BlockPos::new(x, y, z);
                let block = chunk.get_block(pos);

                if block.is_solid() {
                    // Add faces only if neighbor is transparent
                    if !chunk.get_block(pos.offset(0, 1, 0)).is_solid() {
                        builder.add_top_face(pos, block);
                    }
                    if !chunk.get_block(pos.offset(0, -1, 0)).is_solid() {
                        builder.add_bottom_face(pos, block);
                    }
                    // Add other faces...
                }
            }
        }
    }

    builder.build()
}
```

### Mesh Optimization

```rust
use monoplay_sdk_world::MeshOptimizer;

fn optimize_chunk_mesh(mesh: Mesh) -> Mesh {
    MeshOptimizer::new()
        .merge_adjacent_faces()
        .remove_hidden_faces()
        .optimize_vertex_order()
        .apply(mesh)
}
```

## Collision

### Voxel Collision

```rust
use monoplay_sdk_world::VoxelCollider;

fn setup_world_collision(mut commands: Commands) {
    commands.spawn((
        VoxelCollider,
        Transform::default(),
    ));
}

fn check_voxel_collision(
    world: Res<WorldManager>,
    player: Query<&Transform, With<Player>>,
) {
    let transform = player.single();
    let player_pos = transform.translation;

    let block_pos = BlockPos::from_world_pos(player_pos);
    let block = world.get_block(block_pos);

    if block.is_solid() {
        // Handle collision
    }
}
```

## Structure Generation

### Placing Structures

```rust
use monoplay_sdk_world::{Structure, StructureTemplate};

#[derive(Resource)]
struct TreeStructure {
    template: StructureTemplate,
}

fn place_tree(
    world: &mut WorldManager,
    position: BlockPos,
    tree: &TreeStructure,
) {
    for (offset, block) in tree.template.blocks.iter() {
        let place_pos = position + *offset;
        world.set_block(place_pos, *block);
    }
}

fn generate_trees(
    mut world: ResMut<WorldManager>,
    tree: Res<TreeStructure>,
    mut rng: ResMut<TerrainRng>,
) {
    // Place trees randomly
    for _ in 0..10 {
        let x = rng.gen_range(-100..100);
        let z = rng.gen_range(-100..100);
        let y = world.get_surface_height(x, z);

        let pos = BlockPos::new(x as u8, y as u8, z as u8);
        place_tree(&mut world, pos, &tree);
    }
}
```

## Saving and Loading

### World Persistence

```rust
use monoplay_sdk_world::WorldSave;

fn save_world(world: Res<WorldManager>) {
    if let Err(e) = world.save("my_world") {
        error!("Failed to save world: {}", e);
    }
}

fn load_world(mut world: ResMut<WorldManager>) {
    if let Err(e) = world.load("my_world") {
        warn!("Failed to load world, generating new: {}", e);
        world.generate_new();
    }
}
```

### Chunk Serialization

```rust
use monoplay_sdk_world::ChunkSerializer;

fn serialize_chunk(chunk: &Chunk) -> Vec<u8> {
    ChunkSerializer::new()
        .compress(true)
        .serialize(chunk)
}

fn deserialize_chunk(data: &[u8]) -> Result<Chunk, SerializeError> {
    ChunkSerializer::new()
        .decompress(true)
        .deserialize(data)
}
```

## Lighting

### Block Light

```rust
use monoplay_sdk_world::LightLevel;

fn update_lighting(
    mut world: ResMut<WorldManager>,
    changed_blocks: Query<&BlockPos, Changed<Block>>,
) {
    for block_pos in changed_blocks.iter() {
        world.recalculate_lighting(*block_pos);
    }
}
```

### Sunlight Propagation

```rust
use monoplay_sdk_world::SunlightPropagation;

fn propagate_sunlight(chunk: &mut Chunk) {
    for x in 0..16 {
        for z in 0..16 {
            let mut light_level = 15;

            for y in (0..16).rev() {
                let pos = BlockPos::new(x, y, z);
                let block = chunk.get_block(pos);

                if !block.is_transparent() {
                    light_level = 0;
                } else {
                    chunk.set_light_level(pos, light_level);
                }
            }
        }
    }
}
```

## Physics Integration

### Voxel Physics

```rust
use monoplay_sdk_world::VoxelPhysics;

fn setup_voxel_physics(mut commands: Commands) {
    commands.insert_resource(VoxelPhysics {
        gravity: -20.0,
        fluid_drag: 0.9,
    });
}

fn apply_water_physics(
    world: Res<WorldManager>,
    mut query: Query<(&Transform, &mut Velocity)>,
) {
    for (transform, mut velocity) in query.iter_mut() {
        let block_pos = BlockPos::from_world_pos(transform.translation);
        let block = world.get_block(block_pos);

        if block.block_type == BlockType::Water {
            velocity.linear *= 0.9;  // Apply drag
            velocity.linear.y += 5.0;  // Buoyancy
        }
    }
}
```

## Performance Optimization

### Level of Detail (LOD)

```rust
use monoplay_sdk_world::LodManager;

fn setup_lod(mut commands: Commands) {
    commands.insert_resource(LodManager {
        levels: vec![
            LodLevel { distance: 4.0, resolution: 1.0 },
            LodLevel { distance: 8.0, resolution: 0.5 },
            LodLevel { distance: 16.0, resolution: 0.25 },
        ],
    });
}
```

### Async Generation

```rust
use monoplay_sdk_world::AsyncChunkGenerator;

fn generate_chunks_async(
    mut generator: ResMut<AsyncChunkGenerator>,
    player: Query<&Transform, With<Player>>,
) {
    let player_chunk = ChunkPos::from_world_pos(player.single().translation);

    for dx in -8..=8 {
        for dz in -8..=8 {
            let chunk_pos = ChunkPos {
                x: player_chunk.x + dx,
                y: 0,
                z: player_chunk.z + dz,
            };

            generator.queue_generation(chunk_pos);
        }
    }
}
```

## Best Practices

1. **Chunk Loading**: Load chunks asynchronously to prevent frame drops.
2. **Mesh Caching**: Cache chunk meshes, only rebuild when dirty.
3. **Greedy Meshing**: Use greedy meshing to reduce triangle count.
4. **Culling**: Don't render chunks outside view frustum.
5. **LOD**: Use lower detail meshes for distant chunks.
6. **Compression**: Compress chunk data for storage and network transfer.
7. **Pooling**: Reuse chunk entities instead of spawning/despawning.

## Next Steps

- [Physics](/docs/sdk/physics) - Voxel collision detection
- [Multiplayer](/docs/sdk/multiplayer) - Synchronize block changes
- [Core Plugin](/docs/sdk/core) - World save/load system
