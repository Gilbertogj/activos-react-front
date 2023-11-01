import React, { useEffect, useState, useRef, useContext } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setCurrentUser } from "../../redux/user/userSlice";

import { ModalRedirect } from "../modal-redirect/ModalRedirect";
import { CustomSelect } from "../custom-select/CustomSelect";

import "./FormAgregarSeguro.styles.scss";

import {

    OpcionesSelectEmpresaAltaFinanzas,
    OpcionesSelectEmpresaResponsableFinanzas,
    
} from "../../utils/selects-opciones";

const initialState = {
    asegurada: "",
    fecha_vencimiento_poliza: "",
    numero_poliza: "",
    certificado: "",
    tipo_cobertura: "",
    valor_asegurado: "",
    tipo_deducible: "",
    carga_tipo_b: "",
    uso_unidad: "",
    servicio: "",
    remolque: "",
    valor_poliza: "",
    importe_valor_comercial:"",
    nombre_aseguradora:"",
    gps:"",
    nombre_gps:"",
    
};

export const FormAgregarSeguro = ({ unidadId, infoSeguroData }) => {
  const [form, setForm] = useState(initialState);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { authtoken, dispatch } = useContext(ReactReduxContext);

  const imagenRef = useRef();
  const aseguradaRef = useRef();
  const nombreAseguradoraRef = useRef();
  const fechaVencimientoRef = useRef();
  const numeroPolizaRef = useRef();
  const certificadoRef = useRef();
  const tipoCoberturaRef = useRef();
  const tipoValorRef = useRef();
  const valorAseguradoRef = useRef();
  const tipoDeducibleRef = useRef();
  const cargaRef = useRef();
  const usoUnidadRef = useRef();
  const servicioRef = useRef();
  const valorPolizaRef = useRef();
  const gpsRef = useRef();
  const nombreGpsRef = useRef();
  const polizaRef =useRef();


  const history = useHistory();
  const { pathname } = useLocation();

  const { idSeguro } = useParams();

  useEffect(() => {
    if (infoSeguroData) {

      if (infoSeguroData.asegurada === "No") {
        document.querySelector("#nombre_aseguradora").disabled = true;
        document.querySelector("#fecha_vencimiento_poliza").disabled = true;
        document.querySelector("#numero_poliza").disabled = true;
        document.querySelector("#certificado").disabled = true;
        document.querySelector("#tipo_cobertura").disabled = true;
        document.querySelector("#valor_asegurado").disabled = true;
        document.querySelector("#tipo_deducible").disabled = true;
        document.querySelector("#carga_tipo_b").disabled = true;
        document.querySelector("#uso_unidad").disabled = true;
        document.querySelector("#servicio").disabled = true;
        document.querySelector("#importe_valor_comercial").disabled = true;
        document.querySelector("#valor_poliza").disabled = true;
        document.querySelector("#gps").disabled = true;
        document.querySelector("#nombre_gps").disabled = true;
        // document.querySelector("#asegurada").value =
        // infoSeguroData.asegurada;
      } else {
        document.querySelector("#nombre_aseguradora").disable = false;
        document.querySelector("#fecha_vencimiento_poliza").disabled = false;
        document.querySelector("#numero_poliza").disabled = false;
        document.querySelector("#certificado").disabled = false;
        document.querySelector("#tipo_cobertura").disabled = false;
        document.querySelector("#valor_asegurado").disabled = false;
        document.querySelector("#tipo_deducible").disabled = false;
        document.querySelector("#carga_tipo_b").disabled = false;
        document.querySelector("#uso_unidad").disabled = false;
        document.querySelector("#servicio").disabled = false;
        document.querySelector("#importe_valor_comercial").disabled = false;
        document.querySelector("#valor_poliza").disabled = false;
        document.querySelector("#gps").disabled = false;
        document.querySelector("#nombre_gps").disabled = false;
      }

      if (infoSeguroData.importe_valor_comercial === "Convenio") {
        
        document.querySelector("#valor_asegurado").disabled = false;
       
      } else {
  
        document.querySelector("#valor_asegurado").disabled = false;
        
      }


      setForm({
        asegurada: infoSeguroData.asegurada,
        fecha_vencimiento_poliza: infoSeguroData.fecha_vencimiento_poliza,
        numero_poliza: infoSeguroData.numero_poliza,
        certificado: infoSeguroData.certificado,
        tipo_cobertura: infoSeguroData.tipo_cobertura,
        tipo_deducible: infoSeguroData.tipo_deducible,
        valor_asegurado: infoSeguroData.valor_asegurado,
        carga_tipo_b: infoSeguroData.carga_tipo_b,
        uso_unidad: infoSeguroData.uso_unidad,
        servicio: infoSeguroData.servicio,
        remolque: infoSeguroData.remolque,
        valor_poliza: infoSeguroData.valor_poliza,
        importe_valor_comercial: infoSeguroData.importe_valor_comercial,
        nombre_aseguradora : infoSeguroData.nombre_aseguradora,
        gps : infoSeguroData.gps,
        nombre_gps : infoSeguroData.nombre_gps
        
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (e.target.name === "asegurada") {
      if (e.target.value === "No") {
        setForm({
          ...form,
          asegurada: aseguradaRef.current.value,
          fecha_vencimiento_poliza: "",
          numero_poliza: "",
          certificado: "",
          tipo_cobertura: "",
          valor_asegurado: "",
          tipo_deducible: "",
          carga_tipo_b: "",
          uso_unidad: "",
          servicio: "",
          // remolque: aseguradaRef.current.value,
          valor_poliza: "",
          importe_valor_comercial: "",
          nombre_aseguradora : "",
          gps : "",
          nombre_gps : "",
          
          
        });

        nombreAseguradoraRef.current.disabled = true;
        fechaVencimientoRef.current.disabled = true;
        numeroPolizaRef.current.disabled = true;
        certificadoRef.current.disabled = true;
        tipoCoberturaRef.current.disabled = true;
        valorAseguradoRef.current.disabled = true;
        tipoDeducibleRef.current.disabled = true;
        cargaRef.current.disabled = true;
        usoUnidadRef.current.disabled = true;
        servicioRef.current.disabled = true;
        valorPolizaRef.current.disabled = true;
        tipoValorRef.current.disabled = true;
        gpsRef.current.disabled = true;
        nombreGpsRef.current.disabled = true;
       
        
      } else {
        setForm({
          ...form,
          asegurada: aseguradaRef.current.value,
          fecha_vencimiento_poliza: fechaVencimientoRef.current.value,
          numero_poliza:numeroPolizaRef.current.value,
          certificado: certificadoRef.current.value,
          tipo_cobertura: tipoCoberturaRef.current.value,
          valor_asegurado: valorAseguradoRef.current.value,
          tipo_deducible: tipoDeducibleRef.current.value,
          carga_tipo_b: cargaRef.current.value,
          uso_unidad: usoUnidadRef.current.value,
          servicio: servicioRef.current.value,
          // remolque: aseguradaRef.current.value,
          valor_poliza: valorPolizaRef.current.value,
          importe_valor_comercial: tipoValorRef.current.value,
          nombre_aseguradora : nombreAseguradoraRef.current.value,
          gps : gpsRef.current.value,
          nombre_gps : nombreGpsRef.current.value,
          
        });

        nombreAseguradoraRef.current.disabled = false;
        fechaVencimientoRef.current.disabled = false;
        numeroPolizaRef.current.disabled = false;
        certificadoRef.current.disabled = false;
        tipoCoberturaRef.current.disabled = false;
        valorAseguradoRef.current.disabled = false;
        tipoDeducibleRef.current.disabled = false;
        cargaRef.current.disabled = false;
        usoUnidadRef.current.disabled = false;
        servicioRef.current.disabled = false;
        valorPolizaRef.current.disabled = false;
        tipoValorRef.current.disabled = false;
        gpsRef.current.disabled = false;
        nombreGpsRef.current.disabled = false;
      } 

      return;
    }

    if (e.target.name === "importe_valor_comercial") {
      if (e.target.value === "Convenio") {
        setForm({
          ...form,
          importe_valor_comercial: tipoValorRef.current.value,
          valor_asegurado: valorAseguradoRef.current.value,
        
          
          
        });

       
        valorAseguradoRef.current.disabled = false;
        
       
        
      } else {
        setForm({
          ...form,
          importe_valor_comercial: tipoValorRef.current.value,
          valor_asegurado: "",
        });

        valorAseguradoRef.current.disabled = true;
      } 

      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (polizaRef.current.files[0]) {
      formData.append("ploiza", polizaRef.current.files[0]);
    }
    formData.append("asegurada", form.asegurada);
    formData.append("fecha_vencimiento_poliza", form.fecha_vencimiento_poliza);
    formData.append("numero_poliza", form.numero_poliza);
    formData.append("certificado", form.certificado);
    formData.append("tipo_cobertura", form.tipo_cobertura);
    formData.append("valor_asegurado", form.valor_asegurado);
    formData.append("tipo_deducible", form.tipo_deducible);
    formData.append("carga_tipo_b", form.carga_tipo_b);
    formData.append("uso_unidad", form.uso_unidad);
    formData.append("servicio", form.servicio);
    formData.append("remolque", form.remolque);
    formData.append("valor_poliza", form.valor_poliza);
    formData.append("importe_valor_comercial", form.importe_valor_comercial);
    formData.append("unidad", unidadId);
    formData.append("nombre_aseguradora", form.nombre_aseguradora);
    formData.append("gps", form.gps);
    formData.append("nombre_gps", form.nombre_gps);

    // formData.append("usuario", 1);

    

    if (infoSeguroData) {
      let data = await fetch(
        `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/seguros/${idSeguro}/`,
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
          `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/seguros/${idSeguro}//`,
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
        process.env.REACT_APP_ACTIVOS_BACKEND_URL + "/api/seguros/",
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
          process.env.REACT_APP_ACTIVOS_BACKEND_URL + "/api/seguros/",
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
          infoSeguroData
            ? "Se ha actualizado correctamente el seguro de la unidad."
            : "Se ha creado correctamente el seguro de la unidad."
        }
        link={
          infoSeguroData
            ? `/unidades/unidad/${unidadId}`
            : `/unidades/unidad/${unidadId}`
        }
      />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8">
          {infoSeguroData ? (
            <h3 className="text-center">Editar Seguro de la unidad</h3>
          ) : (
            <h3 className="text-center">Agregar Seguro de la unidad</h3>
          )}

          <form
            className="agregar-obra-form"
            onSubmit={(e) => {
              handleSubmit(e, history);
            }}
          >
            <div className="mb-2">
          
            <label htmlFor="asegurada" className="form-label">
                Asegurada
              </label>
              <select
                className="form-select"
                id="asegurada"
                name="asegurada"
                onChange={handleChange}
                value={form.asegurada}
                ref={aseguradaRef}
              >
                <option></option>
                <option value= "Si">Sí</option>
                <option value= "No">No</option>
              </select>
             
            </div>

            <div className="mb-2">

              <div className="mb-2">

            <label htmlFor="nombre_aseguradora" className="form-label">
                  Nombre de la aseguradora
                </label>
                <input
                  type="text"
                  name="nombre_aseguradora"
                  id="nombre_aseguradora"
                  value={form.nombre_aseguradora}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                  ref={nombreAseguradoraRef}
                //   required
                />
            </div>
          
            <label htmlFor="fecha_vencimiento_poliza" className="form-label">
                Fecha de Vencimiento:
              </label>
              <input
                id="fecha_vencimiento_poliza"
                type="date"
                name="fecha_vencimiento_poliza"
                onChange={handleChange}
                value={form.fecha_vencimiento_poliza}
                className="form-control"
                ref={fechaVencimientoRef}
                //required
              />
             
            </div>

            <div className="mb-2">

            <label htmlFor="numero_poliza" className="form-label">
                  Número de póliza
                </label>
                <input
                  type="text"
                  name="numero_poliza"
                  id="numero_poliza"
                  value={form.numero_poliza}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                  ref={numeroPolizaRef}
                //   required
                />
            </div>

            <div className="mb-2">
            <label htmlFor="certificado" className="form-label">
                  Certificado
                </label>
                <input
                  type="text"
                  name="certificado"
                  id="certificado"
                  value={form.certificado}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                  ref={certificadoRef}
                //   required
                />
            </div>

            <div className="mb-2">
          
            <label htmlFor="tipo_cobertura" className="form-label">
                Tipo de cobertura
              </label>
              <select
                className="form-select"
                id="tipo_cobertura"
                name="tipo_cobertura"
                onChange={handleChange}
                value={form.tipo_cobertura}
                ref={tipoCoberturaRef}
              >
                <option></option>
                <option value="Amplio pick ups">Amplio pick ups</option>
                <option value="Básica">Básica</option>
                <option value="Escencial">Escencial</option>
                <option value="Total">Total</option>
                <option value="Total Responsabilidad civil ecológica">Total Responsabilidad civil ecológica</option>
                <option value="Maquinaria para contratistas">Maquinaria para contratistas</option>
                
              </select>
             
            </div>

            <div className="mb-2">
            <label htmlFor="importe_valor_comercial" className="form-label">
                  Tipo valor asegurado
              </label>
              <select
                className="form-select"
                id="importe_valor_comercial"
                name="importe_valor_comercial"
                onChange={handleChange}
                value={form.importe_valor_comercial}
                ref={tipoValorRef}
              >
                <option></option>
                <option value="Comercial">Comercial</option>
                <option value="Convenio">Convenio</option>
              </select>
            </div>

            <div className="mb-2">
            <label htmlFor="valor_asegurado" className="form-label">
                  Valor asegurado
                </label>
                <input
                  type="text"
                  name="valor_asegurado"
                  id="valor_asegurado"
                  value={form.valor_asegurado}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                  ref={valorAseguradoRef}
                  //required
                />
            </div>



            <div className="mb-2">
            <label htmlFor="tipo_deducible" className="form-label">
                  Tipo de deducible 
                </label>
                <input
                  type="text"
                  name="tipo_deducible"
                  id="tipo_deducible"
                  value={form.tipo_deducible}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                  ref={tipoDeducibleRef}
                //   required
                />
            </div>

{/* <div className="mb-2">
            <label htmlFor="tipo_deducible" className="form-label">
                Tipo de deducible
              </label>
              <select
                className="form-select"
                id="tipo_deducible"
                name="tipo_deducible"
                onChange={handleChange}
                value={form.tipo_deducible}
              >
                <option></option>
                <option value="Opción 1">Sí</option>
                <option value="Opción 2">No</option>
              </select>
            </div> */}

            <div className="mb-2">
          
            <label htmlFor="carga_tipo_b" className="form-label">
                Carga tipo b
              </label>
              <select
                className="form-select"
                id="carga_tipo_b"
                name="carga_tipo_b"
                onChange={handleChange}
                value={form.carga_tipo_b}
                ref={cargaRef}
              >
                <option></option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
             
            </div>

            <div className="mb-2">

            <label htmlFor="uso_unidad" className="form-label">
                Uso de la unidad
              </label>
              <select
                className="form-select"
                id="uso_unidad"
                name="uso_unidad"
                onChange={handleChange}
                value={form.uso_unidad}
                ref={usoUnidadRef}
              >
                <option></option>
                
                <option value="Carga comercial">Carga comercial</option>
              </select>
             
            </div>

            <div className="mb-2">
            <label htmlFor="servicio" className="form-label">
                  Servicio 
                </label>
                <input
                  type="text"
                  name="servicio"
                  id="servicio"
                  value={form.servicio}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                  ref={servicioRef}
                //   required
                />
            </div>

            

            

            <div className="mb-2">
            <label htmlFor="valor_poliza" className="form-label">
                  Valor póliza
                </label>
                <input
                  type="number"
                  name="valor_poliza"
                  id="valor_poliza"
                  value={form.valor_poliza}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                  ref={valorPolizaRef}
                  //required
                onWheel={(e) => {
                  e.target.blur();
                }}
                />
            </div>

            <div className="mb-2">
            <label htmlFor="gps" className="form-label">
                Gps
              </label>
              <select
                className="form-select"
                id="gps"
                name="gps"
                onChange={handleChange}
                value={form.gps}
                ref={gpsRef}
              >
                <option></option>
                <option value="Si">Sí</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="mb-2">

            <label htmlFor="nombre_gps" className="form-label">
                  Nombre del gps
                </label>
                <input
                  type="text"
                  name="nombre_gps"
                  id="nombre_gps"
                  value={form.nombre_gps}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                  ref={nombreGpsRef}
                //   required
                />
            </div>

            <div className="mb-2">
                  <label htmlFor="poliza" className="form-label">
                  Poliza
                  </label>
                  <input
                    type="file"
                    id="poliza"
                    className="form-control"
                    ref={polizaRef}
                  />
                </div>

         


           

           

            <div className="d-flex justify-content-end ">
              {infoSeguroData ? (
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