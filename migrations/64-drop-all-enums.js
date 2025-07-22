// migrations/64-drop-all-enums.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface /*, Sequelize */) {
    const enumNames = [
      // 06-create-subscription-plan.js
      'enum_SubscriptionPlans_billingInterval',

      // 08-create-billing-invoice.js
      'enum_BillingInvoices_status',

      // 16-create-appointment.js
      'enum_Appointments_type',
      'enum_Appointments_status',
      'enum_Appointments_mode',
      'enum_Appointments_priority',
      'enum_Appointments_paymentStatus',

      // 21-create-payroll-run.js
      'enum_PayrollRuns_status',
      'enum_PayrollRuns_paymentMethod',

      // 23-create-payroll-record.js
      'enum_PayrollRecords_status',

      // 26-create-connection-requests.js
      'enum_ConnectionRequests_status',

      // 35-create-advertisements.js
      'enum_Advertisements_tier',
      'enum_Advertisements_status',

      // 36-create-campaigns.js
      'enum_Campaigns_tier',

      // 37-create-referral-data.js
      'enum_ReferralData_referrerType',
      'enum_ReferralData_status',
      'enum_ReferralData_rewardStatus',

      // 38-create-withdrawal-requests.js
      'enum_WithdrawalRequests_userType',
      'enum_WithdrawalRequests_status',
      'enum_WithdrawalRequests_paymentMethod',

      // 42-create-timesheets.js
      'enum_Timesheets_status',

      // 43-create-time-entries.js
      'enum_TimeEntries_status',
      'enum_TimeEntries_payrollStatus',

      // 46-create-bank-accounts.js
      'enum_BankAccounts_accountType',

      // 47-create-payment-processors.js
      'enum_PaymentProcessors_provider',

      // 51-create-enhanced-chat-messages.js
      'enum_EnhancedChatMessages_role',
      'enum_EnhancedChatMessages_sentiment',

      // 56-create-user-language-preferences.js
      'enum_UserLanguagePreferences_language',

      // 57-create-user-theme-preferences.js
      'enum_UserThemePreferences_theme',

      // 63-create-conversation-participants.js
      'enum_ConversationParticipants_role'
    ];

    for (const name of enumNames) {
      // Drop each Postgres enum type if it exists
      await queryInterface.sequelize.query(
        `DROP TYPE IF EXISTS "${name}";`
      );
    }
  },

  async down(/* queryInterface, Sequelize */) {
    // no-op: enums will be recreated by their original migrations
  }
};
