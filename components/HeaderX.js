import Link from "next/link";
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
// import { RiInstagramFill } from "react-icons/ri";
// import { GiHamburgerMenu, GiClose } from "react-icons/gi";
// import { BiClose, BiHamburgerMenu } from "react-icons/bi";
// import { AiClose, AiHamburgerMenu ,AiOutlineMenu} from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { useState } from "react";

const HeaderX = ({home}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <header className="bg-gray-100/90 contianer shadow-md  ">
      <div className="py-4 px-[2vmax] lg:px-[4vmax]  flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
        <div className="flex justify-between items-center z-40">
          <Link href="/" className="text-xl font-bold text-teal-500 ">
            RBlog
          </Link>

          {open ? (
            <CgClose
              size={30}
              color={"red"}
              onClick={handleOpen}
              className="visible lg:hidden"
            />
          ) : (
            <HiMenu
              size={30}
              color={"gray"}
              onClick={handleOpen}
              className="visible lg:hidden"
            />
          )}
        </div>

        <div className={`flex pb-2 duration-500 ease-in-out bg-gray-100/90 flex-col gap-5 absolute lg:static  ${open?'top-14 left-0 pl-[2vmax] w-full z-10  shadow-md':'top-[-100%] left-0'} lg:flex-row lg:justify-between lg:items-center lg:w-[70%]`}>
        {/* <div className="flex flex-col gap-5  lg:flex-row  lg:justify-center lg:items-center"> */}
            <input
              type="text"
              placeholder="Search..."
              className="text-sm block w-60 px-3 py-1 mt-2 lg:mt-none bg-white text-gray-600 rounded-full shadow-sm placeholder-slate-500  border border-slate-300 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500
              
              "
            />
          
         
            <Link
              href={"/"}
              className="text-md text-gray-800 hover:text-teal-500 duration-300"
            >
              Home
            </Link>
            <a
              href={"#posts"}
              className="text-md text-gray-800 hover:text-teal-500 duration-300"
            >
              Latest Posts
            </a>
            <a
              href={"#popular_posts"}
              className="text-md text-gray-800 hover:text-teal-500 duration-300"
            >
              Popular Posts
            </a>
            <Link
              href={"/about"}
              className="text-md text-gray-800 hover:text-teal-500 duration-300"
            >
              About
            </Link>
          {/* </div> */}
        </div>
      </div>
    </header>
  );
};

export default HeaderX;
