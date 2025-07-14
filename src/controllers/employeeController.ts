// src/models/employee.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Full shape of the table
export interface EmployeeAttributes {
  id: string;
  consultantId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Creation attrs: id is optional
export interface EmployeeCreationAttributes
  extends Optional<EmployeeAttributes, 'id'> {}

export class Employee
  extends Model<EmployeeAttributes, EmployeeCreationAttributes>
  implements EmployeeAttributes
{
  public id!: string;
  public consultantId!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phone?: string;
  public position?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    Employee.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        consultantId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'Consultants', key: 'id' },
          onDelete: 'CASCADE',
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: { isEmail: true },
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        position: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'Employees',
        timestamps: true,
      }
    );
  }

  static associate(models: any) {
    Employee.belongsTo(models.Consultant, { foreignKey: 'consultantId', as: 'consultant' });
  }
}