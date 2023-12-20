const UserService = require('../services/UserService');

class CombatService {
    constructor() {
        this.userService = new UserService().getInstance();
        this.userEnergy = 100.0;
    }

    /**
     * 
     * data = {
     *          receiver : {
     *              userId
     *              socketId
     *              cards
     *              cardSelected
     *          }
     *          sender : {
     *              socketId
     *              userId
     *              cards
     *              cardSelected
     *          }
     * }
     */
    combat = async (data) =>  {
        let isCardExist = this.isCardExist(data.receiver.card)
        if (isCardExist) {
            let hp_final = data.receiver.card.hp - data.sender.card.attack
            if (hp_final<=0) {
                this.destroyCard(data);
            }
            this.userEnergy -= data.sender.card.energy 
            await this.isCombatFinish(data);
            this.isTurnFinish(data);
        }
    }

    destroyCard(data) {
        this.io.to(data.receiver.receiverId).emit('card-list', data.receiver.card)
    }

    isCombatFinish = async (data) =>  {
        if (data.receiver.cards.length == 0) {
            // Le gagnant sera toujours celui dont s'est le tour active, càd le sender actuelle de la requete
            this.io.to(data.receiver.socketId).emit('turn-info', "You loose")
            this.io.to(data.sender.socketId).emit('turn-info', "You Win")
            await this.calculPrice(data);
        }  
    }

    calculPrice = async (data) => {
        let user = await this.userService.getUser(data.sender.userId)
        user.amout += 100
        await this.userService.updateUser(user)
    };

    isCardValid(data) {
        let cardExists = this.isCardExist(data.sender.card)
        if (cardExists) {
            if (data.sender.card.energy > data.sender.user.energy) {
                let info = {message: "Pas assez d'énergie."}
                this.io.to(data.senderId).emit('info-combat', info)
            }
        }
    }
    isCardExist(card) {
        let cardExists = true;
        if (!card) {
            let info = {message: "Pas assez d'énergie."}
            this.io.to(data.senderId).emit('info-combat', info)
            cardExists = false;
        }
        return cardExists
    }


    isTurnFinish(data) {
        if (this.userEnergy <= 0) {
            this.endTurn(data)
            // Reload energy and add to the remain one
            this.userEnergy += 100.0
        }
    }


    endTurn(data) {
        this.io.to(data.sender.socketId).emit('turn-info', false)
        this.io.to(data.receiver.socketId).emit('turn-info', true)
    }


}

module.exports = CombatService;