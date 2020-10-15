LIBRARY({
    name: "DungeonAPI",
    version: 4, 
    api: "CoreEngine",
});
/*
Автор: Reider ___
Внимание! Запрещено:
    1.Распространение библиотеки на сторонних источниках без указание ссылки на официальное сообщество
    2.Изменение кода
    3.Явное копирование кода

    Используя библиотеку вы автоматически соглашаетесь с этими правилами.
V 1.0 
1)создана библиотека :) 
V 1.1
1)размер файлов уменьшен в 3 раза
2)изменена система чтения файла была изменена(файлы которые были созданы ранее будут работать)
2)изменена система сохранения
V 1.2
1)ДОБАВЛЕНЫ НОВЫЕ ФУНКЦИИ 
V 1.3
1)добавлен повород структуры
*/
alert("https://vk.com/club186544580");
let StructureDir = "structure";
var Dungeon = {
    removeBlockStructure: function (name, identifier){
         let path = __dir__ + "/"+ StructureDir +"/" + name;
         let arr = FileTools.ReadJSON(path);
         for(i in arr){
             if(arr[i].identifier == identifier){
                 arr.splice(i, i);
             }
         }
         FileTools.WriteJSON(path, arr, true);
    }, 
    addBlockStructure: function (name, identifier){
        let path = __dir__ + "/"+ StructureDir +"/" + name;
        let arr = FileTools.ReadJSON(path);
        arr.push({identifier: identifier});
        FileTools.WriteJSON(path, arr, true);
    }, 
    setStructure: function (name, xx, yy, zz, rotation){
        let path = __dir__ + "/"+ StructureDir +"/" + name;
        let arr = FileTools.ReadJSON(path);
        let rot = rotation || 0;
        for(i in arr){
            let arr2 = arr[i];
            let arr3 = arr2.identifier.split(".");
            let id = arr3[0];
            id = parseInt(id);
            let data = arr3[1];
            data = parseInt(data);
            arr3[2] = parseInt(arr3[2]);
            arr3[3] = parseInt(arr3[3]);
            arr3[4] = parseInt(arr3[4]);
            switch(rot){
		            	case 0:
			            	var x1 = arr3[2];
			          		var y1 = arr3[3];
			          		var z1 = arr3[4];
		          			break;
		          		case 1:
			            	var x1 = arr3[4];
			          		var y1 = arr3[3];
		          			var z1 = arr3[2];
		          			break;
	          			case 2:
			          		var x1 = -arr3[2];
		          			var y1 = arr3[3];
			          		var z1 = arr3[4];
				          	break;
		          		case 3:
			          		var x1 = -arr3[4];
			          		var y1 = arr3[3];
	          				var z1 = arr3[2];
			          		break;
	          		}
            let x = xx + x1;
            let y = yy + y1;
            let z = zz + z1;
            World.setBlock(x, y, z, id, data);
        }
    }, 
    getStructure: function (name){
        let path = __dir__ + "/"+ StructureDir +"/" + name;
        let arr = FileTools.ReadJSON(path);
        return arr;
    }, 
    generateionIdentifier: function (obj){
        let identifier = obj.id + "." + obj.data + "." + obj.x + "." + obj.y + "." + obj.z;
        return identifier;
    }, 
    setDir: function (path){
        StructureDir = path;
    }, 
    transferStructureAPI: function(name1, name2, t){
        let path1 = __dir__ + "/"+ StructureDir +"/" + name1;
        let arr = FileTools.ReadJSON(path1);
        let path2 = __dir__ + "/"+ StructureDir +"/" + name2;
        let arr3 = [];
        for(i in arr){
            let arr2 = arr[i]
            let id = this.getIdentifier(arr2.identifier);
            arr3.push({x: id.x, y: id.y, z: id.z, id: id.id, data: id.data});
        }
        FileTools.WriteJSON(path2, arr3, t);
    }, 
    transferDungeonAPI: function (name1, name2, t){
        let path1 = __dir__ + "/"+ StructureDir +"/" + name1;
        let arr = FileTools.ReadJSON(path1);
        let path2 = __dir__ + "/"+ StructureDir +"/" + name2;
        let arr3 = [];
        for(i in arr){
            let arr2 = arr[i]
            let id = this.generateionIdentifier(arr2);
            arr3.push({identifier: id});
        }
        FileTools.WriteJSON(path2, arr3, t);
    }, 
    getIdentifier: function (identifier){
        let ide = identifier;
        let arr3 = ide.split(".");
        arr3[0] = parseInt(arr3[0]);
        arr3[1] = parseInt(arr3[1]);
        arr3[2] = parseInt(arr3[2]);
        arr3[3] = parseInt(arr3[3]);
        arr3[4] = parseInt(arr3[4]);
        let identifie = {
            id: arr3[0],
            data: arr3[1],
            x: arr3[2],
            y: arr3[3],
            z: arr3[4]
        };
        return identifie;
    }, 
    copy: function (file, file2, t){
        let path = __dir__ + "/"+ StructureDir +"/" + file;
        let path2 = __dir__ + "/"+ StructureDir +"/" + file2;
        let arr = FileTools.ReadJSON(path);
        FileTools.WriteJSON(path2, arr, t);
    }, 
    destroyStructure: function (name, xx, yy, zz, rotation){
        let path = __dir__ + "/"+ StructureDir +"/" + name;
        let arr = FileTools.ReadJSON(path);
        let rot = rotation || 0;
        for(i in arr){
            let arr2 = arr[i];
            let arr3 = arr2.identifier.split(".");
            arr3[2] = parseInt(arr3[2]);
            arr3[3] = parseInt(arr3[3]);
            arr3[4] = parseInt(arr3[4]);
            switch(rot){
		            	case 0:
			            	var x1 = arr3[2];
			          		var y1 = arr3[3];
			          		var z1 = arr3[4];
		          			break;
		          		case 1:
			            	var x1 = arr3[4];
			          		var y1 = arr3[3];
		          			var z1 = arr3[2];
		          			break;
	          			case 2:
			          		var x1 = -arr3[2];
		          			var y1 = arr3[3];
			          		var z1 = arr3[4];
				          	break;
		          		case 3:
			          		var x1 = -arr3[4];
			          		var y1 = arr3[3];
	          				var z1 = arr3[2];
			          		break;
	          		}
            let x = xx + x1;
            let y = yy + y1;
            let z = zz + z1;
            World.setBlock(x, y, z, 0, 0);
        }
    }, 
    ReadStructure: function (name, rotation){
        let path = __dir__ + "/"+ StructureDir +"/" + name;
        let arr = FileTools.ReadJSON(path);
        let rot = rotation || 0;
        let ar = [];
        for(i in arr){
            let arr2 = arr[i];
            let arr3 = arr2.identifier.split(".");
            arr3[0] = parseInt(arr3[0]);
            arr3[1] = parseInt(arr3[1]);
            arr3[2] = parseInt(arr3[2]);
            arr3[3] = parseInt(arr3[3]);
            arr3[4] = parseInt(arr3[4]);
            switch(rot){
		            	case 0:
			            	var x1 = arr3[2];
			          		var y1 = arr3[3];
			          		var z1 = arr3[4];
		          			break;
		          		case 1:
			            	var x1 = arr3[4];
			          		var y1 = arr3[3];
		          			var z1 = arr3[2];
		          			break;
	          			case 2:
			          		var x1 = -arr3[2];
		          			var y1 = arr3[3];
			          		var z1 = arr3[4];
				          	break;
		          		case 3:
			          		var x1 = -arr3[4];
			          		var y1 = arr3[3];
	          				var z1 = arr3[2];
			          		break;
	          		}
            ar.push({id: arr3[0], data: arr3[1], x: x1, y: y1, z: z1});
        }
        return ar;
    }
};
function DungeonAPI (path){
    let code = {};
    var pathJson = __dir__+ "/" + StructureDir + "/" + path;
    let rota;
    this.setPrototype = function (obj){
        code = obj;
    }
    this.setPath = function (path){
        var pathJson = __dir__ + "/"+ StructureDir +"/" + path;
    }
    this.setStructure = function (xx, yy, zz, rotation){
        let arr = FileTools.ReadJSON(pathJson);
        let rot = rotation || 0;
        for(i in arr){
            let arr2 = arr[i];
            let arr3 = arr2.identifier.split(".");
            let id = arr3[0];
            id = parseInt(id);
            let data = arr3[1];
            data = parseInt(data);
            arr3[2] = parseInt(arr3[2]);
            arr3[3] = parseInt(arr3[3]);
            arr3[4] = parseInt(arr3[4]);
            switch(rot){
		            	case 0:
			            	var x1 = arr3[2];
			          		var y1 = arr3[3];
			          		var z1 = arr3[4];
		          			break;
		          		case 1:
			            	var x1 = arr3[4];
			          		var y1 = arr3[3];
		          			var z1 = arr3[2];
		          			break;
	          			case 2:
			          		var x1 = -arr3[2];
		          			var y1 = arr3[3];
			          		var z1 = arr3[4];
				          	break;
		          		case 3:
			          		var x1 = -arr3[4];
			          		var y1 = arr3[3];
	          				var z1 = arr3[2];
			          		break;
	          		}
            let x = xx + x1;
            let y = yy + y1;
            let z = zz + z1;
            if(code.isSetBlock(x, y, z, id, data, arr2.identifier)){
                    World.setBlock(x, y, z, id, data);
            }
            if(code.setStructure)
                code.setStructure(x, y, z, id, data, arr2.identifier);
        }
    }
    this.setStructurePro = function (xx, yy, zz, func, rotation){
        let arr = FileTools.ReadJSON(pathJson);
        let rot = rotation || 0;
        for(i in arr){
            let arr2 = arr[i];
            let arr3 = arr2.identifier.split(".");
            let id = arr3[0];
            id = parseInt(id);
            let data = arr3[1];
            data = parseInt(data);
            arr3[2] = parseInt(arr3[2]);
            arr3[3] = parseInt(arr3[3]);
            arr3[4] = parseInt(arr3[4]);
            switch(rot){
		            	case 0:
			            	var x1 = arr3[2];
			          		var y1 = arr3[3];
			          		var z1 = arr3[4];
		          			break;
		          		case 1:
			            	var x1 = arr3[4];
			          		var y1 = arr3[3];
		          			var z1 = arr3[2];
		          			break;
	          			case 2:
			          		var x1 = -arr3[2];
		          			var y1 = arr3[3];
			          		var z1 = arr3[4];
				          	break;
		          		case 3:
			          		var x1 = -arr3[4];
			          		var y1 = arr3[3];
	          				var z1 = arr3[2];
			          		break;
	          		}
            let x = xx + x1;
            let y = yy + y1;
            let z = zz + z1;
            if(func.isSetBlock(x, y, z, id, data, arr2.identifier)){
                    World.setBlock(x, y, z, id, data);
            }
            if(func.setStructure)
                func.setStructure(x, y, z, id, data, arr2.identifier);
        }
    }
    this.getStructure = function (){
        let arr = FileTools.ReadJSON(pathJson);
        return arr;
    }
    this.getPrototype = function (){
        return code;
    }
};
var blockArray = [];
Callback.addCallback("NativeCommand", function(str){
    let cmd = str.split(" ");
    if(cmd[0] == "/tool"){
        Game.prevent();
        Game.message("§2выдан инструмент");
        let coords = Entity.getPosition(Player.get());
        World.drop(coords.x, coords.y, coords.z, ItemID.debugTools, 1);
    }
    if(cmd[0] == "/structure"){
        if(cmd[1] == "write"){
            Game.prevent();
            for(x = Math.min(coordinates[0].x, coordinates[1].x); x<=Math.max(coordinates[0].x, coordinates[1].x);x++){
		             	for(z = Math.min(coordinates[0].z, coordinates[1].z); z<=Math.max(coordinates[0].z, coordinates[1].z);z++){
				              for(y = Math.min(coordinates[0].y, coordinates[1].y); y<=Math.max(coordinates[0].y, coordinates[1].y);y++){
				                  let b = World.getBlock(x, y, z);
				                  let xi = x - origin.x;
				                  let yi = y - origin.y;
				                  let zi = z - origin.z;
					                let identifier = b.id + "." + b.data + "." + xi + "." + yi + "." + zi;
					                if(World.getBlock(x,y,z).id!=0)
					                    blockArray.push({identifier: identifier});
					                FileTools.WriteJSON (__dir__+"/"+ StructureDir +"/" + cmd[2], blockArray, true);
                    }
                } 
            } 
            Game.message("§2структура сохранена");
            blockArray = [];
        }
    }
});
var firstClick = true;
var es = ModAPI.requireGlobal("Entity.isSneaking");
var origin = {x:0, y:0, z:0};
var coordinates=[{},{}];
IDRegistry.genItemID("debugTools"); 
Item.createItem("debugTools", "debug tool", {name: "axe", meta: 0}, {stack: 1, isTech: true});
Callback.addCallback("ItemUse", function(coords, item){ 
    if(item.id == ItemID.debugTools&&es(Player.get())){ 
	      origin = coords;
        Game.message("установлен цент структуры");
    }else if(item.id == ItemID.debugTools&&!es(Player.get())){
	      if(!firstClick){
	          coordinates[1] = coords;
	          Game.message("second click");
	      }else{
	          Game.message("first click");
	          coordinates[0]=coords;
	          
	      }
	      firstClick = firstClick?false:true;
}
});
function ItemGenerate (){
    let GenerateionItem = [];
    let code;
    this.addItem = function (id, random, count, data){
        random = random||1;
        count = count||{};
        count.min = count.min||1;
        count.max = count.max||1;
        data = data||0;
        GenerateionItem.push({id:id, data:data, random:random, count:count});
    }
    this.setPrototype = function(obj) {
        code = obj;
    }
    this.fillChest = function (x, y, z){
        var container = World.getContainer(x, y, z);
        if(container){
            var random = Math.random();
            var slot = Math.random()*27;
            for(var i in GenerateionItem){
                if(random<GenerateionItem[i].random){
                    var slot1 = container.getSlot(slot);
                    var count = Math.floor(Math.random()*(GenerateionItem[i].count.max-GenerateionItem[i].count.min))+GenerateionItem[i].count.min; 
                    if(code.isGenerate(slot, x, y, z, GenerateionItem[i].id, GenerateionItem[i].data, count))
                        container.setSlot(slot, GenerateionItem[i].id, count, GenerateionItem[i].data);
                        
                    if(code.setFunction)
                        code.setFunction(slot, x, y, z, GenerateionItem[i].id, GenerateionItem[i].data, count)
                    slot = Math.random()*27;
                }
            }
        }else{
            //Game.message("error: no chest")
        }
    }
    this.fillChestPro = function (x, y, z, func){
        var container = World.getContainer(x, y, z);
        if(container){
            var random = Math.random();
            var slot = Math.random()*27;
            for(var i in GenerateionItem){
                if(random<GenerateionItem[i].random){
                    var slot1 = container.getSlot(slot);
                    var count = Math.floor(Math.random()*(GenerateionItem[i].count.max-GenerateionItem[i].count.min))+GenerateionItem[i].count.min; 
                    this.func = func 
                    container.setSlot(slot, GenerateionItem[i].id, count, GenerateionItem[i].data);
                    func(slot, x, y, z, GenerateionItem[i].id, GenerateionItem[i].data, count);
                    slot = Math.random()*27;
                }
            }
        }else{
            //Game.message("error: no chest")
        }
    }
    this.getItem = function (){
        return GenerateionItem;
    }
}
var TYPE = {
  helmet: [0, 1, 3, 4, 5, 6, 8, 17],
  chestplate: [0, 1, 3, 4, 5, 17],
  leggings: [0, 1, 3, 4, 5, 17],
  boots: [0, 1, 2, 3, 4, 5, 7, 17],
  sword: [9, 10, 11, 12, 13, 14, 17],
  shovel: [15, 16, 17, 18],
  pickaxe: [15, 16, 17, 18],
  axe: [9, 10, 11, 15, 16, 17, 18],
  hoe: [17],
  bow: [17, 19, 20, 21, 22],
  fishing: [17, 23, 24],
  shears: [15, 17],
};
function enchantAdd (random, typ, ech){
    for(i = 0;i <= ech;i++){
        let extra = new ItemExtraData();
        if(Math.random()*1<=random){
            let enc = 0;
            let ty = TYPE[typ]
            for(i in ty){
                enc++;
            }
            let ran2 = Math.floor(Math.random()*enc);
            let ran3 = Math.floor(Math.random()*2 + 1);
            let ench = ty[ran2];
            extra.addEnchant(ench, ran3);
        }
    }
    return extra;
}
EXPORT("DungeonAPI", DungeonAPI);
EXPORT("Dungeon", Dungeon);
EXPORT("ItemGenerate", ItemGenerate);
EXPORT("enchantAdd", enchantAdd);