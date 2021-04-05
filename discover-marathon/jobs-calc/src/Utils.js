const Utils = {
    formatCurrency: (value) => Intl.NumberFormat('pt-BR',
        { style: 'currency', currency: 'BRL' })
        .format(value)
};

module.exports = Utils;
