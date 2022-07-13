export const getFieldName = (field, campo) => {
  const aux = field ? `${field}.${campo}` : campo;

  return aux;
};
export const getValueName = (values, field, campo) => {
  return field ? values[field][campo] : values[campo];
};
