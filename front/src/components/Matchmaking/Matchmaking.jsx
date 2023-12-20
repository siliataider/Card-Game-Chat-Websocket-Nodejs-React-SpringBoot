import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import config from '../../../config';

const Matchmaking = () => {

  return (
  <div>
    <h2>Matchmaking</h2>
    <h1 class="title">Connected Sockets</h1>
        <ul id="socketList">

        </ul>
  </div>
  );

};

export default Matchmaking;