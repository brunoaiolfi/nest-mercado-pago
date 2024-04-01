import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes';

@Injectable()
export class PaymentsService {

  constructor(private configService: ConfigService) { }

  async createCheckout(purchaseOrder: PreferenceRequest) {

    const configService = new ConfigService()
    const access_token = configService.get<string>('MERCADO_PAGO_ACESS_TOKEN');

    const MercadoPagoClient = new MercadoPagoConfig({ accessToken: access_token, options: { timeout: 5000, idempotencyKey: 'abc' } });

    const preference = new Preference(MercadoPagoClient);

    const { init_point, sandbox_init_point } = await preference.create({ body: purchaseOrder });
    return { init_point, sandbox_init_point };
  }
}
