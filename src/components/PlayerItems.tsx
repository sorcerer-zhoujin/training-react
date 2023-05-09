import axios from "axios";
import { useState } from "react";
import { PlayerItem } from "../types/player-item";

const PlayerItems = () => {
  const [playerItems, setPlayerItems] = useState<PlayerItem[]>([]);
  const [inputValue, setInputValue] = useState('');

  const fetchData = async () => {
    const playerId = localStorage.getItem("playerId");
    try {
      //自分のapiサーバーにリクエストを送る
      const res = await axios.get(`http://localhost:3000/players/${playerId}/getAllItems`);
      const data = await res.data;
      console.log(data);
      return data;
      //TODO 取得したデータをstateに保存
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const getAPI = async () => {
    const result = await fetchData();
    if (result == null) {
      throw new Error("failed to API accese.");
    } else {
      setPlayerItems(result);
    }
  };

  const useItem = async (id:number, count: number) => {
    const playerId = localStorage.getItem("playerId");
    try {
      const body = {
        itemId: id,
        count: count
      }
      console.log(body);

      //自分のapiサーバーにリクエストを送る
      const res = await axios.post(`http://localhost:3000/players/${playerId}/useItem`, body);
      const data = await res.data;
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  const HandleClickUseItem = (id: number, count: number) => {
    useItem(id, count);
  };

  const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>PlayerItem</h2>
      <button onClick={getAPI}>APIアクセス</button>
      <table>
        <thead>
          <tr>
            <th>ItemId</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO 取得したデータ表示 */}
          {playerItems.map((d) => (
            <tr key={d.itemId}>
              <td>{d.itemId}</td>
              <td>{d.count}</td>
              <td><input type="number" value={inputValue} onChange={HandleInputChange}></input></td>
              <td><button onClick={() => HandleClickUseItem(d.itemId, parseInt(inputValue))} id={"useButton" + d.itemId} data-item_id={d.itemId}>Use Item</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerItems;