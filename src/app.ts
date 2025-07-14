// src/app.ts
import express from 'express';
// import swaggerUi from 'swagger-ui-express';
// import YAML from 'yamljs';

// Middleware
import { requestLogger } from './middleware/requestLogger';
import { requireAuth } from './middleware/authMiddleware';
import { errorHandler } from './middleware/errorHandler';

// Routers
import authRouter from './routes/auth';
import authTokenRouter from './routes/authToken';
import appointmentRouter from './routes/appointment';
import appointmentFeedbackRouter from './routes/appointmentFeedback';
import billingInvoiceRouter from './routes/billingInvoice';
import brandingSettingsRouter from './routes/brandingSettings';
import clientRouter from './routes/client';
import consultantRouter from './routes/consultant';
import contentRouter from './routes/content';
import documentRouter from './routes/document';
import documentFolderRouter from './routes/documentFolder';
import employeeRouter from './routes/employee';
import featureFlagRouter from './routes/featureFlag';
import featureAnnouncementRouter from './routes/featureAnnouncement';
import messageRouter from './routes/message';
import notificationRouter from './routes/notification';
import otpRouter from './routes/otp';
import paymentRouter from './routes/payment';
import payslipRouter from './routes/payslip';
import payrollRecordRouter from './routes/payrollRecord';
import payrollRunRouter from './routes/payrollrun';
import qrRouter from './routes/qr';
import shoppingCartRouter from './routes/shoppingCart';
import subscriptionPlanRouter from './routes/subscriptionPlan';
import templateRouter from './routes/template';
import templateReviewRouter from './routes/templateReview';
import userRouter from './routes/user';
import userSubscriptionRouter from './routes/userSubscription';

// (Optional) Swagger setup
// const openapiDocument = YAML.load(__dirname + '/docs/openapi.yaml');

const app = express();

// Core middleware
app.use(express.json());
app.use(requestLogger);

// Public routes
app.use('/api/auth', authRouter);
app.use('/api/auth-tokens', authTokenRouter);

// Protected routes (requireAuth + optional requireRole)
app.use('/api/appointments', requireAuth, appointmentRouter);
app.use('/api/appointment-feedback', requireAuth, appointmentFeedbackRouter);
app.use('/api/billing-invoices', requireAuth, billingInvoiceRouter);
app.use('/api/branding-settings', requireAuth, brandingSettingsRouter);
app.use('/api/clients', requireAuth, clientRouter);
app.use('/api/consultants', requireAuth, consultantRouter);
app.use('/api/content', requireAuth, contentRouter);
app.use('/api/documents', requireAuth, documentRouter);
app.use('/api/document-folders', requireAuth, documentFolderRouter);
app.use('/api/employees', requireAuth, employeeRouter);
app.use('/api/feature-flags', requireAuth, featureFlagRouter);
app.use('/api/feature-announcements', requireAuth, featureAnnouncementRouter);
app.use('/api/messages', requireAuth, messageRouter);
app.use('/api/notifications', requireAuth, notificationRouter);
app.use('/api/otps', requireAuth, otpRouter);
app.use('/api/payments', requireAuth, paymentRouter);
app.use('/api/payslips', requireAuth, payslipRouter);
app.use('/api/payroll-records', requireAuth, payrollRecordRouter);
app.use('/api/payroll-runs', requireAuth, payrollRunRouter);
app.use('/api/qr', requireAuth, qrRouter);
app.use('/api/shopping-carts', requireAuth, shoppingCartRouter);
app.use('/api/subscription-plans', requireAuth, subscriptionPlanRouter);
app.use('/api/templates', requireAuth, templateRouter);
app.use('/api/template-reviews', requireAuth, templateReviewRouter);
app.use('/api/users', requireAuth, userRouter);
app.use('/api/user-subscriptions', requireAuth, userSubscriptionRouter);

// (Optional) Swagger UI
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

// Error handler (must be last)
app.use(errorHandler);

export default app;
