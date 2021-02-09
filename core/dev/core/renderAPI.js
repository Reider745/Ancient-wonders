let RenderAPI = {
    SetAltar: function (id){
        var render = new ICRender.Model(); 
        BlockRenderer.setStaticICRender(id, -1, render);
        var model = BlockRenderer.createModel();  
        render.addEntry(model);
        model.addBox(1/16, 0, 1/16, 15/16, 0.0625, 15/16, 1, 0);
        model.addBox(2/16, 0.0625, 2/16, 14/16, 0.125, 14/16, 1, 0);
        model.addBox(3/16, 0.125, 3/16, 13/16, 1 - 0.0625, 13/16, 1, 0);
        model.addBox(2/16, 1 - 0.0625, 2/16, 14/16, 1, 14/16, 1, 0);
    }, 
    importOBJ: function (id, texture, obj){
        let file = __dir__ + "/assets/model/" + obj;
        var mesh = new RenderMesh();
        var renderAPI = new ICRender.Model(); 
        BlockRenderer.setStaticICRender(id, -1, renderAPI); 
        var modelAPI = new BlockRenderer.Model(mesh);  
        renderAPI.addEntry(modelAPI);
        mesh.importFromFile(file, "obj", null);
        mesh.setBlockTexture(texture, 0);
    },
    setCauldron: function(id){
        var render = new ICRender.Model(); 
        BlockRenderer.setStaticICRender(id, -1, render);
        var model = BlockRenderer.createModel();  
        render.addEntry(model);
        model.addBox(0, 0, 0, 4/16, 2/16, 4/16, "cauldron_side", 0);
        model.addBox(12/16, 0, 12/16, 1, 2/16, 1, "cauldron_side", 0);
        model.addBox(12/16, 0, 0, 1, 2/16, 4/16, "cauldron_side", 0);
        model.addBox(0, 0, 12/16, 4/16, 2/16, 1, "cauldron_side", 0);
        model.addBox(0, 2/16, 0, 1, 3/16, 1, "cauldron_inner", 0);
        model.addBox(0, 3/16, 0, 1, 1, 1/16, "cauldron_side", 0);
        model.addBox(15/16, 3/16, 1/16, 1, 1, 1, "cauldron_side", 0);
        model.addBox(0, 3/16, 0, 1/16, 1, 1, "cauldron_side", 0);
        model.addBox(1/16, 3/16, 15/16, 15/16, 1, 1, "cauldron_side", 0);
    },
    setMagicController: function(id){
        var render = new ICRender.Model(); 
        BlockRenderer.setStaticICRender(id, -1, render);
        var model = BlockRenderer.createModel();  
        render.addEntry(model);
        model.addBox(7/16, 0, 7/16, 9/16, 14/16, 9/16, 155, 0);
        model.addBox(0, 0, 0, 1, 2/16, 1, 155, 0);
        model.addBox(2/16, 6/16, 2/16, 14/16, 7/16, 14/16, 155, 0);
        model.addBox(4/16, 10/16, 4/16, 12/16, 11/16, 12/16, 155, 0);
        model.addBox(6/16, 14/16, 6/16, 10/16, 18/16, 10/16, 57, 0);
    }
};