import { CableCar } from 'lucide-react';
import { Link, Routes } from 'react-router-dom';

function App() {
    return (
        <>
            <div className="flex min-h-screen min-w-screen items-center justify-center bg-[url(./assets/mountains.jpg)] bg-cover bg-no-repeat bg-origin-border">
                <div className="h-[90vh] w-[70%] rounded-lg border-[1px] border-white/15 bg-white/5 px-8 py-6 backdrop-blur-sm">
                    <header className="flex items-center justify-between">
                        <Link to="/" aria-label="На главную страницу" className="focus-element">
                            <CableCar color="#FFFFFF" size={32} />
                        </Link>

                        <nav className="flex items-center gap-3">
                            <Link
                                to={'/leaderboard'}
                                className="focus-element font-bold tracking-wide text-white uppercase"
                            >
                                Leaderboard
                            </Link>
                            <Link
                                to={'/mountains'}
                                className="focus-element font-bold tracking-wide text-white uppercase"
                            >
                                Mountains
                            </Link>
                        </nav>
                    </header>
                    {/* <main>
						<Routes>
							Route
						</Routes>
					</main> */}
                </div>
            </div>
        </>
    );
}

export default App;
