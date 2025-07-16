import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

export interface LocaleConfigAttributes {
  id: string;
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
  dateFormat: string;
  timeFormat: string;
  currencyFormat: {
    symbol: string;
    position: 'before' | 'after';
    decimal: string;
    thousands: string;
  };
  numberFormat: {
    decimal: string;
    thousands: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LocaleConfigCreationAttributes
  extends Optional<LocaleConfigAttributes, 'id'> {}

export class LocaleConfig
  extends Model<LocaleConfigAttributes, LocaleConfigCreationAttributes>
  implements LocaleConfigAttributes
{
  public id!: string;
  public code!: string;
  public name!: string;
  public nativeName!: string;
  public flag!: string;
  public rtl!: boolean;
  public dateFormat!: string;
  public timeFormat!: string;
  public currencyFormat!: {
    symbol: string;
    position: 'before' | 'after';
    decimal: string;
    thousands: string;
  };
  public numberFormat!: {
    decimal: string;
    thousands: string;
  };
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    LocaleConfig.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      code: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nativeName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      flag: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rtl: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      dateFormat: {
        type: DataTypes.STRING,
        allowNull: false
      },
      timeFormat: {
        type: DataTypes.STRING,
        allowNull: false
      },
      currencyFormat: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {
          symbol: '$',
          position: 'before',
          decimal: '.',
          thousands: ','
        }
      },
      numberFormat: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {
          decimal: '.',
          thousands: ','
        }
      }
    }, {
      sequelize,
      tableName: 'LocaleConfigs'
    });
  }

  static associate(models: any) {
    // no associations required
  }
}
