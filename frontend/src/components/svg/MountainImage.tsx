import React from 'react';

interface IMountainImage {
    mountainName: string;
}

export const MountainImage: React.FC<IMountainImage> = ({ mountainName }) => {
    return (
        <figure className="group relative mb-12 overflow-hidden rounded-2xl bg-gradient-to-br from-sky-900 to-indigo-900 p-6 shadow-2xl transition-all hover:shadow-xl">
            <div className="relative h-0 w-full pb-[50%]">
                <svg
                    viewBox="0 0 360 180"
                    className="absolute h-full w-full"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Градиентный фон */}
                    <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#93c5fd" />
                        <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>

                    {/* Анимированная горная цепь */}
                    <polyline
                        points="0,140 60,80 120,120 180,60 240,100 300,20 360,90"
                        fill="none"
                        stroke="url(#mountainGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="1000"
                        strokeDashoffset="1000"
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            from="1000"
                            to="0"
                            dur="2.5s"
                            fill="freeze"
                            begin="0.5s"
                        />
                    </polyline>

                    {/* Анимированные снежные вершины */}
                    {[60, 180, 300].map((x, i) => (
                        <circle
                            key={i}
                            cx={x}
                            cy={i === 0 ? 80 : i === 1 ? 60 : 20}
                            r="4"
                            fill="white"
                            opacity="0"
                        >
                            <animate
                                attributeName="opacity"
                                from="0"
                                to="1"
                                dur="0.5s"
                                begin={`${i * 0.3 + 2}s`}
                                fill="freeze"
                            />
                        </circle>
                    ))}
                </svg>
            </div>

            <figcaption className="mt-4 text-center text-2xl font-bold text-amber-300 transition-all group-hover:text-amber-200">
                <span className="animate-float inline-block">{mountainName}</span>
            </figcaption>
        </figure>
    );
};
