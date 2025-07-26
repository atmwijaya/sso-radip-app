import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const navigate = useNavigate();
  const Menus = [
    { title: "Dashboard", src: "Chart_fill", path: "/" },
    { title: "Pesan", src: "Chat", path: "/pesan" },
    { title: "Akun", src: "User", gap: true },
    { title: "Kalender ", src: "Calendar" },
    { title: "Keluar", src: "Setting" },
  ];
  const handleMenuClick = (path, title) => {
    setActiveMenu(title);
    navigate(path);
  };

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-[#0F335C] h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/Radip.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Sistem Informasi Racana Diponegoro
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              onClick={() => handleMenuClick(Menu.path, Menu.title)}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src={`./src/assets/${Menu.src}.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">Beranda</h1>
      </div>
    </div>
  );
};
export default Sidebar;