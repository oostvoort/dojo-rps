import {useState} from "react";

const logs_inital_mock_data = [
    {
        player: "1",
        selectedChoice: "Rock"
    },
    {
        player: "2",
        selectedChoice: "Scissors"
    },
    {
        player: "3",
        selectedChoice: "Paper"
    }
]

const useLogs = () => {
    const [battleLogs, setBattleLogs] = useState<Array<Record<string, string>>>(logs_inital_mock_data);
    const [totalGames, setTotalGames] = useState<number>(0)

    return {
        battleLogs,
        totalGames,
        setTotalGames,
        setBattleLogs
    }
}

export default useLogs