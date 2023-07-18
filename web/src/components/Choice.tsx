import clsx from "clsx";

type PropType = {
    image: string,
    handSign?: string,
    isSelected?: boolean,
    onSelect?: (handSign: string) => void,
}

export default function Choice({ image, handSign, isSelected, onSelect }: PropType) {
    const handleClick = () => {
        if (handSign) {
            if (onSelect) {
                if (isSelected) {
                    onSelect('')
                } else if (handSign) {
                    onSelect(handSign)
                }
            }
        }
    }

    return (
        <div className={'flex flex-col gap-2'}>
            <div
                className={clsx(
                    'flex justify-center items-center',
                    'h-[183px] w-[183px]',
                    'rounded-full border-4 border-option-4',
                    'bg-option-6',
                    `${handSign ? 'cursor-pointer' : ''}`,
                    { 'border-option-2': isSelected },
                )}
                onClick={handleClick}
            >
                <img src={image} alt={'hand_sign'} draggable={false} />
            </div>
            <p className={'text-option-2 text-[20px] text-center font-noto'}>{handSign}</p>
        </div>
    )
}