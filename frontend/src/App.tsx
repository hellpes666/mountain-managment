import { CableCar } from 'lucide-react';
import { Link, Route, Routes } from 'react-router-dom';
import { Header } from './components';

function App() {
    return (
        <>
            <div className="flex min-h-screen min-w-screen items-center justify-center bg-[url(./assets/mountains.jpg)] bg-cover bg-no-repeat bg-origin-border">
                <div className="flex h-[90vh] w-[70%] flex-col gap-10 rounded-lg border-[1px] border-white/15 bg-white/5 px-8 py-6 backdrop-blur-sm">
                    <Header />
                    <main>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 400 200"
                            width="400"
                            height="200"
                        >
                            <polyline
                                points="0,140 60,80 120,120 180,60 240,100 300,20 360,90"
                                fill="none"
                                stroke="white"
                                stroke-width="3"
                                stroke-dasharray="1000"
                                stroke-dashoffset="1000"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="1000"
                                    to="0"
                                    dur="4s"
                                    fill="freeze"
                                />
                            </polyline>
                        </svg>

                        {/* <Routes>
                            <Route path="/" element={<></>}/>
                            <Route path="/" element={<></>}/>
                            <Route path="/" element={<></>}/>
                        </Routes> */}
                    </main>
                </div>
            </div>
        </>
    );
}

export default App;
