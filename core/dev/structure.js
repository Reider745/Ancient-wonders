var ItemGenerate = new ItemGenerate();
ItemGenerate.addItem(ItemID.piece1, 40, {max: 1}, 0);
ItemGenerate.addItem(ItemID.piece2, 40, {max: 1}, 0);
ItemGenerate.addItem(ItemID.piece3, 40, {max: 1}, 0);
ItemGenerate.addItem(ItemID.loreClass1, 20, {max: 1}, 0);
ItemGenerate.addItem(ItemID.loreClass2, 20, {max: 1}, 0);
ItemGenerate.addItem(ItemID.loreClass3, 20, {max: 1}, 0);

ItemGenerate.addItem(264, 10, {max: 3}, 0);
ItemGenerate.addItem(265, 100, {max: 3}, 0);
ItemGenerate.addItem(322, 1, {max: 1}, 0);
ItemGenerate.addItem(266, 10, {max: 3}, 0);
ItemGenerate.addItem(ItemID.rune1, 50, {max: 1}, 0);
ItemGenerate.addItem(ItemID.rune2, 50, {max: 1}, 0);
ItemGenerate.addItem(ItemID.rune3, 50, {max: 1}, 0);
ItemGenerate.addItem(ItemID.sroll6, 20, {max: 1}, 0);
ItemGenerate.addItem(ItemID.sroll4, 20, {max: 1}, 0);
ItemGenerate.addItem(ItemID.sroll9, 20, {max: 1}, 0);
ItemGenerate.addItem(ItemID.sroll1, 10, {max: 1}, 0);
ItemGenerate.addItem(ItemID.sroll2, 10, {max: 1}, 0);
ItemGenerate.addItem(ItemID.sroll3, 10, {max: 1}, 0);
ItemGenerate.addItem(ItemID.sroll7, 5, {max: 1}, 0);
ItemGenerate.addItem(ItemID.sroll5, 5, {max: 1}, 0);


let TowerOfEvil = new DungeonAPI("Tower_of_evil.json");

let OrdinaryTemple = new DungeonAPI("Ordinary_temple.json");

let ToweraOfDarkness = new DungeonAPI("Tower_of_darkness.json");

let Temple = new DungeonAPI("Temple.json");

let HouseOfMagicians = new DungeonAPI("House_of_magicians.json");

let TempleOfMagicians = new DungeonAPI("Temple_of_magicians.json");

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random){
    if(random.nextInt(350) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));
        TempleOfMagicians.setStructure(coords.x, coords.y, coords.z, 0);
    } 
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random){
    if(random.nextInt(350) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));
        HouseOfMagicians.setStructure(coords.x, coords.y, coords.z, 0);
    } 
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random){
    if(random.nextInt(350) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));
        Temple.setStructure(coords.x, coords.y, coords.z, 0);
        ItemGenerate.fillChestSit(coords.x, coords.y+1, coords.z, random);
    } 
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random){
    if(random.nextInt(350) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));
        TowerOfEvil.setStructure(coords.x, coords.y, coords.z, 0);
        ItemGenerate.fillChestSit(coords.x, coords.y+1, coords.z, random);
    } 
});

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random){
    if(random.nextInt(350) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));  
         OrdinaryTemple.setStructure(coords.x, coords.y, coords.z, 0);
         ItemGenerate.fillChestSit(coords.x, coords.y+2, coords.z-1, random);
         ItemGenerate.fillChestSit(coords.x, coords.y+2, coords.z, random);
         ItemGenerate.fillChestSit(coords.x+1, coords.y+2, coords.z, random);
         ItemGenerate.fillChestSit(coords.x+1, coords.y+2, coords.z-1, random);
    } 
});
Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random){
    if(random.nextInt(350) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));
        ToweraOfDarkness.setStructure(coords.x, coords.y, coords.z, 0);
        ItemGenerate.fillChestSit(coords.x, coords.y, coords.z-1, random);
        ItemGenerate.fillChestSit(coords.x, coords.y, coords.z+1, random);
        ItemGenerate.fillChestSit(coords.x+1, coords.y, coords.z, random);
        ItemGenerate.fillChestSit(coords.x-1, coords.y, coords.z, random);
    } 
});
let Fortress1 = new DungeonAPI("fortress/1.json");
Fortress1.setPrototype({
    isSetBlock: function(x, y, z, id, data, identifier, packet){
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
    isSetBlock: function(x, y, z, id, data, identifier, packet){
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
    after: function(x, y, z, rotation, packet){
        if(World.getBlockID(x-6, y+4, z)!=98){
            if(packet.random.nextInt(100)<=10){
                Fortress1.setStructure(x-6, y, z, 0, packet);
                if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x-12, y, z, 0, packet);
                 }else{
                     Fortress3.setStructure(x-12, y, z, 0, packet);
                     ItemGenerate.fillChestSit(x-12, y+1, z, packet.random);
                 }
            }
        }
        if(World.getBlockID(x+6, y+4, z)!=98){
            if(packet.random.nextInt(100)<=10){
                Fortress1.setStructure(x+6, y, z, 0, packet);
                if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x+12, y, z, 0, packet);
                 }else{
                     Fortress3.setStructure(x+12, y, z, 0, packet);
                     ItemGenerate.fillChestSit(x+12, y+1, z, packet.random);
                 }
            }
        }
        if(World.getBlockID(x, y+4, z+6)!=98){
            if(packet.random.nextInt(100)<=10){
                Fortress1.setStructure(x, y, z+6, 1, packet);
                if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x, y, z+12, 0, packet);
                 }else{
                     Fortress3.setStructure(x, y, z+12, 0, packet);
                     ItemGenerate.fillChestSit(x, y+1, z+12, packet.random);
                 }
            }
        }
        if(World.getBlockID(x, y+4, z-6)!=98){
            if(packet.random.nextInt(100)<=10){
                Fortress1.setStructure(x, y, z-6, 1, packet);
                if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x, y, z-12, 0, packet);
                 }else{
                     Fortress3.setStructure(x, y, z-12, 0, packet);
                     ItemGenerate.fillChestSit(x, y+1, z-12, packet.random);
                 }
            }
        }
    }
});
let Fortress3 = new DungeonAPI("fortress/3.json");
Fortress3.setPrototype({
    isSetBlock: function(x, y, z, id, data, identifier, packet){
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
    after: function(x, y, z, rotation, packet){
        if(World.getBlockID(x-6, y+4, z)!=98){
            if(packet.random.nextInt(100)<=10){
                Fortress1.setStructure(x-6, y, z, 0, packet);
                if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x-12, y, z, 0, packet);
                 }else{
                     Fortress3.setStructure(x-12, y, z, 0, packet);
                     ItemGenerate.fillChestSit(x-12, y+1, z, packet.random);
                 }
            }
        }
        if(World.getBlockID(x+6, y+4, z)!=98){
            if(packet.random.nextInt(100)<=10){
                Fortress1.setStructure(x+6, y, z, 0, packet);
                if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x+12, y, z, 0, packet);
                 }else{
                     Fortress3.setStructure(x+12, y, z, 0, packet);
                     ItemGenerate.fillChestSit(x+12, y+1, z, packet.random);
                 }
            }
        }
        if(World.getBlockID(x, y+4, z+6)!=98){
            if(packet.random.nextInt(100)<=10){
                Fortress1.setStructure(x, y, z+6, 1, packet);
                if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x, y, z+12, 0, packet);
                 }else{
                     Fortress3.setStructure(x, y, z+12, 0, packet);
                     ItemGenerate.fillChestSit(x, y+1, z+12, packet.random);
                 }
            }
        }
        if(World.getBlockID(x, y+4, z-6)!=98){
            if(packet.random.nextInt(100)<=10){
                Fortress1.setStructure(x, y, z-6, 1, packet);
                if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x, y, z-12, 0, packet);
                 }else{
                     Fortress3.setStructure(x, y, z-12, 0, packet);
                     ItemGenerate.fillChestSit(x, y+1, z-12, packet.random);
                 }
            }
        }
    }
});
let Fortress0 = new DungeonAPI("fortress/0.json");
Fortress0.setPrototype({
    isSetBlock: function(x, y, z, id, data, identifier, packet){
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
    after: function(x, y, z, rotation, packet){
        if(packet.random.nextInt(1)<=1){
            Fortress1.setStructure(x+6, y-8, z, 0, packet);
             if(packet.random.nextInt(1)<=1){
                 if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x+12, y-8, z, 0, packet);
                 }else{
                     Fortress3.setStructure(x+12, y-8, z, 0, packet);
                     ItemGenerate.fillChestSit(x+12, y-7, z, packet.random);
                 }
             }
        }
        if(packet.random.nextInt(100)<=40){
            Fortress1.setStructure(x-6, y-8, z, 0, packet);
            if(packet.random.nextInt(100)<=30){
                 if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x-12, y-8, z, 0, packet);
                 }else{
                     Fortress3.setStructure(x-12, y-8, z, 0, packet);
                     ItemGenerate.fillChestSit(x-12, y-7, z, packet.random);
                 }
            }
        }
        if(packet.random.nextInt(100)<=50){
            Fortress1.setStructure(x, y-8, z+6, 1, packet);
            if(packet.random.nextInt(100)<=40){
                 if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x, y-8, z-12, 0, packet);
                 }else{
                     Fortress3.setStructure(x, y-8, z-12, 0, packet);
                     ItemGenerate.fillChestSit(x, y-7, z-12, packet.random);
                 }
            }
        }
        if(packet.random.nextInt(100)<=50){
            Fortress1.setStructure(x, y-8, z-6, 1, packet);
            if(packet.random.nextInt(100)<=40){
                 if(packet.random.nextInt(100)<70){
                     Fortress2.setStructure(x, y-8, z+12, 0, packet);
                 }else{
                     Fortress3.setStructure(x, y-8, z+12, 0, packet);
                     ItemGenerate.fillChestSit(x, y-7, z+12, packet.random);
                 }
            }
        }
    }
});
Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random){
    if(random.nextInt(400) < 1){
        let coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16), 96, chunkZ*16 + random.nextInt(16));
        Fortress0.setStructure(coords.x, coords.y, coords.z, 0, {random: random, rooms: random.nextInt(15)+2});
    } 
});