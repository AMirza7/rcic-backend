// src/models/appointmentfeedback.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Define attribute interface
export interface AppointmentFeedbackAttributes {
  id: string;
  appointmentId: string;
  clientId: string;
  consultantId: string;
  rating: number;
  feedback: string | null;
  categories: any | null;
  wouldRecommend: boolean;
  submittedAt: Date;
  isPublic: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define creation attributes (id is optional)
export interface AppointmentFeedbackCreationAttributes
  extends Optional<AppointmentFeedbackAttributes, 'id' | 'feedback' | 'categories'> {}

// 3. Model class
export class AppointmentFeedback
  extends Model<AppointmentFeedbackAttributes, AppointmentFeedbackCreationAttributes>
  implements AppointmentFeedbackAttributes
{
  public id!: string;
  public appointmentId!: string;
  public clientId!: string;
  public consultantId!: string;
  public rating!: number;
  public feedback!: string | null;
  public categories!: any | null;
  public wouldRecommend!: boolean;
  public submittedAt!: Date;
  public isPublic!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // e.g. this.belongsTo(models.Appointment, { foreignKey: 'appointmentId' });
    // this.belongsTo(models.Client, { foreignKey: 'clientId' });
    // this.belongsTo(models.Consultant, { foreignKey: 'consultantId' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize) {
    AppointmentFeedback.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        appointmentId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        clientId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        consultantId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        rating: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        feedback: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        categories: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        wouldRecommend: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        submittedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        isPublic: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        tableName: 'AppointmentFeedbacks',
        modelName: 'AppointmentFeedback',
        timestamps: true,
      }
    );
  }
}
