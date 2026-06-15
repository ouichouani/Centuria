import { useEffect, useRef, useState } from "react"

export default function SearchUser({ ListUsers, setUserList }) {

    const [keyword, setKeyword] = useState('');
    const cloneArray = useRef([...ListUsers]);
    console.log('top : ', ListUsers);

    function handleChange(e) {
        const { value } = e.target;
        setKeyword(value.trim());
        applayResearch(value);
    }

    function applayResearch(keyword) {

        if (keyword == '') {
            setUserList([...cloneArray.current]);
            return;
        }
        const filtredArray = cloneArray.current.filter(item => item.email.includes(keyword) || item.name.includes(keyword))
        setUserList(filtredArray);
    }

    useEffect(() => {
        if (cloneArray.current.length == 0 && ListUsers.length > 0) cloneArray.current = [...ListUsers];
    }, [ListUsers])

    return (
        <div className="mb-6 px-6 py-5">
            <div className="flex items-center justify-center">
                <div className="flex gap-2 sm:w-[70%] w-full ">
                    <input type="text" name="like" placeholder="search for a user by he's name or email"
                        onChange={handleChange} value={keyword}
                        className=" w-[100%] p-1 px-2 bg-[#151b23] border border-solid border-white/20 rounded-lg focus:bg-transparent focus:outline-blue-500 focus:outline-2 " />
                </div>
            </div>
        </div>
    )
}