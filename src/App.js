import React, { Suspense, useRef ,useEffect, useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SideBar from './components/controls'
import Upload from './components/uploadPage';
export default function App(){

return(
        <>
        <BrowserRouter>
        <Routes>
                <Route path="/" element={<SideBar />}></Route>
                <Route path='/upload' element={<Upload />} />

        </Routes>
        </BrowserRouter>
        </>
)
}
