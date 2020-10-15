var RitualSpawn = {
    lvl1: function(entity, description, func){
        Callback.addCallback("ItemUse", function(coords, item, block, isExternal, player) {
            if(item.id == ItemID.bookk){
                var b = BlockSource.getDefaultForActor(player);
                if(b.getBlockId(coords.x, coords.y, coords.z) == BlockID.rityalPedestal){
                if(b.getBlockId(coords.x+2, coords.y, coords.z+2) == BlockID.rityalPedestal){
                if(b.getBlockId(coords.x-2, coords.y, coords.z+2) == BlockID.rityalPedestal){
                if(b.getBlockId(coords.x+2, coords.y, coords.z-2) == BlockID.rityalPedestal){
                if(b.getBlockId(coords.x-2, coords.y, coords.z-2) == BlockID.rityalPedestal){
                if(TileEntity.getTileEntity(coords.x+2, coords.y, coords.z+2, b).data.item.id == ItemID.rune5){
                if(TileEntity.getTileEntity(coords.x-2, coords.y, coords.z+2, b).data.item.id == ItemID.rune5){
                if(TileEntity.getTileEntity(coords.x+2, coords.y, coords.z-2, b).data.item.id == ItemID.rune5){
                if(TileEntity.getTileEntity(coords.x-2, coords.y, coords.z-2, b).data.item.id == ItemID.rune5){
                if(TileEntity.getTileEntity(coords.x, coords.y, coords.z, b).data.item.id == description.item){
                let c = MagicCore.getValue(player);
                if(c.Aspects>=description.aspects){
                if(c.magis>=description.magis){
                if(c.Protection>=description.protection){
                if(c.necromancer>=description.necromancer){
                    TileEntity.getTileEntity(coords.x, coords.y, coords.z, b).destroyAnimation();
                    b.spawnEntity(coords.x, coords.y, coords.z, entity);
                    func(c, b, coords, player);
                    c.Aspects -= description.aspects;
                    if(Math.random()<=0.5){
                        if(c.AspectsNow + 500 <= c.AspectsMax){
                            c.AspectsNow+=500;
                        }else{
                            c.AspectsNow=c.AspectsMax;
                        }        
                       } 
                       classPlayer[player] = c;  
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
RitualSpawn.lvl1("aw:evill2", {
    item: 264, 
    aspects: 10,
    magis: 20, 
    protection: 10,
    necromancer: 10
}, function(classData, blockSource, coords, player){
    
});
RitualSpawn.lvl1("aw:evill", {
    item: 265, 
    aspects: 10,
    magis: 20, 
    protection: 10,
    necromancer: 10
}, function(classData, blockSource, coords, player){
    
});