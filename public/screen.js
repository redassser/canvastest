import React, {useEffect, useRef, useState} from "react";

function Screen(props) {
    const [thex,setx] = useState(0);
    const [they,sety] = useState(0);

    const resolution = 30; var length = 0;
    const xamo = 800/resolution; const yamo = 800/resolution;

    const canvasRef = useRef(null);

    function randoCol() {
        const posCol = ["red", "green", "blue","cyan", "yellow", "white","black","grey","purple","orange"];
        return posCol[Math.floor(Math.random()*posCol.length)];
    }
    function randoShp() {
        const posShp = [["s","r","d","r"],["s","d","r","d"],["s","l","d","u"],["s","d","d","d"]];
        return posShp[Math.floor(Math.random()*posShp.length)];
    }
    function get(x,y) {
        if (x<1||y<1) return "Please use an integer greater than 0";
        if (x>resolution||y>resolution) return "Please use an integer within resolution";
        return grid[resolution-(y)][x-1];
    }
    let grid = [];
    function createGrid(context) {
        grid = [];
        for(let y=0;y<resolution;y++) {
            var row = []; 
            for(let x=0;x<resolution+1;x++) {
                row[x] = null
            }
            grid[y]=row;
        }
        return grid;
    }
    function draw(context) {
        createGrid(context);
        for(let y=0;y<resolution;y++) {
            for(let x=0;x<resolution+1;x++) {
                const color = (grid[y][x]===null) ? randoCol() : "black";
                context.fillStyle = color;
                var xh=x; var yh=y; var shpar = []
                var ar = randoShp()
                for (const step of ar) {
                    switch (step) {
                        case "s":
                            break;
                        case "u":
                            yh=(yh-1<resolution)?yh-1:yh;
                            break;
                        case "d":
                            yh=(yh+1<resolution)?yh+1:yh;
                            break;
                        case "l":
                            xh=(xh-1<resolution)?xh-1:xh;
                            break;
                        case "r":
                            xh=(xh+1<resolution)?xh+1:xh;
                            break;
                        default:
                            break;
                    }
                    if(grid[yh][xh]!=null) {
                        break;
                    } else {
                        grid[yh][xh]=color;
                        context.fillRect(xh*xamo,yh*yamo,xamo,yamo);
                    }
                }
            }
        }
    }

    useEffect(()=> {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.height = "800";
        canvas.width = "800";
        draw(context);
    }, [draw])
    return (
        <>
            <canvas ref={canvasRef} {...props}></canvas>
        </>
    )
}

/*
<div id="head">
                X<input id="x" className="inp" onChange={n=>{setx(n)}}></input>
                Y<input id="y" className="inp" onChange={n=>{sety(n)}}></input>
                <button className="inp" onClick={()=>{console.log(get(thex,they))}}/>
                <p id="colo" className="inp">h</p>
            </div>
*/

export default Screen