

const drawFromSocket = (
    socketMoves:[number, number][],
    socketOptions: CtxOption,
    ctx: CanvasRenderingContext2D,
    afterDraw: () => void
  ) => {
    const tempCtx = ctx;

    if(tempCtx){
      tempCtx.lineWidth = socketOptions.lineWidth
      tempCtx.strokeStyle = socketOptions.lineColor

      tempCtx.beginPath()
      socketMoves.forEach(([x,y]) => {
        tempCtx.lineTo(x,y);
        tempCtx.stroke();
      });
      tempCtx.closePath(); 
      afterDraw();
    }
  }