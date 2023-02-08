import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from 'react';
import data from '../lib/data/data.json';

// Importing Interfaces
import {
  IPlayer,
  IPlayerHandle,
  IPlayersProps,
} from '../interface/playerGlobal.interface';

interface CheckBoxProps {
  item: IPlayer;
  i: number;
  disabled: boolean;
  players: IPlayer[];
  addToPlayers: (player: IPlayer) => void;
  removePlayer: (playerName: string) => void;
}

function CheckBox({
  item,
  i,
  disabled,
  players,
  addToPlayers,
  removePlayer,
}: CheckBoxProps) {
  const checkBoxRef = useRef<HTMLInputElement | null>(null);

  const checkPlayer = () => {
    if (checkBoxRef.current?.checked) {
      console.log(checkBoxRef.current?.id);
      addToPlayers(item);
    }

    if (!checkBoxRef.current?.checked) {
      removePlayer(item.NAME);
    }
  };

  return (
    <div className="checkboxContainer" key={i}>
      <input
        type={'checkbox'}
        className={'checkbox'}
        id={i.toString()}
        ref={checkBoxRef}
        disabled={disabled}
        onClick={() => {
          checkPlayer();
        }}
        checked={
          players.find((player) => {
            return player.NAME === item.NAME;
          }) !== undefined
        }
        readOnly
      />
      <label
        id={i.toString()}
        htmlFor={i.toString()}
        className={checkBoxRef.current?.checked ? 'checked' : ''}
      >
        {item.NAME}
      </label>
    </div>
  );
}

const Players: ForwardRefRenderFunction<IPlayerHandle, IPlayersProps> = (
  { changePlayers, disabled },
  ref,
) => {
  const [participants, _setParticipants] = useState<IPlayer[]>(data);
  const [players, setPlayers] = useState<IPlayer[]>(data);
  const [buttonToggle, setButtonToggle] = useState<boolean>(true);
  const [buttonText, setButtonText] = useState<string>('Fjern alle Spillere');

  const addToPlayers = (player: IPlayer) => {
    setPlayers((players) => {
      return [...players, player];
    });
  };

  const removePlayer = (playerName: string) => {
    setPlayers((players) => {
      return players.filter((playerToRemove) => {
        if (playerName === playerToRemove.NAME) return false;
        return true;
      });
    });
  };

  const toggleChecked = () => {
    setButtonToggle(!buttonToggle);

    // If playerToggle is true, add all players from list
    if (buttonToggle) {
      // Changes text to "Check all players"
      setButtonText('Velg alle Spillere');
      return players.forEach((element) => {
        removePlayer(element.NAME);
      });
    }

    // If playerToggle is false, add all players to list
    if (!buttonToggle) {
      // Changes text to "Remove all players"
      setButtonText('Fjern alle Spillere');
      return data.forEach((element) => {
        addToPlayers({
          NAME: element.NAME,
          WINCHANCE: element.WINCHANCE,
          WINRATE: element.WINRATE,
        });
      });
    }
  };

  useImperativeHandle(ref, () => ({
    removePlayer,
  }));

  useEffect(() => {
    changePlayers(players);
  }, [players, changePlayers]);

  return (
    <div>
      <div>
        <input
          type="button"
          className="toggleButton"
          value={buttonText}
          onClick={toggleChecked}
          disabled={disabled}
        />
      </div>
      {participants.map((item, i) =>
        CheckBox({
          item,
          i,
          disabled,
          players,
          addToPlayers,
          removePlayer,
        }),
      )}
    </div>
  );
};

export default forwardRef(Players);
