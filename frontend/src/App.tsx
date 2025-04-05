import { Header, MountainImage } from './components';

function App() {
    return (
        <>
            <div className="flex min-h-screen min-w-screen items-center justify-center bg-[url(./assets/mountains.jpg)] bg-cover bg-no-repeat bg-origin-border">
                <div className="flex h-[90vh] w-[70%] flex-col gap-10 rounded-lg border-[1px] border-white/15 bg-white/5 px-8 py-6 backdrop-blur-sm">
                    <Header />
                    <main className="flex">
                        <MountainImage mountainName="Everest" />

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
