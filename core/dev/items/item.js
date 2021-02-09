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
