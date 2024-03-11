const Bingo = () => {
  // ランダムな値を生成する関数
  const createColmn = (col: number) => {
    let source = [] as number[];
    for (let i = 0; i < 15; i++) {
      // source.push(i + 1);
      source = [...source, i + 1 + 15 * col];
    }

    const column = [] as string[];
    for (let i = 0; i < 5; i++) {
      column[i] = String(source.splice(Math.random() * source.length, 1)[0]);
    }
    return column;
  };

  const columns = [] as string[][];
  const bingo = [] as string[][];

  const createBingo = () => {
    for (let i = 0; i < 5; i++) {
      columns[i] = createColmn(i);
    }
    columns[2][2] = "free";

    // 列と行を入れ替える
    for (let row = 0; row < 5; row++) {
      bingo[row] = [];

      for (let col = 0; col < 5; col++) {
        bingo[row][col] = columns[col][row];
      }
    }
  };

  createBingo();

  return (
    <main className="w-[400px] mx-auto mt-10">
      <table className="mx-auto">
        <thead>
          <tr className="bg-pink-300 w-[400px] h-10 text-center">
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
                      className="bg-pink-300 h-10 w-10 text-center"
                    >
                      {col}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};
export default Bingo;
