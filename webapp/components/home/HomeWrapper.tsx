import { FC } from "react";
import { Navbar } from "../shared/Navbar";

const HomeWrapper: FC = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
        </div>
    )
}

export default HomeWrapper;