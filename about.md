# Hytale Stretch Scaler

A Blockbench plugin designed to scale Hytale models visually using stretch while preserving their UV mappings and texture layouts perfectly.

## Why use this?
In Hytale formats, face UV sizes are automatically derived from the logical 3D sizes of the cubes. If you use the standard scale tool, the logical sizes change, which forces Blockbench/Hytale to recalculate and break your UV mapping. 

By scaling the **stretch** property of the cubes and groups instead of their size, this plugin allows you to scale your models visually in the 3D space by any factor, while keeping the UV coordinates and your original texture resolution completely untouched.

## How to use
1. Go to **Tools** > **Scale via Stretch**.
2. Enter your desired **Scale Factor** (e.g. `2` to double the visual size, or `8` if you want a cube with original `0.25` stretch to become `2.0` stretch).
3. Click **Confirm**. The model will scale visually in the 3D viewport, and all UV mapping remains perfectly intact!
