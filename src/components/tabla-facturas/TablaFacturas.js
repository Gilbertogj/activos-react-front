import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";

import "./TablaFacturas.styles.scss";

export const TablaFacturas = () => {
  const { pathname } = useLocation();

  const { id } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/informacion-financiera/${id}/facturas`,
    id
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="container">
          <div className="row text-center">
            {/* {pathname.includes("pedido") || pathname.includes("cotizacion") ? (
              <h2>Seleccione obra</h2>
            ) : (
              <h2>Obras de {data.nombre}</h2>
            )} */}

            <h2>Facturas </h2>
          </div>

          <div className="d-flex justify-content-end mb-3">
           
              <Link
                to={`/unidades/agregar-facturas/${id}`}
                className="btn btn-primary"
              >
                Agregar Factura
              </Link>
       
          </div>

          <div className="row">
            <div className="table-responsive p-0">
              <table className="table table-striped table-hover table-bordered text-center">
                <thead>
                  <tr>
                    <th>Número de Factura</th>
                    <th>Tipo de Factura</th>
                    <th>Valor factura</th>
                    <th>Moneda</th>
                    <th>Proovedor</th>
                    <th>Beneficiario</th>
                    <th>Endoso o factura a:</th>
                  
                    <th>Archivo</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((factura) => (
                    <tr key={factura.id}>
                      {/* <td>
                        

                            <Link
                              to={`/concreco/comercializacion/obra/${linea.id}`}
                            >
                              {factura.factura}
                            </Link>
                      
                      </td> */}
                      <td>   
                              {factura.factura}
                      </td>
                      <td>   
                              {factura.original==="Si" ? "Origen" : factura.original==="No" ? "Subsecuente" : "N/A" }
                      </td>
                     
                      <td>   
                              {"$"+factura.valor_factura_original}
                      </td>
                      <td>   
                              {factura.currency}
                      </td>
                      <td>   
                              {factura.supplier ? factura.supplier : "N/A"}
                      </td>
                      <td>   
                              {factura.beneficiario ? factura.beneficiario : "N/A"}
                      </td>
                      <td>   
                              {factura.endoso}
                      </td>
                  
                  

                      
                      <td>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={factura.archivo}
                      >
                        {factura.archivo ? "Archivo" : "No hay archivo"}
                      </a>
                        
                      </td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
