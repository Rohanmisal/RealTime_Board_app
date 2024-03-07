import { atom } from "recoil";

export const optionsAtom = atom<CtxOption>({
    key:"options",
    default:{
        lineColor:"#000000",
        lineWidth: 5,
    }
});