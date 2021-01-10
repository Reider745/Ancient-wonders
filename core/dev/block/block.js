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
                prot.installation(player, Entity.getCarriedItem(player));
                if(prot.type == "event"){
                    this.blockSource.spawnDroppedItem(this.x, this.y+1,this.z, this.data.item.extra.getInt("event", 0), 1, 0, null);
                    this.data.item.extra.putInt("event", id);
                }
                if(prot.type == "function"){
                    if(this.data.item.extra.getInt("spell", -9)==-9){
                        this.data.item.extra.putInt("spell", Object.keys(Wands.data).length);
                        Wands.data["s" + Object.keys(Wands.data).length] = [];
                    }
                    Wands.data["s" + this.data.item.extra.getInt("spell", -9)].push(id);
                }
            }else{
                if(id == ItemID.bookk && this.data.item.id != 0){
                    if(Entity.getSneaking(player)){
                        let evn = this.data.item.extra.getInt("event", 0);
                       this.blockSource.spawnDroppedItem(this.x, this.y+1,this.z, evn, 1, 0, null);
                       let arr = Wands.data["s" + this.data.item.extra.getInt("spell", -9)];
                       for(let i in arr){
                           this.blockSource.spawnDroppedItem(this.x, this.y+1,this.z, arr[i], 1, 0, null);
                       }
                        this.data.item.extra.putInt("event", 0);
                        Wands.data["s" + this.data.item.extra.getInt("spell", -9)] = [];
                    }else{
                       if(Wands.data["s" + this.data.item.extra.getInt("spell", -9)].length >= 1) this.blockSource.spawnDroppedItem(this.x, this.y+1,this.z, Wands.data["s" + this.data.item.extra.getInt("spell", -9)].pop(), 1, 0, null);
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