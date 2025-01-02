import React from "react";

const CardGround = ({ info }) => {
  const downloadImage = (imageUrl) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "imagen.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-8 w-full">
      <table className="table-auto border-collapse border border-gray-300 w-full text-center mb-4">
        <thead>
          <tr>
            <th
              className="border text-white border-gray-300 px-4 py-2"
              rowSpan="2"
            >
              IMAGEN
            </th>
            <th
              className="border text-white border-gray-300 px-4 py-2"
              rowSpan="2"
            >
              PUNTO
            </th>
            <th
              className="border text-white border-gray-300 px-4 py-2"
              rowSpan="2"
            >
              UBICACION
            </th>
            <th
              className="border text-white border-gray-300 px-4 py-2"
              rowSpan="2"
            >
              APLICACION
            </th>
            <th
              className="border text-white border-gray-300 px-4 py-2"
              rowSpan="2"
            >
              CONTINUIDAD
            </th>
            <th
              className="border text-white border-gray-300 px-4 py-2"
              rowSpan="2"
            >
              RESISTENCIA
            </th>
            <th
              className="border text-white border-gray-300 px-4 py-2"
              rowSpan="2"
            >
              CORRIENTE
            </th>
            <th
              className="border text-white border-gray-300 px-4 py-2"
              rowSpan="2"
            >
              TIPO DE PUNTA
            </th>
            <th
              className="border text-white border-gray-300 px-4 py-2"
              colSpan="4"
            >
              CARACT
            </th>
          </tr>
          <tr>
            <th className="border text-white border-gray-300 px-4 py-2">E</th>
            <th className="border text-white border-gray-300 px-4 py-2">C</th>
            <th className="border text-white border-gray-300 px-4 py-2">F</th>
            <th className="border text-white border-gray-300 px-4 py-2">R</th>
          </tr>
        </thead>

        <tbody>
          {info?.data?.length > 0 ? (
            info.data.map((item, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={item.image}
                      alt={`Imagen ${index + 1}`}
                      className="h-16 w-16 object-cover mx-auto"
                    />
                    <button
                      onClick={() => downloadImage(item.image)}
                      className="text-white underline mt-2"
                    >
                      Descargar
                    </button>
                  </td>
                  <td className="border text-white border-gray-300 px-4 py-2">
                    {item.point || ""}
                  </td>
                  <td className="border text-white border-gray-300 px-4 py-2">
                    {item.location || ""}
                  </td>
                  <td className="border text-white border-gray-300 px-4 py-2">
                    {item.application || ""}
                  </td>
                  <td className="border text-white border-gray-300 px-4 py-2">
                    {item.continuity || ""}
                  </td>
                  <td className="border text-white border-gray-300 px-4 py-2">
                    {item.resistance || ""}
                  </td>
                  <td className="border text-white border-gray-300 px-4 py-2">
                    {item.current || ""}
                  </td>
                  <td className="border text-white border-gray-300 px-4 py-2">
                    {item.tip_type_or_point_function || ""}
                  </td>
                  <td className="border text-white border-gray-300 px-4 py-2">
                    {item.e_v || ""}
                  </td>
                  <td className="border text-white border-gray-300 px-4 py-2">
                    {item.cal || ""}
                  </td>
                  <td className="border text-white border-gray-300 px-4 py-2">
                    {item.f_d || ""}
                  </td>
                  <td className="border text-white border-gray-300 px-4 py-2">
                    {item.r || ""}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="12"
                    className="border text-white border-gray-300 px-4 py-2 text-left"
                  >
                    <strong>OBSERVACIONES: </strong> {item.observation || ""}
                  </td>
                </tr>
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="text-gray-500">
                No info available to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CardGround;
