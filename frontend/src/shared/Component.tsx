import React from "react";

interface IComponent {
	children: React.ReactNode;
}

export const Component: React.FC<IComponent> = ({ children }) => {
	return <div>{children}</div>;
};
