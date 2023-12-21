const UserService = require('../services/UserService');

class CombatService {
    constructor(io) {
        this.io = io;
        this.gameData = {}
        this.userService = new UserService().getInstance();
    }

    loadTerrain(userSocketId, oppponentSocketId) {
        this.io.to(userSocketId).emit("load-board", this.gameData)
        this.io.to(oppponentSocketId).emit("load-board", this.gameData)

    }
    setGameData(data) {
        this.gameData[data.fromID] = {
            socketId: data.fromSocketID,
            energy: 100.0,
            cardsList: data.fromCards,
            yourTurn: true,
            opponentId: data.toID,
            opponentSocketId: data.toSocketID
        }
        this.gameData[data.toID] = {
            socketId: data.toSocketID,
            energy: 100.0, 
            cardsList: data.toCards,
            yourTurn: false,
            opponentId: data.fromID,
            opponentSocketId: data.fromSocketID
        }
        this.loadTerrain(data.fromSocketID, data.toSocketID);
    }
    /**
     * 
     * data: {userId, card, cardOpponent}
     */
    combat = async (data) =>  {
        // TODO uncomment when isCardExist fixed
        //let isCardExist = this.isCardExist(data.cardOpponent, this.gameData[data.userId].opponentId)
        let isCardExist = true;
        console.log("combatttttttttttttttttttttttt")
        console.log("combatttttttttttttttttttttttt")

        if (isCardExist) {
            let hp_final = data.cardOpponent.hp - data.card.attack
            if (hp_final<=0) {
                this.destroyCard(this.gameData[data.userId].opponentId, data);
            }
            let opponentId = this.gameData[data.userId].opponentId
            let cardToUpdate = this.gameData[opponentId].cardsList.find(card => card.id === data.cardOpponent.id);
            if (cardToUpdate) {
                this.gameData[opponentId].cardsList.find(card => card.id === data.cardOpponent.id).hp = hp_final;
                data.cardOpponent.hp = hp_final
            }
            this.gameData[data.userId].energy -= data.card.energy 
            
            this.loadTerrain(this.gameData[data.userId].socketId, this.gameData[data.userId].opponentSocketId)
            await this.isCombatFinish(data);
            this.isTurnFinish(data.userId);
        }
    }

    destroyCard(userOpponentId, data) {
        var index = this.gameData[userOpponentId].cardsList.findIndex(item => (item.id == data.cardOpponent.id));

        if (index !== -1) {
            this.gameData[userOpponentId].cardsList.splice(index, 1);
        }
        this.loadTerrain(this.gameData[data.userId].socketId, this.gameData[data.userId].opponentSocketId)
    }

    isCombatFinish = async (data) =>  {
        let opponentId = this.gameData[data.userId].opponentId
        if (this.gameData[opponentId].cardsList.length == 0) {
            // Le gagnant sera toujours celui dont s'est le tour active, càd le sender actuelle de la requete
            this.io.to(this.gameData[data.userId].socketId).emit('turn-info', "You loose")
            this.io.to(this.gameData[data.userId].opponentSocketId).emit('turn-info', "You Win")
            await this.calculPrice(data);
        }  
    }

    calculPrice = async (data) => {
        let user = await this.userService.getUser(data.userId)
        user.amout += 100
        await this.userService.updateUser(user)
    };

    isCardValid(card, userId) {
        //let cardExists = this.isCardExist(card, userId)
        let cardExists = true;
        if (cardExists) {
            if (card.energy > this.gameData[userId].energy) {
                let info = {message: "Pas assez d'énergie."}
                this.io.to(this.gameData[userId].socketId).emit('info-combat', info)
            }
        }
    }
    isCardExist(card, userId) {
        let cardExists = true;
        if (!this.gameData[userId].cardsList.includes(card)) {
            let info = {message: "La carte n'existe pas"}
            this.io.to(this.gameData[userId].socketId).emit('info-combat', info)
            cardExists = false;
        }
        return cardExists
    }


    isTurnFinish(userId) {
        if (this.gameData[userId].energy <= 0) {
            this.endTurn(userId)
            // Reload energy and add to the remain one
            this.gameData[userId].energy += 100.0
        }
    }


    endTurn(userId) {
        this.gameData[userId].yourTurn = false
        let opponentId = this.gameData[userId].opponentId
        this.gameData[opponentId].yourTurn = true
        this.loadTerrain(this.gameData[userId].socketId, this.gameData[userId].opponentSocketId)
    }

}

module.exports = CombatService;