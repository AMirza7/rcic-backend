// src/models/CalendarEvent.ts
import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from 'sequelize';
  
  export interface CalendarEventAttributes {
    id: string;
    calendarId: string;
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    allDay: boolean;
    location?: string;
    attendees?: string[];         // array of user IDs or emails
    metadata?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface CalendarEventCreationAttributes
    extends Optional<
      CalendarEventAttributes,
      'id' | 'description' | 'allDay' | 'location' | 'attendees' | 'metadata' | 'createdAt' | 'updatedAt'
    > {}
  
  export class CalendarEvent
    extends Model<CalendarEventAttributes, CalendarEventCreationAttributes>
    implements CalendarEventAttributes {
    public id!: string;
    public calendarId!: string;
    public title!: string;
    public description?: string;
    public startTime!: Date;
    public endTime!: Date;
    public allDay!: boolean;
    public location?: string;
    public attendees?: string[];
    public metadata?: Record<string, any>;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    public static initialize(sequelize: Sequelize) {
      CalendarEvent.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          calendarId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: 'Calendars', key: 'id' },
            onDelete: 'CASCADE'
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: true
          },
          startTime: {
            type: DataTypes.DATE,
            allowNull: false
          },
          endTime: {
            type: DataTypes.DATE,
            allowNull: false
          },
          allDay: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
          },
          location: {
            type: DataTypes.STRING,
            allowNull: true
          },
          attendees: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
          },
          metadata: {
            type: DataTypes.JSONB,
            allowNull: true
          }
        },
        {
          sequelize,
          tableName: 'CalendarEvents'
        }
      );
    }
  
    public static associate(models: any) {
      CalendarEvent.belongsTo(models.Calendar, {
        foreignKey: 'calendarId',
        as: 'calendar'
      });
    }
  }
  