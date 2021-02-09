LIBRARY({
    name: "DungeonAPI",
    version: 7, 
    api: "CoreEngine",
});
/*
Автор: Reider ___
Внимание! Запрещено:
    1.Распространение библиотеки на сторонних источниках без указание ссылки на официальное сообщество
    2.Изменение кода
    3.Явное копирование кода

    Используя библиотеку вы автоматически соглашаетесь с этими правилами.
*/
function random(max){
    return Math.floor(Math.random()*max);
}
let StructureDir = "structure";
var DungeonArr = {
    registerStructure: function (name){
        return {
            name: name,
            structure: [],
            addBlock: function (identifier){
                this.structure.push(identifier);
            },
            removeBlock: function (identifier){
                for(let i in this.structure){
                    if(this.structure[i] == identifier){
                        this.structure.splice(i, i);
                    }
                }
            },
            setStructure: function (xx, yy, zz, rotation, dimension){
                let blockSource = BlockSource.getDefaultForDimension(dimension || Player.getDimension());
                blockSource = BlockSource.getCurrentWorldGenRegion();
                for(var i in this.structure){
                    let obj = Dungeon.getIdentifier(this.structure[i]);
                    switch(rotation || 0){
                        	case 0:
                        	  var x1 = obj.x;
                        	  var y1 = obj.y;
                        	  var z1 = obj.z;
                        	break;
                        	case 1:
                        	  var x1 = obj.z;
                        	  var y1 = obj.y;
                        	  var z1 = obj.x;
                        	break;
                        	case 2:
                        	  var x1 = -obj.x;
                        	  var y1 = obj.y;
                        	  var z1 = obj.z;
                        	break;
                        	case 3:
                        	  var x1 = -obj.z;
                        	  var y1 = obj.y;
                        	  var z1 = obj.x;
                        	break;
	          	        }
	          	        blockSource.setBlock(xx + x1, yy + y1, zz + z1, obj.id, obj.data);
	          	    }
            },
            ReadStructure: function (rotation){
                let arr = [];
                for(let i in this.structure){
                    let arr3 = this.structure[i].split(".");
                    arr3[0] = Dungeon.getBlockID(arr3[0]);
                    arr3[1] = parseInt(arr3[1]);
                    arr3[2] = parseInt(arr3[2]);
                    arr3[3] = parseInt(arr3[3]);
                    arr3[4] = parseInt(arr3[4]);
                    switch(rotation || 0){
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
                    arr.push({id: arr3[0], data: arr3[1], x: x1, y: y1, z: z1});
                }
                return ar;
            }, 
            isStructure: function (xx, yy, zz, rotation, dimension){
                let arr = this.ReadStructure(rotation || 0);
                let blockSource = BlockSource.getDefaultForDimension(dimension || Player.getDimension());
                blockSource = BlockSource.getCurrentWorldGenRegion();
                let arr2 = [];
                for(i in arr){
                    let obj = arr[i];
                    let block = blockSource.getBlock(obj.x + xx, obj.y + yy, obj.z + zz);
                    if(block.id==obj.id && block.data==obj.data){
                        arr2.push("n");
                    }
                }
                if(arr.length == arr2.length){
                    return true;
                }else{
                    return false;
                }
            },
            transferDungeonAPI: function (){
                let arr = this.structure.structure;
                let arr3 = [];
                for(let i in arr){
                    let arr2 = arr[i];
                    let id = "0.0.0.0.0";
                    if(arr2[3].id){
                        id = Dungeon.generateionIdentifier({
                            id: arr2[3].id,
                            data: arr2[3].data,
                            x: arr2[0],
                            y: arr2[1],
                            z: arr2[2]
                        });
                    }else{
                       id = Dungeon.generateionIdentifier({
                            id: arr2[3],
                            data: 0,
                            x: arr2[0],
                            y: arr2[1],
                            z: arr2[2]
                        });
                    }
                    arr3.push(id);
                }
                this.structure = arr3
            }, 
            save: function (value){
                FileTools.WriteJSON(__dir__ + "/"+ StructureDir +"/" + this.name + ".json", this.structure, value || false);
            }
        };
    }
};
var Dungeon = {
    getArrayBlock: function (name, parameter, value){
        let arr = [];
        let stru = this.getStructure(name);
        for(var i in stru){
            if(parameter == "id"){
                if(stru[i].split(".")[0] == value){
                    arr.push(this.getIdentifier(stru[i]));
                }
            }else if(parameter == "data"){
                if(stru[i].split(".")[1] == value){
                    arr.push(this.getIdentifier(stru[i]));
                }
            }else if(parameter == "x"){
                if(stru[i].split(".")[2] == value){
                    arr.push(this.getIdentifier(stru[i]));
                }
            }else if(parameter == "y"){
                if(stru[i].split(".")[3] == value){
                    arr.push(this.getIdentifier(stru[i]));
                }
            }else if(parameter == "z"){
                if(stru[i].split(".")[4] == value){
                    arr.push(this.getIdentifier(stru[i]));
                }
            }
        }
        return arr;
    },
    removeBlockStructure: function (name, identifier){
         let arr = FileTools.ReadJSON(__dir__ + "/"+ StructureDir +"/" + name);
         for(let i in arr){
             if(arr[i] == identifier){
                 arr.splice(i, i);
             }
         }
         FileTools.WriteJSON(path, arr, true);
    },
    addBlockStructure: function (name, identifier){
        let arr = FileTools.ReadJSON(__dir__ + "/"+ StructureDir +"/" + name);
        arr.push(identifier);
        FileTools.WriteJSON(__dir__ + "/"+ StructureDir +"/" + name, arr, true);
    }, 
    setStructure: function (name, xx, yy, zz, rotation, dimension){
        let blockSource = BlockSource.getDefaultForDimension(dimension || Player.getDimension());
        blockSource = BlockSource.getCurrentWorldGenRegion();
        let arr = FileTools.ReadJSON(__dir__ + "/"+ StructureDir +"/" + name);
        for(let i in arr){
            let arr3 = arr[i].split(".");
            switch(rotation || 0){
		            	case 0:
			          		var coords = {
			          		    x: arr3[2],
			          		    y: arr3[3],
			          		    z: arr3[4]
			          		};
		          			break;
		          		case 1:
		          			var coords = {
			          		    x: arr3[4],
			          		    y: arr3[3],
			          		    z: arr3[2]
			          		};
		          			break;
	          			case 2:
			          		var coords = {
			          		    x: -arr3[2],
			          		    y: arr3[3],
			          		    z: arr3[4]
			          		};
				          	break;
		          		case 3:
			          		var coords = {
			          		    x: -arr3[4],
			          		    y: arr3[3],
			          		    z: arr3[2],
			          		};
			          		break;
	          		}
            blockSource.setBlock(xx + parseInt(coords.x), yy + parseInt(coords.y), zz + parseInt(coords.z), this.getBlockID(arr3[0]), parseInt(arr3[1]));
        }
    }, 
    getStructure: function (name){
        return FileTools.ReadJSON(__dir__ + "/"+ StructureDir +"/" + name);
    }, 
    generateionIdentifier: function (obj){
        return obj.id + "." + obj.data + "." + obj.x + "." + obj.y + "." + obj.z;
    }, 
    setDir: function (path){
        StructureDir = path;
    }, 
    transferStructureAPI: function(name1, name2, t){
       	t = t || false;
        let arr = FileTools.ReadJSON(__dir__ + "/"+ StructureDir +"/" + name1);
        let arr3 = [];
        for(let i in arr){
            let id = this.getIdentifier(arr[i]);
            arr3.push([id.x,id.y,id.z,{id:id.id, data:id.data}]);
        }
        let structure = {
            version: 3,
            structure: arr3
        }
        FileTools.WriteJSON(__dir__ + "/"+ StructureDir +"/" + name2, structure, t);
    }, 
    transferDungeonAPI: function (name1, name2, t){
    	    t = t || false;
        let arr = FileTools.ReadJSON(__dir__ + "/"+ StructureDir +"/" + name1).structure;
        let arr3 = [];
        for(let i in arr){
            let arr2 = arr[i];
            let id = "0.0.0.0.0";
            if(arr2[3].id){
                id = this.generateionIdentifier({
                    id: arr2[3].id,
                    data: arr2[3].data,
                    x: arr2[0],
                    y: arr2[1],
                    z: arr2[2]
                });
            }else{
                id = this.generateionIdentifier({
                    id: arr2[3],
                    data: 0,
                    x: arr2[0],
                    y: arr2[1],
                    z: arr2[2]
                });
            }
            arr3.push(id);
        }
        FileTools.WriteJSON(__dir__ + "/"+ StructureDir +"/" + name2, arr3, t);
    }, 
    transferCode: function (name, rotation, name1){
        let stru = Dungeon.ReadStructure(name, rotation);
        FileTools.WriteText(__dir__+"/"+name1, "function set (x, y, z){ \n", true);
        for(let i in stru){
            let x = "";
            if(stru[i].x<=0){
                if(stru[i].x==0){
                    x = "x"
                }else{
                    x = "x"+stru[i].x;
                }
            }else{
                x = "x+"+stru[i].x;
            }
            let y = "";
            if(stru[i].y<=0){
                if(stru[i].y==0){
                    y = "y"
                }else{
                    y = "y"+stru[i].y;
                }
            }else{
                y = "y+"+stru[i].y
            }
            let z = "";
            if(stru[i].z<=0){
                if(stru[i].z==0){
                    z = "z"
                }else{
                    z = "z"+stru[i].z;
                }
            }else{
                z = "z+"+stru[i].z;
            }
            let id;
            if(Dungeon.isBlock(stru[i].id)<=8000){
                id = Dungeon.isBlock(stru[i].id);
            }else{
                id = "BlockID."+Dungeon.isBlock(stru[i].id);
            }
            FileTools.WriteText(__dir__+"/"+name1, "    World.setBlock("+x+", "+y+", "+z+", "+id+", "+stru[i].data+"); \n", true);
        }
        FileTools.WriteText(__dir__+"/"+name1, "} \n", true);
    },
    getIdentifier: function (identifier){
        let ide = identifier;
        let arr3 = ide.split(".");
        let identifie = {
            id: this.getBlockID(arr3[0]),
            data: parseInt(arr3[1]),
            x: parseInt(arr3[2]),
            y: parseInt(arr3[3]),
            z: parseInt(arr3[4])
        };
        return identifie;
    }, 
    copy: function (file, file2, t){
        t = t || false;
        let arr = FileTools.ReadJSON(__dir__ + "/"+ StructureDir +"/" + file);
        FileTools.WriteJSON(__dir__ + "/"+ StructureDir +"/" + file2, arr, t);
    }, 
    destroyStructure: function (name, xx, yy, zz, rotation, dimension){
        let blockSource = BlockSource.getDefaultForDimension(dimension || Player.getDimension());
        blockSource = BlockSource.getCurrentWorldGenRegion();
        let arr = FileTools.ReadJSON(__dir__ + "/"+ StructureDir +"/" + name);
        for(var i in arr){
            let arr3 = arr[i].split(".");
            switch(rotation || 0){
		            	case 0:
			          		var coords = {
			          		    x: arr3[2],
			          		    y: arr3[3],
			          		    z: arr3[4]
			          		};
		          			break;
		          		case 1:
		          			var coords = {
			          		    x: arr3[4],
			          		    y: arr3[3],
			          		    z: arr3[2]
			          		};
		          			break;
	          			case 2:
			          		var coords = {
			          		    x: -arr3[2],
			          		    y: arr3[3],
			          		    z: arr3[4]
			          		};
				          	break;
		          		case 3:
			          		var coords = {
			          		    x: -arr3[4],
			          		    y: arr3[3],
			          		    z: arr3[2],
			          		};
			          		break;
	          		}
            blockSource.setBlock(xx + parseInt(coords.x), yy + parseInt(coords.y), zz + parseInt(coords.z), 0, 0);
        }
    }, 
    ReadStructure: function (name, rotation){
        let arr = FileTools.ReadJSON(__dir__ + "/"+ StructureDir +"/" + name);
        let ar = [];
        for(var i in arr){
            let arr3 = arr[i].split(".");
            switch(rotation || 0){
		            	case 0:
			          		var coords = {
			          		    x: arr3[2],
			          		    y: arr3[3],
			          		    z: arr3[4]
			          		};
		          			break;
		          		case 1:
		          			var coords = {
			          		    x: arr3[4],
			          		    y: arr3[3],
			          		    z: arr3[2]
			          		};
		          			break;
	          			case 2:
			          		var coords = {
			          		    x: -arr3[2],
			          		    y: arr3[3],
			          		    z: arr3[4]
			          		};
				          	break;
		          		case 3:
			          		var coords = {
			          		    x: -arr3[4],
			          		    y: arr3[3],
			          		    z: arr3[2],
			          		};
			          		break;
	          		}
            ar.push({id: this.getBlockID(arr3[0]), data: parseInt(arr3[1]), x: parseInt(coords.x), y: parseInt(coords.y), z: parseInt(coords.z)});
        }
        return ar;
    }, 
    isStructure: function (name, xx, yy, zz, rotation, dimension){
        let arr = Dungeon.ReadStructure(name, rotation);
        let blockSource = BlockSource.getDefaultForDimension(dimension || Player.getDimension());
        blockSource = BlockSource.getCurrentWorldGenRegion();
        let arr2 = [];
        for(var i in arr){
            if(blockSource.getBlock(arr[i].x + xx, arr[i].y + yy, arr[i].z + zz).id==arr[i].id && blockSource.getBlock(arr[i].x + xx, arr[i].y + yy, arr[i].z + zz).data==arr[i].data){
                arr2.push(".");
            }
        }
        if(arr.length == arr2.length){
            return true;
        }else{
            return false;
        }
    },
    getBlockID: function(id){
        let Block = BlockID[id];
        if(!Block){
            Block = parseInt(id);
        }
        return Block;
    },
    isBlock: function(id){
        let blocks = BlockID;
        let d;
        if(id >= 8000){
           key = Object.keys(blocks);
           for(let i in key){
               let k = key[i];
               if(blocks[k]==id){
                   d = k;
                   break;
               }
           }
        }else{
            d = id
        }
        return d;
    }
};
function DungeonAPI (path){
    let code = {
        isSetBlock: function(x, y, z, id, data, identifier, packet, dimension){
            return true;
        },
        before: function (x, y, z, rotation, packet, dimension){},
        setStructure: function(x, y, z, id, data, identifier, packet, dimension){},
        after: function(x, y, z, rotation, packet, dimension){}
    };
    var pathJson = __dir__+ "/" + StructureDir + "/" + path;
    let rota;
    this.setPrototype = function (obj){
        if(!obj.isSetBlock){
            obj.isSetBlock = function(x, y, z, id, data, identifier, packet, dimension){
                return true;
            }
        }
        if(!obj.before){
            obj.before = function (x, y, z, rotation, packet, dimension){};
        }
        if(!obj.setStructure){
            obj.setStructure = function(x, y, z, id, data, identifier, packet, dimension){};
        }
        if(!obj.after){
            obj.after = function(x, y, z, rotation, packet, dimension){}
        }
        code = obj;
    }
    this.setPath = function (path){
        var pathJson = __dir__ + "/"+ StructureDir +"/" + path;
    }
    this.setStructure = function (xx, yy, zz, rotation, dimension, packet){
        let blockSource = BlockSource.getDefaultForDimension(dimension || Player.getDimension());
        blockSource = BlockSource.getCurrentWorldGenRegion();
        packet = packet || {};
        let arr = FileTools.ReadJSON(pathJson);
        code.before(xx, yy, zz, rotation || 0, packet, dimension || Player.getDimension());
        for(i in arr){
            let arr3 = arr[i].split(".");
            let id = Dungeon.getBlockID(arr3[0]);
            switch(rotation || 0){
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
            if(code.isSetBlock(xx + parseInt(arr3[2]), yy + parseInt(arr3[3]), zz + parseInt(arr3[4]), Dungeon.getBlockID(arr3[0]), parseInt(arr3[1]), arr[i], packet, dimension || Player.getDimension())){
                    blockSource.setBlock(xx + parseInt(arr3[2]), yy + parseInt(arr3[3]), zz + parseInt(arr3[4]), Dungeon.getBlockID(arr3[0]), parseInt(arr3[1]));
            }
            code.setStructure(xx + parseInt(arr3[2]), yy + parseInt(arr3[3]), zz + parseInt(arr3[4]), Dungeon.getBlockID(arr3[0]), parseInt(arr3[1]), arr[i], packet, dimension || Player.getDimension());
        }
        code.after(xx, yy, zz, rotation || 0, packet, dimension || Player.getDimension());
    }
    this.getStructure = function (){
        return FileTools.ReadJSON(pathJson);
    }
    this.getPrototype = function (){
        return code;
    }
};
var blockArray = [];
Callback.addCallback("NativeCommand", function(str){
    let cmd = str.split(" ");
    if(cmd[0] == "/tool"){
        Game.message("§2выдан инструмент");
        let coords = Entity.getPosition(Player.get());
        World.drop(coords.x, coords.y, coords.z, ItemID.debugTools, 1);
        Game.prevent();
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
					                let identifier = Dungeon.isBlock(b.id) + "." + b.data + "." + xi + "." + yi + "." + zi;
					                if(cmd[4] == "false"){
					                if(World.getBlock(x,y,z).id!=0)
					                blockArray.push(identifier);
					                }else{
					                blockArray.push(identifier);
					                }
                    }
                } 
            } 
            if(cmd[3]=="true"){
                FileTools.WriteJSON (__dir__+"/"+ StructureDir +"/" + cmd[2], blockArray, true);
            }else{
                FileTools.WriteJSON (__dir__+"/"+ StructureDir +"/" + cmd[2], blockArray, false);
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
var TYPE = {
  helmet: [{e: 0, l: 4}, {e: 1, l: 4}, {e: 3, l: 4}, {e: 4, l: 4}, {e: 5, l: 3}, {e: 6, l: 3}, {e: 8, l: 1}, {e: 17, l: 3}],
  chestplate: [{e: 0, l: 4}, {e: 1, l: 4}, {e: 3, l: 4}, {e: 4, l: 4}, {e: 5, l: 3}, {e: 17, l: 3}],
  leggings: [{e: 0, l: 4}, {e: 1, l: 4}, {e: 3, l: 4}, {e: 4, l: 4}, {e: 5, l: 3}, {e: 17, l: 3}],
  boots: [{e: 0, l: 4}, {e: 1, l: 4}, {e: 2, l: 4}, {e: 3, l: 4}, {e: 4, l: 4}, {e: 5, l: 3}, 7, {e: 17, l: 3}],
  sword: [{e: 9, l: 5}, {e: 10, l: 5}, {e: 11, l: 5}, {e: 12, l: 2}, {e: 13, l: 2}, {e: 14, l: 3}, {e: 17, l: 3}],
  shovel: [{e: 15, l: 5}, {e: 16, l: 1}, {e: 17, l: 3}, {e: 18, l: 3}],
  pickaxe: [{e: 15, l: 5}, {e: 16, l: 1}, {e: 17, l: 3}, {e: 18, l: 3}],
  axe: [{e: 9, l: 5}, {e: 10, l: 5}, {e: 11, l: 5}, {e: 15, l: 5}, {e: 16, l: 1}, {e: 17, l: 3}, {e: 18, l: 3}],
  hoe: [{e: 17, l: 3}],
  bow: [{e: 17, l: 3}, {e: 19, l: 5}, {e: 18, l: 2}, {e: 21, l: 1}, {e: 22, l: 1}],
  fishing: [{e: 17, l: 3}, {e: 23, l: 3}, {e: 24, l: 3}],
  shears: [{e: 15, l: 5}, {e: 17, l: 3}],
};
let dir = "ItemGenerate";
let ItemGenerateAPI = {
    deb: false, 
    setDir: function (path){
        dir = path;
    }, 
    debug: function(value){
        this.deb = value
    },
    enchantAdd: function (type, count){
        let arr = TYPE[type];
        let extra = new ItemExtraData();
        for(var i=0;i<=count;i++){
            let r = Math.ceil(Math.random()*(arr.length-1));
            let lvl = Math.ceil(Math.random()*(arr[r].l))+1;
            extra.addEnchant(arr[r].e, lvl);
        }
        return extra;
    }
};
function is (container, slot, id, data, count){
    if(container){
        if(slot >= 0){
            if(id){
                if(data >= 0){
                    if(count){
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }else{
            return false;
        }
    }else{
        return false;
    }
}
function ItemGenerate (){
    this.generateion = []
    this.Prototype = {
        isGenerate: function(slot, x, y, z, random, id, data, count, packet, dimension){
            return true;
        },
        beforeGenerating: function (x, y, z, random, slot, id, data, packet, dimension){},
        setFunction: function (slot, x, y, z, random, id, data, count, packet, dimension){},
        afterGenerating: function (x, y, z, random, slot, id, data, packet, dimension){}
        
    }
    this.importJson = function (file){
        this.generateion = FileTools.ReadJSON(__dir__+"/"+dir+"/"+file);
    }
    this.exportJson = function (file, value){
        FileTools.WriteJSON(__dir__+"/"+dir+"/"+file, this.generateion, value);
    }
    this.addItem = function (id, random, count, data){
        random = random||1;
        count = count||{};
        count.min = count.min||1;
        count.max = count.max||1;
        data = data||0;
        this.generateion.push({id:id, data:data, random:random, count:count});
    }
    this.setPrototype = function (obj){
        if(!obj.isGenerate){
            obj.isGenerate = function(slot, x, y, z, random, id, data, count, packet, dimension){
                return true;
            };
        }
        if(!obj.beforeGenerating){
            obj.beforeGenerating = function (x, y, z, random, slot, id, data, packet, dimension){};
        }
        if(!obj.setFunction){
            obj.setFunction = function (slot, x, y, z, random, id, data, count, packet, dimension){};
        }
        if(!obj.afterGenerating){
            obj.afterGenerating = function (x, y, z, random, slot, id, data, packet, dimension){};
        }
        this.Prototype = obj;
    }
    this.fillChest = function (x, y, z, dimension, packet){
        dimension = dimension || Player.getDimension();
        let blockSource = BlockSource.getDefaultForDimension(dimension);
        blockSource = BlockSource.getCurrentWorldGenRegion();
        packet = packet || {}
        let container = World.getContainer(x, y, z, blockSource);
        if(container){
            let random = Math.random();
            let slot = Math.random()*27;
            for(i in this.generateion){
                let item = {
                    id: this.generateion[i].id, 
                    data: this.generateion[i].data, 
                    count: this.generateion[i].count 
                };
                this.Prototype.beforeGenerating(x, y, z, random, slot, item.id, item.data, packet, dimension);
                if(random<this.generateion[i].random){
                    let count = Math.floor(Math.random()*(item.count.max))+item.count.min; 
                    if(this.Prototype.isGenerate(slot, x, y, z, random, item.id, item.data, count, packet, dimension)){
                        if(is(container, slot, item.id, item.data, count)){
                            container.setSlot(slot, item.id, count, item.data);
                        }
                    }
                    this.Prototype.setFunction(slot, x, y, z, random, item.id, item.data, count, packet, dimension)
                    slot = Math.random()*27;
                }
                this.Prototype.afterGenerating(x, y, z, random, slot, item.id, item.data, packet, dimension);
            }
        }else if(ItemGenerateAPI.deb == true){
            Game.tipMessage("noy chest")
        }
    }
    this.fillChestSit = function (x, y, z, sid, dimension, packet){
        dimension = dimension || Player.getDimension();
        let blockSource = BlockSource.getDefaultForDimension(dimension);
        blockSource = BlockSource.getCurrentWorldGenRegion();
        packet = packet || {}
        let container = World.getContainer(x, y, z, blockSource);
        if(container){
            let random = sid.nextInt(100);
            let slot = sid.nextInt(27);
            for(i in this.generateion){
                let item = {
                    id: this.generateion[i].id, 
                    data: this.generateion[i].data, 
                    count: this.generateion[i].count 
                };
                this.Prototype.beforeGenerating(x, y, z, random, slot, item.id, item.data, packet, dimension);
                if(random<this.generateion[i].random){
                    let count = Math.floor(Math.random()*(item.count.max))+item.count.min; 
                    if(this.Prototype.isGenerate(slot, x, y, z, random, item.id, item.data, count, packet, dimension)){
                        if(is(container, slot, item.id, item.data, count)){
                            container.setSlot(slot, item.id, count, item.data);
                        }
                    }
                        this.Prototype.setFunction(slot, x, y, z, random, item.id, item.data, count, packet, dimension)
                    slot = sid.nextInt(27);
                }
                this.Prototype.afterGenerating(x, y, z, random, slot, item.id, item.data, packet, dimension);
            }
        }else if(ItemGenerateAPI.deb == true){
            Game.tipMessage("noy chest")
        }
    }
    this.setItems = function (arr){
        this.generateion = arr;
    }
    this.registerRecipeViewer = function(type, title){
        let arr = this.generateion;
        ModAPI.addAPICallback("RecipeViewer", function(api){
            let recipeList = [];
            RV = api.Core;
            for(i in arr){
                let item = arr[i];
                let ch = ""+item.random;
                ch = ch.split(".");
                if(ch[1]){
                    if(ch[1].split("").length<=1){
                        ch = ch[1]+"0";
                    }else{
                        ch = ch[1];
                    }
                }else{
                    if(ch[0]==1){
                        ch = ch[0]+"00";
                    }else if(ch[0].split("").length<=1){
                        ch = ch[0]+"0"
                    }
                }
                recipeList.push({
                    max: item.count.max,
                    min: item.count.min,
                    chance: ch+"%",
                    input: [],
                    output: [
                        {id: item.id, data: item.data}
                    ]
                });
            }
            RV.registerRecipeType(type, {
                title: title,
                contents: {
                    icon: 54,
                    params: {slot: "_default_slot_light"},
                    drawing: [
                         {type: "bitmap", x: 100, y: 100, scale: 0.5, bitmap: "chest_rv"}
                    ],
                    elements: {
                        output0: {x: 300, y: 150, size: 120},
                        textMax: {type: "text", x: 490, y: 110, font: {size: 40}},
                        textMin: {type: "text", x: 490, y: 160, font: {size: 40}},
                        textChance: {type: "text", x: 490, y: 210, font: {size: 40}},
                    },
                },
                recipeList: recipeList,
                onOpen: function(elements, data){
                     elements.get("textMax").onBindingUpdated("text", "max spawn: "+data.max);
                    elements.get("textMin").onBindingUpdated("text", "min spawn: "+data.min);
                    elements.get("textChance").onBindingUpdated("text", "chance spawn: "+data.chance);
                }
            });
        });
    }
}
var File = {
    update1: function(file, value){
        let path = __dir__ + "/"+ StructureDir +"/" + file;
        let structure = Dungeon.getStructure(file);
        let arr = [];
        for(i in structure){
            if(structure[i].identifier){
                arr[i] = structure[i].identifier;
            }
        }
        if(structure[0].identifier){
            FileTools.WriteJSON(path, arr, value);
        }
    }, 
    update2: function(file, value){
        let stru = Dungeon.getStructure(file);
        let Structure = [];
        let identifier;
        for(i in stru){
            identifier = Dungeon.getIdentifier(stru[i]);
            identifier.id = Dungeon.isBlock(identifier.id);
             Structure.push(Dungeon.generateionIdentifier(identifier));
        }
        
        FileTools.WriteJSON(__dir__ + "/"+ StructureDir +"/" + file, Structure, value)
    }
};
EXPORT("DungeonAPI", DungeonAPI);
EXPORT("Dungeon", Dungeon);
EXPORT("ItemGenerate", ItemGenerate);
EXPORT("ItemGenerateAPI", ItemGenerateAPI);
EXPORT("File", File);
EXPORT("DungeonArr", DungeonArr);