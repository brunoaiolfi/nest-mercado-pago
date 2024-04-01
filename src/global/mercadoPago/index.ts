import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig } from 'mercadopago';

const configService = new ConfigService()
const access_token = configService.get<string>('MERCADO_PAGO_ACESS_TOKEN');

// Step 2: Initialize the client object
console.log(access_token);
export const MercadoPagoClient = new MercadoPagoConfig({ accessToken: access_token, options: { timeout: 5000, idempotencyKey: 'abc' } });

