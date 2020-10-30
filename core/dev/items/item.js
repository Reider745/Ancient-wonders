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
