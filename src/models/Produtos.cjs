'use strict';
module.exports = (sequelize, DataTypes) => {
  const produtos = sequelize.define('produtos', {
    aliquota_cofins: {
      type: DataTypes.NUMERIC(10, 2),
      defaultValue: 0
    },
    aliquota_ibpt: {
      type: DataTypes.NUMERIC(10, 2),
      defaultValue: 0
    },
    aliquota_icms: {
      type: DataTypes.NUMERIC(10, 2),
      defaultValue: 0
    },
    aliquota_pis: {
      type: DataTypes.NUMERIC(10, 2),
      defaultValue: 0
    },
    altura: {
      type: DataTypes.NUMERIC(10, 2)
    },
    bloqueado: {
      type: DataTypes.CHAR(1),
      defaultValue: 'N'
    },
    bloquear_exclusao: {
      type: DataTypes.CHAR(1),
      defaultValue: 'N'
    },
    cest: {
      type: DataTypes.STRING
    },
    cfop: {
      type: DataTypes.STRING
    },
    codint_familia: {
      type: DataTypes.STRING
    },
    codigo: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    codigo_beneficio: {
      type: DataTypes.STRING
    },
    codigo_familia: {
      type: DataTypes.BIGINT
    },
    codigo_produto: {
      type: DataTypes.BIGINT,primaryKey: true
    }, 
    codigo_produto_integracao: {
      type: DataTypes.STRING
    },
    csosn_icms: {
      type: DataTypes.STRING
    },
    cst_cofins: {
      type: DataTypes.STRING
    },
    cst_icms: {
      type: DataTypes.STRING
    },
    cst_pis: {
      type: DataTypes.STRING
    },
    descr_detalhada: {
      type: DataTypes.TEXT
    },
    descricao: {
      type: DataTypes.TEXT
    },
    descricao_familia: {
      type: DataTypes.STRING
    },
    dias_crossdocking: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    dias_garantia: {
      type: DataTypes.INTEGER,
      defaultValue: 720
    },
    ean: {
      type: DataTypes.STRING
    },
    estoque_minimo: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    exibir_descricao_nfe: {
      type: DataTypes.CHAR(1),
      defaultValue: 'N'
    },
    exibir_descricao_pedido: {
      type: DataTypes.CHAR(1),
      defaultValue: 'N'
    },
    importado_api: {
      type: DataTypes.CHAR(1),
      defaultValue: 'N'
    },
    inativo: {
      type: DataTypes.CHAR(1),
      defaultValue: 'N'
    },
    largura: {
      type: DataTypes.NUMERIC(10, 2)
    },
    lead_time: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    marca: {
      type: DataTypes.STRING
    },
    modelo: {
      type: DataTypes.STRING
    },
    motivo_deson_icms: {
      type: DataTypes.STRING
    },
    ncm: {
      type: DataTypes.STRING
    },
    obs_internas: {
      type: DataTypes.TEXT
    },
    per_icms_fcp: {
      type: DataTypes.NUMERIC(10, 2),
      defaultValue: 0
    },
    peso_bruto: {
      type: DataTypes.NUMERIC(10, 3)
    },
    peso_liq: {
      type: DataTypes.NUMERIC(10, 3)
    },
    profundidade: {
      type: DataTypes.NUMERIC(10, 2)
    },
    quantidade_estoque: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    red_base_cofins: {
      type: DataTypes.NUMERIC(10, 2),
      defaultValue: 0
    },
    red_base_icms: {
      type: DataTypes.NUMERIC(10, 2),
      defaultValue: 0
    },
    red_base_pis: {
      type: DataTypes.NUMERIC(10, 2),
      defaultValue: 0
    },
    tipoitem: {
      type: DataTypes.STRING
    },
    unidade: {
      type: DataTypes.STRING
    },
    valor_unitario: {
      type: DataTypes.NUMERIC(10, 3)
    },
     cd_estabelecimento: {
      type: DataTypes.STRING
    },
  }, { 
    createdAt: 'createdat',  // Nome do campo para a data de criação
    updatedAt: 'updatedat'   // Nome do campo para a data de atualização
  });

  produtos.associate = function(models) {
   models.produtos.belongsTo(models.filiais, { foreignKey: 'cd_estabelecimento' });
  };

  return produtos;
};
