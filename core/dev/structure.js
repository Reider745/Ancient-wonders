var ItemGenerate = new ItemGenerate();
ItemGenerate.addItem(ItemID.piece1, 70, {max: 1}, 0);
ItemGenerate.addItem(ItemID.piece2, 70, {max: 1}, 0);
ItemGenerate.addItem(ItemID.piece3, 70, {max: 1}, 0);
ItemGenerate.addItem(ItemID.loreClass1, 15, {max: 1}, 0);
ItemGenerate.addItem(ItemID.loreClass2, 15, {max: 1}, 0);
ItemGenerate.addItem(ItemID.loreClass3, 15, {max: 1}, 0);

ItemGenerate.addItem(264, 15, {max: 3}, 0);
ItemGenerate.addItem(265, 100, {max: 3}, 0);
ItemGenerate.addItem(322, 6, {max: 1}, 0);
ItemGenerate.addItem(266, 15, {max: 3}, 0);
ItemGenerate.addItem(ItemID.rune1, 30, {max: 1}, 0);
ItemGenerate.addItem(ItemID.rune2, 30, {max: 1}, 0);
ItemGenerate.addItem(ItemID.rune3, 30, {max: 1}, 0);
ItemGenerate.addItem(ItemID.rune4, 30, {max: 1}, 0);
ItemGenerate.addItem(ItemID.sroll6, 15, {max: 1}, 0);
ItemGenerate.addItem(ItemID.sroll4, 15, {max: 1}, 0);
ItemGenerate.addItem(ItemID.sroll9, 15, {max: 1}, 0);
ItemGenerate.addItem(ItemID.sroll1, 10, {max: 1}, 0);
ItemGenerate.addItem(ItemID.sroll2, 10, {max: 1}, 0);
ItemGenerate.addItem(ItemID.sroll3, 10, {max: 1}, 0);
ItemGenerate.addItem(ItemID.sroll7, 7, {max: 1}, 0);
ItemGenerate.addItem(ItemID.sroll5, 7, {max: 1}, 0);
ItemGenerate.registerRecipeViewer("ItemGenerateAW", "генерация предметов");

/*Item.registerUseFunctionForID(280, function(coords, item, block, player) {
    ItemGenerate.fillChestSit(coords.x, coords.y, coords.z, new java.util.Random(), Entity.getDimension(player));
});*/



let TowerOfEvil = new DungeonAPI("Tower_of_evil.json");

let OrdinaryTemple = new DungeonAPI("Ordinary_temple.json");

let ToweraOfDarkness = new DungeonAPI("Tower_of_darkness.json");

let Temple = new DungeonAPI("Temple.json");

let HouseOfMagicians = new DungeonAPI("House_of_magicians.json");

let TempleOfMagicians = new DungeonAPI("Temple_of_magicians.json");

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random, id){
    if(random.nextInt(config.structure.Temple_of_magicians) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));
        TempleOfMagicians.setStructure(coords.x, coords.y, coords.z, 0, id);
    } 
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random, id){
    if(random.nextInt(config.structure.House_of_magicians) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));
        HouseOfMagicians.setStructure(coords.x, coords.y, coords.z, 0, id);
    } 
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random, id){
    if(random.nextInt(config.structure.Temple) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));
        Temple.setStructure(coords.x, coords.y, coords.z, 0, id);
        ItemGenerate.fillChestSit(coords.x, coords.y+1, coords.z, random, id);
    } 
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random, id){
    if(random.nextInt(config.structure.Tower_of_evil) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));
        TowerOfEvil.setStructure(coords.x, coords.y, coords.z, 0, id);
        ItemGenerate.fillChestSit(coords.x, coords.y+1, coords.z, random, id);
    } 
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random, id){
    if(random.nextInt(config.structure.Ordinary_temple) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));  
         OrdinaryTemple.setStructure(coords.x, coords.y, coords.z, 0, id);
         ItemGenerate.fillChestSit(coords.x, coords.y+2, coords.z-1, random, id);
         ItemGenerate.fillChestSit(coords.x, coords.y+2, coords.z, random, id);
         ItemGenerate.fillChestSit(coords.x+1, coords.y+2, coords.z, random, id);
         ItemGenerate.fillChestSit(coords.x+1, coords.y+2, coords.z-1, random, id);
    } 
});
Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random, id){
    if(random.nextInt(config.structure.Tower_of_darkness) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));
        ToweraOfDarkness.setStructure(coords.x, coords.y, coords.z, 0, id);
        ItemGenerate.fillChestSit(coords.x, coords.y, coords.z-1, random, id);
        ItemGenerate.fillChestSit(coords.x, coords.y, coords.z+1, random, id);
        ItemGenerate.fillChestSit(coords.x+1, coords.y, coords.z, random, id);
        ItemGenerate.fillChestSit(coords.x-1, coords.y, coords.z, random, id);
    } 
});
let Fortress1 = new DungeonAPI("fortress/1.json");
Fortress1.setPrototype({
    isSetBlock: function(x, y, z, id, data, identifier, packet, dimension){
        if(id == 98){
            switch(packet.random.nextInt(3)){
		            	case 0:
			            	World.setBlock(x, y, z, 98, 0);
			           break;
		          		case 1:
			            	World.setBlock(x, y, z, 98, 1);
		          	 break;
	          			case 2:
			          		World.setBlock(x, y, z, 98, 2);
			           break;
			       }
        }else{
            return true;
        }
    }
});
let Fortress2 = new DungeonAPI("fortress/2.json");
Fortress2.setPrototype({
    isSetBlock: function(x, y, z, id, data, identifier, packet, dimension){
        if(id == 98){
            switch(packet.random.nextInt(3)){
		            	case 0:
			            	World.setBlock(x, y, z, 98, 0);
			           break;
		          		case 1:
			            	World.setBlock(x, y, z, 98, 1);
		          	 break;
	          			case 2:
			          		World.setBlock(x, y, z, 98, 2);
			           break;
			       }
        }else{
            return true;
        }
    }, 
    after: function(x, y, z, rotation, packet, dimension){
        if(World.getBlockID(x-6, y+4, z)!=98){
            if(packet.random.nextInt(100)<=10){
                Fortress1.setStructure(x-6, y, z, 0, dimension, packet);
                if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x-12, y, z, 0,  dimension, packet);
                 }else{
                     Fortress3.setStructure(x-12, y, z, 0,  dimension, packet);
                     ItemGenerate.fillChestSit(x-12, y+1, z, packet.random, dimension);
                 }
            }
        }
        if(World.getBlockID(x+6, y+4, z)!=98){
            if(packet.random.nextInt(100)<=10){
                Fortress1.setStructure(x+6, y, z, 0, dimension, packet);
                if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x+12, y, z, 0,  dimension, packet);
                 }else{
                     Fortress3.setStructure(x+12, y, z, 0,  dimension, packet);
                     ItemGenerate.fillChestSit(x+12, y+1, z, packet.random, dimension);
                 }
            }
        }
        if(World.getBlockID(x, y+4, z+6)!=98){
            if(packet.random.nextInt(100)<=10){
                Fortress1.setStructure(x, y, z+6, 1, dimension, packet);
                if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x, y, z+12, 0,  dimension, packet);
                 }else{
                     Fortress3.setStructure(x, y, z+12, 0,  dimension, packet);
                     ItemGenerate.fillChestSit(x, y+1, z+12, packet.random, dimension);
                 }
            }
        }
        if(World.getBlockID(x, y+4, z-6)!=98){
            if(packet.random.nextInt(100)<=10){
                Fortress1.setStructure(x, y, z-6, 1, dimension, packet);
                if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x, y, z-12, 0, dimension, packet);
                 }else{
                     Fortress3.setStructure(x, y, z-12, 0, dimension, packet);
                     ItemGenerate.fillChestSit(x, y+1, z-12, packet.random, dimension);
                 }
            }
        }
    }
});
let Fortress3 = new DungeonAPI("fortress/3.json");
Fortress3.setPrototype({
    isSetBlock: function(x, y, z, id, data, identifier, packet, dimension){
        if(id == 98){
            switch(packet.random.nextInt(3)){
		            	case 0:
			            	World.setBlock(x, y, z, 98, 0);
			           break;
		          		case 1:
			            	World.setBlock(x, y, z, 98, 1);
		          	 break;
	          			case 2:
			          		World.setBlock(x, y, z, 98, 2);
			           break;
			       }
        }else{
            return true;
        }
    }, 
    after: function(x, y, z, rotation, packet, dimension){
        if(World.getBlockID(x-6, y+4, z)!=98){
            if(packet.random.nextInt(100)<=10){
                Fortress1.setStructure(x-6, y, z, 0, dimension, packet);
                if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x-12, y, z, 0, dimension, packet);
                 }else{
                     Fortress3.setStructure(x-12, y, z, 0, dimension, packet);
                     ItemGenerate.fillChestSit(x-12, y+1, z, packet.random, dimension);
                 }
            }
        }
        if(World.getBlockID(x+6, y+4, z)!=98){
            if(packet.random.nextInt(100)<=10){
                Fortress1.setStructure(x+6, y, z, 0, dimension, packet);
                if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x+12, y, z, 0, dimension, packet);
                 }else{
                     Fortress3.setStructure(x+12, y, z, 0, dimension, packet);
                     ItemGenerate.fillChestSit(x+12, y+1, z, packet.random, dimension);
                 }
            }
        }
        if(World.getBlockID(x, y+4, z+6)!=98){
            if(packet.random.nextInt(100)<=10){
                Fortress1.setStructure(x, y, z+6, 1, dimension, packet);
                if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x, y, z+12, 0, dimension, packet);
                 }else{
                     Fortress3.setStructure(x, y, z+12, 0, dimension, packet);
                     ItemGenerate.fillChestSit(x, y+1, z+12, packet.random, dimension);
                 }
            }
        }
        if(World.getBlockID(x, y+4, z-6)!=98){
            if(packet.random.nextInt(100)<=10){
                Fortress1.setStructure(x, y, z-6, 1, dimension, packet);
                if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x, y, z-12, 0, dimension, packet);
                 }else{
                     Fortress3.setStructure(x, y, z-12, 0, dimension, packet);
                     ItemGenerate.fillChestSit(x, y+1, z-12, packet.random, dimension);
                 }
            }
        }
    }
});
let Fortress0 = new DungeonAPI("fortress/0.json");
Fortress0.setPrototype({
    isSetBlock: function(x, y, z, id, data, identifier, packet, dimension){
        if(id == 98){
            switch(packet.random.nextInt(3)){
		            	case 0:
			            	World.setBlock(x, y, z, 98, 0);
			           break;
		          		case 1:
			            	World.setBlock(x, y, z, 98, 1);
		          	 break;
	          			case 2:
			          		World.setBlock(x, y, z, 98, 2);
			           break;
			       }
        }else{
            return true;
        }
    }, 
    after: function(x, y, z, rotation, packet, dimension){
        if(packet.random.nextInt(1)<=1){
            Fortress1.setStructure(x+6, y-8, z, 0, dimension, packet);
             if(packet.random.nextInt(1)<=1){
                 if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x+12, y-8, z, 0, dimension, packet);
                 }else{
                     Fortress3.setStructure(x+12, y-8, z, 0, dimension, packet);
                     ItemGenerate.fillChestSit(x+12, y-7, z, packet.random, dimension);
                 }
             }
        }
        if(packet.random.nextInt(100)<=40){
            Fortress1.setStructure(x-6, y-8, z, 0, dimension, packet);
            if(packet.random.nextInt(100)<=30){
                 if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x-12, y-8, z, 0, dimension, packet);
                 }else{
                     Fortress3.setStructure(x-12, y-8, z, 0, dimension, packet);
                     ItemGenerate.fillChestSit(x-12, y-7, z, packet.random, dimension);
                 }
            }
        }
        if(packet.random.nextInt(100)<=50){
            Fortress1.setStructure(x, y-8, z+6, 1, dimension, packet);
            if(packet.random.nextInt(100)<=40){
                 if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x, y-8, z-12, 0, dimension, packet);
                 }else{
                     Fortress3.setStructure(x, y-8, z-12, 0, dimension, packet);
                     ItemGenerate.fillChestSit(x, y-7, z-12, packet.random, dimension);
                 }
            }
        }
        if(packet.random.nextInt(100)<=50){
            Fortress1.setStructure(x, y-8, z-6, 1, dimension, packet);
            if(packet.random.nextInt(100)<=40){
                 if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x, y-8, z+12, 0, dimension, packet);
                 }else{
                     Fortress3.setStructure(x, y-8, z+12, 0, dimension, packet);
                     ItemGenerate.fillChestSit(x, y-7, z+12, packet.random, dimension);
                 }
            }
        }
    }
});
Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random, id){
    if(random.nextInt(config.structure.fortress) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));
        Fortress0.setStructure(coords.x, coords.y, coords.z, 0, id, {random: random, rooms: random.nextInt(15)+2});
    } 
});
