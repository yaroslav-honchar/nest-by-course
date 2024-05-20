import { ConfigService } from '@nestjs/config';

export const getTelegramConfig = (configService: ConfigService) => {
    const chatId = configService.get<string>('TELEGRAM_CHAT_ID');
    const token = configService.get<string>('TELEGRAM_BOT_TOKEN');

    if (!chatId || !token) {
        throw new Error('Telegram chatId or token not found');
    }

    return { chatId, token };
};
