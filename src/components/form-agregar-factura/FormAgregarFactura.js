import React, { useEffect, useState, useRef, useContext } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { ModalRedirect } from "../modal-redirect/ModalRedirect";
import { CustomSelect } from "../custom-select/CustomSelect";

import "./FormAgregarFactura.styles.scss";

import {

    OpcionesSelectEmpresaAltaFinanzas,
    OpcionesSelectEmpresaResponsableFinanzas,
    
} from "../../utils/selects-opciones";

const initialState = {
    factura: "",
    original: "",
    
    valor_factura_original: "",
    fecha_factura:"",
    proovedor:"",
    persona:"",
    endoso:"",
    beneficiario:"",
    moneda:"",
 
    
};

export const FormAgregarFactura = ({ infoFinancieraId, obraData }) => {
  const [form, setForm] = useState(initialState);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const archivoRef = useRef();
  const originalRef = useRef();
  const personaRef = useRef();





  const history = useHistory();
  const { pathname } = useLocation();

  const { obraId } = useParams();

  useEffect(() => {
    if (obraData) {
      setForm({
        nombre: obraData.nombre,
        residente: obraData.residente,
        direccion: obraData.direccion,
        telefono: obraData.telefono,
        email: obraData.email,
        linkObra: obraData.linkObra,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (archivoRef.current.files[0]) {
        formData.append("archivo", archivoRef.current.files[0]);
    }

    formData.append("factura", form.factura);
    formData.append("descripcion", form.descripcion);
    formData.append("original", form.original);
    formData.append("proovedor", form.proovedor);
    formData.append("persona", form.persona);
    formData.append("endoso", form.endoso);
    formData.append("beneficiario", form.beneficiario);
    formData.append("moneda", form.moneda);
    formData.append("valor_factura_original", form.valor_factura_original);
    formData.append("informacion_financiera", infoFinancieraId);
    formData.append("fecha_factura", form.fecha_factura);
    // formData.append("usuario", 1);

    

    if (obraData) {
      let data = await fetch(
        `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/obras/${obraId}/update/`,
        {
          method: "PATCH",
          headers: {
            /* "Content-Type": "application/json", */
            Authorization: `Token ${authtoken}`,
          },
          body: formData,
        }
      );

      let json = await data.json();

      // console.log(json);

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          `${process.env.REACT_APP_API_CONCRECO_BACKEND_URL}/api/obras/${obraId}/update/`,
          {
            method: "PATCH",
            headers: {
              /* "Content-Type": "application/json", */
              Authorization: `Token ${json.token}`,
            },
            body: formData,
          }
        );

        json = await data.json();
      }

      if (data.status === 400) {
        
          alert("Error, recarga la página");
          return;
        
      }
      if (data.status === 403) {
        
        alert("No tienes permisos para esta acción");
        return;
      
    }
      if (data.status === 200) {
        setShowConfirmModal(true);
      }
    } else {
      let data = await fetch(
        process.env.REACT_APP_ACTIVOS_BACKEND_URL + "/api/facturas/",
        {
          method: "POST",
          headers: {
            /* "Content-Type": "application/json", */
            Authorization: `Token ${authtoken}`,
          },
          body: formData,
        }
      );

      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/obras/create/",
          {
            method: "POST",
            headers: {
              /* "Content-Type": "application/json", */
              Authorization: `Token ${json.token}`,
            },
            body: formData,
          }
        );

        json = await data.json();
      }

      if (data.status === 400) {
        if (json.email) {
          alert("Ingresa un email válido");
          return;
        }
      }

      if (data.status === 201) {
        setShowConfirmModal(true);
      }
    }
  };

  return (
    <div className="container">
      <ModalRedirect
        showConfirmModal={showConfirmModal}
        text={
          obraData
            ? "Se ha actualizado correctamente la factura."
            : "Se ha creado correctamente la factura."
        }
        link={
            obraData
            ? `/unidades/informacion-financiera/${infoFinancieraId}/facturas`
            : `/unidades/informacion-financiera/${infoFinancieraId}/facturas`
        }
      />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8">
          {obraData ? (
            <h3 className="text-center">Editar factura</h3>
          ) : (
            <h3 className="text-center">Agregar factura</h3>
          )}

          <form
            className="agregar-obra-form"
            onSubmit={(e) => {
              handleSubmit(e, history);
            }}
          >
            <div className="mb-2">
          
            <label htmlFor="factura" className="form-label">
                  Número de Factura
                </label>
                <input
                  type="text"
                  name="factura"
                  id="factura"
                  value={form.factura}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                //   required
                />
            </div>


            <div className="mb-2">
              <label htmlFor="original" className="form-label">
                Tipo de Factura
              </label>
              <select
                id="original"
                name="original"
                onChange={handleChange}
                value={form.original}
                ref={originalRef}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="Si">Origen</option>
                <option value="No">Subsecuente</option>
              </select>
              </div>



              <div className="mb-2">
          
            <label htmlFor="valor_factura_original" className="form-label">
                  Valor factura
                </label>
                <input
                  type="number"
                  name="valor_factura_original"
                  id="valor_factura_original"
                  value={form.valor_factura_original}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                //   required
                />
            </div>

            <div className="mb-2">
              <label htmlFor="modena" className="form-label">
                Moneda
              </label>
              <select
                id="modena"
                name="modena"
                onChange={handleChange}
                value={form.modena}
                ref={originalRef}
                className="form-select"
                required
              >
                <option value=""></option>
                <option value="Pesos">Pesos</option>
                <option value="Dólares">Dólares</option>
              </select>
              </div>


           

            <div className="mb-2">
          
            <label htmlFor="fecha_factura" className="form-label">
                Fecha de la factura:
              </label>
              <input
                id="fecha_factura"
                type="date"
                name="fecha_factura"
                onChange={handleChange}
                value={form.fecha_factura}
                className="form-control"
                required
              />
             
            </div>

            <div className="mb-2">
          
          <label htmlFor="proovedor" className="form-label">
                Proovedor
              </label>
              <input
                type="number"
                name="proovedor"
                id="proovedor"
                value={form.proovedor}
                onChange={handleChange}
                className="form-control"
                autoComplete="off"
              //   required
              />
          </div>

          <div className="mb-2">
              <label htmlFor="persona" className="form-label">
                Persona
              </label>
              <select
                id="persona"
                name="persona"
                onChange={handleChange}
                value={form.persona}
                ref={personaRef}
                className="form-select"
                // required
              >
                <option value=""></option>
                <option value="Física">Física</option>
                <option value="Moral">Moral</option>
              </select>
              </div>


              <div className="mb-2">
          
          <label htmlFor="endoso" className="form-label">
                Endoso
              </label>
              <input
                type="number"
                name="endoso"
                id="endoso"
                value={form.endoso}
                onChange={handleChange}
                className="form-control"
                autoComplete="off"
              //   required
              />
          </div>

          <div className="mb-2">
          
          <label htmlFor="beneficiario" className="form-label">
                Beneficiario
              </label>
              <input
                type="number"
                name="beneficiario"
                id="beneficiario"
                value={form.beneficiario}
                onChange={handleChange}
                className="form-control"
                autoComplete="off"
              //   required
              />
          </div>

            

            <div className="mb-2">
          
           
                  <label htmlFor="archivo" className="form-label">
                    Archivo
                  </label>
                  <input
                    type="file"
                    id="archivo"
                    className="form-control"
                    ref={archivoRef}
                  />
             
            </div>

            
            

           

           

            <div className="d-flex justify-content-end ">
              {obraData ? (
                <input
                  type="submit"
                  value="Guardar Cambios"
                  className="btn  mb-3 mt-2"
                  style={{ backgroundColor: "#00C08B", color: "white" }}
                />
              ) : (
                <input
                  type="submit"
                  value="Agregar"
                  className="btn  mb-3 mt-2"
                  style={{ backgroundColor: "#00C08B", color: "white" }}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};