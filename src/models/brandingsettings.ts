// src/models/brandingsettings.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Attribute interface
export interface BrandingSettingsAttributes {
  id: string;
  consultantId: string;
  logo: string | null;
  favicon: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string | null;
  typography: string;
  brandName: string | null;
  customDomain: string | null;
  customCSS: string | null;
  isActive: boolean;
  theme: any | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Creation attributes (id optional on create)
export interface BrandingSettingsCreationAttributes
  extends Optional<BrandingSettingsAttributes, 'id'> {}

// 3. Model class
export class BrandingSettings
  extends Model<BrandingSettingsAttributes, BrandingSettingsCreationAttributes>
  implements BrandingSettingsAttributes
{
  public id!: string;
  public consultantId!: string;
  public logo!: string | null;
  public favicon!: string | null;
  public primaryColor!: string;
  public secondaryColor!: string;
  public accentColor!: string | null;
  public typography!: string;
  public brandName!: string | null;
  public customDomain!: string | null;
  public customCSS!: string | null;
  public isActive!: boolean;
  public theme!: any | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Define associations here
  public static associate(models: any): void {
    // e.g. this.belongsTo(models.Consultant, { foreignKey: 'consultantId' });
  }

  // 5. Initialize model
  public static initialize(sequelize: Sequelize): void {
    BrandingSettings.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        consultantId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        logo: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        favicon: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        primaryColor: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        secondaryColor: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        accentColor: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        typography: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        brandName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        customDomain: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        customCSS: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        theme: {
          type: DataTypes.JSON,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'BrandingSettings',
        modelName: 'BrandingSettings',
        timestamps: true,
      }
    );
  }
}
