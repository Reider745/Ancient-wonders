IMPORT("DungeonAPI");
IMPORT("add-onCreter");
Dungeon.setDir("assets/structure");
let Addon = new Addons.register("aw");
Addon.registerAddon({
    name: "Ancient wonders", 
    description: "установите этот АДДОН!"
},{
    name: "Ancient wonders", 
    description: "установите этот АДДОН!"
})
Addon.registerEntity("aggressive", {
    name: "murderer", 
    family: ["zombie"], 
    speed: 0.5,
    box: {
        w: 2, 
        h: 2
    }, 
    angry: {
        range: 15, 
        speed: 1, 
        damage: 8
    }, 
    health: {
        max: 50
    }
});
//File.update("Tower_of_evil - Копия.json", false);