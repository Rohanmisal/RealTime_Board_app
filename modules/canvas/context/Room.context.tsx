import { MotionValue, useMotionValue } from "framer-motion";
import { createContext, ReactChild } from "react";


export const roomContext = createContext<{
    x: MotionValue<number>,
    y: MotionValue<number>
}>(null!);

const RoomContextProvider = ({childern}: {childern: ReactChild}) => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    return(
        <roomContext.Provider value={{x,y}}>{childern}</roomContext.Provider>
    );
};

export default RoomContextProvider;