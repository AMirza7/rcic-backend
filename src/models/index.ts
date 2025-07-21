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
import { ReferralStats } from './ReferralStats';
import { LocaleConfig } from './localeconfig';
import { Document } from './document';
import { DocumentFolder } from './documentfolder';
import { DocumentPermission } from './documentpermission';
import { WithdrawalRequest } from './WithdrawalRequest';
import { Appointment } from './appointment';
import { Conversation } from './Conversation';
import { ConversationParticipant } from './ConversationParticipant';
import { UserLanguagePreference } from './UserLanguagePreference';
import { UserThemePreference } from './UserThemePreference';
import { CartSession } from './CartSession';
import { Message } from './Message';
import { TemplateCategory } from './TemplateCategory';
import { PlanFeature } from './PlanFeature';
import { AppointmentFeedback } from './appointmentfeedback';
import { QRScanHistory } from './QRScanHistory';
import { Timesheet } from './Timesheet';
import { DashboardWidget } from './DashboardWidget';
import { Integration } from './Integration';
import { BankAccount } from './BankAccount';
import { PaymentProcessor } from './PaymentProcessor';
import { TimeEntry } from './TimeEntry';
import { Template } from './template';
import { Calendar } from './Calendar';
import { CalendarEvent } from './CalendarEvent';
import { TaskWorkflow } from './TaskWorkflow';
import { WorkflowStep } from './WorkflowStep';
import { CartItem } from './cartitem';
import { TemplateReview } from './templatereview';
import { SecurityEvent } from './SecurityEvent';
import { ShoppingCart } from './shoppingcart';
import { PayrollRun } from './payrollrun';
import { PayrollBatch } from './payrollrun';
import { Payslip } from './payslip';
import { PayrollRecord } from './payrollrecord';
import { BillingInvoice } from './billinginvoice';
import { InvoiceItem } from './invoiceitem';
import { ConnectionRequest } from './connectionrequest';
import { AuditLog } from './auditlog';
import { Otp } from './otp';
import { ReferralData } from './ReferralData';
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
  BankAccount.initialize(sequelize);
  PaymentProcessor.initialize(sequelize);
  BrandingSettings.initialize(sequelize);
  SecurityEvent.initialize(sequelize);
  Message.initModel(sequelize);
  Content.initialize(sequelize);
  Document.initialize(sequelize);
  TaskWorkflow.initialize(sequelize);
  WorkflowStep.initialize(sequelize);
  DocumentFolder.initialize(sequelize);
  DocumentPermission.initialize(sequelize);
  QRScanHistory.initModel(sequelize);
  Timesheet.initialize(sequelize);
  UserLanguagePreference.initModel(sequelize);
  Conversation.initModel(sequelize);
  ConversationParticipant.initModel(sequelize);
  UserThemePreference.initModel(sequelize);
  CartSession.initModel(sequelize);
  TemplateCategory.initModel(sequelize);
  PlanFeature.initModel(sequelize);
  TimeEntry.initialize(sequelize);  
  Calendar.initialize(sequelize);
  CalendarEvent.initialize(sequelize);
  Appointment.initialize(sequelize);
  AppointmentFeedback.initialize(sequelize);
  DashboardWidget.initialize(sequelize);
  Integration.initialize(sequelize);
  Template.initialize(sequelize);
  TemplateReview.initialize(sequelize);
  ShoppingCart.initialize(sequelize);
  CartItem.initialize(sequelize);
  PayrollRun.initialize(sequelize);
  PayrollBatch.initialize(sequelize);
  WithdrawalRequest.initialize(sequelize);
  Payslip.initialize(sequelize);
  BillingInvoice.initialize(sequelize);
  InvoiceItem.initialize(sequelize);
  ConnectionRequest.initialize(sequelize);
  PayrollRecord.initialize(sequelize);
  Otp.initialize(sequelize);
  Otp.associate(sequelize.models);
  AuditLog.initialize(sequelize);
  ReferralData.initialize(sequelize);
  ReferralStats.initialize(sequelize);

  


  // generic associate loop…
  Timesheet.associate(sequelize.models);
  TimeEntry.associate(sequelize.models);
  Calendar.associate(sequelize.models);
  CalendarEvent.associate(sequelize.models);
  Appointment.associate(sequelize.models);
  DashboardWidget.associate(sequelize.models);
  Integration.associate(sequelize.models);
  ReferralStats.associate(sequelize.models);
  PayrollRun.associate(sequelize.models);
  PayrollBatch.associate(sequelize.models);

  // Run associate() on each model, if defined
  Object.values(sequelize.models).forEach((model: any) => {
    if (typeof model.associate === 'function') {
      model.associate(sequelize.models);
    }
  });
}

export { DataTypes } from 'sequelize';
