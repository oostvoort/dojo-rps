import clsx from "clsx";
import GamePanel from "./components/GamePanel.tsx";
import React from "react";
import {useDojo} from "./DojoContext";
import {Account} from "starknet";
import useEntities from "./hooks/torii/entities/useEntities";

const FetchEntities = () => {
    useEntities()
    return <></>
}

function App() {

    const urlParams = new URLSearchParams(window.location.search)
    const accountParam = urlParams.get('account')

    const {
        account: {
            create,
            list,
            select,
            isDeploying,
            account
        }
    } = useDojo()

    const accounts = list()
    const accountParamInt = parseInt(accountParam ?? '1')
    const index = isNaN(accountParamInt) ? 1 : accountParamInt
    const selectedAccount = accounts[index - 1] as Account | undefined
    const hasAccount = !!selectedAccount
    const isAlreadySelected = account.address === selectedAccount?.address

    React.useEffect(() => {
        if (isDeploying) return
        if (isNaN(index)) return
        if (hasAccount) return
        create()
    }, [hasAccount, index, isDeploying, create])

    React.useEffect(() => {
        if (isAlreadySelected) return;
        if (!hasAccount) return
        select(selectedAccount?.address ?? '')
    }, [isAlreadySelected, selectedAccount?.address, select, hasAccount])

    return (
       <>
           <div className={clsx(
             'w-screen h-screen',
             'flex justify-center items-center',
             'bg-gradient-to-b from-[#007795] to-[#1F215C]'
           )}>
               <img
                 src={'/assets/left_dojoCut.png'}
                 alt={'left'}
                 className={'absolute top-0 left-[85px]'}
                 draggable={false}
               />
               <img
                 src={'/assets/right_dojoCut.png'}
                 alt={'right'}
                 className={'absolute top-0 right-[85px]'}
                 draggable={false}
               />
               <img
                 src={'/assets/top_dojoCut.png'}
                 alt={'right'}
                 className={'absolute top-0'}
                 draggable={false}
               />
               <img
                 src={'/assets/img_logo.png'}
                 alt={'right'}
                 className={'absolute top-[42px]'}
                 draggable={false}
               />
               <div className={clsx(
                 'w-[1330px] h-[807px] absolute top-[114px]',
                 'flex p-8 gap-6 z-[50]',
                 'rounded-3xl border-4 border-option-3',
                 'bg-game-panel bg-no-repeat bg-cover',
               )}>
                   <GamePanel />
               </div>
           </div>
           <FetchEntities />
       </>
    );
}

export default App;
