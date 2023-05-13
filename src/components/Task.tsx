import { Dialog, Transition } from "@headlessui/react";
import { Input } from ".";
import { useNavigate } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import { useCalculationContext } from "../context/calculationContext";

interface TaskProps {
  isOpen: boolean;
  closeModal: (value: boolean) => void;
}

const Task: React.FC<TaskProps> = ({ isOpen, closeModal }) => {
  const [l, setl] = useState("8");
  const [n, setN] = useState("1");
  const [λ, setλ] = useState("2");
  const [L, setL] = useState("10");
  const [K, setK] = useState("20000");
  const [I, setI] = useState("1000");

  //   const [x, setX] = useState("1");
  //   const [z, setZ] = useState("1");

  const { solve, test, loading, secondGraph, firstGraph } =
    useCalculationContext();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    solve(+l, +L, +n, +λ, +K, +I);
  };

  //   const handleSubmitTest = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     test(+l, +L, +n, +λ, +z, +x);
  //   };

  useEffect(() => {
    if (!loading && firstGraph.length > 0) {
      navigate("/solution");
    }
  }, [loading, secondGraph]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-50"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-50"
            >
              <Dialog.Panel className="card">
                <div className="card-content">
                  <h1>Задайте параметры</h1>
                  <form className="flex flex-col gap-4">
                    <Input
                      type="number"
                      placeholder="Введите толщину ℓ"
                      value={l}
                      onChange={(e) => setl(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Введите длину L"
                      value={L}
                      onChange={(e) => setL(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Введите длину λ"
                      value={λ}
                      onChange={(e) => setλ(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Введите показатель преломления n"
                      value={n}
                      onChange={(e) => setN(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Введите число разбиений по координате z"
                      value={K}
                      onChange={(e) => setK(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Введите число разбиений по координате x"
                      value={I}
                      onChange={(e) => setI(e.target.value)}
                    />
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Task;
