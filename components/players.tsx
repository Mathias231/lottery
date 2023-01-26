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
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  const checkCheckbox = () => {
    if (checkboxRef.current?.checked) {
      addToPlayers(item);
    }

    if (!checkboxRef.current?.checked) {
      removePlayer(item.NAME);
    }
  };
  return (
    <div className="checkboxContainer" key={i}>
      <input
        type={'checkbox'}
        className={'checkbox'}
        id={i.toString()}
        ref={checkboxRef}
        disabled={disabled}
        onClick={() => {
          checkCheckbox();
        }}
        checked={
          players.find((player) => {
            return player.NAME === item.NAME;
          }) !== undefined
        }
        readOnly
      />
      <label className={'checkmark'} htmlFor={i.toString()}>
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

  useImperativeHandle(ref, () => ({
    removePlayer,
  }));

  useEffect(() => {
    changePlayers(players);
  }, [players, changePlayers]);

  return (
    <div>
      <h1>Velg antall deltagere</h1>
      {participants.map((item, i) =>
        CheckBox({ item, i, disabled, players, addToPlayers, removePlayer }),
      )}
    </div>
  );
};

export default forwardRef(Players);
