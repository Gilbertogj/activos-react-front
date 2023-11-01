import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DeleteClientButton } from "../delete-client-button/DeleteClientButton";

import { ReactComponent as EditarLogo } from "../../assets/svg/iconoEditar.svg";


export const DetalleSeguro = ({ detallesSeguro, urlId }) => {
  const { pathname } = useLocation();

  return (
    <div className="container">
      {detallesSeguro.id ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div style={{ width: "40px" }} className="invisible">
              .
            </div>
            <div className="text-center">
              <h2>Seguro de la unidad </h2>
            </div>
            <div>
              <div className="d-flex  flex-column align-items-center">
          
                    <Link
                      to={`/unidades/unidad/${detallesSeguro.unidad}/editar-seguro/${detallesSeguro.id}`}
                    >
                      <div style={{ width: "40px" }}>
                        <EditarLogo />
                      </div>
                    </Link>
                 
               
              
              
              </div>
            </div>
            
          </div>

          <div className="row">
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Asegurada: </strong> {detallesSeguro.asegurada}
              </li>
              <li className="list-group-item">
                <strong>Nombre de la aseguradora: </strong> {detallesSeguro.nombre_aseguradora}
              </li>
              <li className="list-group-item">
                <strong>Fecha vencimiento póliza:</strong> {detallesSeguro.fecha_vencimiento_poliza.slice(0, 10)}
              </li>
              <li className="list-group-item">
                <strong>Número de póliza: </strong> {detallesSeguro.numero_poliza}
              </li>
              <li className="list-group-item">
                <strong>Certificado: </strong> {detallesSeguro.certificado}
              </li>
              <li className="list-group-item">
                <strong>Tipo de cobertura: </strong> {detallesSeguro.tipo_cobertura}
              </li>
              <li className="list-group-item">
                <strong>Tipo valor asegurado: </strong> {detallesSeguro.importe_valor_comercial}
              </li>
              <li className="list-group-item">
                <strong>Valor asegurado: </strong> {detallesSeguro.valor_asegurado}
              </li>
              <li className="list-group-item">
                <strong>Tipo deducible: </strong> {detallesSeguro.tipo_deducible}
              </li>
              <li className="list-group-item">
                <strong>Carga tipo b: </strong> {detallesSeguro.carga_tipo_b}
              </li>
              <li className="list-group-item">
                <strong>Uso de la unidad: </strong> {detallesSeguro.uso_unidad}
              </li>
              <li className="list-group-item">
                <strong>Servicio: </strong> {detallesSeguro.servicio}
              </li>
              <li className="list-group-item">
                <strong>Remolque: </strong> {detallesSeguro.remolque}
              </li>
              <li className="list-group-item">
                <strong>Valor póliza: </strong> {detallesSeguro.valor_poliza}
              </li>

              <li className="list-group-item">
                <strong>Gps: </strong> {detallesSeguro.gps}
              </li>
              
              <li className="list-group-item">
                <strong>Nombre gps: </strong> {detallesSeguro.nombre_gps}
              </li>

              <li className="list-group-item">
                <strong>Poliza:</strong>
                {detallesSeguro.poliza ? (
                  <a href={detallesSeguro.poliza} target="_blank" rel="noreferrer">
                    Poliza
                  </a>
                ) : (
                  " No hay archivo de poliza"
                )}
              </li>
              
              
              {/* <li className="list-group-item">
                <strong>Fecha de creación:</strong>{" "}
                {detallesCliente.created_at.slice(0, 10)}
                prueba
              </li> */}
              
            </ul>
          </div>

          <div className="d-flex justify-content-end mt-2 ">
            

            

            
              {/* <Link
                to={`/unidades/unidad/${detallesUnidad.id}/financiera/1`}
                className="btn mb-2"
                style={{ backgroundColor: "#00C08B", color: "white" }}
              >
                Ver Información Financiera
              </Link> */}
           
            {/* {pathname.includes("comercializacion") &&
              !pathname.includes("cotizacion") && (
                <Link
                  to={`/concreco/comercializacion/cliente/${detallesCliente.id}/obras`}
                  className="btn mb-2"
                  style={{ backgroundColor: "#00C08B", color: "white" }}
                >
                  Ver Obras
                </Link>
              )} */}
              
          </div>
          {/* <div className="d-flex justify-content-end mt-2 ">
              {pathname.includes("logistica") && !pathname.includes("pedido") && (
              <Link
                to={`/concreco/logistica/cliente/${detallesCliente.id}/condicion-venta`}
                className="btn mb-2"
                style={{ backgroundColor: "#00C08B", color: "white" }}
              >
                Ver Condiciones de Venta
              </Link>
            )}
            </div> */}
        </>
      ) : (
        <p>No existe la unidad #{urlId} </p>
        
      
      )}
    </div>
  );
};