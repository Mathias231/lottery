// Global Imports
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from 'react';

// Importing Interfaces
import {
  WheelProps,
  IWheelHandle,
} from '../../interface/wheelGlobal.interface';

// Randon Function
const randomNumbers = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const Wheel: ForwardRefRenderFunction<IWheelHandle, WheelProps> = (
  { changeSpinning, disabled, items, onSelectItem, winnerDisplay },
  ref,
) => {
  // Declaring States
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [spinnerDelay, _setSpinnerDelay] = useState(10000); // 10 seconds rotation speed
  const [spinAmount, _setSpinAmount] = useState(12); // Amount of spins during the 10 seconds rotation speed
  // const audio = new Audio('../../audio/roulette.mp3');

  // Functions
  const selectItem = () => {
    if (selectedItem === null) {
      // audio.play();
      const selectedItem = Math.floor(Math.random() * items.length);
      if (onSelectItem) {
        onSelectItem(selectedItem);
      }
      setSelectedItem(selectedItem);
      changeSpinning(true);
      setTimeout(() => {
        changeSpinning(false);
        winnerDisplay(items[selectedItem]);
      }, spinnerDelay);
    }
  };

  const resetSelectedItem = () => {
    setSelectedItem(() => null);
  };

  useImperativeHandle(ref, () => ({
    resetSelectedItem,
  }));

  // Declaring Variables
  let maxSpin = 360 / items.length;
  let betweenMin = -(maxSpin - maxSpin / 2);
  let betweenMax = maxSpin - maxSpin / 2;
  let randomizedThing = randomNumbers(betweenMin, betweenMax);

  const wheelVars = {
    '--nb-item': items.length,
    '--selected-item': selectedItem,
    '--random-number': randomizedThing + 'deg',
    '--spinning-duration': spinnerDelay / 1000 + 's',
    '--nb-turn': spinAmount,
  } as React.CSSProperties;

  const spinning = selectedItem !== null ? 'spinning' : '';
  return (
    <div className="wheel-container">
      <div
        className={`wheel ${spinning}`}
        style={wheelVars}
        onClick={!disabled ? selectItem : () => {}}
      >
        {items.map((item, index) => (
          <div
            className="wheel-item"
            key={index}
            style={{ '--item-nb': index } as React.CSSProperties}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default forwardRef(Wheel);
