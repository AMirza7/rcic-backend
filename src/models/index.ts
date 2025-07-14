// src/models/index.ts
import { Sequelize } from 'sequelize';
import { User } from './user';
import { AuthToken } from './authtoken';
import { Consultant } from './consultant';
import { Client } from './client';
import { Employee } from './employee';
import { SubscriptionPlan } from './subscriptionplan';
import { UserSubscription } from './usersubscription';
import { BillingInvoice } from './billinginvoice';
import { Notification } from './notification';
import { FeatureAnnouncement } from './featureannouncement';
import { FeatureFlag } from './featureflag';
import { BrandingSettings } from './brandingsettings';
import { Content } from './content';
import { Document } from './document';
import { DocumentFolder } from './documentfolder';
import { Appointment } from './appointment';
import { AppointmentFeedback } from './appointmentfeedback';
import { Template } from './template';
import { TemplateReview } from './templatereview';
import { ShoppingCart } from './shoppingcart';
import { PayrollRun } from './payrollrun';
import { Payslip } from './payslip';
import { PayrollRecord } from './payrollrecord';
import { Otp } from './otp';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV ?? 'development';
const config = require('../../config/config.js')[env];

export const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );

/**
 * Initialize all models and run their associate() methods
 */
export function initModels(): void {
  User.initialize(sequelize);
  AuthToken.initialize(sequelize);
  Consultant.initialize(sequelize);
  Client.initialize(sequelize);
  Employee.initialize(sequelize);
  SubscriptionPlan.initialize(sequelize);
  UserSubscription.initialize(sequelize);
  BillingInvoice.initialize(sequelize);
  Notification.initialize(sequelize);
  FeatureAnnouncement.initialize(sequelize);
  FeatureFlag.initialize(sequelize);
  BrandingSettings.initialize(sequelize);
  Content.initialize(sequelize);
  Document.initialize(sequelize);
  DocumentFolder.initialize(sequelize);
  Appointment.initialize(sequelize);
  AppointmentFeedback.initialize(sequelize);
  Template.initialize(sequelize);
  TemplateReview.initialize(sequelize);
  ShoppingCart.initialize(sequelize);
  PayrollRun.initialize(sequelize);
  Payslip.initialize(sequelize);
  PayrollRecord.initialize(sequelize);
  Otp.initialize(sequelize);

  // Run associate() on each model, if defined
  Object.values(sequelize.models).forEach((model: any) => {
    if (typeof model.associate === 'function') {
      model.associate(sequelize.models);
    }
  });
}

// Optionally, you can auto-initialize here:
// initModels();

// Export Sequelize class for convenience elsewhere
export { DataTypes } from 'sequelize';
