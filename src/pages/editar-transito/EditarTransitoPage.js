import React from "react";
import { useParams } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";


import { FormAgregarTransito } from "../../components/form-agregar-transito/FormAgregarTransito";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

export const EditarTransitoPage = () => {
  const { idTransito } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/transitos/${idTransito}/`,
    idTransito
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <FormAgregarTransito unidadId={data.unidad} transitoData={data} />
      )}
    </>
  );
};