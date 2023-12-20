package com.cpe.springboot;

import com.cpe.springboot.card.Controller.CardRestController;
import com.cpe.springboot.card.model.CardDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;

import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;

import javax.annotation.PostConstruct;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

@Component
public class DBinit {

    private final CardRestController cardRestController;

    public DBinit(CardRestController cardRestController){
        this.cardRestController = cardRestController;
    }


    /**
     * Will add some card to the db at the init of the game
     * @throws IOException
     * @throws ParseException
     */
    @PostConstruct
    private void postConstruct() throws IOException, ParseException {

    JSONParser parser = new JSONParser();
    JSONArray jsonArray = (JSONArray) parser.parse(new FileReader("./src/main/resources/cards.json"));


    for (short i = 0; i < jsonArray.size(); i++){
        JSONObject element = (JSONObject) jsonArray.get(i);

        CardDTO card = new CardDTO();
        card.setImgUrl( (String) element.get("image") );

        card.setName( (String) element.get("name"));

        card.setAttack( (float)(long) element.get("defense"));
        card.setAttack( (float)(long) element.get("attack"));
        card.setPrice( (float)(long)element.get("price"));
        card.setHp( (float)(long) element.get("hp"));
        card.setDescription( (String) element.get("description"));
        cardRestController.addCard(card);
    }
    }
}
