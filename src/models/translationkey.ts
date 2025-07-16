import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

export interface TranslationKeyAttributes {
  id: string;
  locale: string;
  key: string;
  value: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TranslationKeyCreationAttributes
  extends Optional<TranslationKeyAttributes, 'id'> {}

export class TranslationKey
  extends Model<TranslationKeyAttributes, TranslationKeyCreationAttributes>
  implements TranslationKeyAttributes
{
  public id!: string;
  public locale!: string;
  public key!: string;
  public value!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    TranslationKey.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      locale: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'TranslationKeys',
      indexes: [
        {
          unique: true,
          fields: ['locale', 'key'],
          name: 'translation_unique_locale_key'
        }
      ]
    });
  }

  static associate(models: any) {
    // none
  }
}
