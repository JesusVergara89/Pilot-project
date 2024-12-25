import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

/**
 

     <Link to="/">
        <img src={logo} alt="logo" width="100px" height="100px" />
      </Link>
      <Link to="/project">Projects</Link>
      <Link to="/login">Login</Link>


 */

const Header = () => {
  const stats = [
    { name: "Informes activos", value: "12" },
    { name: "posts informes entregados", value: "4" },
    { name: "pre informes entregados", value: "8" },
    { name: "Informes cerrados", value: "5" },
  ];
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img
        alt=""
        src="https://ansycar.mx/wp-content/uploads/2024/05/Fondo_Inicio.jpg"
        className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center bg-gradient-to-b from-black/2 to-black/10 backdrop-blur-lg"
      />
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div className="w-[80%] sm:w-[90%] mx-auto md:w-[80%] lg:max-w-7xl py-4 px-6 lg:px-8 bg-gradient-to-b from-blue-400 to-black rounded-lg">
        <div className="flex justify-end items-center">
          <Link to="/">
            <img src={logo} alt="logo" width="100px" height="100px" />
          </Link>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-7xl">
              ANS&CAR
            </h2>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-300 sm:text-xl/8">
              Bienvenido a la herramienta en línea para la gestión de la
              información de{" "}
              <span className="text-blue-200 font-bold">PRE</span> y{" "}
              <span className="text-blue-200 font-bold">POST</span> informes de
              ANS&CAR.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            <Link className="hover:text-blue-300 text-lg" to="/login">
              Inicio de sesión
            </Link>
            <Link className="hover:text-blue-300 text-lg" to="/projects">
              Proyectos
            </Link>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse gap-1">
                <dt className="text-base/7 text-gray-300">{stat.name}</dt>
                <dd className="text-4xl font-semibold tracking-tight text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Header;
