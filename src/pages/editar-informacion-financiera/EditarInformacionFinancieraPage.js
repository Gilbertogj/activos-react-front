import React from "react";
import { useParams } from "react-router-dom";

import { useFetchAndLoading } from "../../hooks/useFetchAndLoading";

import { FormAgregarInformacionFinanciera } from "../../components/form-agregar-informacion-financiera/FormAgregarInformacionFinanciera";
import { LoadingSpinner } from "../../components/loading-spinner/LoadingSpinner";

export const EditarInformacionFinancieraPage = () => {
  const { idFinanzas } = useParams();

  const { data, isLoading } = useFetchAndLoading(
    `${process.env.REACT_APP_ACTIVOS_BACKEND_URL}/api/informacion-financiera/${idFinanzas}/`,
    idFinanzas
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <FormAgregarInformacionFinanciera unidadId={data.unidad} infoFinancieraData={data} />
      )}
    </>
  );
};