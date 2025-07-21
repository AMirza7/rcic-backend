// src/models/UserLanguagePreference.ts
import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from 'sequelize';
  
  export interface UserLanguagePreferenceAttributes {
    id: string;
    userId: string;
    language: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  export interface UserLanguagePreferenceCreationAttributes
    extends Optional<UserLanguagePreferenceAttributes, 'id'> {}
  
  export class UserLanguagePreference
    extends Model<
      UserLanguagePreferenceAttributes,
      UserLanguagePreferenceCreationAttributes
    >
    implements UserLanguagePreferenceAttributes {
    public id!: string;
    public userId!: string;
    public language!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    static initModel(sequelize: Sequelize): typeof UserLanguagePreference {
      UserLanguagePreference.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
          userId: {
            type: DataTypes.UUID,
            allowNull: false,
          },
          language: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
        },
        {
          sequelize,
          tableName: 'UserLanguagePreferences',
          timestamps: true,
        }
      );
      return UserLanguagePreference;
    }
  }
  