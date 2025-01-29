import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

const DEFAULT_ERROR_ICON = (
    <div className='bg-white rounded-full h-7 w-7 flex items-center justify-center'>
        <FaTimes className='text-error' />
    </div>
)

const DEFAULT_SUCCESS_ICON = (
    <div className='bg-[#79BD58] rounded-full h-7 w-7 flex items-center justify-center'>
        <FaCheck className='text-white' />
    </div>
)

export { DEFAULT_ERROR_ICON, DEFAULT_SUCCESS_ICON };
