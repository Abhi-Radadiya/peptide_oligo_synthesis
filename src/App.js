import React, { useEffect } from "react";
import BottleMapping from "../src/renderer/modules/Settings/BottleMapping/BottleMapping";
// import Prime from "../src/renderer/modules/Settings/Prime/Prime";

export default function App() {
    useEffect(() => {
        window.electron.onUpdateAvailable(() => {
            console.log(`update availebl : `);
        });

        window.electron.onUpdateDownloaded(() => {
            console.log(`update downloaded : `);
        });
    }, []);

    return (
        <>
            <div className="p-4">
                <BottleMapping />

                {/* <Prime /> */}
            </div>
        </>
    );
}

// import React, { useEffect, useState } from "react";

// function App() {
//     const [updateAvailable, setUpdateAvailable] = useState(false);

//     console.log(`updateAvailable : `, updateAvailable);

//     useEffect(() => {
//         window.electron.onUpdateAvailable(() => {
//             setUpdateAvailable(true);
//         });

//         window.electron.onUpdateDownloaded(() => {
//             setUpdateAvailable("Downloaded");
//         });
//     }, []);

//     return (
//         <div>
//             <h1>This is Main File</h1>
//             {updateAvailable && <p>An update is available! It will be installed soon.</p>}
//             {updateAvailable}
//         </div>
//     );
// }

// export default App;
