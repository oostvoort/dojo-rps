import useLogs from "../hooks/useLogs";
import {GAME_ID} from "../global/constants";
import useGame from "../hooks/torii/entities/useGame";
import usePlayer from "../hooks/torii/entities/usePlayer";

const StatsPanel = () => {
  const {
    battleLogs,
    totalGames,
  } = useLogs()


  const gameQuery = useGame(GAME_ID)
  const game = gameQuery.data

  const player1Query = usePlayer(game?.player1.address ?? '')
  const player1 = player1Query.data
  const player2Query = usePlayer(game?.player2.address ?? '')
  const player2 = player2Query.data

  return (
    <>
      <div className={'p-8 rounded-3xl border-2 border-option-5 bg-option-6 text-start'}>
        <p className={'text-[36px] text-option-2 font-oswald mb-2'}>Stats</p>
        <p className={'text-[18px] text-option-1 font-noto mb-1'}>Total Games: {totalGames}</p>
        <p className={'text-[20px] text-option-2 font-bold'}>
          Player1 : <span className={'text-option-1 ml-1'}>{player1?.wins ?? 0} Wins</span>
        </p>
        <p className={'text-[20px] text-option-2 font-bold'}>
          Player2 : <span className={'text-option-1 ml-1'}>{player2?.wins ?? 0} Wins</span>
        </p>
      </div>
      <div className={'p-8 h-full rounded-3xl border-2 border-option-5 bg-option-6 text-start'}>
        <p className={'text-[36px] text-option-2 font-oswald mb-2'}>History</p>
        {
          battleLogs.length > 0 && battleLogs.map((data, index) => {
            if (data.player === "0") return (
              <p key={index} className={'text-[18px] text-option-1 font-noto'}>Draw! Both players chose {data.selectedChoice} </p>
            )
            return (
              <p key={index} className={'text-[18px] text-option-1 font-noto'}>Player {data.player} won with {data.selectedChoice} </p>
            )
          })
        }
      </div>
    </>
  )
}

export default StatsPanel