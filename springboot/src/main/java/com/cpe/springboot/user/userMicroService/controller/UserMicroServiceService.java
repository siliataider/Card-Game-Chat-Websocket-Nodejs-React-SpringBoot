package com.cpe.springboot.user.userMicroService.controller;

import com.cpe.springboot.card.Controller.CardModelService;
import com.cpe.springboot.card.model.CardModel;
import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserModel;
import com.cpe.springboot.user.repository.UserRepository;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserMicroServiceService {

    private final UserRepository userRepository;

    private final CardModelService cardModelService;

    public UserMicroServiceService(UserRepository userRepository, CardModelService cardModelService) {
        this.userRepository = userRepository;
        this.cardModelService = cardModelService;
    }

    public void addUser(UserDTO user){
        UserModel u = fromUDtoToUModel(user);
        // needed to avoid detached entity passed to persist error
        userRepository.save(u);
        List<CardModel> cardList = cardModelService.getRandCard(5);
        for (CardModel card : cardList) {
            u.addCard(card);
        }
        UserModel uBd = userRepository.save(u);
        // TODO what to do with the result ?
        System.out.println("User added !");
        //return DTOMapper.fromUserModelToUserDTO(uBd);
    }



    /**
     * Write DB, redirected to bus
     * @param user
     * @return
     */
    public void updateUser(UserDTO user) {
        UserModel u = fromUDtoToUModel(user);
        UserModel uBd =userRepository.save(u);
        System.out.println("User DTO updated");
        //return DTOMapper.fromUserModelToUserDTO(uBd);
    }

    /**
     * Write DB, redirected to bus
     * @param user
     * @return
     */
    public void updateUser(UserModel user) {
        UserModel uBd = userRepository.save(user);
        System.out.println("User model updated !");
//        return DTOMapper.fromUserModelToUserDTO(uBd);
    }

    /**
     * Write DB, redirected to bus
     * @param id
     * @return
     */
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
        System.out.println("User deleted !");
    }

    private UserModel fromUDtoToUModel(UserDTO user) {
        UserModel u = new UserModel(user);
        List<CardModel> cardList = new ArrayList<CardModel>();
        for (Integer cardId : user.getCardList()) {
            Optional<CardModel> card = cardModelService.getCard(cardId);
            if (card.isPresent()) {
                cardList.add(card.get());
            }
        }
        return u;
    }
}
