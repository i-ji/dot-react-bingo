import { useEffect, useState } from "react";
import { Bingo } from "./bingo";

type Roulette = {
  bingo: Bingo[][];
  updateBingo: (bingo: Bingo[][]) => void;
  changeBingo: () => void;
};

const Roulette: React.FC<Roulette> = ({ bingo, updateBingo, changeBingo }) => {
  const [num, setNum] = useState("?");

  const initialSeedNum = [] as number[];
  for (let i = 1; i <= 75; i++) {
    initialSeedNum.push(i);
  }
  const [seedNum, setSeedNum] = useState(initialSeedNum);

  const createNum = () => {
    const num = seedNum.splice(Math.floor(Math.random() * seedNum.length), 1);
    setSeedNum(seedNum);
    return num;
  };

  const showNum = () => {
    setNum(String(createNum()));
  };

  useEffect(() => {
    const hitBingo = bingo.filter((row) => {
      row.filter((item) => {
        if (item.num === num) {
          item.isDone = true;
        }
        return item;
      });
      return row;
    });

    updateBingo(hitBingo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num]);

  return (
    <div className="text-center w-[200px]">
      <p className="mt-10 font-bold text-3xl">{num}</p>
      <div className="flex gap-3 justify-center">
        <button
          className="border border-black rounded bg-gray-200 w-16 h-8 mt-5 "
          onClick={showNum}
        >
          Start
        </button>
        <button
          className="border border-black rounded bg-gray-200 w-16 h-8 mt-5"
          onClick={changeBingo}
        >
          Change
        </button>
      </div>
    </div>
  );
};
export default Roulette;
