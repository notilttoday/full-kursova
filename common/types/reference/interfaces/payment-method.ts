export enum PaymentMethodType {
  SwiftOrSepa = 'swift_or_sepa',
  VisaOrMastercard = 'visa_or_mastercard',
  BankTransfer = 'bank_transfer',
  Btc = 'btc',
}

export interface PaymentMethod {
  id: string
  type: PaymentMethodType
  title: string
}
