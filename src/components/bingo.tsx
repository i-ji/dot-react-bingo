import { useEffect, useState } from "react";
import Roulette from "./roulette";

export type Bingo = {
  num: string;
  isDone: boolean;
};

const Bingo = () => {
  // ランダムな値を生成する関数
  const createColmn = (col: number) => {
    let source = [] as Bingo[];
    for (let i = 0; i < 15; i++) {
      // source.push(i + 1);
      source = [...source, { num: String(i + 1 + 15 * col), isDone: false }];
    }

    const column = [] as Bingo[];
    for (let i = 0; i < 5; i++) {
      column[i] = source.splice(Math.random() * source.length, 1)[0];
    }

    return column;
  };

  const columns = [] as Bingo[][];
  //   const bingo = [] as Bingo[][];
  const [bingo, setBingo] = useState<Bingo[][]>([]);

  const createBingo = () => {
    for (let i = 0; i < 5; i++) {
      columns[i] = createColmn(i);
    }
    columns[2][2].num = "free";
    columns[2][2].isDone = true;

    // 列と行を入れ替える
    for (let row = 0; row < 5; row++) {
      bingo[row] = [];

      for (let col = 0; col < 5; col++) {
        bingo[row][col] = columns[col][row];
      }
    }
    window.localStorage.setItem("bingo", JSON.stringify(bingo));

    return bingo;
  };

  const updateBingo = (bingo: Bingo[][]) => {
    setBingo(bingo);
  };

  useEffect(() => {
    let newBingo: Bingo[][];
    if (window.localStorage.getItem("bingo") === null) {
      newBingo = createBingo();
    } else {
      newBingo = JSON.parse(window.localStorage.getItem("bingo")!);
    }
    setBingo(newBingo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeBingo = () => {
    if (!confirm("本当に変更しますか？")) {
      return;
    }

    window.localStorage.setItem("bingo", "");
    setBingo(createBingo());
    window.location.reload();
  };

  return (
    <>
      <table className="">
        <thead>
          <tr className="bg-pink-300 w-[400px] h-10 text-center mx-auto">
            <th>B</th>
            <th>I</th>
            <th>N</th>
            <th>G</th>
            <th>O</th>
          </tr>
        </thead>
        <tbody>
          {bingo.map((row, index) => {
            return (
              <tr key={index} className="bg-pink-300 h-10 w-10 text-center">
                {row.map((col, index) => {
                  return (
                    <th
                      key={index}
                      className={`bg-pink-300 h-10 w-10 text-center ${
                        col.isDone ? "text-red-500" : ""
                      }`}
                    >
                      {col.num}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Roulette
        bingo={bingo}
        updateBingo={updateBingo}
        changeBingo={changeBingo}
      />
    </>
  );
};
export default Bingo;
