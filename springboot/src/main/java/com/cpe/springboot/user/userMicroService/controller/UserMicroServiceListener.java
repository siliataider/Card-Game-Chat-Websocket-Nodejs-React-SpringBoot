package com.cpe.springboot.user.userMicroService.controller;

import com.cpe.springboot.card.Controller.CardModelService;
import com.cpe.springboot.user.model.RequestDTO;
import com.cpe.springboot.user.model.messageType;
import com.cpe.springboot.user.repository.UserRepository;
import com.cpe.springboot.user.userRest.controller.UserRestBus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import javax.jms.Message;

@Component
public class UserMicroServiceListener {

    UserMicroServiceService userMicroServiceService;

    public UserMicroServiceListener(UserMicroServiceService userMicroServiceService) {
        this.userMicroServiceService = userMicroServiceService;
    }
    @Autowired
    JmsTemplate jmsTemplate;

    @JmsListener(destination = "userBus", containerFactory = "connectionFactory")
    public void receiveMessageResult(RequestDTO request, Message message) {
        switch (request.getAction()) {
            case DELETE :
                // TODO 2 functions
                this.userMicroServiceService.deleteUser(request.getUserDTO().getId());
                break;
            case ADD:
                this.userMicroServiceService.addUser( request.getUserDTO() );
                break;

            case UPDATE:
                // TODO 2 functions
                this.userMicroServiceService.updateUser( request.getUserDTO() );
                break;



        }
    }
}
