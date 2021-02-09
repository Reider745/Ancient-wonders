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
