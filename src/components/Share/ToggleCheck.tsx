
interface ToggleCheckProps {
    checked: boolean
    handleChecked: any
}
const ToggleCheck = ({ checked, handleChecked }: ToggleCheckProps) => {
    return (
        <label className="cursor-pointer" onClick={handleChecked}>
            <div className={`relative w-12 h-7 px-[2px] transition-all duration-300 ${checked ? "[&>div]:right-1 bg-blue-500" : "[&>div]:left-1 bg-gray-200"}`}>
                <div className={`absolute top-1 w-5 h-5 border border-gray-300 bg-white`}></div>
            </div>
        </label>
    );
};

export default ToggleCheck;