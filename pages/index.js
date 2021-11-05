import Head from "next/head";
import React, {useEffect, useRef} from "react";
import Screen from "../public/screen.js";

function Site() {
    return(
        <div id="mainbox">
            <Head>
                <title>test</title>
                <meta charset="utf-8" />
                <link rel="icon" href="../public/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#121212"/>
            </Head>
            <main>
                <div id="canvascont" >
                    <Screen/>
                </div>
            </main>
        </div>
    )
}

export default Site;