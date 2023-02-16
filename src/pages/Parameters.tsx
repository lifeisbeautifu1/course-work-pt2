import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCalculationContext } from "../context/calculationContext";

const Parameters = () => {
  const [l, setl] = useState("8");
  const [n, setN] = useState("1");
  const [λ, setλ] = useState("2");
  const [L, setL] = useState("10");
  const [t, sett] = useState("100");

  const { solve, loading, secondGraph } = useCalculationContext();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    solve(+l, +L, +n, +λ, +t);
  };

  useEffect(() => {
    if (!loading && secondGraph.length > 0) {
      navigate("/solution");
    }
  }, [loading, secondGraph]);

  return (
    <div className="flex flex-col gap-4 py-12 items-center h-screen w-screen">
      <div className="flex flex-col rounded-lg p-6 border border-gray-200 shadow">
        <p className="font-bold text-xl text-gray-900">Курсовая работа УМФ</p>
        <p className="font-light text-gray-700">Задача:</p>
        <img src="./statement.png" className="w-80" />
      </div>
      <div className="rounded-lg p-6 mt-4 border border-gray-200 shadow">
        <p className="font-semibold">Введите параметры:</p>
        <form onSubmit={handleSubmit} className="w-80 flex flex-col gap-4">
          <div className="relative mt-4">
            <input
              type="number"
              min={1}
              value={l}
              onChange={(e) => setl(e.target.value)}
              id="width"
              className="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="width"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Введите толщину ℓ
            </label>
          </div>
          <div className="relative mt-2">
            <input
              type="number"
              min={1}
              value={L}
              onChange={(e) => setL(e.target.value)}
              id="range"
              className="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="range"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Введите длину L
            </label>
          </div>
          <div className="relative mt-2">
            <input
              type="number"
              min={0}
              value={λ}
              onChange={(e) => setλ(e.target.value)}
              id="range2"
              className="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="range2"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Введите длину λ
            </label>
          </div>
          <div className="relative mt-2">
            <input
              type="number"
              min={0}
              value={n}
              onChange={(e) => setN(e.target.value)}
              id="n"
              className="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="n"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Введите показатель преломления n
            </label>
          </div>
          <div className="relative mt-2">
            <input
              type="number"
              min={1}
              value={t}
              onChange={(e) => sett(e.target.value)}
              id="t"
              className="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="t"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Введите число элементов ряда
            </label>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:text-blue-700 inline-flex items-center"
          >
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
    </div>
  );
};

export default Parameters;
