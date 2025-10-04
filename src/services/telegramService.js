/**
 * Telegram Bot API Service
 * Handles communication with Telegram Bot API for sending notifications
 */

const TELEGRAM_API_BASE = 'https://api.telegram.org/bot';

class TelegramService {
  constructor() {
    this.botToken = null;
    this.chatId = null;
  }

  /**
   * Initialize the service with bot token and chat ID
   * @param {string} botToken - Telegram bot token
   * @param {string} chatId - Target chat ID or username
   */
  initialize(botToken, chatId) {
    this.botToken = botToken;
    this.chatId = chatId;
  }

  /**
   * Test the connection to Telegram Bot API
   * @returns {Promise<{success: boolean, message: string}>}
   */
  async testConnection() {
    if (!this.botToken || !this.chatId) {
      return {
        success: false,
        message: 'توکن ربات یا شناسه چت وارد نشده است'
      };
    }

    try {
      const response = await fetch(`${TELEGRAM_API_BASE}${this.botToken}/getMe`);
      const data = await response.json();

      if (!data.ok) {
        return {
          success: false,
          message: 'توکن ربات نامعتبر است'
        };
      }

      // Test sending a message
      const testResponse = await this.sendMessage('🔗 تست اتصال - اتصال به تلگرام با موفقیت برقرار شد!');
      
      return {
        success: testResponse.success,
        message: testResponse.success ? 'اتصال با موفقیت برقرار شد' : testResponse.message
      };
    } catch (error) {
      console.error('Telegram connection test failed:', error);
      return {
        success: false,
        message: 'خطا در اتصال به سرور تلگرام'
      };
    }
  }

  /**
   * Send a message to the configured chat
   * @param {string} message - Message to send
   * @param {Object} options - Additional options
   * @returns {Promise<{success: boolean, message: string}>}
   */
  async sendMessage(message, options = {}) {
    if (!this.botToken || !this.chatId) {
      return {
        success: false,
        message: 'سرویس تلگرام تنظیم نشده است'
      };
    }

    try {
      const payload = {
        chat_id: this.chatId,
        text: message,
        parse_mode: 'HTML',
        ...options
      };

      const response = await fetch(`${TELEGRAM_API_BASE}${this.botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.ok) {
        return {
          success: true,
          message: 'پیام با موفقیت ارسال شد',
          messageId: data.result.message_id
        };
      } else {
        return {
          success: false,
          message: data.description || 'خطا در ارسال پیام'
        };
      }
    } catch (error) {
      console.error('Failed to send Telegram message:', error);
      return {
        success: false,
        message: 'خطا در ارسال پیام به تلگرام'
      };
    }
  }

  /**
   * Send a notification with formatted content
   * @param {Object} notification - Notification object
   * @returns {Promise<{success: boolean, message: string}>}
   */
  async sendNotification(notification) {
    const { title, message, type = 'info', timestamp } = notification;
    
    const emoji = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    }[type] || 'ℹ️';

    const formattedMessage = `
${emoji} <b>${title}</b>

${message}

${timestamp ? `🕐 ${new Date(timestamp).toLocaleString('fa-IR')}` : ''}
    `.trim();

    return await this.sendMessage(formattedMessage);
  }

  /**
   * Send a system notification
   * @param {string} title - Notification title
   * @param {string} message - Notification message
   * @param {string} type - Notification type (info, success, warning, error)
   * @returns {Promise<{success: boolean, message: string}>}
   */
  async sendSystemNotification(title, message, type = 'info') {
    return await this.sendNotification({
      title,
      message,
      type,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Check if the service is properly configured
   * @returns {boolean}
   */
  isConfigured() {
    return !!(this.botToken && this.chatId);
  }

  /**
   * Clear the configuration
   */
  clear() {
    this.botToken = null;
    this.chatId = null;
  }
}

// Create a singleton instance
const telegramService = new TelegramService();

export default telegramService;
