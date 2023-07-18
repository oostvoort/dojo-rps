import React from "react";
import clsx from "clsx";
import Choice from "./Choice.tsx";

export default function GamePanel() {
    const [selectedChoice, setSelectedChoice] = React.useState<string | null>(null)

    const handleSelectedChoice = (choice: string) => {
        setSelectedChoice(choice)
    }

    return (
        <React.Fragment>
            <div className={'flex flex-col w-9/12 gap-2'}>
                <div className={clsx(
                    'flex w-full p-6',
                    'rounded-3xl border-2 border-option-5',
                    'bg-option-6'
                )}>
                    <p className={'text-[36px] text-option-2 font-oswald'}>
                        Status : <span className={'text-[28px] text-option-1 font-noto'}>Playing, waiting for Player2</span>
                    </p>
                </div>
                <div className={'flex flex-col items-center w-full h-full gap-5'}>
                    <div className={'mt-8'}>
                        <p className={'text-option-2 text-[20px] font-noto text-center mb-4'}>Opponent Choice</p>
                        <Choice image={'icon_questionMark.png'} />
                    </div>
                    <div>
                        <div className={'mb-4 text-center'}>
                            <p className={'text-option-1 text-[28px] font-noto'}>Choose your hand</p>
                            <p className={'text-option-2 text-[18px] font-noto'}>Times up in 9...</p>
                            {/*<p className={'text-option-2 text-[36px] font-oswald'}>YOU WIN!</p>*/}
                        </div>
                        <div className={'flex gap-20'}>
                            <Choice
                                image={'icon_rock.png'}
                                handSign={'Rock'}
                                isSelected={selectedChoice === 'Rock'}
                                onSelect={handleSelectedChoice}
                            />
                            <Choice
                                image={'icon_paper.png'}
                                handSign={'Paper'}
                                isSelected={selectedChoice === 'Paper'}
                                onSelect={handleSelectedChoice}
                            />
                            <Choice
                                image={'icon_scissors.png'}
                                handSign={'Scissors'}
                                isSelected={selectedChoice === 'Scissors'}
                                onSelect={handleSelectedChoice}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={'flex flex-col gap-6 w-3/12'}>
                <div className={'p-8 rounded-3xl border-2 border-option-5 bg-option-6 text-start'}>
                    <p className={'text-[36px] text-option-2 font-oswald mb-2'}>Stats</p>
                    <p className={'text-[18px] text-option-1 font-noto mb-1'}>Total Games: 9</p>
                    <p className={'text-[20px] text-option-2 font-bold'}>
                        Player1 : <span className={'text-option-1 ml-1'}>3 Wins</span>
                    </p>
                    <p className={'text-[20px] text-option-2 font-bold'}>
                        Player2 : <span className={'text-option-1 ml-1'}>6 Wins</span>
                    </p>
                </div>
                <div className={'p-8 h-full rounded-3xl border-2 border-option-5 bg-option-6 text-start'}>
                    <p className={'text-[36px] text-option-2 font-oswald mb-2'}>History</p>
                    <p className={'text-[18px] text-option-1 font-noto'}>Player 1 won with Rock </p>
                    <p className={'text-[18px] text-option-1 font-noto'}>Player 2 won with Scissors</p>
                </div>
            </div>
        </React.Fragment>
    )
}
