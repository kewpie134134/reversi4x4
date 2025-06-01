import React from "react";

type Mode = "human" | "cpu";
type CpuLevel = "easy" | "hard";
type Color = "black" | "white";

type TopProps = {
  mode: Mode;
  setMode: (mode: Mode) => void;
  cpuLevel: CpuLevel;
  setCpuLevel: (level: CpuLevel) => void;
  cpuColor: Color;
  setCpuColor: (color: Color) => void;
  onStart: () => void;
};

const Top: React.FC<TopProps> = ({
  mode,
  setMode,
  cpuLevel,
  setCpuLevel,
  cpuColor,
  setCpuColor,
  onStart,
}) => {
  return (
    <div className="app">
      <h1>4x4 オセロゲーム</h1>
      <div style={{ margin: "30px 0" }}>
        <div style={{ marginBottom: 18 }}>
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
        </div>
        {mode === "cpu" && (
          <>
            <div style={{ marginBottom: 18 }}>
              <label>
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
            </div>
            <div>
              <label>
                先攻・後攻：
                <select
                  value={cpuColor}
                  onChange={(e) => setCpuColor(e.target.value as Color)}
                  style={{ marginLeft: 10 }}
                >
                  <option value="white">あなたが先攻（黒）</option>
                  <option value="black">あなたが後攻（白）</option>
                </select>
              </label>
            </div>
          </>
        )}
      </div>
      <button onClick={onStart}>ゲーム開始</button>
    </div>
  );
};

export default Top;
