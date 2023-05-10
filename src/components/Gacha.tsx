import axios from "axios";
import { useState } from "react";
import { PlayerItem } from "../types/player-item";

interface GachaResult {
    results: PlayerItem[];
    player: {
      money: number;
      items: PlayerItem[];
    };
}

const TableComponent: React.FC<{ data: GachaResult }> = ({ data }) => {
    const { results, player } = data;
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item) => (
            <tr key={item.itemId}>
              <td>{item.itemId}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3}>Money: {player.money}</th>
          </tr>
        </tfoot>
      </table>
    );
};

const Gacha = () => {
    const [inputCount, setInputCount] = useState<number>(0);
    //const [playerItems, setPlayerItems] = useState<PlayerItem[]>([]);
    const [gachaResults, setGachaResults] = useState<GachaResult>();

    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputCount(parseInt(event.target.value));
    };

    const useGacha = async (count: number) => {
        const playerId = localStorage.getItem("playerId");
        const body: any = {
            "count": count
        }
        try {
            const res = await axios.post(`http://localhost:3000/players/${playerId}/useGacha`, body)
            const result = res.data;
            setGachaResults(result);
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    const HandleButtonClick = (count: number) => {
        useGacha(count);
    };

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Gacha</h2>
            <input type="number" min={1} max={1000} onChange={HandleInputChange}></input>
            <button onClick={() => HandleButtonClick(inputCount)}>ROLL</button>
            {gachaResults ? (
                <TableComponent data={gachaResults} />
            ) : (
                <p>Loding...</p>
            )}
        </div>
    );
}

export default Gacha;