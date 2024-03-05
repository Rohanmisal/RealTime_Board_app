import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { useDraw } from "@/common/hooks/drawing";
import { socket } from "@/common/lib/socket";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D>();

  const [size, setSize] = useState({width:0, height:0});
  const [options, setOptions] = useState<CtxOption>({
    lineColor:"#000",
    lineWidth: 5,
  });

  const { handleEndDrawing, handleDraw, handleStartDrawing, drawing } = useDraw(
    options,
    ctxRef.current
  );

  useEffect(() => {
    const handleResize = () =>{
      setSize({width: window.innerWidth, height:window.innerHeight})
    }

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if(ctx) ctxRef.current = ctx;
    }
  }, [options.lineColor, options.lineWidth]);

  const drawFromSocket = (
    socketMoves:[number, number][],
    socketOptions: CtxOption
  ) => {
    const tempCtx = ctxRef.current

    if(tempCtx){
      tempCtx.lineWidth = socketOptions.lineWidth
      tempCtx.strokeStyle = socketOptions.lineColor

      tempCtx.beginPath()
      socketMoves.forEach(([x,y]) => {
        tempCtx.lineTo(x,y);
        tempCtx.stroke();
      });
      tempCtx.closePath(); 
    }
  }

  useEffect(() => {
    let movesToDrawLater: [number, number][] =[];
    let optionsToUseLater: CtxOption={
      lineColor:"",
      lineWidth:0,
    };

    socket.on("socket_draw", (movesToDraw, socketOptions) =>{
      if (ctxRef.current && !drawing){
        drawFromSocket(movesToDraw,socketOptions)
      } else{
        movesToDrawLater = movesToDraw;
        optionsToUseLater = socketOptions
      }
    });

    return () =>{
      socket.off("socket_draw")

      if(movesToDrawLater.length){
        drawFromSocket(movesToDrawLater, optionsToUseLater);
      }
    };
  }, [drawing]);

  
  return (
   <div>
    <h1 className="bg-red-500">Temp</h1>
   </div>
  );
}
