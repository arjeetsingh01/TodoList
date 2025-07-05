import  { useState } from 'react'

export const ShortCrkit = () => {

  const[islogin, setisLogin] = useState(true);
  const[isUser, setIsUser] = useState("")

  return (
    <section className="flex flex-col items-center justify-center h-screen  shadow-l bg-blue-100">
      <h1 className="text-2xl font-bold mb-4">Welcome to ShortCircuit Evaluation</h1>

      {islogin && <p className="mb-6 text-lg text-gray-700">You are Logged in!</p>}

      {isUser? `hellow ${isUser}` : "Please Login"}

      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:shadow-lg border-2 border-blue-700"
        onClick={()=> setisLogin(!islogin)}>
          Toggle Login State
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:shadow-lg border-2 border-green-700"
        onClick={()=> setIsUser("Arjeet Singh")}>
          Set User
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:shadow-lg border-2 border-red-700"
        onClick={()=> setIsUser("")}>
          Clear User
        </button>
      </div>
    </section>
  );
};

