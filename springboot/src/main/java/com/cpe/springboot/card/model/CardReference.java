package com.cpe.springboot.card.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class CardReference extends CardBasics implements Serializable {

	private static final long serialVersionUID = -7059808842444736266L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	public CardReference() {
	}

	public CardReference(CardBasics c) {
		super(c);
	}

	public CardReference(String name, String description, String family, String affinity,String imgUrl,String smallImgUrl) {
		super(name, description, family,affinity,imgUrl,smallImgUrl);
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

}
