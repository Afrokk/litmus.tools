import { DownArrowIcon } from "../data/icons";

const DropDown = () => {
    return (
        <div className="DropDown">
            <button className="DropDown__button">
                <span>Single/Married</span>
                <DownArrowIcon />
            </button>
            <div className="DropDown__wrapper">
                <button className="DropDown__text">Single</button>
                <button className="DropDown__text">Married</button>
            </div>
        </div>
    );
};

export default DropDown;
