var ItemGenerate = new ItemGenerate();
ItemGenerate.addItem(ItemID.piece1, 5, {max: 1});
ItemGenerate.addItem(ItemID.piece2, 5, {max: 1});
ItemGenerate.addItem(ItemID.piece3, 5, {max: 1});
ItemGenerate.addItem(ItemID.loreClass1, 1, {max: 1});
ItemGenerate.addItem(ItemID.loreClass2, 1, {max: 1});
ItemGenerate.addItem(ItemID.loreClass3, 1, {max: 1});

ItemGenerate.addItem(264, 10, {max: 3});
ItemGenerate.addItem(265, 100, {max: 3});
ItemGenerate.addItem(322, 1, {max: 1});
ItemGenerate.addItem(266, 10, {max: 3});
ItemGenerate.addItem(ItemID.rune1, 50, {max: 1});
ItemGenerate.addItem(ItemID.rune2, 50, {max: 1});
ItemGenerate.addItem(ItemID.rune3, 50, {max: 1});
ItemGenerate.addItem(ItemID.rune4, 50, {max: 1});

let TowerOfEvil = new DungeonAPI("Tower_of_evil.json");

let OrdinaryTemple = new DungeonAPI("Ordinary_temple.json");

let ToweraOfDarkness = new DungeonAPI("Tower_of_darkness.json");

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random){
    if(random.nextInt(100) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));
        TowerOfEvil.setStructure(coords.x, coords.y, coords.z, 0);
        ItemGenerate.fillChestSit(coords.x, coords.y+1, coords.z, random);
    } 
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random){
    if(random.nextInt(100) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));  
         OrdinaryTemple.setStructure(coords.x, coords.y, coords.z, 0);
         ItemGenerate.fillChestSit(coords.x, coords.y+2, coords.z-1, random);
         ItemGenerate.fillChestSit(coords.x, coords.y+2, coords.z, random);
         ItemGenerate.fillChestSit(coords.x+1, coords.y+2, coords.z, random);
         ItemGenerate.fillChestSit(coords.x+1, coords.y+2, coords.z-1, random);
    } 
});
Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random){
    if(random.nextInt(100) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));
        ToweraOfDarkness.setStructure(coords.x, coords.y, coords.z, 0);
        ItemGenerate.fillChestSit(coords.x, coords.y, coords.z-1, random);
        ItemGenerate.fillChestSit(coords.x, coords.y, coords.z+1, random);
        ItemGenerate.fillChestSit(coords.x+1, coords.y, coords.z, random);
        ItemGenerate.fillChestSit(coords.x-1, coords.y, coords.z, random);
    } 
});
