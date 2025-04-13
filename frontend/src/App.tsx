import { Header, MountainImage } from './components';

function App() {
    return (
        <>
            <div className="flex min-h-screen min-w-screen items-center justify-center bg-[url(./assets/mountains.jpg)] bg-cover bg-no-repeat bg-origin-border">
                <div className="flex h-[90vh] w-[80%] flex-col gap-10 rounded-lg border-[1px] border-white/15 bg-white/5 px-8 py-6 backdrop-blur-md">
                    <Header />
                    <main className="flex items-start gap-10">
                        <div className="flex flex-col items-center gap-5">
                            <MountainImage mountainName="Everest" /> 
                        </div>

                        <div className="flex w-full flex-col">
                            <h2 className="text-center text-2xl font-bold text-amber-500 uppercase">
                                Data
                            </h2>
                        </div>
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
