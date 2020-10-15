var ItemGenerate = new ItemGenerate();
ItemGenerate.setPrototype({
    isGenerate: function (slot, x, y, z, id, data, count){
        return true;
    }
});
ItemGenerate.addItem(ItemID.piece1, 0.05, {max: 1});
ItemGenerate.addItem(ItemID.piece2, 0.05, {max: 1});
ItemGenerate.addItem(ItemID.piece3, 0.05, {max: 1});
ItemGenerate.addItem(264, 0.1, {max: 3});
ItemGenerate.addItem(ItemID.loreClass1, 0.005, {max: 1});
ItemGenerate.addItem(ItemID.loreClass2, 0.005, {max: 1});
ItemGenerate.addItem(ItemID.loreClass3, 0.005, {max: 1});
ItemGenerate.addItem(265, 1, {max: 3});
ItemGenerate.addItem(322, 0.01, {max: 1});
ItemGenerate.addItem(266, 0.1, {max: 3});
ItemGenerate.addItem(ItemID.rune1, 0.5, {max: 1});
ItemGenerate.addItem(ItemID.rune2, 0.5, {max: 1});
ItemGenerate.addItem(ItemID.rune3, 0.5, {max: 1});
ItemGenerate.addItem(ItemID.rune4, 0.5, {max: 1});
let TowerOfEvil = new DungeonAPI("Tower_of_evil.json");
TowerOfEvil.setPrototype({
    isSetBlock: function(x, y, z, id, data, identifier){
        return true;
    }
});
let OrdinaryTemple = new DungeonAPI("Ordinary_temple.json");
OrdinaryTemple.setPrototype({
    isSetBlock: function(x, y, z, id, data, identifier){
        return true;
    }
});
let ToweraOfDarkness = new DungeonAPI("Tower_of_darkness.json");
ToweraOfDarkness.setPrototype({
    isSetBlock: function(x, y, z, id, data, identifier){
        return true;
    }
});
Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random){
    if(random.nextInt(100) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));
        TowerOfEvil.setStructure(coords.x, coords.y, coords.z, 0);
        ItemGenerate.fillChest(coords.x, coords.y+1, coords.z);
    } 
});
Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random){
    if(random.nextInt(100) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));  
         OrdinaryTemple.setStructure(coords.x, coords.y, coords.z, 0);
         ItemGenerate.fillChest(coords.x, coords.y+2, coords.z-1);
         ItemGenerate.fillChest(coords.x, coords.y+2, coords.z);
         ItemGenerate.fillChest(coords.x+1, coords.y+2, coords.z);
         ItemGenerate.fillChest(coords.x+1, coords.y+2, coords.z-1);
    } 
});
Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random){
    if(random.nextInt(100) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));
        ToweraOfDarkness.setStructure(coords.x, coords.y, coords.z, 0);
        ItemGenerate.fillChest(coords.x, coords.y, coords.z-1);
        ItemGenerate.fillChest(coords.x, coords.y, coords.z+1);
        ItemGenerate.fillChest(coords.x+1, coords.y, coords.z);
        ItemGenerate.fillChest(coords.x-1, coords.y, coords.z);
    } 
});
