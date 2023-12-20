import React, {useState, useContext, useCallback, useEffect} from 'react';
import Friend from './Friend';

const RoomBody = (props) => {

    // TODO get all users with fetch
    const allUsers = ['Ajhv', 'Bgfd',"Ckakjhgfr"]

    const [userList, setUserList] = useState([]);

    function dislayAllUsers(allUsers){
        for (const user of allUsers) {

            setUserList(
                userList + 
                    <Friend id={user}></Friend>
                )

            console.log(userList);
            
          }
    } 

    useEffect (() =>{
        dislayAllUsers(allUsers);},[] )

    const [socketList, setSocketList] = useState([]);

    const addSocket = event => {
        setSocketList(
            socketList.concat(
            <Friend id="SocketID"></Friend>
            ));
    };

    return (
        <>
            <h2>Connected Sockets</h2>

            <div>
            {userList}
            </div>
        </>
    )
}

export default RoomBody
