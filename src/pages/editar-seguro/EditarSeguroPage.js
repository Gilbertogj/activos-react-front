import React from "react";
import { useParams } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { FormAgregarSeguro } from "../../components/form-agregar-seguro/FormAgregarSeguro";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

export const EditarSeguroPage = () => {
  const { idSeguro } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/seguros/${idSeguro}/`,
    idSeguro
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <FormAgregarSeguro unidadId={data.unidad} infoSeguroData={data} />
      )}
    </>
  );
};