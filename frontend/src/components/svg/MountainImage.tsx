import React from 'react';

interface IMountainImage {
    mountainName: string;
}

export const MountainImage: React.FC<IMountainImage> = ({ mountainName }) => {
    return (
        <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 180" width="360" height="180">
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
            <figcaption className="text-xl font-extrabold text-amber-300">
                {mountainName}
            </figcaption>
        </div>
    );
};
