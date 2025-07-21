// src/models/CartSession.ts
import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from 'sequelize';
  
  export interface CartSessionAttributes {
    id: string;
    sessionId: string;
    cartItems: object[];
    expiresAt: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }
  export interface CartSessionCreationAttributes
    extends Optional<CartSessionAttributes, 'id' | 'cartItems'> {}
  
  export class CartSession
    extends Model<CartSessionAttributes, CartSessionCreationAttributes>
    implements CartSessionAttributes {
    public id!: string;
    public sessionId!: string;
    public cartItems!: object[];
    public expiresAt!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    static initModel(sequelize: Sequelize): typeof CartSession {
      CartSession.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
          sessionId: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
          },
          cartItems: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: [],
          },
          expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
        },
        {
          sequelize,
          tableName: 'CartSessions',
          timestamps: true,
        }
      );
      return CartSession;
    }
  }
  