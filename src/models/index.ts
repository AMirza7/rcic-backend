// src/models/index.ts
import { Sequelize, Options } from 'sequelize';
import { User } from './user';
import { AuthToken } from './authtoken';
import { TranslationKey } from './translationkey';
import { Consultant } from './consultant';
import { Client } from './client';
import { Employee } from './employee';
import { SubscriptionPlan } from './subscriptionplan';
import { UserSubscription } from './usersubscription';
import { Notification } from './notification';
import { FeatureAnnouncement } from './featureannouncement';
import { FeatureFlag } from './featureflag';
import { BrandingSettings } from './brandingsettings';
import { Content } from './content';
import { StorageUsage } from './storageusage';
import { FileUploadConfig } from './fileuploadconfig';
import { LocaleConfig } from './localeconfig';
import { Document } from './document';
import { DocumentFolder } from './documentfolder';
import { DocumentPermission } from './documentpermission';
import { Appointment } from './appointment';
import { AppointmentFeedback } from './appointmentfeedback';
import { Template } from './template';
import { CartItem } from './cartitem';
import { TemplateReview } from './templatereview';
import { ShoppingCart } from './shoppingcart';
import { PayrollRun } from './payrollrun';
import { Payslip } from './payslip';
import { PayrollRecord } from './payrollrecord';
import { BillingInvoice } from './billinginvoice';
import { InvoiceItem } from './invoiceitem';
import { ConnectionRequest } from './connectionrequest';
import { AuditLog } from './auditlog';
import { Otp } from './otp';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV ?? 'development';
const config = (require('../../config/config.js')[env] as Partial<Options> & {
  use_env_variable?: string;
  username?: string;
  password?: string;
  database?: string;
});

export const sequelize: Sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable]! as string, config as Options)
  : new Sequelize(
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
  TranslationKey.initialize(sequelize);
  Consultant.initialize(sequelize);
  Client.initialize(sequelize);
  Employee.initialize(sequelize);
  Employee.associate(sequelize.models);
  StorageUsage.initialize(sequelize);
  FileUploadConfig.initialize(sequelize);
  LocaleConfig.initialize(sequelize);
  SubscriptionPlan.initialize(sequelize);
  UserSubscription.initialize(sequelize);
  Notification.initialize(sequelize);
  FeatureAnnouncement.initialize(sequelize);
  FeatureFlag.initialize(sequelize);
  BrandingSettings.initialize(sequelize);
  Content.initialize(sequelize);
  Document.initialize(sequelize);
  DocumentFolder.initialize(sequelize);
  DocumentPermission.initialize(sequelize);
  Appointment.initialize(sequelize);
  AppointmentFeedback.initialize(sequelize);
  Template.initialize(sequelize);
  TemplateReview.initialize(sequelize);
  ShoppingCart.initialize(sequelize);
  CartItem.initialize(sequelize);
  PayrollRun.initialize(sequelize);
  Payslip.initialize(sequelize);
  BillingInvoice.initialize(sequelize);
  InvoiceItem.initialize(sequelize);
  ConnectionRequest.initialize(sequelize);
  PayrollRecord.initialize(sequelize);
  Otp.initialize(sequelize);
  Otp.associate(sequelize.models);
  AuditLog.initialize(sequelize);

  // Run associate() on each model, if defined
  Object.values(sequelize.models).forEach((model: any) => {
    if (typeof model.associate === 'function') {
      model.associate(sequelize.models);
    }
  });
}

export { DataTypes } from 'sequelize';
