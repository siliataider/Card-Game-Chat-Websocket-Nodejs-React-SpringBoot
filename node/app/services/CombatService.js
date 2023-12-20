class CombatService {
    constructor() {
    }

    /**
     * 
     * data = {
     *          receiver : {
     *              user
     *              recieverId
     *              cards
     *              cardSelected
     *          }
     *          sender : {
     *              recieverId
     *              user
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
            this.io.to(data.receiver.receiverId).emit('turn-info', "You loose")
            this.io.to(data.sender.senderId).emit('turn-info', "You Win")
            await this.calculPrice(data);
        }  
    }

    calculPrice = async (data) => {
        data.sender.user.amout += 100
        await this.callUpdateUser(data.sender)
        await this.callUpdateUser(data.receiver)
    };
    
    callUpdateUser = async (data) => {
        try {
            let user = data.user
            const response = await fetch(`http://localhost:80/user/${data.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
              });
        
            if (!response.ok) {
                throw new Error(`Failed to update user ${user.login}`);
            }
            const users = await response.json();
            console.log(users);
        } catch (error) {
            console.error("Erreur lors de l'update de l'utilisateur:", error);
        }
    }

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
        if (data.sender.user.energy <= 0) {
            this.endTurn(data)
        }
    }


    endTurn(data) {
        this.io.to(data.sender.senderId).emit('turn-info', false)
        this.io.to(data.receiver.receiverId).emit('turn-info', true)
    }


}

module.exports = CombatService;