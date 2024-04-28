import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [isNumbersAllowed, setIsNumbersAllowed] = useState(false);
  const [isSymbolsAllowed, setIsSymbolsAllowed] = useState(false);

  const generatePassword = useCallback(() => {
    let passy = "";
    let pass = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (isNumbersAllowed) pass += "0123456789";
    if (isSymbolsAllowed) pass += "!@#$%^&*()_+";
    for (let i = 0; i < length; i++) {
      passy += pass.charAt(Math.floor(Math.random() * pass.length));
    }
    setPassword(passy);
  }, [length, isNumbersAllowed, isSymbolsAllowed, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [length, isNumbersAllowed, isSymbolsAllowed, generatePassword]);

  const passwordRef = useRef(null);
  const copyPassword = () => {
    if (!passwordRef.current.value) return;
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(passwordRef.current.value);
  };

  return (
    <>
      <div className="flex flex-col my-20 mx-70 gap-5">
        <div className="flex flex-col gap-3 text-center justify-center items-center">
          <h1 className="text-7xl font-bold text-white bg-slate-700 rounded-xl p-4 shadow-lg">
            PasSecurity🔒
          </h1>
          <em className="text-2xl font-light text-slate-300">
            {" "}
            A password generating and storing app{" "}
          </em>
        </div>
        <div className=" flex items-center justify-center">
          <div className="w-1/2  p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-slate-700 mb-4">
              Password Generator
            </h2>
            <div className="relative mb-4">
              <input
                type="text"
                id="inputField"
                value={password}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Generated Password"
                readOnly
                ref={passwordRef}
              />
              <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={copyPassword}
              >
                Copy
              </button>
            </div>
            <div className="mb-4">
              <label
                htmlFor="rangeInput"
                className="block text-xl font-medium text-gray-700"
              >
                Length : {length}
              </label>
              <input
                type="range"
                id="rangeInput"
                className="block w-full mt-1"
                min="0"
                max="30"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500 h-5 w-5"
                  defaultChecked={isNumbersAllowed}
                  onChange={() => setIsNumbersAllowed((prev) => !prev)}
                />
                <span className="ml-2 text-xl font-semibold text-gray-700">
                  Numbers
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500 w-5 h-5"
                  defaultChecked={isSymbolsAllowed}
                  onChange={() => setIsSymbolsAllowed((prev) => !prev)}
                />
                <span className="ml-2 text-xl font-semibold text-gray-700">
                  Characters
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
