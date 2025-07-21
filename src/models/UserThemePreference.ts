// src/models/UserThemePreference.ts
import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from 'sequelize';
  
  export interface UserThemePreferenceAttributes {
    id: string;
    userId: string;
    theme: 'light' | 'dark' | 'system' | 'novaedge';
    customCSS?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  export interface UserThemePreferenceCreationAttributes
    extends Optional<UserThemePreferenceAttributes, 'id'> {}
  
  export class UserThemePreference
    extends Model<
      UserThemePreferenceAttributes,
      UserThemePreferenceCreationAttributes
    >
    implements UserThemePreferenceAttributes {
    public id!: string;
    public userId!: string;
    public theme!: 'light' | 'dark' | 'system' | 'novaedge';
    public customCSS?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    static initModel(sequelize: Sequelize): typeof UserThemePreference {
      UserThemePreference.init(
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
          theme: {
            type: DataTypes.ENUM('light', 'dark', 'system', 'novaedge'),
            allowNull: false,
            defaultValue: 'light',
          },
          customCSS: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
        },
        {
          sequelize,
          tableName: 'UserThemePreferences',
          timestamps: true,
        }
      );
      return UserThemePreference;
    }
  }
  