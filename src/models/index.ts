// src/models/index.ts
import { Sequelize, Options } from 'sequelize';
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
// require returns `any`, so cast down to our Sequelize Options shape
const config = (require('../../config/config.js')[env] as Partial<Options> & {
  use_env_variable?: string;
  username?: string;
  password?: string;
  database?: string;
});

export const sequelize: Sequelize = config.use_env_variable
  ? // Case: a full DATABASE_URL is provided in env
    new Sequelize(
      // non-null assertion so TS knows this is a string
      process.env[config.use_env_variable]! as string,
      // cast config to Options
      config as Options
    )
  : // Case: separate credentials in config
    new Sequelize(
      // these must be strings
      config.database! as string,
      config.username! as string,
      config.password! as string,
      config as Options
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

// Export DataTypes for convenience elsewhere
export { DataTypes } from 'sequelize';
