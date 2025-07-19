// src/models/Calendar.ts
import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from 'sequelize';
  
  export interface CalendarAttributes {
    id: string;
    consultantId: string;
    name: string;
    description?: string;
    timezone: string;
    externalId?: string;     // for 3rd‑party sync
    syncEnabled: boolean;
    syncSettings?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface CalendarCreationAttributes
    extends Optional<
      CalendarAttributes,
      'id' | 'description' | 'externalId' | 'syncSettings' | 'createdAt' | 'updatedAt'
    > {}
  
  export class Calendar
    extends Model<CalendarAttributes, CalendarCreationAttributes>
    implements CalendarAttributes {
    public id!: string;
    public consultantId!: string;
    public name!: string;
    public description?: string;
    public timezone!: string;
    public externalId?: string;
    public syncEnabled!: boolean;
    public syncSettings?: Record<string, any>;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    public static initialize(sequelize: Sequelize) {
      Calendar.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          consultantId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: 'Consultants', key: 'id' },
            onDelete: 'CASCADE'
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: true
          },
          timezone: {
            type: DataTypes.STRING,
            allowNull: false
          },
          externalId: {
            type: DataTypes.STRING,
            allowNull: true
          },
          syncEnabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
          },
          syncSettings: {
            type: DataTypes.JSONB,
            allowNull: true
          }
        },
        {
          sequelize,
          tableName: 'Calendars'
        }
      );
    }
  
    public static associate(models: any) {
      Calendar.hasMany(models.CalendarEvent, {
        foreignKey: 'calendarId',
        as: 'events'
      });
    }
  }
  