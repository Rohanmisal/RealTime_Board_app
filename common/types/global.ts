export declare global{
    interface CtxOption{
        lineWidth: number;
        lineColor: string;
    }

    interface ServerToClientEvents{
        socket_draw: (newMoves: [number, number][], options: CtxOption) => void;
    }

    interface ClientToServerEvents{
        draw: (moves: [number, number][], options:CtxOption) => void;
    }
}