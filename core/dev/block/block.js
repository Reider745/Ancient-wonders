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
    drop: function(){
        this.networkData.putInt("itemId", 0);
        this.networkData.putInt("itemData", 0);
        this.networkData.sendChanges();
        World.drop(this.x, this.y+1,this.z, this.data.item.id, 1, this.data.item.data);
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
                this.drop();
        }else{
            if(id != ItemID.bookk){
                let item = Player.getCarriedItem();
                Player.setCarriedItem(item.id, item.count-1, item.data);
                this.animation(item);
            }
        }
    }
});