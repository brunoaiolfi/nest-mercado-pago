import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post('checkout')
  async checkout(@Body('metadata') CreatePaymentDto: CreatePaymentDto) {

    const { id, email, description, amount } = CreatePaymentDto;

    if (!email || !amount) return 'Email and amount are required';

    const purchaseOrder: PreferenceRequest = {
      items: [
        {
          id: id,
          title: description,
          description: description,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: parseFloat(amount)
        }
      ],
      payer: {
        email: email
      },
      auto_return: "all",
      external_reference: id,
      back_urls: {
        success: 'http://localhost:3000/payments/success',
        pending: 'http://localhost:3000/payments/pending',
        failure: 'http://localhost:3000/payments/failure'
      }
    }

    try {
      return await this.paymentsService.createCheckout(purchaseOrder);
    } catch (err) {
      return err.message;
    }
  }
}
