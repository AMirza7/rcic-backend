import {
    Model,
    DataTypes,
    Optional
  } from 'sequelize';
  import {sequelize} from '../config/databse';
  
  export interface TargetAudience {
    countries: string[];
    languages: string[];
    services: string[];
    demographics?: {
      ageRange?: [number, number];
      interests?: string[];
    };
  }
  
  export interface PlacementOptions {
    locations: Array<'homepage'|'sidebar'|'search'|'template'|'ai_chat'>;
    priority: 'low'|'medium'|'high'|'premium';
    displayRules?: {
      maxDailyViews?: number;
      maxClicksPerUser?: number;
      minimumViewDuration?: number;
    };
  }
  
  export interface PricingConfig {
    model: 'cpm'|'cpc'|'flat_rate';
    rate: number;
    currency: 'CAD'|'USD';
    totalBudget?: number;
    dailyBudget?: number;
  }
  
  export interface CampaignAttributes {
    id: string;
    title: string;
    description: string;
    content: string;
    businessName: string;
    contactEmail: string;
    contactPhone: string;
    website?: string;
    targetAudience: TargetAudience;
    placement: PlacementOptions;
    startDate: Date;
    endDate: Date;
    tier: 'basic'|'premium'|'enterprise';
    pricing: PricingConfig;
    images: string[];
    logo?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface CampaignCreationAttributes
    extends Optional<CampaignAttributes, 'id' | 'website' | 'logo' | 'createdAt' | 'updatedAt'> {}
  
  export class Campaign
    extends Model<CampaignAttributes, CampaignCreationAttributes>
    implements CampaignAttributes {
    public id!: string;
    public title!: string;
    public description!: string;
    public content!: string;
    public businessName!: string;
    public contactEmail!: string;
    public contactPhone!: string;
    public website?: string;
    public targetAudience!: TargetAudience;
    public placement!: PlacementOptions;
    public startDate!: Date;
    public endDate!: Date;
    public tier!: CampaignAttributes['tier'];
    public pricing!: PricingConfig;
    public images!: string[];
    public logo?: string;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  Campaign.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
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
      tier: {
        type: DataTypes.ENUM('basic','premium','enterprise'),
        allowNull: false
      },
      pricing: {
        type: DataTypes.JSONB,
        allowNull: false
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true
      },
    },
    {
      sequelize,
      tableName: 'Campaigns'
    }
  );
  