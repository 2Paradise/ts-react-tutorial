import React from "react";

type GreetingsProps = {
    name: string;
    mark?: string;
    onClick: (name: string) => void;
};

const Greetrings: React.FC<GreetingsProps> = ({name, mark = '!', onClick}) => {
    const handleClick = () => onClick(name);
    return (
        <>
            <div>Hello, {name} {mark}</div>
            <button onClick={handleClick}>click me</button>
        </>
    );
}

export default Greetrings;