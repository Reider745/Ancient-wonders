let Ritual = {
    lvl1: function(result, craft, description){
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
/*
Ritual.lvl1({
    id: 265,
    data: 0
},{
    item1: 264, 
    item2: 265
},{
    aspects: 100, 
    magis: 10
});
*/
