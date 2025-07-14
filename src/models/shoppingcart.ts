// src/models/shoppingcart.ts
import {
  Model,
  DataTypes,
  Sequelize,
  Optional
} from 'sequelize';

// 1. Attribute interface
export interface ShoppingCartAttributes {
  userId: string;
  items: any;
  totalAmount: number;
  currency: string;
  expiresAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Creation attributes (expiresAt optional)
export interface ShoppingCartCreationAttributes
  extends Optional<ShoppingCartAttributes, 'expiresAt'> {}

// 3. Model class
export class ShoppingCart
  extends Model<ShoppingCartAttributes, ShoppingCartCreationAttributes>
  implements ShoppingCartAttributes
{
  public userId!: string;
  public items!: any;
  public totalAmount!: number;
  public currency!: string;
  public expiresAt!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 4. Associations
  public static associate(models: any): void {
    // e.g. this.belongsTo(models.User, { foreignKey: 'userId' });
  }

  // 5. Initialization
  public static initialize(sequelize: Sequelize): void {
    ShoppingCart.init(
      {
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        items: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        totalAmount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        currency: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'ShoppingCarts',
        modelName: 'ShoppingCart',
        timestamps: true,
      }
    );
  }
}
