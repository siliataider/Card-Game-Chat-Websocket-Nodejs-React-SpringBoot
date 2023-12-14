package com.cpe.springboot.user.userRest.controller;

import com.cpe.springboot.user.model.RequestDTO;
import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserModel;
import com.cpe.springboot.user.model.messageType;
import com.cpe.springboot.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

@Service
public class UserRestBus {

    final private String okSatusMessage = "Requête prise en compte";

    private final UserRepository userRepository;

    public UserRestBus(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Autowired
    JmsTemplate jmsTemplate;

    private void sendMsg(RequestDTO msg, String busName) {
        jmsTemplate.convertAndSend(busName,msg);
    }

    public ResponseEntity addUser(UserDTO user) {
        sendMsg(  new RequestDTO(user, messageType.ADD) , "userBus");
        return( new ResponseEntity( this.okSatusMessage ,HttpStatus.OK) );
    }

    public ResponseEntity updateUser(UserDTO user) {
        // TODO test if the user exists
        sendMsg(new RequestDTO(user, messageType.UPDATE), "userBus");
        return( new ResponseEntity( this.okSatusMessage ,HttpStatus.OK) );
    }


    public ResponseEntity updateUser(UserModel user) {
        return( new ResponseEntity( this.okSatusMessage ,HttpStatus.OK) );
    }

    public ResponseEntity deleteUser(String id) {
        sendMsg(new RequestDTO(new UserDTO(Integer.parseInt(id)),messageType.DELETE),"userBus");
        return( new ResponseEntity( this.okSatusMessage ,HttpStatus.OK) );
    }

    public ResponseEntity deleteUser(UserDTO user) {
        // TODO this metode is never used
        sendMsg(new RequestDTO(user,messageType.DELETE), "userBus");
        return( new ResponseEntity( this.okSatusMessage ,HttpStatus.OK) );
    }


}
