import {
    Model,
    DataTypes,
    Sequelize,
    Optional
  } from 'sequelize';
  
  export interface CartItemAttributes {
    id: string;
    cartId: string;
    templateId: string;
    price: string;
    currency: string;
    quantity: number;
    addedAt: Date;
    expiresAt?: Date;
  }
  
  export interface CartItemCreationAttributes
    extends Optional<CartItemAttributes, 'id' | 'quantity' | 'expiresAt' | 'addedAt'> {}
  
  export class CartItem
    extends Model<CartItemAttributes, CartItemCreationAttributes>
    implements CartItemAttributes
  {
    public id!: string;
    public cartId!: string;
    public templateId!: string;
    public price!: string;
    public currency!: string;
    public quantity!: number;
    public addedAt!: Date;
    public expiresAt?: Date;
  
    static initialize(sequelize: Sequelize) {
      CartItem.init({
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        cartId: {
          type: DataTypes.UUID,
          allowNull: false
        },
        templateId: {
          type: DataTypes.UUID,
          allowNull: false
        },
        price: {
          type: DataTypes.DECIMAL(12,2),
          allowNull: false
        },
        currency: {
          type: DataTypes.STRING,
          allowNull: false
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1
        },
        addedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: true
        }
      }, {
        sequelize,
        tableName: 'CartItems'
      });
    }
  
    static associate(models: any) {
      CartItem.belongsTo(models.ShoppingCart, {
        foreignKey: 'cartId',
        as: 'cart'
      });
      CartItem.belongsTo(models.Template, {
        foreignKey: 'templateId',
        as: 'template'
      });
    }
  }
  