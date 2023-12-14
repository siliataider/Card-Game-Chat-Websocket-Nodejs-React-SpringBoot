package com.cpe.springboot.store.model;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class StoreTransaction {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer userId;
	private Integer cardId;
	private StoreAction action;
    private java.sql.Timestamp timeSt;
	
	public StoreTransaction() {
		this.timeSt=new Timestamp(System.currentTimeMillis());
	}

	public StoreTransaction( Integer userId, Integer cardId, StoreAction action) {
		super();
		this.userId = userId;
		this.cardId = cardId;
		this.action = action;
		this.timeSt=new Timestamp(System.currentTimeMillis());
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getCardId() {
		return cardId;
	}

	public void setCardId(Integer cardId) {
		this.cardId = cardId;
	}

	public StoreAction getAction() {
		return action;
	}

	public void setAction(StoreAction action) {
		this.action = action;
	}

	public java.sql.Timestamp getTimeSt() {
		return timeSt;
	}

	public void setTimeSt(java.sql.Timestamp sqlTimestamp) {
		this.timeSt = sqlTimestamp;
	}
	
	
	
}