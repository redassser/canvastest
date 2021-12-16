import React, {useEffect, useRef, useState} from "react";
const SimplexNoise = require("simplex-noise");

function Screen(props) {
    const [resc, resChange] = useState(50);
    const [seedc, seedChange] = useState(Math.random());
    const [choo, chooChange] = useState(0);
    const [sens, sensChange] = useState(10);
    const [inpc, inpChange] = useState([resc, seedc, choo, sens]);

    const canvasRef = useRef(null);

    //returns random color
    function randoCol(x,y,seed,noisetype, sensitivity) {
            switch(noisetype) {
                case 1:
                    
                    break;
                default:
                    const simplex = new SimplexNoise(seed)
                    return "rgba(255,255,255,"+simplex.noise2D(x/sensitivity,y/sensitivity)+")";
                    break;
            }
    }
    //THIS is createGrid, otherwise known as how this thing works. Makes the grid you can reference
    function createGrid(context, resolution) {
        let grid = {
            units:[],
            fill(x,y,color) {
                const xamo = 800/resolution; const yamo = 800/resolution;
                context.fillStyle = color;
                grid.units[y][x]=color;
                context.fillRect(x*xamo,y*yamo,xamo,yamo);
            }
        };
        for(let y=0;y<resolution;y++) {
            var row = []; 
            for(let x=0;x<resolution+1;x++) {
                row[x] = null;
            }
            grid.units[y]=row;
        }
        return grid;
    }
    //mosaic grid
    function noise(context, resolution, seed, noisetype, sensitivity) {
        var blockGrid = createGrid(context, resolution);
        for(let y=0;y<resolution;y++) {
            for(let x=0;x<resolution+1;x++) {
                const color = (blockGrid.units[y][x]===null) ? randoCol(x,y,seed,noisetype, sensitivity) : "black";
                blockGrid.fill(x,y,color);
            }
        }
    }
    //basically what the Screen actually returns
    useEffect(()=> {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.height = "800";
        canvas.width = "800";
        noise(context, inpc[0], inpc[1], inpc[2], inpc[3]);
    }, [inpc])
    return (
        <>
            <div id="header">
                <button className="inp" onClick={()=>{const v=Math.random();inpChange([resc, v, choo, sens]);seedChange(v);}}>Random Seed</button>
                <button className="inp" onClick={()=>inpChange([resc, seedc, choo, sens])}>Update Grid</button>
                <input className="inp" type="number" value={seedc} onChange={(x)=>{seedChange(x.target.value)}}/>
                <input className="inp" type="number" value={resc} onChange={(x)=>{resChange(x.target.value)}}/>
                <input className="inp" type="range" min="1" max="30" value={sens} onChange={(x)=>{sensChange(x.target.value)}}/>
                <input className="inp" name="choose" type="radio" id="noise" onChange={(x)=>{if(x.target.value==="on")chooChange(0);}} defaultChecked/> <label className="inp" htmlFor="noise">Simplex</label>
                <input className="inp" name="choose" type="radio" id="perlin" onChange={(x)=>{if(x.target.value==="on")chooChange(1);}}/> <label className="inp" htmlFor="perlin">Perlin</label>
            </div>
            <canvas ref={canvasRef} {...props}></canvas>
        </>
    )
}

export default Screen