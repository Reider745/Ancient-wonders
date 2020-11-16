LIBRARY({
    name: "Multiplayer",
    version: 1, 
    api: "CoreEngine",
});
Network.addClientPacket("aw.message", function(packetData) {
    Game.message(packetData);
});
var mp = {
    message: function (player, text){
        let client = Network.getClientForPlayer(player);
        if(client != null){
            client.send("aw.message", text);
        }
    }
};