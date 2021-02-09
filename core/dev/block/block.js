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
