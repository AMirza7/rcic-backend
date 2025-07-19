import {
    Model,
    DataTypes,
    Optional
  } from 'sequelize';
  import {sequelize} from '../config/databse';
  
  export interface AdvertisementAttributes {
    id: string;
    advertiserId: string;
    title: string;
    description: string;
    content: string;
    images: Array<{
      id: string;
      url: string;
      alt: string;
      isPrimary: boolean;
    }>;
    logo?: string;
    businessName: string;
    contactEmail: string;
    contactPhone: string;
    website?: string;
    targetAudience: {
      countries: string[];
      languages: string[];
      services: string[];
      demographics?: {
        ageRange?: [number, number];
        interests?: string[];
      };
    };
    placement: {
      locations: Array<'homepage'|'sidebar'|'search'|'template'|'ai_chat'>;
      priority: 'low' | 'medium' | 'high' | 'premium';
      displayRules?: {
        maxDailyViews?: number;
        maxClicksPerUser?: number;
        minimumViewDuration?: number;
      };
    };
    startDate: Date;
    endDate: Date;
    timezone: string;
    isActive: boolean;
    tier: 'basic' | 'premium' | 'enterprise';
    pricing: {
      model: 'cpm' | 'cpc' | 'flat_rate';
      rate: number;
      currency: 'CAD' | 'USD';
      totalBudget?: number;
      dailyBudget?: number;
    };
    analytics: {
      impressions: number;
      clicks: number;
      ctr: number;
      conversions: number;
      revenue: number;
      lastUpdated: Date;
    };
    status: 'draft' | 'pending_review' | 'approved' | 'rejected' | 'paused' | 'expired';
    reviewNotes?: string;
    reviewedBy?: string;
    reviewedAt?: Date;
    variants?: Array<{
      id: string;
      title: string;
      description: string;
      images: Array<{ id: string; url: string; alt: string; isPrimary: boolean }>;
      weight: number;
      performance: {
        impressions: number;
        clicks: number;
        ctr: number;
        conversions: number;
        revenue: number;
        lastUpdated: Date;
      };
    }>;
    metadata?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface AdvertisementCreationAttributes
    extends Optional<
      AdvertisementAttributes,
      | 'id'
      | 'logo'
      | 'website'
      | 'reviewNotes'
      | 'reviewedBy'
      | 'reviewedAt'
      | 'variants'
      | 'metadata'
      | 'createdAt'
      | 'updatedAt'
    > {}
  
  export class Advertisement
    extends Model<AdvertisementAttributes, AdvertisementCreationAttributes>
    implements AdvertisementAttributes {
    public id!: string;
    public advertiserId!: string;
    public title!: string;
    public description!: string;
    public content!: string;
    public images!: AdvertisementAttributes['images'];
    public logo?: string;
    public businessName!: string;
    public contactEmail!: string;
    public contactPhone!: string;
    public website?: string;
    public targetAudience!: AdvertisementAttributes['targetAudience'];
    public placement!: AdvertisementAttributes['placement'];
    public startDate!: Date;
    public endDate!: Date;
    public timezone!: string;
    public isActive!: boolean;
    public tier!: AdvertisementAttributes['tier'];
    public pricing!: AdvertisementAttributes['pricing'];
    public analytics!: AdvertisementAttributes['analytics'];
    public status!: AdvertisementAttributes['status'];
    public reviewNotes?: string;
    public reviewedBy?: string;
    public reviewedAt?: Date;
    public variants?: AdvertisementAttributes['variants'];
    public metadata?: Record<string, any>;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  Advertisement.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      advertiserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      images: {
        type: DataTypes.JSONB,
        allowNull: false
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      businessName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contactEmail: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contactPhone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true
      },
      targetAudience: {
        type: DataTypes.JSONB,
        allowNull: false
      },
      placement: {
        type: DataTypes.JSONB,
        allowNull: false
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      timezone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      tier: {
        type: DataTypes.ENUM('basic', 'premium', 'enterprise'),
        allowNull: false
      },
      pricing: {
        type: DataTypes.JSONB,
        allowNull: false
      },
      analytics: {
        type: DataTypes.JSONB,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM(
          'draft',
          'pending_review',
          'approved',
          'rejected',
          'paused',
          'expired'
        ),
        allowNull: false
      },
      reviewNotes: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      reviewedBy: {
        type: DataTypes.UUID,
        allowNull: true
      },
      reviewedAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
      variants: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      metadata: {
        type: DataTypes.JSONB,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'Advertisements'
    }
  );
  