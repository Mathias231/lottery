// General Imports
import { useState, useRef } from 'react';
import Head from 'next/head';
import Players from '../components/players';
import Wheel from '../components/wheel/wheelData';
import Winner from '../components/winner';

// Importing Interfaces
import { IPlayer, IPlayerHandle } from '../interface/playerGlobal.interface';
import { IWheelHandle } from '../interface/wheelGlobal.interface';

export default function Home() {
  // Declaring states & refs
  const [spinning, setSpinning] = useState(false);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [winnerName, setWinnerName] = useState<null | string>(null);
  const playersRef = useRef<IPlayerHandle>(null);
  const wheelRef = useRef<IWheelHandle>(null);

  // Functions
  const changeSpinning = (spinning: boolean) => {
    setSpinning(spinning);
  };

  const changePlayers = (player: IPlayer[]) => {
    setPlayers(player);
  };

  const removeWinner = (playerName: string) => {
    playersRef.current?.removePlayer(playerName);
  };

  const displayWinner = (winnerName: string | null) => {
    setWinnerName(winnerName);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/lottery.ico" />
      </Head>
      <main>
        <div className="container">
          <div className="leftContainer">
            <Players
              disabled={spinning}
              changePlayers={changePlayers}
              ref={playersRef}
            />
          </div>
          <div className="rightContainer">
            <div className="wheel-div">
              <Wheel
                changeSpinning={changeSpinning}
                items={players.map((item) => item.NAME)}
                disabled={players.length === 0}
                removeWinner={removeWinner}
                winnerDisplay={displayWinner}
                ref={wheelRef}
              />
            </div>
          </div>
          <div>
            {winnerName && (
              <Winner
                winnerName={winnerName}
                winnerDisplay={displayWinner}
                removeWinner={removeWinner}
                resetSelectedItem={wheelRef.current?.resetSelectedItem}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
