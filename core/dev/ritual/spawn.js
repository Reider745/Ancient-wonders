Callback.addCallback("ItemUse", function(coords, item, block, isExternal, player) {
    if(item.id == ItemID.bookk){
        if(Dungeon.isStructure("aw_ritual.json", coords.x, coords.y, coords.z, 0, Entity.getDimension(player))){
             Dungeon.destroyStructure("aw_ritual.json", coords.x, coords.y, coords.z, 0, Entity.getDimension(player));
            var b = BlockSource.getDefaultForActor(player);
            b.spawnEntity(coords.x,coords.y, coords.z, "aw:boss0");
        }
    }
});