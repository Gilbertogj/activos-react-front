import React, { useEffect, useState, useRef, useContext } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { ModalRedirect } from "../modal-redirect/ModalRedirect";
import { CustomSelect } from "../custom-select/CustomSelect";

import "./FormAgregarInformacionFinanciera.styles.scss";

import {

    OpcionesSelectEmpresaAltaFinanzas,
    OpcionesSelectEmpresaResponsableFinanzas,
    
} from "../../utils/selects-opciones";

const initialState = {
    empresa_alta: "",
    empresa_responsable: "",
    ano_compra: "",
    

  
};

export const FormAgregarInformacionFinanciera = ({ unidadId, infoFinancieraData }) => {
  const [form, setForm] = useState(initialState);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const imagenRef = useRef();

  const history = useHistory();
  const { pathname } = useLocation();

  const { idFinanzas } = useParams();

  useEffect(() => {
    if (infoFinancieraData) {
      setForm({
        empresa_alta: infoFinancieraData.empresa_alta,
        empresa_responsable: infoFinancieraData.empresa_responsable,
        ano_compra: infoFinancieraData.ano_compra,
        
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

  

    formData.append("empresa_alta", form.empresa_alta);
    formData.append("empresa_responsable", form.empresa_responsable);
    formData.append("ano_compra", form.ano_compra);
    formData.append("unidad", unidadId);
    // formData.append("usuario", 1);

    

    if (infoFinancieraData) {
      let data = await fetch(
        `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/informacion-financiera/${idFinanzas}/`,
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
          `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/informacion-financiera/${idFinanzas}/`,
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
        if (json.email) {
          alert("Ingresa un email válido");
          return;
        }
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
        process.env.REACT_APP_ACTIVOS_BACKEND_URL + "/api/informacion-financiera/",
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Token ${authtoken}`,
          },
          body: formData,
        }
      );

      let json = await data.json();

      if (json.expired) {
        dispatch(setCurrentUser({ token: json.token }));

        data = await fetch(
          process.env.REACT_APP_ACTIVOS_BACKEND_URL + "/api/informacion-financiera/",
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
          infoFinancieraData
            ? "Se ha actualizado correctamente la información financiera de la unidad."
            : "Se ha creado correctamente la infromación financiera de la unidad."
        }
        link={
          infoFinancieraData
            ? `/unidades/unidad/${unidadId}`
            : `/unidades/unidad/${unidadId}`
        }
      />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8">
          {infoFinancieraData ? (
            <h3 className="text-center">Editar Informacion Financiera</h3>
          ) : (
            <h3 className="text-center">Agregar Informacion Financiera</h3>
          )}

          <form
            className="agregar-obra-form"
            onSubmit={(e) => {
              handleSubmit(e, history);
            }}
          >
            <div className="mb-2">
          
                <CustomSelect
                  datos={OpcionesSelectEmpresaAltaFinanzas}
                  handleChange={handleChange}
                  // selectRef={categoriaUnidadRef}
                  form={form}
                />
             
            </div>

            <div className="mb-2">
          
                <CustomSelect
                  datos={OpcionesSelectEmpresaResponsableFinanzas}
                  handleChange={handleChange}
                  // selectRef={categoriaUnidadRef}
                  form={form}
                />
             
            </div>

            <div className="mb-2">

            <label htmlFor="ano_compra" className="form-label">
                  Año de compra
                </label>
                <input
                  type="number"
                  name="ano_compra"
                  id="ano_compra"
                  value={form.ano_compra}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                  required
                  min="1000"
                  max="4000"
                  minLength="4" 
                  maxLength="4"
                  onWheel={(e) => {
                    e.target.blur();
                  }}
                />

                
                
          
         
       
            </div>

           

           

            <div className="d-flex justify-content-end ">
              {infoFinancieraData ? (
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