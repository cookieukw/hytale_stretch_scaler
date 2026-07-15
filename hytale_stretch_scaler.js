let button;

Plugin.register('hytale_stretch_scaler', {
    title: 'Hytale Stretch Scaler',
    author: 'cookieukw',
    description: 'Scales Hytale models visually using stretch to preserve UV mappings and texture coordinates.',
    icon: 'zoom_in',
    version: '1.0.2',
    variant: 'both',
    min_version: '5.0.0',
    tags: ['Hytale'],
    onload() {
        button = new Action('scale_via_stretch', {
            name: 'Scale via Stretch',
            description: 'Scale the model visually using stretch while preserving UV coordinates.',
            icon: 'zoom_in',
            click: function() {
                new Dialog({
                    id: 'hytale_stretch_scaler_dialog',
                    title: 'Scale via Stretch',
                    form: {
                        scale: { label: 'Scale Factor', type: 'number', value: 2, step: 0.1 }
                    },
                    onConfirm(formData) {
                        let F = formData.scale;
                        if (F === 0 || isNaN(F)) return;
                        
                        Undo.initEdit({elements: Cube.all, groups: Group.all});
                        
                        // 1. Scale group pivots (origins) by factor F
                        Group.all.forEach(group => {
                            group.origin.V3_set([
                                group.origin[0] * F,
                                group.origin[1] * F,
                                group.origin[2] * F
                            ]);
                        });
                        
                        // 2. Adjust cubes
                        Cube.all.forEach(cube => {
                            let size = cube.size();
                            let original_center = [
                                (cube.from[0] + cube.to[0]) / 2,
                                (cube.from[1] + cube.to[1]) / 2,
                                (cube.from[2] + cube.to[2]) / 2
                            ];
                            let original_origin = cube.origin.slice();
                            
                            // Scale stretch of all axes by factor F
                            cube.stretch.V3_set([
                                cube.stretch[0] * F,
                                cube.stretch[1] * F,
                                cube.stretch[2] * F
                            ]);
                            
                            // Scale the cube's pivot (origin) by factor F
                            cube.origin.V3_set([
                                original_origin[0] * F,
                                original_origin[1] * F,
                                original_origin[2] * F
                            ]);
                            
                            // Scale the cube center directly by F (every point in the model scales from world origin)
                            let new_center = [
                                original_center[0] * F,
                                original_center[1] * F,
                                original_center[2] * F
                            ];
                            
                            // Set new coordinates maintaining the same logical size (preserving UVs)
                            cube.from.V3_set([
                                new_center[0] - size[0] / 2,
                                new_center[1] - size[1] / 2,
                                new_center[2] - size[2] / 2
                            ]);
                            cube.to.V3_set([
                                new_center[0] + size[0] / 2,
                                new_center[1] + size[1] / 2,
                                new_center[2] + size[2] / 2
                            ]);
                        });
                        
                        Canvas.updateAll();
                        Undo.finishEdit('Scale Model via Stretch');
                    }
                }).show();
            }
        });
        MenuBar.menus.tools.addAction(button);
    },
    onunload() {
        button.delete();
    }
});
