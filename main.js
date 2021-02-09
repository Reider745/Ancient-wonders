/*
BUILD INFO:
  dir: core/dev
  target: main.js
  files: 18
*/



// file: info.js

IMPORT("DungeonAPI");
IMPORT("ToolLib");
Dungeon.setDir("assets/structure");

Callback.addCallback("LevelDisplayed", function() {
   setTimeout(function (){
Game.message(Translation.translate("§2Thank you for downloading the Ancient wonders mod \n§3in the VKontakte group you can follow the development of the mod - https://vk.com/club186544580"));
}, 40);
});
Translation.addTranslation("§2Thank you for downloading the Ancient wonders mod \n§3in the VKontakte group you can follow the development of the mod - https://vk.com/club186544580", {ru: "§2Спасибо что скачали мод Ancient wonders! \n§3в группе ВКонтакте вы сможете следить за развитием мода - https://vk.com/club186544580"});

const config = FileTools.ReadJSON(__dir__+"/config.json");

let prot = {};
let EntityReg = {
    setPrototype: function (type, obj){
        obj.tick = obj.tick || function(ent){};
        obj.damage = obj.damage || function(attacker, victim, damageValue, damageType, someBool1, someBool2){};
        prot[type] = obj;
    },
    getPrototype: function (ent){
        let name = Entity.getTypeName(ent);
        if(prot[name]){
            return prot[name];
        }else{
            return {tick: function(ent){}, damage: function(attacker, victim, damageValue, damageType, someBool1, someBool2){}};
        }
    },
    
};
Callback.addCallback("LocalTick", function(){
    let ents = Entity.getAll();
    for(let i in ents){
        EntityReg.getPrototype(ents[i]).tick(ents[i]);
    }
});
Callback.addCallback('EntityHurt', function (attacker, victim, damageValue, damageType, someBool1, someBool2) {
   EntityReg.getPrototype(victim).damage(attacker, victim, damageValue, damageType, someBool1, someBool2);
});
if(config.beta_mode){
EntityReg.setPrototype("aw:tanatos<>", {
    tick: function(ent){
        if(World.getThreadTime()%20) if(Entity.getTarget(ent) == -1){
            let ents = Entity.getAllInRange(Entity.getPosition(ent), 20);
            let r = Math.floor(Math.random()*(ents.length-1));
            if(Entity.getTypeName(ents[r]) != Entity.getTypeName(ent) && Entity.getTypeName(ents[r]) != "minecraft:item<>") Entity.setTarget(ent, ents[r]);
        }else{
            if(Math.random()<=0.005){
                Wands.emitterEntity(ent, {
                    srollType: ItemID.sroll2,
                    sroll: [ItemID.sroll20]
                });
                Wands.emitterEntity(ent, {
                    srollType: ItemID.sroll2,
                    sroll: [ItemID.sroll20, ItemID.sroll27, ItemID.sroll23]
                });
            }
            if(Math.random()<=0.2){
                Wands.emitterEntity(ent, {
                    srollType: ItemID.sroll2,
                    sroll: [ItemID.sroll22]
                });
            }
        }
    },
    damage: function(attacker, ent, damageValue, damageType, someBool1, someBool2){
        Entity.setTarget(ent, attacker);
        if(damageType == 5){
            Game.prevent();
        }else if(damageType == 3){
            Game.prevent();
        }
        if(Math.random()<=0.2){
            Wands.emitterEntity(ent, {
                srollType: ItemID.sroll2,
                sroll: [ItemID.sroll21]
            });
        }
    }
});
}

function attack(ent){
    let pos = Entity.getPosition(ent);
    pos.y += 5;
    for(let i = 0;i <= Math.floor(Math.random()*5)+5;i++){
        let vel = Entity.getLookVectorByAngle(Entity.getLookAngle(ent));
        vel.x += Math.random() - Math.random();
        vel.y += Math.random() - Math.random();
        vel.z += Math.random() - Math.random();
        for(let i = 0;i<50;i++){
            let coord = {
                x: pos.x+(i * vel.x / 2),
                y: pos.y+(i * vel.y / 2),
                z: pos.z+(i * vel.z / 2)
            };
            let ent3 = Entity.getAllInRange(coord, 4);
            for(let i1 in ent3){
                if(ent3[i1] != ent) MagicCore.damage(ent3[i1], "magic", 40);
            }
             if(World.getBlockID(coord.x,coord.y,coord.z)!=0){
                break;
            }
            Mp.spawnParticle(ParticlesAPI.part3, coord.x, coord.y, coord.z);
        }
    }
}
let entId = {};
EntityReg.setPrototype("aw:skeleton<>", {
    tick: function (ent){
        if(Entity.getTarget(ent) == -1 && World.getThreadTime()%20){
            let ents = Entity.getAllInRange(Entity.getPosition(ent), 20);
            let r = Math.floor(Math.random()*(ents.length-1));
            if(ents[r] != entId[ent] && Entity.getTypeName(ents[r]) != Entity.getTypeName(ent) && Entity.getTypeName(ents[r]) != "minecraft:item<>") Entity.setTarget(ent, ents[r]);
        }else if(Math.random() <= 0.1){
            let pos = Entity.getPosition(ent);
            let vel = Entity.getLookVectorByAngle(Entity.getLookAngle(ent));
            for(let i = 0;i<20;i++){
                let coord = {
                    x: pos.x+(i * vel.x / 2),
                    y: pos.y+1.5+(i * vel.y / 2),
                    z: pos.z+(i * vel.z / 2)
                };
                let ent3 = Entity.getAllInRange(coord, 2);
                for(let i1 in ent3){
                    if(ent3[i1] != ent) MagicCore.damage(ent3[i1], "magic", 4);
                }
                 if(World.getBlockID(coord.x,coord.y,coord.z)!=0){
                    break;
                }
                Mp.spawnParticle(ParticlesAPI.part3, coord.x, coord.y, coord.z);
            }
        }
    },
    damage: function (attacker, ent, damageValue, damageType, someBool1, someBool2){
        let ents = Entity.getAllInRange(Entity.getPosition(ent), 30);
        let r = Math.floor(Math.random()*ents.length-1);
        if(ents[r] != entId[ent]) Entity.setTarget(ent, attacker);
    }
});
EntityReg.setPrototype("aw:boss0<>", {
    tick: function (ent){  
    if(World.getThreadTime()%20){
        if(Math.random()<=0.01){
            Wands.emitterEntity(ent, {
                srollType: ItemID.sroll2,
                sroll: [ItemID.sroll19]
            });
        }
        if(Math.random()<=0.01){
            Wands.emitterEntity(ent, {
                srollType: ItemID.sroll2,
                sroll: [ItemID.sroll5]
            });
        }
        if(Entity.getTarget(ent) != -1){
            if(Math.random()<=0.1){
                Wands.emitterEntity(ent, {
                    srollType: ItemID.sroll2,
                    sroll: [ItemID.sroll18]
                });
            }
            let ents = Entity.findNearest(Entity. getPosition(ent), 1, 4);
            if(ents){
                Entity.setTarget(ent, ents);
                let vel = Entity.getLookVectorByAngle(Entity.getLookAngle(ent));
                Entity.addVelocity(ents, vel.x, vel.y, vel.z);
                Wands.emitterEntity(ent, {
                    srollType: ItemID.sroll2,
                    sroll: [ItemID.sroll16]
                });
                attack(ent);
            }
            ents = Entity.getAllInRange(Entity.getPosition(ent), 30, [1]);
            for(let i in ents){
                let range = Entity.getDistanceToEntity(ent, ents[i], [Entity. getType(Entity.getTarget(ent))]);
                if(range >= 20){
                    if(Math.random()<=0.5){
                        Entity.setTarget(ent, ents[i]);
                        Wands.emitterEntity(ent, {
                            srollType: ItemID.sroll2,
                            sroll: [ItemID.sroll16]
                        });
                        Wands.emitterEntity(ent, {
                            srollType: ItemID.sroll2,
                            sroll: [ItemID.sroll15]
                        });
                    }else{
                        Wands.emitterEntity(ent, {
                            srollType: ItemID.sroll2,
                            sroll: [ItemID.sroll5]
                        });
                    }
                }else{
                    Entity.setTarget(ent, ents[i]);
                }
            }
        }else{
            let ents = Entity.getAllInRange(Entity.getPosition(ent), 35);
            Entity.setTarget(ent, ents[Math.floor(Math.random()*(ents.length-1))]);
        }
      }
    },
    damage: function(attacker, ent, damageValue, damageType, someBool1, someBool2){
        if(attacker) Entity.setTarget(ent, attacker);
        if(damageType == 5){
            Game.prevent();
        }else if(damageType == 3){
            Game.prevent();
        }
        if(Math.random()<=0.2){
            Wands.emitterEntity(ent, {
                srollType: ItemID.sroll2,
                sroll: [ItemID.sroll20]
            });
        }
    }
});
Callback.addCallback('EntityDeath', function (entity, attacker, damageType) {
    if(Entity.getTypeName(entity) == "aw:boss0<>"){
        let B = BlockSource.getDefaultForActor(entity);
        let pos = Entity.getPosition(entity);
        if(Math.random()<=0.2){
            B.spawnDroppedItem(pos.x, pos.y, pos.z, ItemID.sroll17, 1, 0, null);
        }
        if(Math.random()<=0.6){
            B.spawnDroppedItem(pos.x, pos.y, pos.z, ItemID.sroll20, 1, 0, null);
        }
        if(Math.random()<=0.5){
            B.spawnDroppedItem(pos.x, pos.y, pos.z, ItemID.sroll15, 1, 0, null);
        }
        B.spawnDroppedItem(pos.x, pos.y, pos.z, ItemID.sroll16, 1, 0, null);
    }
});




// file: structure.js

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




// file: core/MagisCore.js

Network.addClientPacket("aw.classPlayer", function(packetData) {
    Game.message("§2вы выбрали класс: "+packetData.Class);
    classPlayer[packetData.player] = Class[packetData.Class];
});
Network.addClientPacket("aw.parameterAdd", function(packetData) {
    MagicCore.piece(packetData.player, packetData.parameter);
});
var classPlayer = {};
Saver.addSavesScope("class",
    function read(scope) {
        classPlayer = scope.classPlayer || {};
        Entity.prot = scope.protEntity || {};
        Wands.data = scope.wandData || {};
        //Potion.potions = scope.potion || {};
    },
    function save() {
        return {
            classPlayer: classPlayer,
            protEntity: Entity.prot,
            wandData: Wands.data,
            //potion: Potion.potions
        };
    }
);
const Class = {
    mage: {
        name: "mage", 
        magisMax: 100, 
        magis: 5,
        ProtectionMax: 40,
        Protection: 0,
        necromancerMax: 10,
        necromancer: 0,
        AspectsMax: 100000,
        AspectsNow: 5000,
        Aspects: 0
    }, 
    warrior: {
        name: "warrior", 
        magisMax: 15,
        magis: 0,
        ProtectionMax: 100,
        Protection: 10,
        necromancerMax: 5, 
        necromancer: 0,
        AspectsMax: 10000,
        AspectsNow: 100,
        Aspects: 0
    }, 
    necromancer: {
        name: "necromancer", 
        magisMax: 50,
        magis: 5,
        ProtectionMax: 30,
        Protection: 0,
        necromancerMax: 100,
        necromancer: 5,
        AspectsMax: 50000,
        AspectsNow: 5000,
        Aspects: 0
    }
};
Callback.addCallback("PlayerAttack", function(player){
    let c = MagicCore.getValue(player);
    if(MagicCore.isClass(player)){
        let r = Math.floor(Math.random()*10)
        if(c.Aspects + r <= c.AspectsNow){
            classPlayer[player].Aspects += r;
        }else{
            classPlayer[player].Aspects = c.AspectsNow;
        }
        
    }
});
function delItem(player, item){
    Entity.setCarriedItem(player, item.id, item.count-1, item.data);
}
function delItem2(player, item){
    let pa = new PlayerActor(player);
    if(pa.getGameMode() == 0){
        Entity.setCarriedItem(player, item.id, item.count-1, item.data);
    }
}
var MagicCore = {
    setArmor: function (id, parameter, value){
        Item.registerNameOverrideFunction(id, function(item, name) {
              return name  + "\n требуется: " + parameter + " уровня " + value;
        });
        Armor.registerOnTakeOnListener(id, function(item, slot, player) {
            if(item.id == id){
                let ItemA = new PlayerActor(player);
                let coords = Entity.getPosition(player);
                let c = MagicCore.getValue(player);
                let b = BlockSource.getDefaultForActor(player);
                if(MagicCore.isClass(player)){
                    if(c[parameter] < value){
                        ItemA.setArmor(slot, 0, 0, 0, null);
                        b.spawnDroppedItem(coords.x, coords.y, coords.z, id, 1, item.data, item.extra);
                        PlayerAC.message(player, "нужен " + parameter + " уровня " + value);
                    }/*else{
                        PlayerAC.message(player, "нужен " + parameter + " уровня " + value);
                    }*/
                }else{
                    ItemA.setArmor(slot, 0, 0, 0, null);
                    b.spawnDroppedItem(coords.x, coords.y, coords.z, id, 1, item.data, item.extra);
                }
            }
        });
    }, 
    setUsingItem: function (item, parameter, value){
        Callback.addCallback("ServerPlayerTick", function(player, isPlayerDead){
            let item2 = Entity.getCarriedItem(player);
            let pos = Entity.getPosition(player);
            if(item2.id == item.id){
               if(MagicCore.getValue(player)[parameter] < value){
                   BlockSource.getDefaultForActor(player).spawnDroppedItem(pos.x+Math.random()*2, pos.y-1, pos.z+Math.random()*2, item2.id, item2. count, item2.data, item2.extra);
                   Entity.setCarriedItem(player, 0, 0, 0);
                   PlayerAC.message(player, "нужен " + parameter + " уровня " + value);
               } 
            }
        });
    },
    isClass: function (player){
        let key = Object.keys(classPlayer);
        let obj = {};
        if(classPlayer == {}){
                return false;
        }
        for(i in key){
            let k = key[i];
            obj[k] = true;
        }
        if(obj[player]){
            return true;
        }else{
            return false;
        }
    }, 
    isExistsClass: function (){
        if(classPlayer == {}){
            return false;
        }else{
            return true;
        }
    }, 
    getValue: function (player){
        let o;
        if(this.isClass(player)){
            o = classPlayer[player];
        }else{
            o = {
                name: "noy",
                magisMax: 0,
                magis: 0, 
                ProtectionMax: 0, 
                Protection: 0, 
                necromancerMax: 0, 
                necromancer: 0,
                AspectsMax: 2, 
                AspectsNow: 1, 
                Aspects: 0
            };
        }
        return o;
    }, 
    piece: function(player, parameter){
        if(this.isClass(player)){
            let cv = MagicCore.getValue(player);
            if(cv[parameter] + 1 <= cv[parameter+"Max"]){
                delItem2(player, {id:0,data:0,count:1});
                cv[parameter] += 1;
                PlayerAC.message(player, "§2параметр: "+parameter+" был улучшен на 1, теперь он равен "+cv[parameter]);
                MagicCore.setParameters(player, cv);
            }else{
                PlayerAC.message(player, "§4параметр "+parameter+" максимального уровня");
            }
        }else{
            PlayerAC.message(player, "§4у вас нет класса")
        }
    }, 
    setParameters: function (player, obj){
        if(this.isClass(player)){
            let r = Math.floor(Math.random()*20);
            if(obj.AspectsNow + r <= obj.AspectsMax) obj.AspectsNow += r;
            classPlayer[player] = obj;
            Network.sendToServer("aw.sp", classPlayer);
        }
    },
    armorMagic: {},
    addArmorMagic: function (id, type, value){
        this.armorMagic[id] = {
            type: type,
            value: value
        };
    },
    getArmorMagic: function (ent){
        let arm = {};
        if(this.armorMagic[Entity.getArmorSlot(ent, 0).id]){
            arm.helmet = this.armorMagic[Entity.getArmorSlot(ent, 0).id];
        }else{
            arm.helmet = {
                type: "noy",
                value: 0
            };
        }
        if(this.armorMagic[Entity.getArmorSlot(ent, 1).id]){
            arm.chestplate = this.armorMagic[Entity.getArmorSlot(ent, 1).id];
        }else{
            arm.chestplate = {
                type: "noy",
                value: 0
            };
        }
        if(this.armorMagic[Entity.getArmorSlot(ent, 2).id]){
            arm.leggings = this.armorMagic[Entity.getArmorSlot(ent, 2).id];
        }else{
            arm.leggings = {
                type: "noy",
                value: 0
            };
        }
        if(this.armorMagic[Entity.getArmorSlot(ent, 3).id]){
            arm.boots = this.armorMagic[Entity.getArmorSlot(ent, 3).id];
        }else{
            arm.boots = {
                type: "noy",
                value: 0
            };
        }
        return arm;
    },
    damage: function (ent, type, damage){
        let arm = this.getArmorMagic(ent);
        if(type == "magic"){
            let dmg = damage;
            if(arm.helmet.type == "magic"){
                dmg -= arm.helmet.value || 0;
            }
            if(arm.chestplate.type == "magic"){
                dmg -= arm.chestplate.value || 0;
            }
            if(arm.leggings.type == "magic"){
                dmg -= arm.leggings.value || 0;
            }
            if(arm.boots.type == "magic"){
                dmg -= arm.boots.value || 0;
            }
            if(dmg >= 1) Entity.damageEntity(ent, dmg);
        }else if(type == "dead"){
            let m = "y";
            let dmg = damage;
            if(arm.helmet.type == "dead"){
                m = "n";
                dmg -= arm.helmet.value || 0;
            }
            if(arm.chestplate.type == "dead"){
                m = "n";
                dmg -= arm.chestplate.value || 0;
            }
            if(arm.leggings.type == "dead"){
                m = "n";
                dmg -= arm.leggings.value || 0;
            }
            if(arm.boots.type == "dead"){
                m = "n";
                dmg -= arm.boots.value || 0;
            }
            if(m == "y"){
                Entity.setHealth(ent, 0);
            }else{
                if(dmg >> 0) Entity.damageEntity(ent, dmg);
            }
        }
    }
};
Network.addServerPacket("aw.sp", function(client, data) {
    classPlayer = data;
});
MagicCore.setArmor(310, "Protection", 50);
MagicCore.setArmor(311, "Protection", 50);
MagicCore.setArmor(312, "Protection", 50);
MagicCore.setArmor(313, "Protection", 50);

MagicCore.setArmor(314, "Protection", 40);
MagicCore.setArmor(315, "Protection", 40);
MagicCore.setArmor(316, "Protection", 40);
MagicCore.setArmor(317, "Protection", 40);

MagicCore.setArmor(306, "Protection", 30);
MagicCore.setArmor(307, "Protection", 30);
MagicCore.setArmor(308, "Protection", 30);
MagicCore.setArmor(309, "Protection", 30);

MagicCore.setArmor(302, "Protection", 20);
MagicCore.setArmor(303, "Protection", 20);
MagicCore.setArmor(304, "Protection", 20);
MagicCore.setArmor(305, "Protection", 20);

MagicCore.setArmor(298, "Protection", 10);
MagicCore.setArmor(299, "Protection", 10);
MagicCore.setArmor(300, "Protection", 10);
MagicCore.setArmor(301, "Protection", 10);

MagicCore.setUsingItem({id: 276, data: 0}, "Protection", 45);
MagicCore.setUsingItem({id: 269, data: 0}, "Protection", 5);
MagicCore.setUsingItem({id: 272, data: 0}, "Protection", 15);
MagicCore.setUsingItem({id: 267, data: 0}, "Protection", 25);
MagicCore.setUsingItem({id: 283, data: 0}, "Protection", 30);
MagicCore.setUsingItem({id: 368, data: 0}, "magis", 5);
MagicCore.setUsingItem({id: 381, data: 0}, "magis", 10);
MagicCore.setUsingItem({id: 432, data: 0}, "magis", 20);
MagicCore.setUsingItem({id: 322, data: 0}, "necromancer", 10);
MagicCore.setUsingItem({id: 373, data: 0}, "magis", 30);
MagicCore.setUsingItem({id: 438, data: 0}, "magis", 35);
MagicCore.setUsingItem({id: 441, data: 0}, "magis", 40);




// file: core/TimeAPI.js

function TimerAPI (){
    let tick = 0;
    let active = false;
    this.RegisterFunction = function (time, func, f){
        Callback.addCallback("LocalTick", function(){
            if(active==true){
                if(tick>time){
                    if(f==false){
                        active = false;
                    }
                this.func = func;
                tick = 0;
                func(Player.get());
                }else{
                    tick++;
                }
            }
        });
    }
    this.start = function (){
        active = true;
        tick = 0;
    }
    this.stop = function (){
        active = false;
        tick = 0;
    }
    this.restart = function (){
        tick = 0;
    }
    this.getTick = function (){
        return tick;
    } 
    this.getActive = function (){
        return active;
    }
};




// file: core/renderAPI.js

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




// file: core/ConvertedID.js

var ConverteBlock = {
    textToNumeric: function(id){
        let ids = FileTools.ReadJSON(__packdir__ + "innercore/mods/.staticids");
        let Block = ids.id.blocks[id];
        if(!Block){
            Block = parseInt(id);
        }
        return Block;
    },
    NumericToText: function(id){
        let blocks = FileTools.ReadJSON(__packdir__ + "innercore/mods/.staticids");
        blocks = blocks.id.blocks;
        let d;
        if(id >= 8000){
           key = Object.keys(blocks);
           for(i in key){
               let k = key[i];
               if(blocks[k]==id){
                   d = k;
               }
           }
        }else{
            d = id
        }
        return d;
    }
};
var ConverteItem = {
    textToNumeric: function(id){
        let ids = FileTools.ReadJSON(__packdir__ + "innercore/mods/.staticids");
        let item = ids.id.items[id];
        if(!item){
            item = parseInt(id);
        }
        return item;
    },
    NumericToText: function(id){
        let items = FileTools.ReadJSON(__packdir__ + "innercore/mods/.staticids");
        items = items.id.items;
        let d;
        if(id >= 2000 && id <= 8000){
           key = Object.keys(blocks);
           for(i in key){
               let k = key[i];
               if(items[k]==id){
                   d = k;
               }
           }
        }else{
            d = id
        }
        return d;
    }
};




// file: core/ParticlesAPI.js

Math.sign = Math.sign || function(x) { 
    x = +x;
    if (x === 0) { 
        return x; 
    } 
    return x > 0 ? -0.1 : 0.1; 
}
Network.addClientPacket("aw.particle", function(packetData) {
    Particles.addParticle(packetData.p, packetData.x, packetData.y, packetData.z, packetData.vx, packetData.vy, packetData.vz, packetData.ax, packetData.ay, packetData.az);
});
var Mp = {
    spawnParticle: function (type, x, y, z, vx, vy, vz, ax, ay, az){
            vx = vx || 0;
            vy = vy || 0;
            vz = vz || 0;
            ax = ax || 0;
            ay = ay || 0;
            az = az || 0;
            var players = Network.getConnectedPlayers();
            for(var i in players){
                var client = Network.getClientForPlayer(players[i]);
                if(client){
                    client.send("aw.particle", {p: type, x: x, y: y, z: z, vx: vx, vy: vy, vz: vz, ax: ax, ay: ay, az: az});
                }
            }
        
    }
};
var ParticlesAPI = {
   part1: Particles.registerParticleType({
        texture: "aw_magis",
        render: 2,
        size: [2, 2],
        lifetime:[50, 50],
        animators: {
            alpha:{fadeIn: .4, fadeOut: .4},
            size:{fadeOut: .5, fadeIn:0.2, start:0, end:0}
        }
    }),
    part2: Particles.registerParticleType({
        texture: "aw_magis",
        render: 2,
        size: [2, 2],
        lifetime:[50, 50],
        color: [84, 5, 5, 1],
        animators: {
            alpha:{fadeIn: .4, fadeOut: .4},
            size:{fadeOut: .5, fadeIn:0.2, start:0, end:0}
        }
    }),
    part3: Particles.registerParticleType({
        texture: "aw_magis",
        render: 2,
        size: [2, 2],
        lifetime:[50, 50],
        color: [255, 255, 0, 1],
        animators: {
            alpha:{fadeIn: .4, fadeOut: .4},
            size:{fadeOut: .5, fadeIn:0.2, start:0, end:0}
        }
    }),
    part4: Particles.registerParticleType({
        texture: "aw_magis",
        render: 2,
        size: [2, 2],
        lifetime:[50, 50],
        color: [227, 0, 72, 1],
        animators: {
            alpha:{fadeIn: .4, fadeOut: .4},
            size:{fadeOut: .5, fadeIn:0.2, start:0, end:0}
        }
    }),
    part5: Particles.registerParticleType({
        texture: "aw_magis",
        render: 2,
        size: [2, 2],
        lifetime:[1,1],
        color: [227, 0, 72, 1] 
    }),
    getVector: function (pos1, pos2){
        return {
            x: Math.max(pos1.x, pos2.x)-Math.min(pos1.x, pos2.x),
            y: Math.max(pos1.y, pos2.y)-Math.min(pos1.y, pos2.y),
            z: Math.max(pos1.z, pos2.z)-Math.min(pos1.z, pos2.z)
        };
    },
    coords: function(part, x1, y1, z1, x2, y2, z2, time){
        var vx = -((x1 + 0.5) - (x2 + 0.5)) / time;
        var vy = -((y1 + 0.5) - (y2 + 0.5)) / time;
        var vz = -((z1 + 0.5) - (z2 + 0.5)) / time;
        Mp.spawnParticle(part, x1 + 0.5, y1 + 0.5, z1 + 0.5, vx, vy, vz);
    },
    spawnLine: function (part, x1, y1, z1, x2, y2, z2, count){
        for(i = 0; i<=count;i++){
            var x = x1 + (-(x1 - x2)) * (i / count);
            var y = y1 + (-(y1 - y2)) * (i / count);
            var z = z1 + (-(z1 - z2)) * (i / count);
            Mp.spawnParticle(part, x + 0.5, y + 0.5, z + 0.5, 0, 0, 0);
        }
    },
    spawnCircle: function (particles, x, y, z, radius, count, rotation){
        let angle = 0;
        let step = 360 / count;
        if(rotation == 0){
             for(i = 0;i < 360;i+=step){
                let x1 = x + radius * Math.cos(i);
                let y1 = y - radius * Math.sin(i);
                Mp.spawnParticle(particles, x1 + 0.5, y1 + 0.5, z + 0.5, 0, 0, 0);
            }
        }
        if(rotation == 1){
            for(i = 0;i < 360;i+=step){
                let z1 = z + radius * Math.cos(i);
                let y1 = y - radius * Math.sin(i);
                Mp.spawnParticle(particles, x + 0.5, y1 + 0.5, z1 + 0.5, 0, 0, 0);
            }
        }
        if(rotation == 2){
            for(i = 0;i < 360;i+=step){
                let x1 = x + radius * Math.cos(i);
                let z1 = z - radius * Math.sin(i);
                Mp.spawnParticle(particles, x1 + 0.5, y + 0.5, z1 + 0.5, 0, 0, 0);
            }
        }
    },
    spawnCircleVector: function (time, particle, x, y, z, radius, count){
        let angle = 0;
        let step = 360 / count;
        for(i = 0;i < 360;i+=step){
            let x1 = x + radius * Math.cos(i);
            let z1 = z - radius * Math.sin(i);
            Mp.spawnParticle(particle, x1 + 0.5, y + 0.5, z1 + 0.5, -Math.sign(x1 - x), 0, -Math.sign(z1 - z));
        }
    },
    spawnShellEnt: function (part, ent, distante, damage){
        let pos = Entity.getPosition(ent);
        let vel = Entity.getLookVectorByAngle(Entity.getLookAngle(ent));
        for(let i = 0;i<distante;i++){
            let coord = {
                x: pos.x+(i * vel.x / 2),
                y: pos.y+0.5+(i * vel.y / 2),
                z: pos.z+(i * vel.z / 2)
            };
            let ent3 = Entity.getAllInRange(coord, 2);
            for(let i1 in ent3){
                if(ent3[i1] != ent) MagicCore.damage(ent3[i1], "magic", damage);
            }
             if(BlockSource.getDefaultForActor(ent).getBlockId(coord.x,coord.y,coord.z)!=0){
                break;
            }
            Mp.spawnParticle(part, coord.x, coord.y, coord.z);
        }
    },
    spawnCircle2: function (particles, x, y, z, radius, count, time){
        let circle = 0;
        for(let i = 0;i<=count;i++){
            setTimeout(function(){
                let x1 = x + radius * Math.cos(circle);
                let z1 = z - radius * Math.sin(circle);
                Mp.spawnParticle(particles, x1 + 0.5, y + 0.5, z1 + 0.5, 0, 0, 0);
                circle+=360/count/i;
            }, time * i * 2);
        }
    },
};




// file: core/AncientWonders.js

let AncientWonders = {
    registerClass: function(data){
        let obj = {};
        obj.magisMax = data.magicMax || 0;
        obj.magis = data.magic || 0;
        obj.ProtectionMax = data.protectionMax || 0;
        obj.Protection = data.protectionMax || 0;
        obj.necromancerMax = data.necromancerMax || 0;
        obj.necromancer = data.necromancer || 0;
        obj.AspectsMax = data.aspectsMax || 0;
        obj.AspectsNow = data.aspectsNow || 0;
        obj.Aspects = data.aspects || 0;
        obj.name = data.name || "error";
        
        Class[data.name] = obj;
    },
    getDir: function(){
        return __dir__;
    }
};




// file: core/EffectAPI.js

let EffectAPI = {
    effect: {},
    entity: {},
    register: function(obj){
        obj.tick = obj.tick || function(e, t, l){};
        obj.over = obj.over || function(e, l){};
        this.effect[obj.id] = obj;
    },
    add: function(ent, id, time, level){
        if(!this.entity[ent]) this.entity[ent] = {};
        if(this.entity[ent][id]){
            this.entity[ent][id].time = time;
            this.entity[ent][id].level = level;
            this.entity[ent][id].tick = this.effect[id].tick;
            this.entity[ent][id].over = this.effect[id].over;
        }else{
            this.entity[ent][id] = {};
            this.entity[ent][id].time = time;
            this.entity[ent][id].level = level;
            this.entity[ent][id].tick = this.effect[id].tick;
            this.entity[ent][id].over = this.effect[id].over;
        }
    },
    clear: function(ent, id){
        if(typeof id == "string"){
            this.entity[ent][id].over(ent, this.entity[ent][id].level);
            delete this.entity[ent][id];
        }else{
            Entity.clearEffect(ent, id)
        }
    },
    clearAll: function(ent){
        Entity.clearEffects(ent);
        let effects = Object.keys(this.entity[ent]);
        for(let i in effects){
            let obj = this.entity[ent][effects[i]];
            obj.over(ent, obj.level);
        }
        this.entity[ent] = {};
    },
    getEntity: function (ent){
        return this.entity[ent] || {};
    }
};
Callback.addCallback("LocalTick", function(){
    let ents = Object.keys(EffectAPI.entity);
    for(let i in ents){
        let effects = Object.keys(EffectAPI.entity[ents[i]]);
        for(let e in effects){
            let obj = EffectAPI.entity[ents[i]][effects[e]];
            obj.time--;
            obj.tick(parseInt(ents[i]), obj.time, obj.level);
            if(obj.time <= 0){
                obj.over(parseInt(ents[i]), obj.level)
                EffectAPI.clear(ents[i], effects[e]);
            }
        }
    }
});

EffectAPI.register({
    id: "aspects",
    tick: function(ent, time, level){
        if(MagicCore.isClass(ent)){
            let obj = MagicCore.getValue(ent);
            let r = Math.floor(Math.random()*(1*level));
            if(obj.Aspects + r <= obj.AspectsNow) obj.Aspects += r;
            classPlayer[ent] = obj;
            Network.sendToServer("aw.sp", classPlayer);
        }
    }
});
EffectAPI.register({
    id: "fly",
    tick: function(ent, time, level){
        PlayerAC.setFly(ent, true);
    },
    over: function(ent, level){
        PlayerAC.setFly(ent, false);
    }
});




// file: items/item.js

IDRegistry.genItemID("piece1"); 
Item.createItem("piece1", "Piece of Knowledge: Magic", {name: "piece", meta: 0}, {stack: 1});
Translation.addTranslation("Piece of Knowledge: Magic", {ru: "Кусок знания: магии"});

IDRegistry.genItemID("piece2"); 
Item.createItem("piece2", "Piece of Knowledge: Protection", {name: "piece", meta: 0}, {stack: 1});
Translation.addTranslation("Piece of Knowledge: Protection", {ru: "Кусок знания: защиты"});

IDRegistry.genItemID("piece3"); 
Item.createItem("piece3", "Piece of Knowledge: Necromancy", {name: "piece", meta: 0}, {stack: 1});
Translation.addTranslation("Piece of Knowledge: Necromancy", {ru: "Кусок знания: некромантии"});

IDRegistry.genItemID("loreClass1"); 
Item.createItem("loreClass1", "class lore: mage", {name: "piece", meta: 0}, {stack: 1});
Translation.addTranslation("class lore: mage", {ru: "знания класса: маг"});
Item.setGlint(ItemID.loreClass1, true);

IDRegistry.genItemID("loreClass2"); 
Item.createItem("loreClass2", "Class Lore: Warrior", {name: "piece", meta: 0}, {stack: 1});
Translation.addTranslation("Class Lore: Warrior", {ru: "знания класса: воин"});
Item.setGlint(ItemID.loreClass2, true);

IDRegistry.genItemID("loreClass3"); 
Item.createItem("loreClass3", "class lore: necromancer", {name: "piece", meta: 0}, {stack: 1});
Translation.addTranslation("class lore: necromancer", {ru: "знания класса: некромант"});
Item.setGlint(ItemID.loreClass3, true);

Item.registerUseFunctionForID(ItemID.piece1, function(coords, item, block, player) {
    var client = Network.getClientForPlayer(player);
    if(client != null){
        client.send("aw.parameterAdd", {
                player: player, 
                parameter:  "magis"
        });
    }
});
Item.registerUseFunctionForID(ItemID.piece2, function(coords, item, block, player) {
    var client = Network.getClientForPlayer(player);
    if(client != null){
        client.send("aw.parameterAdd", {
                player: player, 
                parameter:  "Protection"
        });
    }
});
Item.registerUseFunctionForID(ItemID.piece3, function(coords, item, block, player) {
    var client = Network.getClientForPlayer(player);
    if(client != null){
        client.send("aw.parameterAdd", {
                player: player, 
                parameter:  "necromancer"
        });
    }
});

Item.registerUseFunctionForID(ItemID.loreClass1, function(coords, item, block, player) {
    alert(player);
    var client = Network.getClientForPlayer(player);
    if(client != null){
        if(!MagicCore.isClass(player)){
            classPlayer[player] = Class["mage"];
            delItem(player, {id:0,data:0,count:1}) ;
            client.send("aw.classPlayer", {
                player: player, 
                Class:  "mage"
            });
        }else{
            PlayerAC.message(player, "§4вы не можете поменять класс");
        }
    }
});
Item.registerUseFunctionForID(ItemID.loreClass2, function(coords, item, block, player) {
    var client = Network.getClientForPlayer(player);
    if(client != null){
        if(!MagicCore.isClass(player)){
            classPlayer[player] = Class["warrior"];
            delItem(player, {id:0,data:0,count:1}) ;
            client.send("aw.classPlayer", {
                player: player, 
                Class:  "warrior"
            });
        }else{
            PlayerAC.message(player, "§4вы не можете поменять класс");
        }
    }
});
Item.registerUseFunctionForID(ItemID.loreClass3, function(coords, item, block, player) {
    var client = Network.getClientForPlayer(player);
    if(client != null){
        if(!MagicCore.isClass(player)){
            classPlayer[player] = Class["necromancer"];
            delItem(player, {id:0,data:0,count:1}) ;
            client.send("aw.classPlayer", {
                player: player, 
                Class:  "necromancer"
            });
        }else{
            PlayerAC.message(player, "§4вы не можете поменять класс");
        }
    }
});
if(config.beta_mode){
IDRegistry.genItemID("potionAw"); 
Item.createFoodItem("potionAw", "potion", {name: "potion", meta: 0}, {stack: 1, food: 0});
Translation.addTranslation("potion", {ru: "зелье"});

Item.registerNameOverrideFunction(ItemID.potionAw, function(item, name) {
    let extra = item.extra || new ItemExtraData();
    let arr = Potion.potions["p"+(extra.getInt("pot", -1))] || [];
    for(let i in arr){
        name = name + "\n " + Item.getName(arr[i].id) + " * " + arr[i].count;
    }
    return name;
});
}
Callback.addCallback("FoodEaten", function(food, ratio, player){
    let item = Entity.getCarriedItem(player);
    let extra = item.extra || new ItemExtraData();
    if(item.id == ItemID.potionAw){
        let arr = Potion.potions["p"+(extra.getInt("pot", -1))] || [];
        for(let i in arr){
            let obj = arr[i];
            let packet = {
                arr: arr,
                item: item,
                extra: extra,
                i: parseInt(i),
                level: 1,
                time: 10,
                player: player,
                x3: false 
            };
             Potion.items[obj.id].setFunction(packet);
        }
    }
});

IDRegistry.genItemID("rune1"); 
Item.createItem("rune1", "fire rune", {name: "rune", meta: 1}, {stack: 1});
Translation.addTranslation("fire rune", {ru: "руна огня"});
Item.setGlint(ItemID.rune1, true);

IDRegistry.genItemID("rune2"); 
Item.createItem("rune2", "Earth rune", {name: "rune", meta: 2}, {stack: 1});
Translation.addTranslation("Earth rune", {ru: "руна земли"});
Item.setGlint(ItemID.rune2, true);

IDRegistry.genItemID("rune3"); 
Item.createItem("rune3", "Wind rune", {name: "rune", meta: 3}, {stack: 1});
Translation.addTranslation("Wind rune", {ru: "руна ветра"});
Item.setGlint(ItemID.rune3, true);

IDRegistry.genItemID("rune4"); 
Item.createItem("rune4", "The rune of light", {name: "rune", meta: 4}, {stack: 1});
Translation.addTranslation("The rune of light", {ru: "руна света"});
Item.setGlint(ItemID.rune4, true);

IDRegistry.genItemID("rune5"); 
Item.createItem("rune5", "Rune of darkness", {name: "rune", meta: 5}, {stack: 1});
Translation.addTranslation("Rune of darkness", {ru: "руна тьмы"});
Item.setGlint(ItemID.rune5, true);

IDRegistry.genItemID("rune6"); 
Item.createItem("rune6", "Rune copying", {name: "rune", meta: 6}, {stack: 1});
Translation.addTranslation("Rune copying", {ru: "Руна копирование"});
Item.setGlint(ItemID.rune6, true);

Item.addCreativeGroup("rune", Translation.translate("rune", {ru: "руны"}), [
    ItemID.rune1,
    ItemID.rune2,
    ItemID.rune3,
    ItemID.rune4, 
    ItemID.rune5, 
    ItemID.rune6
]);

IDRegistry.genItemID("magis_stick"); 
Item.createItem("magis_stick", "magis stick", {name: "magis_stick", meta: 0}, {stack: 1});
Translation.addTranslation("magis stick", {ru: "магичиская палка"});

IDRegistry.genItemID("magis_sword"); 
Item.createItem("magis_sword", "magic sword", {name: "magis_sword", meta: 0}, {stack: 1});
Translation.addTranslation("magic sword", {ru: "магический меч"});

IDRegistry.genItemID("magis_pocox"); 
Item.createItem("magis_pocox", "magic staff", {name: "magis_pocox", meta: 0}, {stack: 1});
Translation.addTranslation("magic staff", {ru: "магический посох"});

IDRegistry.genItemID("sroll1"); 
Item.createItem("sroll1", "Scroll: use on a block", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: use on a block", {ru: "свиток: использование на блоке"});

IDRegistry.genItemID("sroll2"); 
Item.createItem("sroll2", "Scroll: use on a player", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: use on a player", {ru: "свиток: использование на игроке"});

IDRegistry.genItemID("sroll3"); 
Item.createItem("sroll3", "Scroll: use when attacking", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: use when attacking", {ru: "свиток: использование при атаке"});

IDRegistry.genItemID("sroll4"); 
Item.createItem("sroll4", "Scroll: Damage Level 1", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: Damage Level 1", {ru: "свиток: урона 1 уровня"});

IDRegistry.genItemID("sroll10"); 
Item.createItem("sroll10", "Scroll: Damage Level 2", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: Damage Level 2", {ru: "свиток: урона 2 уровня"});

IDRegistry.genItemID("sroll11"); 
Item.createItem("sroll11", "Scroll: Damage Level 3", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: Damage Level 3", {ru: "свиток: урона 3 уровня"});
Item.setGlint(ItemID.sroll11, true);

IDRegistry.genItemID("sroll5"); 
Item.createItem("sroll5", "Scroll: Speed", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: Speed", {ru: "свиток: скорости"});

IDRegistry.genItemID("sroll6"); 
Item.createItem("sroll6", "Scroll: Healing Level 1", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: Healing Level 1", {ru: "свиток: лечения уровня 1"});

IDRegistry.genItemID("sroll12"); 
Item.createItem("sroll12", "Scroll: Healing Level 2", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: Healing Level 2", {ru: "свиток: лечения уровня 2"});

IDRegistry.genItemID("sroll13"); 
Item.createItem("sroll13", "Scroll: Healing Level 3", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: Healing Level 3", {ru: "свиток: лечения уровня 3"});
Item.setGlint(ItemID.sroll13, true);

IDRegistry.genItemID("sroll7"); 
Item.createItem("sroll7", "Scroll: Strength", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: Strength", {ru: "свиток: силы"});

IDRegistry.genItemID("sroll8"); 
Item.createItem("sroll8", "Scroll: Kills", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: Kills", {ru: "свиток: убийства"});
Item.setGlint(ItemID.sroll8, true);

IDRegistry.genItemID("sroll9"); 
Item.createItem("sroll9", "Scroll: Block Destruction", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: Block Destruction", {ru: "свиток: разрушения блока"});

IDRegistry.genItemID("sroll14"); 
Item.createItem("sroll14", "Scroll: Block Absorption", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: Block Absorption", {ru: "свиток: поглощения блока"});

IDRegistry.genItemID("sroll15"); 
Item.createItem("sroll15", "Scroll: teleportations", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: teleportations", {ru: "свиток: телепортации"});
Item.setGlint(ItemID.sroll15, true);

IDRegistry.genItemID("sroll16"); 
Item.createItem("sroll16", "scroll: storms", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("scroll: storms", {ru: "свиток: бури"});

IDRegistry.genItemID("sroll18"); 
Item.createItem("sroll18", "Scroll: Weak Attack", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: Weak Attack", {ru: "свиток: слабая атака"});

IDRegistry.genItemID("sroll17"); 
Item.createItem("sroll17", "Scroll: Strong Attack", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: Strong Attack", {ru: "свиток: сильной атаки"});
Item.setGlint(ItemID.sroll17, true);

IDRegistry.genItemID("sroll19"); 
Item.createItem("sroll19", "Scroll: Regeneration", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: Regeneration", {ru: "свиток: регенерации"});

IDRegistry.genItemID("sroll20"); 
Item.createItem("sroll20", "scroll: magnet", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("scroll: magnet", {ru: "свиток: магнит"});
Item.setGlint(ItemID.sroll20, true);

IDRegistry.genItemID("sroll21"); 
Item.createItem("sroll21", "scroll: summoning", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("scroll: summoning", {ru: "свиток: призыва"});

IDRegistry.genItemID("sroll22"); 
Item.createItem("sroll22", "Scroll: Death Ray", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: Death Ray", {ru: "свиток: луч смерти"});

IDRegistry.genItemID("sroll23"); 
Item.createItem("sroll23", "scroll: rain of the dead", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("scroll: rain of the dead", {ru: "свиток: дождь мёртвых"});
Item.setGlint(ItemID.sroll23, true);

IDRegistry.genItemID("sroll24"); 
Item.createItem("sroll24", "Scroll: Charge Aspects Level 1", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: Charge Aspects Level 1", {ru: "свиток: заряд аспектами 1 уровень"});

IDRegistry.genItemID("sroll25"); 
Item.createItem("sroll25", "Scroll: Charge Aspects Level 2", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: Charge Aspects Level 2", {ru: "свиток: заряд аспектами 2 уровень"});
Item.setGlint(ItemID.sroll25, true);

IDRegistry.genItemID("sroll26"); 
Item.createItem("sroll26", "Scroll: Explosive Strike", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("Scroll: Explosive Strike", {ru: "свиток: взрывной удар"});

IDRegistry.genItemID("sroll29"); 
Item.createItem("sroll29", "scroll: cleansing", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("scroll: cleansing", {ru: "свиток: очищения"});

IDRegistry.genItemID("sroll30"); 
Item.createItem("sroll30", "scroll: flight", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("scroll: flight", {ru: "свиток: полёта"});

IDRegistry.genItemID("sroll27"); 
Item.createItem("sroll27", "scroll: 0.5 second delays", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("scroll: 0.5 second delays", {ru: "свиток: задержки на 0.5 секунды"});

IDRegistry.genItemID("sroll28"); 
Item.createItem("sroll28", "scroll: 1 second delays", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("scroll: 1 second delays", {ru: "свиток: задержки на 1 секунды"});

//декоративные заклинания 

IDRegistry.genItemID("decor1"); 
Item.createItem("decor1", "decoration scroll: storm", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("decoration scroll: storm", {ru: "свиток декорации: буря"});

IDRegistry.genItemID("decor2"); 
Item.createItem("decor2", "decoration scroll: field", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("decoration scroll: field", {ru: "свиток декорации: поле"});

IDRegistry.genItemID("decor3"); 
Item.createItem("decor3", "decoration scroll: swarm", {name: "sroll", meta: 0}, {stack: 1});
Translation.addTranslation("decoration scroll: swarm", {ru: "свиток декорации: рой"});

IDRegistry.genItemID("pelmeni"); 
Item.createFoodItem("pelmeni", "dumplings", {name: "dumplings", meta: 0}, {stack: 16, food: 10, isTech: true});
Translation.addTranslation("dumplings", {ru: "кастрюля пельмений"});

if(config.beta_mode){
IDRegistry.genItemID("tanatos"); 
Item.createItem("tanatos", "Tanathos stone", {name: "tanatos", meta: 0}, {stack: 1});
Translation.addTranslation("Tanathos stone", {ru: "камень Танатоса"});
Callback.addCallback("ItemUse", function(coords, item, block, isExter, player){
    if(item.id == ItemID.tanatos){
       for(let i = 0;i <= 10;i++){
            ParticlesAPI.spawnCircle(ParticlesAPI.part4, coords.x, coords.y+1, coords.z, i / 2, 11 * i, 2);
       }
       let bs = BlockSource.getDefaultForActor(player);
       let mob = bs.spawnEntity(coords.x, coords.y + 1, coords.z, "aw:tanatos");
       delItem(player, item);
       Entity.setCarriedItem(mob, ItemID. deadAw, 1, 0);
    }
});
}
IDRegistry.genItemID("aw_amylet");
Item.createArmorItem("aw_amylet", "mysterious amulet" , {name: "aw_poic", meta: 0}, {type: "helmet", armor: 2, durability: 699, texture: "armor/noy.png"}); 
Translation.addTranslation("mysterious amulet", {ru: "таинственный амулет"});
Item.setEnchantType(ItemID.aw_amylet, Native.EnchantType.helmet, 14);
Item.addRepairItemIds(ItemID.aw_amylet, [334]);

Armor.registerOnTakeOffListener(ItemID.aw_amylet, function(item, slot, player) {
    MagicCore.getValue(player).magis-=5;
});
Armor.registerOnTakeOnListener(ItemID.aw_amylet, function(item, slot, player) {
    MagicCore.getValue(player).magis+=5;

});
MagicCore.addArmorMagic(ItemID.aw_amylet, "magic", 5);
IDRegistry.genItemID("aw_amylet2");
Item.createArmorItem("aw_amylet2", "mysterious amulet" , {name: "aw_poic", meta: 1}, {type: "helmet", armor: 2, durability: 699, texture: "armor/noy.png"}); 
Translation.addTranslation("mysterious amulet", {ru: "таинственный амулет"});
Item.setEnchantType(ItemID.aw_amylet2, Native.EnchantType.helmet, 14);
Item.addRepairItemIds(ItemID.aw_amylet2, [334]);
MagicCore.addArmorMagic(ItemID.aw_amylet2, "dead", 10);


Armor.registerOnTakeOffListener(ItemID.aw_amylet2, function(item, slot, player) {
    MagicCore.getValue(player).necromancer-=5;
});
Armor.registerOnTakeOnListener(ItemID.aw_amylet2, function(item, slot, player) {
    MagicCore.getValue(player).necromancer+=5;

});
IDRegistry.genItemID("aw_amylet3");
Item.createArmorItem("aw_amylet3", "mysterious amulet" , {name: "aw_poic", meta: 2}, {type: "helmet", armor: 2, durability: 699, texture: "armor/noy.png"}); 
Translation.addTranslation("mysterious amulet", {ru: "таинственный амулет"});
Item.setEnchantType(ItemID.aw_amylet3, Native.EnchantType.helmet, 14);
Item.addRepairItemIds(ItemID.aw_amylet3, [334]);

Armor.registerOnTakeOffListener(ItemID.aw_amylet3, function(item, slot, player) {
    MagicCore.getValue(player).Protection-=5;
});
Armor.registerOnTakeOnListener(ItemID.aw_amylet3, function(item, slot, player) {
    MagicCore.getValue(player).Protection+=5;

});
IDRegistry.genItemID("aw_amylet4");
Item.createArmorItem("aw_amylet4", "mysterious amulet" , {name: "aw_poic", meta: 3}, {type: "helmet", armor: 2, durability: 699, texture: "armor/noy.png"}); 
Translation.addTranslation("mysterious amulet", {ru: "таинственный амулет"});
Item.setEnchantType(ItemID.aw_amylet4, Native.EnchantType.helmet, 14);
Item.addRepairItemIds(ItemID.aw_amylet4, [334]);
MagicCore.addArmorMagic(ItemID.aw_amylet4, "magic", 5);

Armor.registerOnTickListener(ItemID.aw_amylet4, function(item, slot, player) {
    if(Math.random()<=0.05){
        let c = MagicCore.getValue(player);
        if(c.AspectsNow >= c.Aspects + 2) c.Aspects+=2;
    }
});

if(config.beta_mode){
IDRegistry.genItemID("beltAw");
Item.createArmorItem("beltAw", "mysterious belt" , {name: "aw_poic", meta: 4}, {type: "leggings", armor: 2, durability: 699, texture: "armor/noy.png"}); 
Translation.addTranslation("mysterious belt", {ru: "таинственный пояс"});
Item.setEnchantType(ItemID.beltAw, Native.EnchantType.leggings, 14);
Item.addRepairItemIds(ItemID.beltAw, [334]);
MagicCore.addArmorMagic(ItemID.beltAw, "dead", 20);

IDRegistry.genItemID("deadAw"); 
Item.createItem("deadAw", "scythe of death", {name: "deadAw", meta: 0}, {stack: 1});
Translation.addTranslation("scythe of death", {ru: "коса смерти"});

ToolAPI.addToolMaterial("godDead", {
    durability: 3000,
    level: 5,
    efficiency: 6,
    damage: 15,
    enchantability: 14
});
ToolLib.setTool(ItemID["deadAw"], "godDead", ToolType.sword);
}

Item.addCreativeGroup("sroll1", Translation.translate("events", {ru: "события"}), [
	  ItemID.sroll1,
	  ItemID.sroll2,
	  ItemID.sroll3,
]);
Item.addCreativeGroup("sroll2", Translation.translate("srolls", {ru: "свитки"}), [
	  ItemID.sroll4,
	  ItemID.sroll5,
	  ItemID.sroll6,
	  ItemID.sroll7,
	  ItemID.sroll8,
	  ItemID.sroll9,
	  ItemID.sroll10,
	  ItemID.sroll11,
	  ItemID.sroll12,
	  ItemID.sroll13,
	  ItemID.sroll14,
	  ItemID.sroll15,
	  ItemID.sroll16,
	  ItemID.sroll17,
	  ItemID.sroll18,
	  ItemID.sroll19,
	  ItemID.sroll20,
	  ItemID.sroll21,
	  ItemID.sroll22,
	  ItemID.sroll23,
	  ItemID.sroll24,
	  ItemID.sroll25,
	  ItemID.sroll26,
	  ItemID.sroll29,
	  ItemID.sroll27,
	  ItemID.sroll28,
	  ItemID.sroll29,
	  ItemID.sroll30,
]);
Item.addCreativeGroup("decor", Translation.translate("decor", {ru: "декоративные заклинания"}), [
	  ItemID.decor1,
	  ItemID.decor2,
	  ItemID.decor3,
]);




// file: items/book.js

IDRegistry.genItemID("bookk"); 
Item.createItem("bookk", "Class book", {name: "book", meta: 0}, {stack: 1});
Translation.addTranslation("Class book", {ru: "книга класса"});
let guiBookPlayer = {};
Network.addClientPacket("aw.open", function(packetData) {
    let con = BookAPI.getCont(packetData.player).con;
    let gui = BookAPI.getGui(packetData.player).gui;
    con.openAs(gui);
});
let BookAPI = {
    container: {},
    is: function (player, obj){
        let key = Object.keys(obj);
        if(obj == {}){
                return false;
        }
        for(i in key){
            if(key[i] == player){
                return true;
            }else{
                return false;
            }
        }
    }, 
    getCont: function (c) {
        if(!this.is(c, this.container)){
            this.container[c] = {
                con: new UI.Container()
            };
        }
        return this.container[c];

    }, 
    getGui: function(player){
        let c = MagicCore.getValue(player);
            guiBookPlayer[player] = {
                name: "gui",
                gui: new UI.StandartWindow({
            standart: {
                background: {
                   bitmap: "book_background",
                   color: android.graphics.Color.argb(256, 0, 0, 0),
                }
            },
            drawing: [],
            elements: {
                "close": {type: "closeButton", x: 930, y: 10,
bitmap: "btn_close", scale: 3}, 
                "text0": {type: "text", x: 50, y: 40, text: "характеристики вашего персонажа", font: {size: 20}},
                "text1": {type: "text", x: 50, y: 80, text: "ваш класс: "+c.name, font: {size: 15}}, 
                "text2": {type: "text", x: 50, y: 120, text: "магия: "+c.magis+"/"+c.magisMax, font: {size: 15}}, 
                "text3": {type: "text", x: 50, y: 160, text: "защита: "+c.Protection+"/"+c.ProtectionMax, font: {size: 15}}, 
                "text4": {type: "text", x: 50, y: 200, text: "некромантия: "+c.necromancer+"/"+c.necromancerMax, font: {size: 15}}, 
                "text5": {type: "text", x: 50, y: 240, text: "аспекты: "+c.AspectsNow+"/"+c.AspectsMax, font: {size: 15}}, 
            }, 
        })
            };
        return guiBookPlayer[player];
    }, 
    open: function(player){
        let client = Network.getClientForPlayer(player);
        if(client){
            client.send("aw.open", {
                player: player
            }); 
        }
    }
};
Callback.addCallback("ItemUse", function(coords, item, block, isExternal, player){
    if(item.id == ItemID.bookk && block.id != BlockID.MagicConnector && block.id != BlockID.magicController){
    var client = Network.getClientForPlayer(player);
        if(client) {
            if(Entity.getSneaking(player)==false){
                if(block.id != BlockID.rityalPedestal){
                BookAPI.open(player);
                } 
          }else{
            let c = MagicCore.getValue(player);
               PlayerAC.message(player, c.Aspects + "/" + c.AspectsNow);
            }
        }
    }
});




// file: items/MagicWand.js

const setTimeout = function(func, ticks){
    var upd = {
        ticks: 0,
        update: function(){
            this.ticks++
            if(this.ticks >= ticks){
                func();
                this.remove = true
            }
        }
    };
    Updatable.addUpdatable(upd);
}
var Wands = {
    prot: {},
    stick: {},
    data: {},
    icon: [],
    addStick: function(obj){
        obj.bonus = obj.bonus || {};
        obj.bonus.necromancer = obj.bonus.necromancer || 0;
        obj.bonus.Protection = obj.bonus.Protection || 0;
        obj.bonus.magis = obj.bonus.magis || 0;
        obj.bonus.aspects = obj.bonus.aspects || 0;
        this.stick[obj.id] = obj;
        Item.setToolRender(obj.id, true);
        Item.setMaxUseDuration(obj.id, obj.time);
        Item.setUseAnimation(obj.id, Native.ItemAnimation.bow);
        Item.registerIconOverrideFunction(obj.id, function(item, name){
            let extra = item.extra || new ItemExtraData();
            let texture = {
                name: extra.getString("texture", obj.texture.name || "noy"),
                meta: extra.getInt("meta", obj.texture.meta || 0),
            };
            return {name: texture.name, meta: texture.meta}

        });
        Item.registerNameOverrideFunction(obj.id, function(item, name) {
            item.extra = item.extra || new ItemExtraData();
              name = name + "\n " + Translation.translate(Item.getName(item.extra.getInt("event", 0), 0));
              let prot1 = Wands.getSpell(item.extra.getInt("spell", -1));
              for(let i in prot1){
                  name = name + "\n " + Translation.translate(Item.getName(Wands.getItemId(prot1[i]), 0));
              }
              return name;
        });
    },
    addIcon: function(id, name, meta){
        this.icon.push({
            name: name,
            meta: meta,
            id: id
        });
    },
    addIconAll: function(name, meta){
        let keys = Object.keys(this.stick);
        for(let i in keys){
            this.addIcon(parseInt(keys[i]), name, meta);
        }
    },
    getIconArr: function(id){
        if(this.stick[id]){
            let arr = [];
            arr[0] = {
                name: this.stick[id].texture.name || "noy",
                meta: this.stick[id].texture.meta || 0
            };
            for(let i in this.icon){
                if(id == this.icon[i].id) arr.push(this.icon[i]);
            }
            return arr;
        }else{
            return [];
        }
    },
    addEvent: function(item, player, name, packet){
        if(this.stick[item.id]){
            let extra = item.extra || new ItemExtraData();
            let prot = this.getPrototype(extra.getInt("event", 0));
            if(extra.getInt("event", 0)==0){
                PlayerAC.message(player, "нельзя использовать пустое заклинание");
            }
            let prot1 = this.getSpell(extra.getInt("spell", -1));
            if(prot.event == name){
                let time = 0;
                for(let i in prot1){
                    if(this.isCompatibility(extra.getInt("event", 0), this.getItemId(prot1[i]))){
                     let c = MagicCore.getValue(player);
                     let w = this.getStick(item.id);
                     let prot2 = this.getPrototype(this.getItemId(prot1[i]));
                     if(c.necromancer >= prot2.activate.necromancer - w.bonus.necromancer){
                        if(c.magis >= prot2.activate.magis - w.bonus.magis){
                            if(c.Protection >= prot2.activate.Protection - w.bonus.Protection){
                                if(c.Aspects >= prot2.activate.aspects - w.bonus.aspects){
                                    if(0 <= prot2.activate.aspects - w.bonus.aspects) c.Aspects -= prot2.activate.aspects - w.bonus.aspects;
                                     MagicCore.setParameters(player, c);
                                    packet.sroll = prot1;
                                    packet.srollType = extra.getInt("event", 0);
                                    packet.spellI = i;
                                    packet.type = name;

                                   prot.using(packet);
                                    setTimeout(function(){ 
                                    if(prot2.setFunction) prot2.setFunction(packet);
                                    }, time);
                                    time+=prot2.time || 0;
                                    }else{
                                         PlayerAC.message(player, "нужно " + (prot2.activate.aspects - w.bonus.aspects) + " аспектов, для заклинания: "+Item.getName(prot1[i]));
                                    }
                                }else{
                                     PlayerAC.message(player, "нужен Protection " + (prot2.activate.Protection - w.bonus.Protection)+", для заклинания: "+Item.getName(prot1[i]));
                                }
                            }else{
                                 PlayerAC.message(player, "нужен magic " + (prot2.activate.magis - w.bonus.magis)+", для заклинания: "+Item.getName(prot1[i]));
                            }
                        }else{
                             PlayerAC.message(player, "нужен necromancer " + (prot2.activate.necromancer - w.bonus.necromancer)+", для заклинания: "+Item.getName(prot1[i]));
                        }
                    }else{
                        PlayerAC.message(player, Item.getName(extra.getInt("event", 0))+" не совместимо с "+Item.getName(prot1[i]));
                    }
                }
                if(prot1.length == 0){
                    PlayerAC.message(player, "нельзя использовать пустое заклинание");
                }
            }
        }
    },
    getItemId: function(data){
        if(typeof data == "object"){
            return data.id;
        }else{
            return data;
        }
    },
    emitterEntity: function(entity, obj){
        if(Wands.isCompatibility(obj.srollType, obj.sroll)){
            let prot = Wands.getPrototype(obj.srollType);
            if(prot.event == "itemUse"){
               let time = 0;
               for(let i in obj.sroll){
                   setTimeout(function(){ 
                       Wands.getPrototype(obj.sroll[i]).setFunction({coords: obj.packet.coords, block: obj.packet.block, player: entity, entity: entity});
                   }, time);
                   time+=Wands.getPrototype(obj.sroll[i]).time || 0;
               } 
            }
            if(prot.event == "usingReleased"){
               let time = 0;
               for(let i in obj.sroll){
                   setTimeout(function(){ 
                       Wands.getPrototype(obj.sroll[i]).setFunction({coords: {x:0,y:0,z:0}, block: {id:0,data:0}, player: entity, entity: entity});
                   }, time);
                   time+=Wands.getPrototype(obj.sroll[i]).time || 0;
               } 
            }
            if(prot.event == "playerAttack"){
               let time = 0;
               for(let i in obj.sroll){
                   setTimeout(function(){ 
                       Wands.getPrototype(obj.sroll[i]).setFunction({coords: {x:0,y:0,z:0}, block: {id:0,data:0}, player: entity, entity: obj.packet.entity});
                   }, time);
                   time+=Wands.getPrototype(obj.sroll[i]).time || 0;
               } 
            }
        }
    },
    setPrototype: function(id, obj){
        obj.activate = obj.activate || {};
        obj.activate.necromancer = obj.activate.necromancer || 0;
        obj.activate.Protection = obj.activate.Protection || 0;
        obj.activate.magis = obj.activate.magis || 0;
        obj.activate.aspects = obj.activate.aspects || 0;
        this.prot[id] = obj;
    },
    decor: {},
    registerSrollDecoration: function(id){
        this.decor[id] = {
            types: [],
        };
        this.setPrototype(id, {
            type: "function", 
            compatibility: [],
            setFunction: function(packet){
                for(let i in Wands.decor[id].types){
                    if(packet.type == Wands.decor[id].types[i].type){
                        Wands.decor[id].types[i].func(packet);
                    }
                }
            },
            installation: function(player, item){
                delItem(player, item);
            }
        })
        return {
            id: id,
            addType: function(name, func){
                Wands.decor[this.id].types.push({
                    type: name,
                    func: func
                });
            },
            getObject: function(){
                return Wands.decor[this.id];
            },
            getId: function(){
                return this.id;
            }
        };
    },
    getSrollDecoration: function(id){
        if(this.decor[id]){
            return {
                id: id,
                addType: function(name, func){
                    Wands.decor[this.id].types.push({
                        type: name,
                        func: func
                    });
                },
                getObject: function(){
                    return Wands.decor[this.id];
                },
                getId: function(){
                    return this.id;
                }
            };
        }else{
            return {};
        }
    },
    getStick: function(id){
        return this.stick[id];
    },
    getPrototype: function(id){
        return this.prot[id] || {type: "event",event: "noy",installation: function (player, item){}};
    },
    getSpell: function(data){
        return this.data["s" + data] || [];
    },
    isCompatibility: function(id1, id2){
        let code1 = this.getPrototype(id1);
        let code2 = this.getPrototype(id2);
        let compatibility = {};
        for(let i in code2.compatibility){
            let name = code2.compatibility[i];
            compatibility[name] = name;
        }
        if(id1 == compatibility[id1]){
            return false;
        }else{
            return true;
        }
    },
    getCompatibility: function(id){
        return this.prot[id].compatibility || [];
    },
    addCompatibility: function(id, type){
        this.prot[id].compatibility.push(type);
    }
};
Network.addClientPacket("aw.w", function(packetData) {
    Wcode = packetData;
});
Network.addClientPacket("aw.c", function(packetData) {
    classPlayer = packetData;
});
Network.addClientPacket("aw.text", function(packetData) {
    Game.message(packetData);
});
Network.addClientPacket("aw.setFly", function(packetData) {
    Player.setFlying(packetData.bool);
    Player.setFlyingEnabled(packetData.bool);
});
var PlayerAC = {
    message: function (player, text){
        var client = Network.getClientForPlayer(player);
        if(client != null){
            client.send("aw.text", text);
        }
    },
    setFly: function(player, bool){
        if(Player.isPlayer(player)){
            let client = Network.getClientForPlayer(player);
            if(client != null){
                client.send("aw.setFly", {
                    bool: bool
                });
            }
        }
    }
};
Callback.addCallback("ItemUse", function(coords, item, block, isExternal, player){
    if(block.id!=BlockID.MagicConnector){
        Wands.addEvent(item, player, "itemUse", {coords: coords, block: block, player: player, entity: player});
    }
});
Callback.addCallback("ItemUsingComplete", function(item, player){
    Wands.addEvent(item, player, "usingReleased", {coords: {x:0,y:0,z:0}, block: {id:0,data:0}, player: player, entity: player});
});
Callback.addCallback("PlayerAttack", function(player, entity){
    let item = Entity.getCarriedItem(player);
    Wands.addEvent(item, player, "playerAttack", {coords: {x:0,y:0,z:0}, block: {id:0,data:0}, player: player, entity: entity});
});




if(config.debug.enabled){
IDRegistry.genItemID("awDebugWand"); 
Item.createItem("awDebugWand", "debug wand", {name: "stick", meta: 0}, {stack: 1});
Wands.addStick({
    id: ItemID.awDebugWand,
    time: 5,
    texture: {
        name: "stick"
    },
    bonus: {
        necromancer: 100,
        Protection: 100,
        magis: 100,
        aspects: 99999999
    }
});
Wands.addIcon(ItemID.awDebugWand, "coal", 0);
}

//сам код регистрации 
Wands.addStick({
    id: ItemID.magis_stick, 
    time: 20,
    texture: {
        name: "magis_stick"
    },
});
MagicCore.setUsingItem({id: ItemID.magis_stick, data: 0}, "magis", 10);
Wands.addStick({
    id: ItemID.magis_sword,
    time: 30,
    texture: {
        name: "magis_sword"
    },
    bonus: {
        necromancer: 10,
        Protection: -10,
        magis: 10,
        aspects: -10
    }
});
MagicCore.setUsingItem({id: ItemID.magis_sword, data: 0}, "Protection", 35);
Wands.addStick({
    id: ItemID.magis_pocox,
    time: 15,
    texture: {
        name: "magis_pocox"
    },
    bonus: {
        necromancer: -10,
        Protection: 5,
        magis: 10,
        aspects: -5
    }
});
if(config.beta_mode){
Wands.addStick({
    id: ItemID.deadAw,
    time: 10,
    texture: {
        name: "deadAw"
    },
    bonus: {
        necromancer: 15,
        Protection: 10,
        magis: 15,
        aspects: 10
    }
});
}





MagicCore.setUsingItem({id: ItemID.magis_pocox, data: 0}, "necromancer", 20);
Wands.setPrototype(ItemID.sroll1, {
    type: "event", 
    event: "itemUse", 
    using: function(packet){

    },
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll2, {
    type: "event", 
    event: "usingReleased", 
    using: function(packet){

    },
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll3, {
    type: "event", 
    event: "playerAttack", 
    using: function(packet){

    },
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll4, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    activate: {
        necromancer: 10,
        aspects: 10
    },
    setFunction: function(packet){
        MagicCore.damage(packet.entity, "magic", 3);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll5, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    activate: {
        magis: 10,
        aspects: 5
    },
    setFunction: function(packet){
        Entity.addEffect(packet.entity, 1, 2, 240, true, false);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll6, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    activate: {
        magis: 10,
        aspects: 20
    },
    setFunction: function(packet){
        Entity.healEntity(packet.entity, 5);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll7, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    activate: {
        magis: 15,
        aspects: 20
    },
    setFunction: function(packet){
        Entity.addEffect(packet.entity, 5, 3, 240, true, false);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll8, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    activate: {
        necromancer: 20
    },
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        let helt = Entity.getHealth(packet.entity)*3;
        if(c.Aspects >= helt){
            MagicCore.damage(packet.entity, "dead", 40);
            c.Aspects -= helt;
            MagicCore.setParameters(packet.player, c);
        }else{
            PlayerAC.message(packet.player, "для убийства даного моба нужно "+helt+" аспектов");
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll9, {
    type: "function", 
    compatibility: [ItemID.sroll2, ItemID.sroll3], 
    activate: {
        magis: 5,
        aspects: 5
    },
    setFunction: function(packet){
        BlockSource.getDefaultForActor(packet.player).destroyBlock(packet.coords.x,packet.coords.y,packet.coords.z, true);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll10, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    activate: {
        necromancer: 15,
        aspects: 50
    },
    setFunction: function(packet){
        MagicCore.damage(packet.entity, "magic", 14);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll11, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    activate: {
        necromancer: 20,
        aspects: 100
    },
    setFunction: function(packet){
        MagicCore.damage(packet.entity, "magic", 58);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll12, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    activate: {
        magis: 15,
        aspects: 40
    },
    setFunction: function(packet){
        Entity.healEntity(packet.entity, 10);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll13, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    activate: {
        magis: 20,
        aspects: 80
    },
    setFunction: function(packet){
        Entity.healEntity(packet.entity, 20);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll14, {
    type: "function", 
    compatibility: [ItemID.sroll2, ItemID.sroll3],
    activate: {
        magis: 30
    },
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.Aspects + 10 <= c.AspectsNow){
           BlockSource.getDefaultForActor(packet.entity).destroyBlock(packet.coords.x,packet.coords.y,packet.coords.z, false);
            c.Aspects += 10;
            MagicCore.setParameters(packet.player, c);
        }else if(c.Aspects <= c.AspectsNow){
             BlockSource.getDefaultForActor(packet.entity).destroyBlock(packet.coords.x,packet.coords.y,packet.coords.z, false);
            c.Aspects = c.AspectsNow;
            MagicCore.setParameters(packet.player, c);
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll15, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        magis: 10,
        Protection: 40,
        aspects: 20
    },
    setFunction: function(packet){
        let pos = Entity.getPosition(packet.entity);
        let vel = Entity.getLookVectorByAngle(Entity.getLookAngle(packet.entity));
        //Entity.setVelocity(packet.entity, 0, 0, 0);
        Entity.addVelocity(packet.entity, vel.x * 2, vel.y * 2, vel.z * 2);
        ParticlesAPI.spawnLine(ParticlesAPI.part2, pos.x, pos.y, pos.z, pos.x + (vel.x * 6), pos.y + (vel.y * 6), pos.z + (vel.z * 6), 10);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll16, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        magis: 15,
        Protection: 20,
        aspects: 10
    },
    setFunction: function(packet){
        let pos = Entity.getPosition(packet.entity);
        //Entity.setVelocity(packet.entity, 0, 0, 0);
        Entity.addVelocity(packet.entity, 0, 1, 0);
        ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y-1, pos.z, 0.5, 11, 2);
        ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y-0.8, pos.z, 0.7, 11, 2);
        //ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y-0.5, pos.z, 1, 11, 2);
        ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y-0.3, pos.z, 1.1, 11, 2);
        ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y-0.1, pos.z, 1.1, 11, 2);
        //ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y+0.1, pos.z, 1.2, 11, 2);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll17, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        magis: 20,
        Protection: 30,
        aspects: 50
    },
    setFunction: function(packet){
        let pos = Entity.getPosition(packet.entity);
        for(let i = 0;i <= 20;i++){
            let vel = Entity.getLookVectorByAngle(Entity.getLookAngle(packet.entity));
            vel.x += Math.random() - Math.random();
            vel.y += Math.random() - Math.random();
            vel.z += Math.random() - Math.random();
            for(let i = 0;i<50;i++){
                let coord = {
                    x: pos.x+(i * vel.x / 2),
                    y: pos.y+(i * vel.y / 2),
                    z: pos.z+(i * vel.z / 2)
                };
                let ent3 = Entity.getAllInRange(coord, 4);
                for(let i1 in ent3){
                    if(ent3[i1] != packet.entity) MagicCore.damage(ent3[i1], "magic", 4);
                }
                 if(BlockSource.getDefaultForActor(packet.entity).getBlockId(coord.x,coord.y,coord.z)!=0){
                    break;
                }
                Mp.spawnParticle(ParticlesAPI.part3, coord.x, coord.y, coord.z);
            }
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll18, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        magis: 10,
        Protection: 15,
        aspects: 20
    },
    setFunction: function(packet){
        ParticlesAPI.spawnShellEnt(ParticlesAPI.part3, packet.entity, 30, 4);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll19, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        magis: 5,
        Protection: 5,
        necromancer: 10,
        aspects: 15
    },
    setFunction: function(packet){
        Entity.addEffect(packet.entity, 10, 4, 300, true, false);
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll20, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        magis: 15,
        necromancer: 5,
        aspects: 30
    },
    setFunction: function(packet){
        let pos = Entity.getPosition(packet.entity);
        let ents = Entity.getAllInRange(pos, 40);
        for(let i in ents){
            let pos1 = Entity.getPosition(ents[i]);
            let vel = {
                x: (pos.x - pos1.x) / 4,
                y: (pos.y - pos1.y) / 4,
                z: (pos.z - pos1.z) / 4
            };
            Mp.spawnParticle(ParticlesAPI.part1, pos1.x, pos1.y, pos1.z, vel.x, vel.y, vel.z);
            Entity.setVelocity(ents[i], vel.x, vel.y, vel.z);
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll21, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        magis: 5,
        necromancer: 30,
        aspects: 50
    },
    setFunction: function(packet){
        for(let i = 0;i <= Math.floor(Math.random()*3)+1;i++){
            let b = BlockSource.getDefaultForActor(packet.entity);
            let pos = Entity.getPosition(packet.entity);
            pos.x += (Math.random() * 8) - (Math.random() * 8);
            pos.z += (Math.random() * 8) - (Math.random() * 8);
            pos = GenerationUtils.findSurface(pos.x, pos.y, pos.z);
            let mob = b.spawnEntity(pos.x, pos.y + 1, pos.z, "aw:skeleton");
            Entity.setCarriedItem(mob, ItemID. magis_stick, 1, 0, null);
            entId[mob] = packet.entity;
            for(i = 0;i <= Math.floor(Math.random()*5)+5;i++){
                Mp.spawnParticle(ParticlesAPI.part1, pos.x + Math.random() - Math.random() - 1, pos.y, pos.z + Math.random() - Math.random() - 1, 0, 0.1, 0);
            }
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll22, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        magis: 5,
        necromancer: 30,
        aspects: 100
    },
    setFunction: function(packet){
        let pos = Entity.getPosition(packet.entity);
        pos.y+=0.5;
        let vel = Entity.getLookVectorByAngle(Entity.getLookAngle(packet.entity));
        for(let i = 0;i<50;i++){
            let coord = {
                x: pos.x+(i * vel.x / 2),
                y: pos.y+(i * vel.y / 2),
                z: pos.z+(i * vel.z / 2)
            };
            let ent3 = Entity.getAllInRange(coord, 2);
            for(let i1 in ent3){
                if(ent3[i1] != packet.entity) MagicCore.damage(ent3[i1], "dead", 40);
            }
             if(BlockSource.getDefaultForActor(packet.entity).getBlockId(coord.x,coord.y,coord.z)!=0){
                break;
            }
            Mp.spawnParticle(ParticlesAPI.part4, coord.x, coord.y, coord.z);
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll23, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        Protection: 10,
        necromancer: 40,
        aspects: 250
    },
    setFunction: function(packet){
        for(let i = 0;i<=Math.floor(Math.random()*15);i++){
            let pos = Entity.getPosition(packet.entity);
            pos.x += ((Math.random()*8)-(Math.random()*8));
            pos.y += 5;
            pos.z += ((Math.random()*8)-(Math.random()*8));
            for(let i = 0;i<60;i++){
                let coord = {
                    x: pos.x,
                    y: pos.y+(i * -0.3),
                    z: pos.z
                };
                let ent3 = Entity.getAllInRange(coord, 2);
                for(let i1 in ent3){
                    if(ent3[i1] != packet.entity) MagicCore.damage(ent3[i1], "dead", 40);
                }
                 if(BlockSource.getDefaultForActor(packet.entity).getBlockId(coord.x,coord.y,coord.z)!=0){
                    break;
                }
                Mp.spawnParticle(ParticlesAPI.part4, coord.x, coord.y, coord.z);
            }
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll24, {
    type: "function", 
    compatibility: [ItemID.sroll1, ItemID.sroll3],
    activate: {
        magis: 55,
        necromancer: 15,
    },
    setFunction: function(packet){
        for(let i = 0;i<=Math.floor(Math.random()*15);i++){
            let pos = Entity.getPosition(packet.entity);
            let pos1 = pos;
            pos.x += ((Math.random()*8)-(Math.random()*8));
            pos.y += ((Math.random()*8)-(Math.random()*8));
            pos.z += ((Math.random()*8)-(Math.random()*8));
            let c = MagicCore.getValue(packet.player);
            if(Math.random()<=0.1){
                BlockSource.getDefaultForActor(packet.entity).explode(pos1.x, pos1.y, pos1.z, 4, false)
            }else if(c.AspectsNow >= c.Aspects+3){
                Mp.spawnParticle(ParticlesAPI.part2, pos1.x, pos1.y, pos1.z, 0, 0, 0);
               c.Aspects+=3;
               MagicCore.setParameters(packet.player, c);
            }
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll25, {
    type: "function", 
    compatibility: [ItemID.sroll1, ItemID.sroll3],
    activate: {
        magis: 55,
        necromancer: 50,
    },
    setFunction: function(packet){
        for(let i = 0;i<=Math.floor(Math.random()*18);i++){
            let pos = Entity.getPosition(packet.entity);
            let pos1 = pos;
            pos.x += ((Math.random()*8)-(Math.random()*8));
            pos.y += ((Math.random()*8)-(Math.random()*8));
            pos.z += ((Math.random()*8)-(Math.random()*8));
            let c = MagicCore.getValue(packet.player);
            if(Math.random()<=0.1){
                BlockSource.getDefaultForActor(packet.entity).explode(pos1.x, pos1.y, pos1.z, 4, false)
            }else if(c.AspectsNow >= c.Aspects+6){
                Mp.spawnParticle(ParticlesAPI.part2, pos1.x, pos1.y, pos1.z, 0, 0, 0);
               c.Aspects+=6;
               MagicCore.setParameters(packet.player, c);
            }
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll26, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        magis: 50,
        necromancer: 20,
        Protection: 15,
        aspects: 30
    },
    setFunction: function(packet){
        let pos = Entity.getPosition(packet.entity);
        let vel = Entity.getLookVectorByAngle(Entity.getLookAngle(packet.entity));
        for(let i = 0;i<25;i++){
            let coord = {
                x: pos.x+(i * vel.x / 2),
                y: pos.y+0.5+(i * vel.y / 2),
                z: pos.z+(i * vel.z / 2)
            };
             if(BlockSource.getDefaultForActor(packet.entity).getBlockId(coord.x,coord.y,coord.z)!=0){
                BlockSource.getDefaultForActor(packet.entity).explode(coord.x, coord.y, coord.z, 8, false)
                break;
            }
            Mp.spawnParticle(ParticlesAPI.part3, coord.x, coord.y, coord.z);
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll27, {
    type: "function", 
    compatibility: [],
    time: 10,
    activate: {
        magis: 10,
    },
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll28, {
    type: "function", 
    compatibility: [],
    time: 20,
    activate: {
        magis: 10,
    },
    installation: function (player, item){
        delItem(player, item);
    }
});

//декоративные заклинания

Wands.setPrototype(ItemID.decor1, {
    type: "function", 
    compatibility: [],
    setFunction: function (packet){
        if(packet.type == "usingReleased"){
            let pos = Entity.getPosition(packet.entity);
             ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x-.5, pos.y-.5, pos.z-.5, 0.5, 11, 2);
            ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x-.5, pos.y-0.8-.5, pos.z-.5, 0.7, 11, 2);
             ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x-.5, pos.y-0.3 - .5, pos.z-.5, 1.1, 11, 2);
            ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x-.5, pos.y-0.1-.5, pos.z-.5, 1.1, 11, 2);
        }
        if(packet.type == "playerAttack"){
            let pos = Entity.getPosition(packet.entity);
             ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x -.5, pos.y-1+.3, pos.z-.5, 0.5, 11, 2);
            ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x -.6, pos.y-0.8+.3, pos.z-.5, 0.7, 11, 2);
             ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x - .5, pos.y-0.3+.3, pos.z-.5, 1.1, 11, 2);
            ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x -.5, pos.y-0.1+.3, pos.z-.5, 1.1, 11, 2);
        }
        if(packet.type == "itemUse"){
            let pos = packet.coords;
             ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y-1+2, pos.z, 0.5, 11, 2);
            ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y-0.8+2, pos.z, 0.7, 11, 2);
             ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y-0.3+2, pos.z, 1.1, 11, 2);
            ParticlesAPI.spawnCircle(ParticlesAPI.part1, pos.x, pos.y-0.1+2, pos.z, 1.1, 11, 2);
        }
    },
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.decor2, {
    type: "function", 
    compatibility: [],
    setFunction: function (packet){
        if(packet.type == "usingReleased"){
            let pos = Entity.getPosition(packet.entity);
            for(let i = 0;i <= 10;i++){
                 ParticlesAPI.spawnCircle(ParticlesAPI.part4, pos.x-.5, pos.y+1-2.8, pos.z-.5, i / 2, 11 * i, 2);
            }
        }
        if(packet.type == "playerAttack"){
            let pos = Entity.getPosition(packet.entity);
            for(let i = 0;i <= 10;i++){
                 ParticlesAPI.spawnCircle(ParticlesAPI.part4, pos.x - .5, pos.y-.1, pos.z-.5, i / 2, 11 * i, 2);
            }
        }
        if(packet.type == "itemUse"){
            let pos = packet.coords;
            for(let i = 0;i <= 10;i++){
                 ParticlesAPI.spawnCircle(ParticlesAPI.part4, pos.x, pos.y+1, pos.z, i / 2, 11 * i, 2);
            }
        }
    },
    installation: function (player, item){
        delItem(player, item);
    }
});

Wands.setPrototype(ItemID.decor3, {
    type: "function", 
    compatibility: [],
    setFunction: function (packet){
        if(packet.type == "usingReleased"){
            let pos = Entity.getPosition(packet.entity);
            for(let i = 0;i <= 40;i++){
                 let coords = {
                     x: pos.x + (Math.random()*8 - Math.random()*8),
                     y: pos.y + (Math.random()*8 - Math.random()*8),
                     z: pos.z + (Math.random()*8 - Math.random()*8)
                 };
                 let v = ParticlesAPI.getVector(pos, coords);
                 Mp.spawnParticle(ParticlesAPI.part2, coords.x, coords.y, coords.z, (v.x / 50), (v.y / 50), (v.z / 50));
            }
        }
        if(packet.type == "playerAttack"){
            let pos = Entity.getPosition(packet.entity);
            for(let i = 0;i <= 40;i++){
                 let coords = {
                     x: pos.x + (Math.random()*8 - Math.random()*8),
                     y: pos.y + (Math.random()*8 - Math.random()*8),
                     z: pos.z + (Math.random()*8 - Math.random()*8)
                 };
                 let v = ParticlesAPI.getVector(pos, coords);
                 Mp.spawnParticle(ParticlesAPI.part2, coords.x, coords.y, coords.z, (v.x / 50), (v.y / 50), (v.z / 50));
            }
        }
        if(packet.type == "itemUse"){
            let pos = packet.coords;
            for(let i = 0;i <= 40;i++){
                 let coords = {
                     x: pos.x + (Math.random()*8 - Math.random()*8),
                     y: pos.y + (Math.random()*8 - Math.random()*8),
                     z: pos.z + (Math.random()*8 - Math.random()*8)
                 };
                 let v = ParticlesAPI.getVector(pos, coords);
                 Mp.spawnParticle(ParticlesAPI.part2, coords.x, coords.y, coords.z, (v.x / 50), (v.y / 50), (v.z / 50));
            }
        }
    },
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll29, {
    type: "function", 
    compatibility: [ItemID.sroll1],
    activate: {
        magis: 10,
        Protection: 20
    },
    setFunction: function (packet){
        EffectAPI.clearAll(packet.entity);
    },
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll30, {
    type: "function", 
    compatibility: [ItemID.sroll1, ItemID.sroll3],
    activate: {
        magis: 15,
        Protection: 10
    },
    setFunction: function (packet){
        EffectAPI.add(packet.player, "fly", 20 * 30, 1);
    },
    installation: function (player, item){
        delItem(player, item);
    }
});




// file: block/block.js

IDRegistry.genBlockID("rityalPedestal");
Block.createBlock("rityalPedestal", [ {name: "Ritual pedestal", texture: [["rityalPedestal", 0]], inCreative: true} ]);
Translation.addTranslation("Ritual pedestal", {ru: "Ритуальный пьедестал"});
RenderAPI.SetAltar(BlockID.rityalPedestal);
TileEntity.registerPrototype(BlockID.rityalPedestal, {
    defaultValues: {
        item: {
            id: 0,
            data: 0,
            extra: 0
        }
    }, 
    client: {
        updateModel: function() {
            var id = Network.serverToLocalId(this.networkData.getInt("itemId"));
            var data = this.networkData.getInt("itemData");
            this.model.describeItem({
                id: id,
                count: 1,
                data: data, 
                size: 1
            });
        },
        load: function() {
            this.model = new Animation.Item(this.x + .5, this.y + 1.5, this.z + .5);
            this.updateModel();
            this.model.load();
            var that = this;
            this.networkData.addOnDataChangedListener(function(data, isExternal) {
                that.updateModel();
            });
        },
        unload: function() {
            this.model.destroy();
        }
    },
    animation: function(item){
        this.networkData.putInt("itemId", item.id);
        this.networkData.putInt("itemData", item.data);
        this.networkData.sendChanges();
        this.data.item = {
            id: item.id,
            data: item.data,
            extra: item.extra || new ItemExtraData()
        };
    }, 
    drop: function(player){
        this.networkData.putInt("itemId", 0);
        this.networkData.putInt("itemData", 0);
        this.networkData.sendChanges();
        this.blockSource.spawnDroppedItem(this.x, this.y+1,this.z, this.data.item.id, 1, this.data.item.data, this.data.item.extra || new ItemExtraData());
        this.data.item = {
            id: 0,
            data: 0,
            extra: null
        };
    }, 
    destroyAnimation: function(){
        this.networkData.putInt("itemId", 0);
        this.networkData.putInt("itemData", 0);
        this.networkData.sendChanges();
        this.data.item = {
            id: 0,
            data: 0,
            extra: null
        };
    }, 
    isItem: function(){
        if(!this.data.item) this.data.item = {id: 0, data: 0, extra: null};
        if(!this.data.item.id) this.data.item.id = 0;
        if(!this.data.item.data) this.data.item.data = 0;
        if(!this.data.item.extra) this.data.item.extra = null;
    },
    click: function(id, count, data, coords, player) {
        this.isItem();
        if(this.data.item.id != 0){
            if(id != ItemID.bookk)
                this.drop(player);
        }else{
            if(id != ItemID.bookk){
                Game.prevent();
                let item = Entity.getCarriedItem(player);
                delItem(player, {id:id,data:data,count:count}) ;
                this.animation(item);
            }
        }
    },
    destroyBlock: function(coords, player){
        this.drop();
    }
});
IDRegistry.genBlockID("MagicConnector");
Block.createBlock("MagicConnector", [ {name: "Magic connector", texture: [["MagicReenactor", 0], ["MagicReenactor", 1],["MagicReenactor", 0]], inCreative: true} ]);
Translation.addTranslation("Magic connector", {ru: "магичиский реконструктор"});

TileEntity.registerPrototype(BlockID.MagicConnector, {
    defaultValues: {
        item: {
            id: 0,
            data: 0,
            extra: null
        }
    }, 
    init: function(){
        this.isItem();
        if(this.data.item){
            if(this.data.item.id) this.networkData.putInt("itemId", this.data.item.id);
            if(this.data.item.data) this.networkData.putInt("itemData", this.data.item.data);
            this.networkData.sendChanges();
        }
    }, 
    client: {
        updateModel: function() {
            var id = Network.serverToLocalId(this.networkData.getInt("itemId"));
            var data = this.networkData.getInt("itemData");
            this.model.describeItem({
                id: id,
                count: 1,
                data: data, 
                size: 1
            });
        },
        load: function() {
            this.model = new Animation.Item(this.x + .5, this.y + 1.5, this.z + .5);
            this.updateModel();
            this.model.load();
            var that = this;
            this.networkData.addOnDataChangedListener(function(data, isExternal) {
                that.updateModel();
            });
        },
        unload: function() {
            this.model.destroy();
        }
    },
    customAnimation: function(item){
        this.networkData.putInt("itemId", item.id);
        this.networkData.putInt("itemData", item.data);
        this.networkData.sendChanges();
        this.data.item = {
            id: item.id,
            data: item.data,
            extra: item.extra || new ItemExtraData()
        };
    }, 
    animation: function(item){
        this.networkData.putInt("itemId", item.id);
        this.networkData.putInt("itemData", item.data);
        this.networkData.sendChanges();
        this.data.item = {
            id: item.id,
            data: item.data,
            extra: item.extra || new ItemExtraData()
        };
    }, 
    drop: function(){
        this.networkData.putInt("itemId", 0);
        this.networkData.putInt("itemData", 0);
        this.networkData.sendChanges();
        this.blockSource.spawnDroppedItem(this.x, this.y+1,this.z, this.data.item.id, 1, this.data.item.data, this.data.item.extra);
        this.data.item = {
            id: 0,
            data: 0,
            extra: null
        };
    }, 
    destroyAnimation: function(){
        this.networkData.putInt("itemId", 0);
        this.networkData.putInt("itemData", 0);
        this.networkData.sendChanges();
        this.data.item = {
            id: 0,
            data: 0,
            extra: null
        };
    }, 
    isItem: function(){
        if(!this.data.item) this.data.item = {id: 0, data: 0, extra: null};
        if(!this.data.item.id) this.data.item.id = 0;
        if(!this.data.item.data) this.data.item.data = 0;
        if(!this.data.item.extra) this.data.item.extra = null;
    },
    click: function(id, count, data, coords, player) {
        this.isItem();
        if(Wands.stick[id]){
            if(this.data.item.id == 0){
                this.animation({id: id, data: data, extra: Entity.getCarriedItem(player).extra});
                Entity.setCarriedItem(player, id, count-1, data);
            }
        }else{
            if(Wands.prot[id] && this.data.item.id != 0){
                let prot = Wands.prot[id];
                if(prot.type == "event"){
                    this.blockSource.spawnDroppedItem(this.x, this.y+1,this.z, this.data.item.extra.getInt("event", 0), 1, 0, null);
                    this.data.item.extra.putInt("event", id);
                }
                if(prot.type == "function"){
                    if(this.data.item.extra.getInt("spell", -9)==-9){
                        this.data.item.extra.putInt("spell", Object.keys(Wands.data).length);
                        Wands.data["s" + Object.keys(Wands.data).length] = [];
                    }
                    if(!Wands.data["s" + this.data.item.extra.getInt("spell", -9)]){
                        Wands.data["s" + this.data.item.extra.getInt("spell", -9)] = [];
                    }
                    Wands.data["s" + this.data.item.extra.getInt("spell", -9)].push(Entity.getCarriedItem(player));
                }
                prot.installation(player, Entity.getCarriedItem(player));
            }else{
                if(id == ItemID.bookk && this.data.item.id != 0){
                    if(Entity.getSneaking(player)){
                        let evn = this.data.item.extra.getInt("event", 0);
                       this.blockSource.spawnDroppedItem(this.x, this.y+1,this.z, evn, 1, 0, null);
                       let arr = Wands.data["s" + this.data.item.extra.getInt("spell", -9)];
                       for(let i in arr){
                           this.blockSource.spawnDroppedItem(this.x, this.y+1,this.z, Wands.getItemId(arr[i]), 1, 0, null);
                       }
                        this.data.item.extra.putInt("event", 0);
                        Wands.data["s" + this.data.item.extra.getInt("spell", -9)] = [];
                    }else{
                       if(Wands.data["s" + this.data.item.extra.getInt("spell", -9)].length >= 1) this.blockSource.spawnDroppedItem(this.x, this.y+1,this.z, Wands.getItemId(Wands.data["s" + this.data.item.extra.getInt("spell", -9)].pop()), 1, 0, null);
                    }
                }else{
                    this.drop();
                }
            }
        }
    },
    destroyBlock: function(coords, player){
        this.drop();
    }
});

IDRegistry.genBlockID("bowlWishes");
Block.createBlock("bowlWishes", [ {name: "bowl of wishes", texture: [["bowl", 1]], inCreative: true, renderlayer: 1} ]);
Translation.addTranslation("bowl of wishes", {ru: "чаша желаний"});

let meshBowl = new RenderMesh();
meshBowl.importFromFile(__dir__+"/assets/model/bowl.obj", "obj", null)
meshBowl.setBlockTexture("bowl", 0);
var renderBowl = new ICRender.Model(); 
var modelBowl = new BlockRenderer.Model(meshBowl);  
renderBowl.addEntry(modelBowl);
BlockRenderer.setStaticICRender(BlockID.bowlWishes, -1, renderBowl); 

TileEntity.registerPrototype(BlockID.bowlWishes, {
    defaultValues: {
        active: false,
        player: -1
    },
    tick: function(){
        if(this.data.active){
            Mp.spawnParticle(ParticlesAPI.part2, this.x+Math.random(), this.y + .4, this.z + Math.random(), 0, Math.random()/10, 0);
            if(Math.random()<=0.001){
                this.data.active = false;
                delete classPlayer[this.data.player];
            }
        }
    },
    click: function(id, count, data, coords, player){
        let item = Entity.getCarriedItem(player);
        if(!this.data.active && item.id == ItemID.rune5 && MagicCore.isClass(player)){
            this.data.active = true;
            this.data.player = player;
            Entity.setCarriedItem(player, item.id, item.count-1, item.data);
        }
    }
});

if(config.beta_mode){
IDRegistry.genBlockID("cauldronAw");
Block.createBlock("cauldronAw", [ {name: "cauldron", texture: [["bowl", 1]], inCreative: true, renderlayer: 1} ]);
Translation.addTranslation("cauldron", {ru: "котёл"});

RenderAPI.setCauldron(BlockID.cauldronAw);

let Potion = {
    items: {},
    potions: {},
    potion: {},
    addItems: function(obj){
        obj.type = obj.type || "update";
        obj.setFunction = obj.setFunction || 0;
        this.items[obj.id] = obj;
    },
    getPrototype: function(id){
        if(id) 
            return this.items[id];
       /* else
            return {
                type: "noy",
                id: -1,
                setFunction: function(packet){
                    
                }
            };*/
    }
};
Potion.addItems({
    type: "effect",
    id: 829,
    setFunction: function(packet){
        if(packet.x3){
            Entity.healEntity(packet.player, packet.level);
        }else{
            let ents = Entity.getAllInRange(Entity.getPosition(packet.player), 3);
            for(let i in ents){
                Entity.healEntity(ents[i], packet.level);
            }
        }
    }
});
Potion.addItems({
    type: "update",
    id: ItemID.rune3,
    setFunction: function(packet){
        if(packet.arr.length >= packet.i + 1){
            if(Potion.getPrototype(packet.arr[packet.i + 1].id).type=="effect"){
                packet.x3 = true;
            }
        }
    }
});

TileEntity.registerPrototype(BlockID.cauldronAw, {
    defaultValues: {
        count: 0,
        heat: 0,
        item: []
    },
    client: {
        updateModel: function() {
            let count = Network.serverToLocalId(this.networkData.getInt("count"));
            var rndr = new Render();
            this.model.describe({
                render: rndr.getID(),
                skin: "terrain-atlas/water_placeholder.png"
            });
            if(count >= 1){
                rndr.setPart("head", [{
                    type: "box",
                    uv: {x: 0, y: 0},
                    coords: {x: 0, y: 32, z: 0},
                    size: {x: 14, y: count/111.1, z: 14}
                }], {});
            }
            this.model.refresh();
        },
        load: function() {
            this.model = new Animation.Base(this.x +.5, this.y+1, this.z +.5);
            this.updateModel();
            this.model.load();
            var that = this;
            this.networkData.addOnDataChangedListener(function(data, isExternal) {
                that.updateModel();
            });
        },
        unload: function() {
            this.model.destroy();
        }
    },
    init: function(){
        this.animation();
    },
    tick: function(){
        if(this.blockSource.getBlock(this.x, this.y-1, this.z).id == 51 && this.data.heat <= 99 && this.data.count >= 1){
            this.data.heat += 1;
        }else if(this.data.heat >> 0){
            this.data.heat--;
        }
        if(this.data.heat >= 99){
            if(Math.random()<=.1){
                this.animation();
                this.data.count--;
            } 
            
            if(Math.random()<=.2) Mp.spawnParticle(ParticlesAPI.part1, this.x+Math.random(), this.y + 1, this.z + Math.random(), 0, Math.random()/10, 0);
            
            let ents = Entity.getAllInRange({x: this.x+.5, y: this.y+.7, z: this.z+.5}, 1, 64);
            for(let i in ents){
                let item = Entity.getDroppedItem(ents[i]);
                if(Potion.items[item.id]){
                    this.data.item.push(item);
                    Entity.remove(ents[i]);
                }
            }
        }
    },
    animation: function(){
        this.networkData.putInt("count", this.data.count);
        this.networkData.sendChanges();
    },
    click: function(id, count, data, coords, player){
        Game.prevent();
        let item = Entity.getCarriedItem(player);
        if(this.data.count <= 999){
            if(item.id == 866 && item.data == 0){
                this.data.count += 100;
                this.data.heat = 0
                this.animation();
                Entity.setCarriedItem(player, 325, 1, 0);
            }
        } 
        if(item.id == 374){
            if(this.data.count >= 100){
                let i = Object.keys(Potion.potions).length;
                let arr = [];
                for(let a in this.data.item){
                    arr.push(this.data.item[a]);
                }
                Potion.potions["p"+i] = arr;
                this.data.count -= 100;
                if(this.data.count <= 0){
                    this.animation();
                }else{
                    this.networkData.putInt("count", 0);
                    this.networkData.sendChanges();
                }
                Entity.setCarriedItem(player, item.id, item.count-1, item.data);
                let pos = Entity.getPosition(player);
                let extra = new ItemExtraData();
                extra.putInt("pot", i);
                this.blockSource.spawnDroppedItem(pos.x, pos.y, pos.z, ItemID.potionAw, 1, 0, extra);
                this.data.count--;
            }
        }
        if(this.data.count <= 0){
            this.data.item = [];
        }
        if(Entity.getSneaking(player) && item.id == 0){
            this.data.heat = 0;
            this.data.count = 0;
            this.data.item = [];
            this.animation();
        }
    },
    destroyBlock: function(coords, player){
        this.networkData.putInt("count", 0);
        this.networkData.sendChanges();
    }
});
}
IDRegistry.genBlockID("magicController");
Block.createBlock("magicController", [ {name: "magic controller", texture: [["rityalPedestal", 0]], inCreative: true} ]);
Translation.addTranslation("magic controller", {ru: "магический контроллер"});
RenderAPI.setMagicController(BlockID.magicController);
let magicControllerUI = new UI.StandardWindow({
    standart: {
		 header: {
		     text: {
		         text: Translation.translate("magic controller")
		         }
		     },
		     inventory: {standart: true},
		     background: {standart: true}
	   },
    drawing: [
        
    ],
    elements: {
        "slot": {type: "slot", x: 450, y: 250, size: 100},
        "text": {type: "text", x: 250, y: 250, width: 400, height: 60, text: "0"}
    }
});
TileEntity.registerPrototype(BlockID.magicController, {
    useNetworkItemContainer: true,
    defaultValues: {
        storage: 0,
        storageMax: 1000,
        active: false,
        i: 0,
        img: 0
    },
    tick: function(){
        if(!this.data.active){
            Mp.spawnParticle(ParticlesAPI.part1, this.x + (Math.random() * 8 - Math.random() * 8), this.y + (Math.random() * 8 - Math.random() * 8), this.z + (Math.random() * 8 - Math.random() * 8), 0, 0, 0);
            this.data.storage++;
            if(this.data.storage >= this.data.storageMax){
                this.data.active = true;
            }
        }else{
            Mp.spawnParticle(ParticlesAPI.part2, this.x+.5, this.y+.6, this.z+.5, 0, .3, 0);
            Mp.spawnParticle(ParticlesAPI.part2, this.x+.5, this.y+.3, this.z+.5, 0, .3, 0);
            this.data.storage--;
            if(this.data.storage <= 0){
                this.data.active = false;
            }
        }
        this.container.setText("text", this.data.storage + "/" + this.data.storageMax);
        let slot = this.container.getSlot("slot");
        let icons = Wands.getIconArr(slot.id);
        this.data.img = icons.length;
        if(slot.id <= 0){
            this.data.i = 0;
            this.data.img = 0;
        }
        if(Wands.stick[slot.id]){
            slot.extra = slot.extra || new ItemExtraData();
            slot.extra.putString("texture", icons[this.data.i].name);
            slot.extra.putInt("meta", icons[this.data.i].meta);
            this.container.setSlot("slot", slot.id, slot.count, slot.data, slot.extra);
        }
    },
    click: function(id, data, count, coords, player){
        let slot = this.container.getSlot("slot");
        if(Wands.stick[slot.id] && id == ItemID.bookk){
            if(this.data.i + 1 << this.data.img){
                this.data.i++;
            }
            if(this.data.i >= this.data.img){
                this.data.i = 0;
            }
        }else{
            
        }
    },
    getScreenName: function(player, coords){
        if(Entity.getCarriedItem(player).id != ItemID.bookk){
            return "main";
        }
    },
    getScreenByName: function(screenName){
        return magicControllerUI;
    }
});




// file: ritual/clone.js


    Callback.addCallback("ItemUse", function(coords, item, block, isExternal, player) {
        if(item.id == ItemID.bookk){
            var b = BlockSource.getDefaultForActor(player);
            if(b.getBlockId(coords.x, coords.y, coords.z) == BlockID.rityalPedestal){
                if(b.getBlockId(coords.x+2, coords.y, coords.z+2) == BlockID.rityalPedestal){
                    if(b.getBlockId(coords.x-2, coords.y, coords.z+2) == BlockID.rityalPedestal){
                         if(b.getBlockId(coords.x+2, coords.y, coords.z-2) == BlockID.rityalPedestal){
                             if(b.getBlockId(coords.x-2, coords.y, coords.z-2) == BlockID.rityalPedestal){
                                if(TileEntity.getTileEntity(coords.x+2, coords.y, coords.z+2, b).data.item.id == ItemID.rune6){
                                     if(TileEntity.getTileEntity(coords.x-2, coords.y, coords.z+2, b).data.item.id == ItemID.rune6){
                                         if(TileEntity.getTileEntity(coords.x+2, coords.y, coords.z-2, b).data.item.id == ItemID.rune6){
                                             if(TileEntity.getTileEntity(coords.x-2, coords.y, coords.z-2, b).data.item.id == ItemID.rune6){
                                                 if(TileEntity.getTileEntity(coords.x, coords.y, coords.z, b).data.item.id != 0){
                                                  let d = MagicCore.getValue(player);
                                                  if(d.Aspects>=500){
                                                 if(d.magis>=30){
                                                     
      let Itemm = TileEntity.getTileEntity(coords.x, coords.y, coords.z, b).data.item;
      let pa = new PlayerActor(player);
                              if(pa.getGameMode()==0){
                                  TileEntity.getTileEntity(coords.x, coords.y, coords.z, b).drop(player);
                              }else{
                                 TileEntity.getTileEntity(coords.x, coords.y, coords.z, b).drop(player);
                                  b.spawnDroppedItem(coords.x, coords.y+1, coords.z, Itemm.id, 1, Itemm.data);
                              }b.spawnDroppedItem(coords.x, coords.y+1, coords.z, Itemm.id, 1, Itemm.data);
                    d.Aspects -= 500;
                    if(Math.random()<=0.5){
                        if(d.AspectsNow + 500 <= d.AspectsMax){
                            d.AspectsNow+=500;
                        }else{
                            d.AspectsNow=d.AspectsMax;
                        }        
                        MagicCore.setParameters(player, d);                                                                                             
                                                     }
                                                    }else{
                                                        Game.message("для этого ритуала нужно минимум магия 30 уровня");
                                                    }
                                                }else{
                                                    Game.message("для этого ритуала нужно минимум 500 аспектов");
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




// file: ritual/1lvl.js

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




// file: ritual/spawn.js

Callback.addCallback("ItemUse", function(coords, item, block, isExternal, player) {
    if(item.id == ItemID.bookk){
        if(Dungeon.isStructure("aw_ritual.json", coords.x, coords.y, coords.z, 0, Entity.getDimension(player))){
             Dungeon.destroyStructure("aw_ritual.json", coords.x, coords.y, coords.z, 0, Entity.getDimension(player));
            var b = BlockSource.getDefaultForActor(player);
            b.spawnEntity(coords.x,coords.y, coords.z, "aw:boss0");
        }
    }
});




// file: categor.js

let categor = {
    armor: [ItemID.sroll1, ItemID.sroll2,ItemID.sroll3,ItemID.sroll4,ItemID.sroll5,ItemID.sroll6,ItemID.sroll7,ItemID.sroll8,ItemID.sroll9,ItemID.sroll10,ItemID.sroll11,ItemID.sroll12,ItemID.sroll13,ItemID.sroll14,ItemID.sroll15,ItemID.sroll16,ItemID.sroll17,ItemID.sroll18,ItemID.sroll19,ItemID.sroll20,ItemID.sroll21,ItemID.sroll22,ItemID.sroll23,ItemID.sroll24,ItemID.sroll25,ItemID.sroll26,ItemID.sroll27,ItemID.sroll28,ItemID.sroll29,ItemID.sroll30,ItemID.decor1,ItemID.decor2,ItemID.decor3,ItemID.aw_amylet,ItemID.aw_amylet2,ItemID.aw_amylet3,ItemID.aw_amylet4,ItemID.magis_stick,ItemID.magis_sword,ItemID.magis_pocox],
    govno: [ItemID.rune1,ItemID.rune2,ItemID.rune3,ItemID.rune4,ItemID.rune5,ItemID.rune6,ItemID.bookk,ItemID.loreClass1,ItemID.loreClass2,ItemID.loreClass3,ItemID.piece1,ItemID.piece2,ItemID.piece3]
};
for(let i in categor.armor){
    Item.setCategory(categor.armor[i], 3);
}
for(let i in categor.govno){
    Item.setCategory(categor.govno[i], 4);
}




// file: craft.js

Callback.addCallback("LevelLoaded", function() {
//скины
Wands.addIconAll("diamond", 0);
Wands.addIconAll("protection_wand", 0);
Wands.addIconAll("meteor_rain_wand", 0);
Wands.addIconAll("treatment_wand", 0);
Wands.addIcon(ItemID.magis_stick, "magis_stick", 1);
Wands.addIcon(ItemID.magis_sword, "magis_sword", 1);
Wands.addIcon(ItemID.magis_pocox, "magis_pocox", 1);
Recipes.addShaped({id: BlockID.rityalPedestal, count: 1, data: 0},
	  ["aga", "aba", "aba"], 
['a', 98, 0, 'b', 265, 0, 'g', 264, 0]);
Recipes.addShaped({id: ItemID.loreClass1, count: 1, data: 0},
   	["*a*", "*bs", "*g*"], 
["a", ItemID.piece1, 0, "b", ItemID.piece2, 0, "g", ItemID.piece3, 0, "s", 368, 0]);
  	Recipes.addShaped({id: ItemID.loreClass2, count: 1, data: 0},
   	["*a*", "*bs", "*g*"], 
["a", ItemID.piece1, 0, "b", ItemID.piece2, 0, "g", ItemID.piece3, 0, "s", 267, 0]);
  	Recipes.addShaped({id: ItemID.loreClass3, count: 1, data: 0},
   	["*a*", "*bs", "*g*"], 
["a", ItemID.piece1, 0, "b", ItemID.piece2, 0, "g", ItemID.piece3, 0, "s", 370, 0]);
Recipes.addShaped({id: ItemID.magis_stick, count: 1, data: 0},
	  ["##a", "#b#", "b##"], 
['a', ItemID.rune1, 0, 'b', 280, 0]);
Recipes.addShaped({id: ItemID.bookk, count: 1, data: 0},
	  ["#a#", "aba", "#a#"], 
['a', 367, 0, 'b', 340, 0]);
Ritual.lvl1({
    id: ItemID.rune6,
    data: 0
},{
    item1: ItemID.rune4, 
    item2: ItemID.rune2
},{
    aspects: 200, 
    magis: 20
});
Ritual.lvl1({
    id: ItemID.rune5,
    data: 0
},{
    item1: ItemID.rune4, 
    item2: ItemID.rune1
},{
    aspects: 200, 
    magis: 20
});
Ritual.lvl1({
    id: ItemID.sroll10,
    data: 0
},{
    item1: ItemID.rune5, 
    item2: ItemID.sroll4
},{
    aspects: 500, 
    magis: 20
});
Ritual.lvl1({
    id: ItemID.sroll11,
    data: 0
},{
    item1: ItemID.rune5, 
    item2: ItemID.sroll10
},{
    aspects: 500, 
    magis: 20
});
Ritual.lvl1({
    id: ItemID.sroll8,
    data: 0
},{
    item1: ItemID.rune5, 
    item2: ItemID.sroll11
},{
    aspects: 500, 
    magis: 20
});
Ritual.lvl1({
    id: ItemID.sroll14,
    data: 0
},{
    item1: ItemID.rune2, 
    item2: ItemID.sroll9
},{
    aspects: 500, 
    magis: 20
});
Ritual.lvl1({
    id: ItemID.sroll12,
    data: 0
},{
    item1: ItemID.rune4, 
    item2: ItemID.sroll6
},{
    aspects: 500, 
    magis: 20
});
Ritual.lvl1({
    id: ItemID.sroll13,
    data: 0
},{
    item1: ItemID.rune4, 
    item2: ItemID.sroll12
},{
    aspects: 500, 
    magis: 10
});
Ritual.lvl1({
    id: ItemID.sroll18,
    data: 0
},{
    item1: ItemID.rune3, 
    item2: ItemID.sroll4
},{
    aspects: 100, 
    magis: 15
});
Ritual.lvl1({
    id: ItemID.sroll19,
    data: 0
},{
    item1: ItemID.rune3, 
    item2: ItemID.sroll6
},{
    aspects: 200, 
    magis: 20
});
Ritual.lvl1({
    id: ItemID.sroll21,
    data: 0
},{
    item1: ItemID.rune3, 
    item2: ItemID.sroll10
},{
    aspects: 300, 
    magis: 15
});
Ritual.lvl1({
    id: ItemID.sroll22,
    data: 0
},{
    item1: ItemID.rune3, 
    item2: ItemID.sroll8
},{
    aspects: 300, 
    magis: 15
});
Ritual.lvl1({
    id: ItemID.sroll23,
    data: 0
},{
    item1: ItemID.sroll4, 
    item2: ItemID.sroll8
},{
    aspects: 300, 
    magis: 15
});
Ritual.lvl1({
    id: ItemID.sroll24,
    data: 0
},{
    item1: ItemID.rune4, 
    item2: ItemID.rune4
},{
    aspects: 1000, 
    magis: 10
});
Ritual.lvl1({
    id: ItemID.sroll26,
    data: 0
},{
    item1: 46, 
    item2: ItemID.rune3
},{
    aspects: 500, 
    magis: 10
});
Recipes.addShaped({id: ItemID.sroll27, count: 1, data: 0},
	  ["###", "#ab", "bbb"], 
['a', 264, 0, 'b', 348, 0]);
Recipes.addShaped({id: ItemID.sroll28, count: 1, data: 0},
	  ["bbb", "bab", "bbb"], 
['a', 264, 0, 'b', 348, 0]);

Recipes.addShaped({id: ItemID.aw_amylet, count: 1, data: 0},
	  ["aga", "aia", "bbb"], 
['a', 334, 0, 'b', 266, 0, 'g', 264, 0, 'i', ItemID.piece1, 0]);
Recipes.addShaped({id: ItemID.aw_amylet3, count: 1, data: 0},
	  ["aga", "aia", "bbb"], 
['a', 334, 0, 'b', 266, 0, 'g', 264, 0, 'i', ItemID.piece2, 0]);
Recipes.addShaped({id: ItemID.aw_amylet2, count: 1, data: 0},
	  ["aga", "aia", "bbb"], 
['a', 334, 0, 'b', 266, 0, 'g', 264, 0, 'i', ItemID.piece3, 0]);
Recipes.addShaped({id: ItemID.aw_amylet4, count: 1, data: 0},
	  ["aga", "aia", "bbb"], 
['a', 334, 0, 'b', 266, 0, 'g', 264, 0, 'i', ItemID.sroll24, 0]);
Recipes.addShaped({id: ItemID.magis_sword, count: 1, data: 0},
	  ["#b#", "gag", "#b#"], 
['a', 267, 0, 'b', ItemID.rune1, 0, 'g', ItemID.rune2, 0]);
Recipes.addShaped({id: ItemID.magis_pocox, count: 1, data: 0},
	  ["##g", "#b#", "b##"], 
['b', 280, 0, 'g', ItemID.rune5, 0]);
if(config.beta_mode){
Recipes.addShaped({id: ItemID.beltAw, count: 1, data: 0},
	  ["bbb", "gbg", "bbb"], 
['b', 266, 0, 'g', ItemID.aw_amylet2, 0]);
}
});
ModAPI.registerAPI("AncientWondersAPI", {
    ItemGenerate: ItemGenerate,
    MagicCore: MagicCore,
    Wands: Wands,
    Ritual: Ritual,
    delItem: delItem2,
    ParticlesAPI: ParticlesAPI,
    Render: RenderAPI,
    Mp: Mp,
    EffectAPI: EffectAPI
});




