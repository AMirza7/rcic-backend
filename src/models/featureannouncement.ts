// src/models/featureannouncement.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Attribute interface
export interface FeatureAnnouncementAttributes {
  id: string;
  title: string;
  description: string;
  fullDescription: string | null;
  version: string;
  releaseDate: Date;
  category: string;
  isNew: boolean;
  isPremium: boolean;
  requiredPlan: any;
  link: string;
  imageUrl: string | null;
  benefits: any;
  tags: any;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Creation attributes (id and nullable fields optional)
export interface FeatureAnnouncementCreationAttributes
  extends Optional<
    FeatureAnnouncementAttributes,
    'id' | 'fullDescription' | 'imageUrl'
  > {}

// 3. Model class
export class FeatureAnnouncement
  extends Model<
    FeatureAnnouncementAttributes,
    FeatureAnnouncementCreationAttributes
  >
  implements FeatureAnnouncementAttributes
{
  public id!: string;
  public title!: string;
  public description!: string;
  public fullDescription!: string | null;
  public version!: string;
  public releaseDate!: Date;
  public category!: string;
  public isNew!: boolean;
  public isPremium!: boolean;
  public requiredPlan!: any;
  public link!: string;
  public imageUrl!: string | null;
  public benefits!: any;
  public tags!: any;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // e.g. this.hasMany(models.Notification, { foreignKey: 'announcementId' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize): void {
    FeatureAnnouncement.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        fullDescription: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        version: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        releaseDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isNew: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        isPremium: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        requiredPlan: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        link: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        imageUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        benefits: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        tags: {
          type: DataTypes.JSON,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'FeatureAnnouncements',
        modelName: 'FeatureAnnouncement',
        timestamps: true,
      }
    );
  }
}
