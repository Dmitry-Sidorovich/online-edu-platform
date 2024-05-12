import { QueryInterface, DataTypes } from 'sequelize';

const USERS_TABLE_NAME: string = 'users';
const PROOF_COLUMN_NAME: string = 'proof';
const PUBLIC_SIGNALS_COLUMN_NAME: string = 'publicSignals';
const ZKP_VERIFICATION_KEY_COLUMN_NAME: string = 'zkpVerificationKey';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn(USERS_TABLE_NAME, PROOF_COLUMN_NAME, {
    type: DataTypes.TEXT,
    allowNull: true,
  });
  await queryInterface.addColumn(USERS_TABLE_NAME, PUBLIC_SIGNALS_COLUMN_NAME, {
    type: DataTypes.TEXT,
    allowNull: true,
  });
  await queryInterface.addColumn(
    USERS_TABLE_NAME,
    ZKP_VERIFICATION_KEY_COLUMN_NAME,
    {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  );
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn(USERS_TABLE_NAME, PROOF_COLUMN_NAME);
  await queryInterface.removeColumn(
    USERS_TABLE_NAME,
    PUBLIC_SIGNALS_COLUMN_NAME,
  );
  await queryInterface.removeColumn(
    USERS_TABLE_NAME,
    ZKP_VERIFICATION_KEY_COLUMN_NAME,
  );
}

module.exports = {
  up,
  down,
};
