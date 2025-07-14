// src/models/employee.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Attribute interface
export interface EmployeeAttributes {
  id: string;
  userId: string;
  employeeId: string;
  consultantId: string;
  position: string;
  department: string | null;
  hireDate: Date;
  salary: number | null;
  hourlyRate: number | null;
  employmentType: string;
  status: string;
  permissions: any;
  workSchedule: any | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Creation attributes (id and nullable fields optional)
export interface EmployeeCreationAttributes
  extends Optional<
    EmployeeAttributes,
    'id' | 'department' | 'salary' | 'hourlyRate' | 'workSchedule'
  > {}

// 3. Model class
export class Employee
  extends Model<EmployeeAttributes, EmployeeCreationAttributes>
  implements EmployeeAttributes
{
  public id!: string;
  public userId!: string;
  public employeeId!: string;
  public consultantId!: string;
  public position!: string;
  public department!: string | null;
  public hireDate!: Date;
  public salary!: number | null;
  public hourlyRate!: number | null;
  public employmentType!: string;
  public status!: string;
  public permissions!: any;
  public workSchedule!: any | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // e.g. this.belongsTo(models.User, { foreignKey: 'userId' });
    // this.belongsTo(models.Consultant, { foreignKey: 'consultantId' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize): void {
    Employee.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        employeeId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        consultantId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        position: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        department: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        hireDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        salary: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        hourlyRate: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        employmentType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        permissions: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        workSchedule: {
          type: DataTypes.JSON,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'Employees',
        modelName: 'Employee',
        timestamps: true,
      }
    );
  }
}
