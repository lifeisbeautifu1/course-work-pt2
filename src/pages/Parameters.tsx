import { useEffect, useState } from "react";

import { Task } from "../components";

const Parameters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    const blob = document.getElementById("blob");

    window.onpointermove = (event) => {
      const { clientX, clientY } = event;

      blob.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 3000, fill: "forwards" }
      );
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="h-screen w-screen grid place-content-center bg-black">
      <Task isOpen={isOpen} toggle={toggle} closeModal={closeModal} />

      <div className="card absolute z-10 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
        <div className="card-content">
          <h3>Информация</h3>
          <h1>Курсовая работа</h1>
          <p>
            По численным методам решения краевых задач математической физики
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setIsOpen(true);
                setToggle(true);
              }}
              className="text-sm text-white underline outline-none border-none"
            >
              Рассчитать
            </button>
            <button
              onClick={() => {
                setIsOpen(true);
                setToggle(false);
              }}
              className="text-sm text-white underline outline-none border-none"
            >
              Наложить
            </button>
          </div>
        </div>
      </div>
      <div id="blob"></div>
      <div id="blur"></div>
    </div>
  );
};

export default Parameters;
