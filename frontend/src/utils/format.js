export const formatCurrency = (value) => {
    // Remove tudo que não é dígito
    value = value.replace(/\D/g, '');
  
    // Adiciona a vírgula para os centavos
    value = value.replace(/(\d)(\d{2})$/, '$1,$2');
  
    // Adiciona o ponto para os milhares
    value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');
  
    return value;
  }