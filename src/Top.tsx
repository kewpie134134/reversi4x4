import React from "react";

type Mode = "human" | "cpu";
type CpuLevel = "easy" | "hard";

type TopProps = {
  mode: "human" | "cpu";
  setMode: React.Dispatch<React.SetStateAction<"human" | "cpu">>;
  cpuLevel: "easy" | "hard";
  setCpuLevel: React.Dispatch<React.SetStateAction<"easy" | "hard">>;
  cpuColor: "black" | "white";
  setCpuColor: React.Dispatch<React.SetStateAction<"black" | "white">>;
  onStart: () => void;
};

const Top: React.FC<TopProps> = ({
  mode,
  setMode,
  cpuLevel,
  setCpuLevel,
  onStart,
}) => {
  return (
    <div className="app">
      <h1>4x4 オセロゲーム</h1>
      <div style={{ margin: "30px 0" }}>
        <label>
          対戦モードを選択：
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            style={{ marginLeft: 10 }}
          >
            <option value="cpu">人 vs コンピュータ</option>
            <option value="human">人 vs 人</option>
          </select>
        </label>
        {mode === "cpu" && (
          <label style={{ marginLeft: 18 }}>
            コンピュータの強さ：
            <select
              value={cpuLevel}
              onChange={(e) => setCpuLevel(e.target.value as CpuLevel)}
              style={{ marginLeft: 10 }}
            >
              <option value="easy">ふつう</option>
              <option value="hard">つよい</option>
            </select>
          </label>
        )}
      </div>
      <button onClick={onStart}>ゲーム開始</button>
    </div>
  );
};

export default Top;