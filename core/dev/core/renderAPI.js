let Render = {
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
    } 
};




























