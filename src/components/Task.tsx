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
  const [l, setl] = useState("");
  const [n, setN] = useState("");
  const [λ, setλ] = useState("");
  const [L, setL] = useState("");
  const [K, setK] = useState("");
  const [I, setI] = useState("");

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
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    <button type="submit" className="pog outline-none">
                      {loading ? (
                        <>
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 mr-3 text-gray-200 animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="#1C64F2"
                            />
                          </svg>
                          Рассчет...
                        </>
                      ) : (
                        <span>Рассчитать</span>
                      )}
                    </button>
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
