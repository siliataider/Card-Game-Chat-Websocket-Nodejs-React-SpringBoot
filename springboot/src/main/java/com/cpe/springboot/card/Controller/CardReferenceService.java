package com.cpe.springboot.card.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import com.cpe.springboot.card.model.CardReference;

@Service
public class CardReferenceService {
	
	private final CardRefRepository cardRefRepository;
	
	public CardReferenceService(CardRefRepository cardRefRepository) {
		this.cardRefRepository=cardRefRepository;
	}

	public List<CardReference> getAllCardRef() {
		List<CardReference> cardRefList = new ArrayList<>();
		cardRefRepository.findAll().forEach(cardRefList::add);
		return cardRefList;
	}

	public void addCardRef(CardReference cardRef) {
		cardRefRepository.save(cardRef);
	}

	public void updateCardRef(CardReference cardRef) {
		cardRefRepository.save(cardRef);

	}

	public CardReference getRandCardRef() {
		List<CardReference> cardRefList=getAllCardRef();
		if( cardRefList.size()>0) {
			Random rand=new Random();
			int rindex=rand.nextInt(cardRefList.size()-1);
			return cardRefList.get(rindex);
		}
		return null;
	}

	/**
	 * Executed after application start
	 */
	@EventListener(ApplicationReadyEvent.class)
	public void doInitAfterStartup() {
		for(int i=0;i<10;i++){
			CardReference cardRef =new CardReference("name"+i,"description"+i,"family"+i,"affinity"+i,"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg");
			addCardRef(cardRef);
			i++;
		}
	}
	
}
