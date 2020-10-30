/*
BUILD INFO:
  dir: core/dev
  target: main.js
  files: 13
*/



// file: info.js

IMPORT("DungeonAPI");
Dungeon.setDir("assets/structure");
/*
в мултиплеере не работают
1)книга классов
2)почемуто не устанавливается класс 

все остольное работает
1)волшебная палочка(но что бы использовать нужен класс)
2)генерация структур
3)волшебная палочка(но что бы использовать нужен класс)

кст либу тоже делал я :D
желаю удачи
*/




// file: structure.js

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
    },
    function save() {
        return {
            classPlayer: classPlayer,
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
        magisMax: 10,
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
                    }else{
                        Game.message("требуется "+parameter+" уровня "+value)
                    }
                }else{
                    ItemA.setArmor(slot, 0, 0, 0, null);
                    b.spawnDroppedItem(coords.x, coords.y, coords.z, id, 1, item.data, item.extra);
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
            if(cv[parameter] + 5 <= cv[parameter+"Max"]){
                delItem(player, {id:0,data:0,count:1}) ;
                cv[parameter] += 5;
                Game.message("§2параметр: "+parameter+" был улучшен на 5 теперь он равен "+cv[parameter]);
                MagicCore.setParameters(player, cv);
            }else{
                Game.message("§4параметр "+parameter+" максимального уровня");
            }
        }else{
            Game.message("§4у вас нет класса")
        }
    }, 
    setParameters: function (player, obj){
        if(this.isClass(player)){
            classPlayer[player] = obj;
            Network.sendToServer("aw.sp", classPlayer);
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
    if(item.id == ItemID.bookk){
    var client = Network.getClientForPlayer(player);
    if (client) {
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

var Wcode = {};
let path;
Callback.addCallback('LevelSelected', function (levelName, levelPath) {
    path = __packdir__+"worlds/"+levelPath+"/saveAC.json";
    if(FileTools.isExists(path))
        Wcode = FileTools.ReadJSON(path);
});
Callback.addCallback("tick", function(){
    FileTools.WriteJSON(path, Wcode, false);
});
Network.addClientPacket("aw.save", function(packetData) {
    Wcode[packetData.data] = packetData.code;
});
Callback.addCallback("PlayerChangedDimension", function(player, currentId, lastId){
    var client = Network.getClientForPlayer(player);
    if(client != null){
        client.send("aw.w", Wcode);
    }
});
Callback.addCallback("PlayerChangedDimension", function(player, currentId, lastId){
    var client = Network.getClientForPlayer(player);
    if(client != null){
        client.send("aw.c", classPlayer);
    }
});
var Wands = {
    prot: {}, 
    stick: {}, 
    addStick: function (obj){
        this.stick[obj.id] = obj;
        Item.setMaxDamage(obj.id, 32000);
        Item.setToolRender(obj.id, true);
        Item.setUseAnimation(obj.id, Native.ItemAnimation.bow);
        Item.setMaxUseDuration(obj.id, obj.time)
        Item.registerNameOverrideFunction(obj.id, function(item, name) {
              if(item.data!=0){
                  let id1;
                  let id2;
                  if(Wands.getCode(item.data)){
                      id1 = Wands.getCode(item.data).id1;
                      id2 = Wands.getCode(item.data).id2;
                  }
                 return name + "\n предмет: "+Item.getName(id1, 0)+"\n предмет: "+Item.getName(id2, 0);
              }else{
                  return name;
              }
        });
    },
    isStick: function (id){
        if(this.stick[id]){
            return true;
        }else{
            return false;
        }
    }, 
    getPrototype: function (id){
        let code;
        if(this.prot[id]){
            code = this.prot[id];
        }else{
            code = {
                event: "noy", 
                id1: 0, 
                id2: 0
            };
        }
        return code;
    }, 
    isPrototype: function (id){
        if(this.prot[id]){
            return true;
        }else{
            return false;
        }
    }, 
    isCode: function(data){
        if(Wcode[data]){
            return true;
        }else{
            return false;
        }
    }, 
    getStick: function(id){
        return this.stick[id];
    }, 
    getCode: function(data){
        let code;
        if(Wcode[data]){
            code = Wcode[data];
        }else{
            code = {
                event: "noy", 
                id1: 0, 
                id2: 0
            };
        }
        return code;
    }, 
    setPrototype: function(id, obj){
        this.prot[id] = obj;
    }, 
    save: function (data, packet, player){
        var client = Network.getClientForPlayer(player);
        if(client != null){
            client.send("aw.save", {
                data: data, 
                code: packet
            });
        }
    },
    isCompatibility: function(id1, id2){
        let code1 = this.getPrototype(id1);
        let code2 = this.getPrototype(id2);
        let compatibility = {};
        for(i in code2.compatibility){
            let name = code2.compatibility[i];
            compatibility[name] = name;
        }
        if(id1 == compatibility[id1]){
            return false;
        }else{
            return true;
        }
    }
};
Network.addClientPacket("aw.w", function(packetData) {
    Wcode = packetData;
});
Network.addClientPacket("aw.c", function(packetData) {
    classPlayer = packetData;
    FileTools.WriteJSON(__packdir__+"gh.json", classPlayer, true);
});
Network.addClientPacket("aw.text", function(packetData) {
    Game.message(packetData);
});
var PlayerAC = {
    message: function (player, text){
        var client = Network.getClientForPlayer(player);
        if(client != null){
            client.send("aw.text", text);
        }
    }
};
Callback.addCallback("ItemUse", function(coords, item, block, isExternal, player){
    if(Wands.isStick(item.id)){
        if(item.data != 0){
            if(block.id!=BlockID.MagicConnector){
                let code = Wands.getCode(item.data);
                if(code.event == "itemUse")
                if(Wands.isCompatibility(code.id1, code.id2)){
                    if(code.id2!=0){
                         Wands.getPrototype(code.id2).setFunction({coords: coords, item: item, block: block, player: player, entity: player});
                    }else{
                        PlayerAC.message(player, "нельзя использовать пустое заклинание");
                    }
            }else{
                PlayerAC.message(player, Item.getName(code.id1)+" не совместимо с "+Item.getName(code.id2));
            }
           } 
        } 
    }
});
Callback.addCallback("ItemUsingComplete", function(item, player){
        if(Wands.isStick(item.id)){
            if(item.data != 0){
                let code = Wands.getCode(item.data);
                    if(code.event == "usingReleased"){
                        if(Wands.isCompatibility(code.id1, code.id2)){
                        if(code.id2 != 0){
                             Wands.getPrototype(code.id2).setFunction({coords: {x:0,y:0,z:0}, item: item, block: {id:0,data:0}, player: player, entity: player});
                        }else{
                            PlayerAC.message(player, "нельзя использовать пустое заклинание");
                        }
                    }else{
                    PlayerAC.message(player, Item.getName(code.id1)+" не совместимо с "+Item.getName(code.id2));
                }
               } 
            }
        }
});
Callback.addCallback("PlayerAttack", function(player, entity){
    let item = Player.getCarriedItem();
    if(Wands.isStick(item.id)){
        if(item.data != 0){
                let code = Wands.getCode(item.data);
                    if(code.event == "playerAttack")
                    if(Wands.isCompatibility(code.id1, code.id2)){
                        if(code.id2!=0){
                    Wands.getPrototype(code.id2).setFunction({coords: {x:0,y:0,z:0}, item: {id:0,data:0,count:0}, block: {id:0,data:0}, player: player, entity: entity});
                        }else{
                            PlayerAC.message(player, "нельзя использовать пустое заклинание");
                        }
           }else{
               PlayerAC.message(player, Item.getName(code.id1)+" не совместимо с "+Item.getName(code.id2));
            }
        }
    }
});
Wands.addStick({
    id: ItemID.magis_stick, 
    time: 20
});
Wands.setPrototype(ItemID.sroll1, {
    type: "event", 
    event: "itemUse", 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll2, {
    type: "event", 
    event: "usingReleased", 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll3, {
    type: "event", 
    event: "playerAttack", 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll4, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.necromancer >= 5){
            if(c.Aspects >= 5){
                Entity.damageEntity(packet.entity, 6);
                c.Aspects -= 5;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player, "для этого заклинания нужно 5 аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна necromancer 5 уровня")
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll5, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.magis >= 10){
            if(c.Aspects >= 5){
                Entity.addEffect(packet.entity, 1, 2, 240, true, false);
                c.Aspects -= 5;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player, "для этого заклинания нужно 5 аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна magis 10 уровня");
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll6, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.magis >= 10){
            if(c.Aspects >= 20){
                Entity.healEntity(packet.entity, 5);
                c.Aspects -= 20;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player, "для этого заклинания нужно 20 аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна magis 10 уровня");
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll7, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.magis >= 15){
            if(c.Aspects >= 20){
                Entity.addEffect(packet.entity, 5, 3, 240, true, false);
                c.Aspects -= 20;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player, "для этого заклинания нужно 20 аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна magis 15 уровня");
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll8, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        let helt = Entity.getHealth(packet.entity)*3;
        if(c.necromancer>=20){
           if(c.Aspects >= helt){
                Entity.setHealth(packet.entity, 0);
                c.Aspects -= helt;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player, "для убийства даного моба нужно "+helt+" аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна necromancer 20 уровня")
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll9, {
    type: "function", 
    compatibility: [ItemID.sroll2, ItemID.sroll3], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.magis>=5){
            if(c.Aspects >= 5){
                World.destroyBlock(packet.coords.x,packet.coords.y,packet.coords.z, true);
                c.Aspects -= 5;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player,"для этого заклинания нужно 5 аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна magis 5 уровня");
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll10, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.necromancer >= 10){
            if(c.Aspects >= 10){
                Entity.damageEntity(packet.entity, 12);
                c.Aspects -= 10;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player, "для этого заклинания нужно 10 аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна necromancer 10 уровня")
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll11, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.necromancer >= 15){
            if(c.Aspects >= 15){
                Entity.damageEntity(packet.entity, 24);
                c.Aspects -= 15;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player, "для этого заклинания нужно 15 аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна necromancer 15 уровня")
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll12, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.magis >= 15){
            if(c.Aspects >= 40){
                Entity.healEntity(packet.entity, 10);
                c.Aspects -= 40;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player, "для этого заклинания нужно 40 аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна magis 15 уровня");
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll13, {
    type: "function", 
    compatibility: [ItemID.sroll1], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.magis >= 20){
            if(c.Aspects >= 80){
                Entity.healEntity(packet.entity, 20);
                c.Aspects -= 80;
                MagicCore.setParameters(packet.player, c);
            }else{
                PlayerAC.message(packet.player, "для этого заклинания нужно 80 аспектов");
            }
        }else{
            PlayerAC.message(packet.player, "нужна magis 20 уровня");
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});
Wands.setPrototype(ItemID.sroll14, {
    type: "function", 
    compatibility: [ItemID.sroll2, ItemID.sroll3], 
    setFunction: function(packet){
        let c = MagicCore.getValue(packet.player);
        if(c.magis>=30){
            if(c.Aspects + 10 <= c.AspectsNow){
                World.destroyBlock(packet.coords.x,packet.coords.y,packet.coords.z, false);
                c.Aspects += 10;
                MagicCore.setParameters(packet.player, c);
            }else if(c.Aspects <= c.AspectsNow){
                World.destroyBlock(packet.coords.x,packet.coords.y,packet.coords.z, false);
                c.Aspects = c.AspectsNow;
                MagicCore.setParameters(packet.player, c);
            }
        }else{
            PlayerAC.message(packet.player, "нужна magis 30 уровня");
        }
    }, 
    installation: function (player, item){
        delItem(player, item);
    }
});




// file: block/block.js

IDRegistry.genBlockID("rityalPedestal");
Block.createBlock("rityalPedestal", [ {name: "Ritual pedestal", texture: [["rityalPedestal", 0]], inCreative: true} ]);
Translation.addTranslation("Ritual pedestal", {ru: "Ритуальный пьедестал"});
Render.SetAltar(BlockID.rityalPedestal);
TileEntity.registerPrototype(BlockID.rityalPedestal, {
    defaultValues: {
        item: {
            id: 0,
            data: 0
        }
    }, 
    init: function(){
        if(this.data.item.id != 0){
            this.networkData.putInt("itemId", this.data.item.id);
            this.networkData.putInt("itemData", this.data.item.data);
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
    animation: function(item){
        this.networkData.putInt("itemId", item.id);
        this.networkData.putInt("itemData", item.data);
        this.networkData.sendChanges();
        this.data.item = {
            id: item.id,
            data: item.data
        };
    }, 
    drop: function(player){
        this.networkData.putInt("itemId", 0);
        this.networkData.putInt("itemData", 0);
        this.networkData.sendChanges();
        let PA = new PlayerActor(player);
        var B = new BlockSource.getDefaultForActor(player);
        if(PA.getGameMode() == 0){
            B.spawnDroppedItem(this.x, this.y+1,this.z, this.data.item.id, 1, this.data.item.data, null);
        }
        this.data.item = {
            id: 0,
            data: 0
        };
    }, 
    destroyAnimation: function(){
        this.networkData.putInt("itemId", 0);
        this.networkData.putInt("itemData", 0);
        this.networkData.sendChanges();
        this.data.item = {
            id: 0,
            data: 0
        };
    }, 
    click: function(id, count, data, coords, player) {
        if(this.data.item.id != 0){
            if(id != ItemID.bookk)
                this.drop(player);
        }else{
            if(id != ItemID.bookk){
                let item = Player.getCarriedItem();
                delItem(player, {id:id,data:data,count:count}) ;
                this.animation(item);
            }
        }
    }
});
IDRegistry.genBlockID("MagicConnector");
Block.createBlock("MagicConnector", [ {name: "Magic connector", texture: [["MagicReenactor", 0], ["MagicReenactor", 1],["MagicReenactor", 0]], inCreative: true} ]);
Translation.addTranslation("Magic connector", {ru: "магичиский реконструктор"});
TileEntity.registerPrototype(BlockID.MagicConnector, {
    defaultValues: {
        item: {
            id: 0,
            data: 0
        }, 
        code: {
            event: "ItemUse", 
            id1: 0, id2: 0
        }
    }, 
    init: function(){
        if(this.data.item.id != 0){
            this.networkData.putInt("itemId", this.data.item.id);
            this.networkData.putInt("itemData", this.data.item.data);
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
    animation: function(item){
        this.networkData.putInt("itemId", item.id);
        this.networkData.putInt("itemData", item.data);
        this.networkData.sendChanges();
        this.data.item = {
            id: item.id,
            data: item.data
        };
    }, 
    drop: function(player){
        this.networkData.putInt("itemId", 0);
        this.networkData.putInt("itemData", 0);
        this.networkData.sendChanges();
        var PA = new BlockSource.getDefaultForActor(player);
        PA.spawnDroppedItem(this.x, this.y+1,this.z, this.data.item.id, 1, this.data.item.data, null);
        this.data.item = {
            id: 0,
            data: 0
        };
    }, 
    click: function(id, count, data, coords, player) {
        let item = Entity.getCarriedItem(player);
        var PA = new BlockSource.getDefaultForActor(player);
        if(this.data.item.id != 0){
            if(!Wands.isPrototype(id)){
                if(id == ItemID.bookk){
                if(this.data.code.id1!=0){
                    PA.spawnDroppedItem(this.x, this.y+1, this.z, this.data.code.id1, 1, 0, null);
                    this.data.code.id1 = 0;
                }
                if(this.data.code.id2!=0){  
                    PA.spawnDroppedItem(this.x, this.y+1, this.z, this.data.code.id1, 1, 0, null);
                    this.data.code.id2 = 0;
                }
                this.data.code.setFunction = function(packet){};
                this.data.code.event = "ItemUse";
            }else{
                Wands.save(this.data.item.data, this.data.code, player);
                this.drop(player);
                this.data.code = {
                    event: "ItemUse", 
                    id1: 0, id2: 0
                }
               } 
            }
            if(Wands.isPrototype(id)){
                let code = Wands.getPrototype(id);
                let dat;
                if(this.data.item.data == 0){
                    dat = Math.floor(Math.random()*32000);
                }else{
                    dat = this.data.item.data;
                }
                if(code.type=="event"){
                    this.data.code.event = code.event;
                    if(this.data.code.id1!=0){
                        PA.spawnDroppedItem(this.x, this.y+1, this.z, this.data.code.id1, 1, 0, null);
                        this.data.code.id1 = 0;
                    }
                    this.data.code.id1 = id;
                    code.installation(player, item);
                }
                if(code.type=="function"){
                    if(this.data.code.id2!=0){
                        PA.spawnDroppedItem(this.x, this.y+1, this.z, this.data.code.id1, 1, 0, null);
                        this.data.code.id2 = 0;
                    }
                    this.data.code.id2 = id;
                    code.installation(player, item);
                }
                this.data.item.data = dat;
            }
        }else{
            if(Wands.isStick(id)){
                delItem(player, item);
                if(data != 0){
                    this.data.code = Wcode[data];
                }
                this.animation(item);
            }
        }
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




// file: craft.js

Callback.addCallback("LevelLoaded", function() {
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
    magis: 20
});
});




