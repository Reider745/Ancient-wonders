let arr = [];
let Ritual = {
    lvl1: function(result, craft, description){
    arr.push({r: result, c:craft,  d:description});
    Callback.addCallback("ItemUse", function(coords, item, block, isExternal, player) {
        
        if(item.id == ItemID.bookk){
        var b = BlockSource.getDefaultForActor(player);
        if(b.getBlockId(coords.x, coords.y, coords.z) == BlockID.rityalPedestal){
            if(b.getBlockId(coords.x+2, coords.y, coords.z+2) == BlockID.rityalPedestal){
                if(b.getBlockId(coords.x-2, coords.y, coords.z+2) == BlockID.rityalPedestal){
                     if(b.getBlockId(coords.x+2, coords.y, coords.z-2) == BlockID.rityalPedestal){
                         if(b.getBlockId(coords.x-2, coords.y, coords.z-2) == BlockID.rityalPedestal){
        if(b.getBlockId(coords.x+3, coords.y, coords.z) == BlockID.rityalPedestal){
            if(b.getBlockId(coords.x-3, coords.y, coords.z) == BlockID.rityalPedestal){
                if(b.getBlockId(coords.x, coords.y, coords.z+3) == BlockID.rityalPedestal){
                     if(b.getBlockId(coords.x, coords.y, coords.z-3) == BlockID.rityalPedestal){ 
    if(TileEntity.getTileEntity(coords.x+2, coords.y, coords.z+2, b).data.item.id == craft.item1){
    if(TileEntity.getTileEntity(coords.x-2, coords.y, coords.z+2, b).data.item.id == craft.item1){
    if(TileEntity.getTileEntity(coords.x+2, coords.y, coords.z-2, b).data.item.id == craft.item1){
    if(TileEntity.getTileEntity(coords.x-2, coords.y, coords.z-2, b).data.item.id == craft.item1){
        if(TileEntity.getTileEntity(coords.x+3, coords.y, coords.z, b).data.item.id == craft.item2){
        if(TileEntity.getTileEntity(coords.x-3, coords.y, coords.z, b).data.item.id == craft.item2){
        if(TileEntity.getTileEntity(coords.x, coords.y, coords.z-3, b).data.item.id == craft.item2){
        if(TileEntity.getTileEntity(coords.x, coords.y, coords.z+3, b).data.item.id == craft.item2){
            if(TileEntity.getTileEntity(coords.x, coords.y, coords.z, b).data.item.id <= 0){
        let d = MagicCore.getValue(player);
        if(d.Aspects>=description.aspects){
        if(d.magis>=description.magis){
            TileEntity.getTileEntity(coords.x, coords.y, coords.z, b).animation(result);
            TileEntity.getTileEntity(coords.x+3, coords.y, coords.z, b).destroyAnimation();
            TileEntity.getTileEntity(coords.x-3, coords.y, coords.z, b).destroyAnimation();
            TileEntity.getTileEntity(coords.x, coords.y, coords.z+3, b).destroyAnimation();
            TileEntity.getTileEntity(coords.x, coords.y, coords.z-3, b).destroyAnimation();
            TileEntity.getTileEntity(coords.x+2, coords.y, coords.z+2, b).destroyAnimation();
            TileEntity.getTileEntity(coords.x-2, coords.y, coords.z+2, b).destroyAnimation();
            TileEntity.getTileEntity(coords.x+2, coords.y, coords.z-2, b).destroyAnimation();
            TileEntity.getTileEntity(coords.x-2, coords.y, coords.z-2, b).destroyAnimation();
            d.Aspects -= description.aspects;
            if(Math.random()<=0.5){
                        if(d.AspectsNow + 500 <= d.AspectsMax){
                            d.AspectsNow+=500;
                        }else{
                            d.AspectsNow=d.AspectsMax;
                        }        
                        MagicCore.setParameters(player, d);   
    }
    }else{
        Game.message("для этого ритуала нужно минимум magis "+description.magis+" уровня");
    }
    }else{
Game.message("для этого ритуала нужно минимум  "+description.aspects+" аспектов");
        
    }
   } 
    }
}
}
}
}
} 
} 
} 
                      }
                 } 
             } 
         }
                         }
                     }
                 } 
             } 
         }
        } 
    });
   }
};
ModAPI.addAPICallback("RecipeViewer", function(api){
    Callback.addCallback("LevelLoaded", function(){
        let RV = api.Core;
        let recipeList = [];
        for(var i in arr){
            recipeList.push({
                magis: arr[i].d.magis,
                aspects: arr[i].d.aspects,
                input: [
                    {id: arr[i].c.item2, count: 0, data: 0},
                    {id: arr[i].c.item2, count: 0, data: 0},
                    {id: arr[i].c.item2, count: 0, data: 0},
                    {id: arr[i].c.item2, count: 0, data: 0},
                    {id: arr[i].c.item1, count: 0, data: 0},
                    {id: arr[i].c.item1, count: 0, data: 0},
                    {id: arr[i].c.item1, count: 0, data: 0},
                    {id: arr[i].c.item1, count: 0, data: 0}
                ],
                output: [
                    {id: arr[i].r.id, count: 1, data: arr[i].r.data}
                ]
            });
        }
        RV.registerRecipeType("ritual1", {
            title: "ритуал 1 уровня/ritul 1 lvl",
            contents: {
                icon: BlockID.rityalPedestal,
                params: {slot: "_default_slot_light"},
                drawing: [],
                elements: {
                    output0: {x: 440, y: 150, size: 120},
                    input0: {x: 440, y: 0, size: 120},
                    input1: {x: 440, y: 300, size: 120}, 
                    input2: {x: 590, y: 150, size: 120},
                    input3: {x: 290, y: 150, size: 120},
                    
                    input4: {x: 315, y: 25, size: 100},
                    input5: {x: 315, y: 300, size: 100},
                    input6: {x: 590, y: 25, size: 100},
                    input7: {x: 590, y: 300, size: 100},
                    text: {type: "text", x: 50, y: 450, font: {size: 40}},
                },
            },
            recipeList: recipeList,
            onOpen: function(elements, data){
                 elements.get("text").onBindingUpdated("text", "magic: "+data.magis+", aspects: "+data.aspects);
            }
        });
    });
});