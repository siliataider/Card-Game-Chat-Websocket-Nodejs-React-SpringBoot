const UserService = require('../services/UserService');

class CombatService {
    constructor() {
        this.gameData = {}
        this.userService = new UserService().getInstance();
    }

    loadTerrain() {
        for (id of this.userIDs) {
            this.io.to(this.gameData[id].socketId).emit(gameData)
        }
    }
    setGameData(data) {
        this.gameData[data.fromID] = {
            socketId: data.fromSocketID,
            energy: 100.0,
            cardList: data.fromCards,
            yourTurn: true,
            opponentId: data.toID,
            opponentSocketId: data.toSocketID
        }
        this.gameData[data.toID] = {
            socketId: data.toSocketID,
            energy: 100.0, 
            cardList: data.toCards,
            yourTurn: false,
            opponentId: data.fromID,
            opponentSocketId: data.fromSocketID
        }
    }
    /**
     * 
     * data: {userId, card, cardOpponent}
     */
    combat = async (data) =>  {
        let isCardExist = this.isCardExist(data.cardOpponent, this.gameData[data.userId].opponentId)
        if (isCardExist) {
            let hp_final = data.cardOpponent.hp - data.card.attack
            if (hp_final<=0) {
                this.destroyCard(this.gameData[data.userId].opponentId, data.cardOpponent);
            }
            this.gameData[data.userId].cardList.find(card => card.id === data.card.id).hp = hp_final;
            this.gameData[data.userId].energy -= data.card.energy 
            
            this.loadTerrain()
            await this.isCombatFinish(data);
            this.isTurnFinish(data);
        }
    }

    destroyCard(userOpponentId, card) {
        var index = this.gameData[userOpponentId].cardsList.indexOf(card);

        if (index !== -1) {
            this.gameData[userOpponentId].cardsList.splice(index, 1);
        }
        this.loadTerrain()
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
        let cardExists = this.isCardExist(card, userId)
        if (cardExists) {
            if (card.energy > this.gameData[userId].energy) {
                let info = {message: "Pas assez d'énergie."}
                this.io.to(this.gameData[userId].socketId).emit('info-combat', info)
            }
        }
    }
    isCardExist(card, userId) {
        let cardExists = true;
        if (!card in this.gameData[userId].cardList) {
            let info = {message: "Pas assez d'énergie."}
            this.io.to(gameData[userId].socketId).emit('info-combat', info)
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
        this.loadTerrain()
    }

}

module.exports = CombatService;