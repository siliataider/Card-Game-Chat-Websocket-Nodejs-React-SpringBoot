import React from 'react';

const Card = ({ card, showCardDetails }) => {
  return (
    <div>
      {showCardDetails ? (
      <div className="card-detail-container">
        <div className="ui segment">
          <div className="ui special cards d-inline-flex">
            <div className="card">
              <div className="content">
                <div className="ui grid">
                  <div className="three column row">
                    <div className="column">
                      <i className="heart outline icon"></i>
                      <span id="cardHPId">10</span>
                    </div>
                    <div className="column">
                      <h5>{card.name}</h5>
                    </div>
                    <div className="column">
                      <span id="energyId">10</span>
                      <i className="lightning icon"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="image imageCard">
                <div className="blurring dimmable image">
                  <div className="ui inverted dimmer">
                    <div className="content">
                      <div className="center">
                        <div className="ui primary button">Add Friend</div>
                      </div>
                    </div>
                  </div>
                  <div className="ui fluid image">
                    <a className="ui left corner label">DEADPOOL</a>
                    <img id="cardImgId" className="ui centered image" src={card.image} alt={card.name} />
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="ui form tiny">
                  <div className="field">
                    <label id="cardNameId">{card.name}</label>
                    <textarea
                      id="cardDescriptionId"
                      className="overflowHiden"
                      readOnly=""
                      rows="5"
                      defaultValue={card.description}
                    >
                    </textarea>
                  </div>
                </div>
              </div>
              <div className="content">
                <i className="heart outline icon"></i>
                <span id="cardHPId"> HP {card.hp}</span>
                <div className="right floated ">
                  <span id="cardEnergyId">
                    Energy {card.energy}
                  </span>
                  <i className="lightning icon"></i>
                </div>
              </div>
              <div className="content">
                <span className="right floated">
                  <span id="cardAttackId"> Attack {card.attack}</span>
                  <i className=" wizard icon"></i>
                </span>
                <i className="protect icon"></i>
                <span id="cardDefenceId">Defense {card.defense}</span>
              </div>
              <div className="ui bottom attached button">
                <i className="money icon"></i>
                Actual Value <span id="cardPriceId"> {card.price}$</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <div>
          <h3>{card.name}</h3>
          <h4>ID: {card.id}</h4>
          <p>Description: {card.description}</p>
        </div>
      )}
    </div>
  );
};

export default Card;
