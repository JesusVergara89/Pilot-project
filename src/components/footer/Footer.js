import React from "react";

const Footer = () => {
  return (
    <footer className="flex-1 flex items-center justify-center px-2 py-6 bg-gray-800 text-white">
      <div className="w-full flex gap-3 flex-col lg:flex-row">
        <div className="card basis-1/3">
          <h4 className="text-xl font-bold mb-2">Contáctanos</h4>
          <div className="flex justify-start items-center gap-2 w-[80%] mb-4">
            <i className="bx bxs-map text-xl"></i>
            <p className="text-sm font-light">
              Calle Garibaldi 1478, Santa Teresita, 44600 Guadalajara, Jal.
            </p>
          </div>
          <div className="flex items-center gap-2 w-[80%] mb-4">
            <i className="bx bx-envelope text-xl"></i>
            <p className="text-sm font-light">ventas@ansycar.mx</p>
          </div>
          <div className="flex items-center gap-2 w-[80%] mb-4">
          <i class='bx bxs-phone-call text-xl' ></i>
            <p className="text-sm font-light">33 1604 2399</p>
          </div>
        </div>
        <div className="card basis-1/3">
          <h4 className="text-xl font-bold">Quiénes Somos</h4>
          <p className="text-sm text-wrap font-light mt-4">
            Con más de dos décadas de trayectoria, somos una empresa 100%
            mexicana con una sólida presencia a nivel nacional. Nuestro enfoque
            se centra en brindar soluciones integrales e innovadoras para el
            aprovechamiento eficiente de la energía eléctrica, así como para la
            conservación óptima de equipos en media y baja tensión.
          </p>
        </div>
        <div className="card basis-1/3 relative">
          <h4 className="text-xl font-bold absolute">Síguenos:</h4>
          <div className="w-full h-full flex gap-3">
            <a
              href="https://www.facebook.com/Ansycarmx?mibextid=ZbWKwL"
              target="_blank"
              rel="noreferrer"
            >
              <i class="bx bxl-facebook-circle text-5xl"></i>
            </a>
            <a
              href="https://www.instagram.com/ansycar/"
              target="_blank"
              rel="noreferrer"
            >
              <i class="bx bxl-instagram-alt text-5xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
