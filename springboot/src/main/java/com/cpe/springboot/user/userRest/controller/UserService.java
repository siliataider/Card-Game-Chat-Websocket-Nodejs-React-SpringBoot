package com.cpe.springboot.user.userRest.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.cpe.springboot.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cpe.springboot.card.Controller.CardModelService;
import com.cpe.springboot.card.model.CardModel;
import com.cpe.springboot.common.tools.DTOMapper;
import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserModel;


@Service
public class UserService {

	private final UserRepository userRepository;
	private final CardModelService cardModelService;
	private final UserRestBus userRestBus;

	public UserService(UserRepository userRepository, CardModelService cardModelService, UserRestBus userRestBus) {
		this.userRepository = userRepository;
		this.cardModelService = cardModelService;
		this.userRestBus = userRestBus;
	}

	/**
	 * Read only OK
	 * @return
	 */
	public List<UserModel> getAllUsers() {
		List<UserModel> userList = new ArrayList<>();
		userRepository.findAll().forEach(userList::add);
		return userList;
	}

	/**
	 * Read only OK
	 * @param id
	 * @return
	 */
	public Optional<UserModel> getUser(String id) {
		return userRepository.findById(Integer.valueOf(id));
	}

	/**
	 * Read Only OK
	 * @param id
	 * @return
	 */
	public Optional<UserModel> getUser(Integer id) {
		return userRepository.findById(id);
	}

	/**
	 * Write DB, redirected to bus
	 * @param user
	 * @return
	 */
	public ResponseEntity addUser(UserDTO user) {
		return (this.userRestBus.addUser(user));
	}

	/**
	 * Write DB, redirected to bus
	 * @param user
	 * @return
	 */
	public ResponseEntity updateUser(UserDTO user) {
		return(this.userRestBus.updateUser(user));
	}

	/**
	 * Write DB, redirected to bus
	 * @param user
	 * @return
	 */
	public ResponseEntity updateUser(UserModel user) {
		return (this.userRestBus.updateUser(user));
	}

	/**
	 * Write DB, redirected to bus
	 * @param id
	 * @return
	 */
	public ResponseEntity deleteUser(String id) {
		if ( ! getUser(id).equals(Optional.empty()) ){
			return (this.userRestBus.deleteUser(id));
		}
		return new ResponseEntity( "User not find", HttpStatus.NOT_FOUND) ;
	}

	/**
	 * read only ok
	 * @param login
	 * @param pwd
	 * @return
	 */
	public List<UserModel> getUserByLoginPwd(String login, String pwd) {
		List<UserModel> ulist = null;
		ulist = userRepository.findByLoginAndPwd(login, pwd);
		return ulist;
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
