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