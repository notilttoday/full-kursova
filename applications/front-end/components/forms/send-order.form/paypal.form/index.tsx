import { useEffect, useRef } from 'react'

interface PayPalPaymentFormProps {
  total: number
  onSuccess: () => void
}

export const PayPalPaymentForm: React.FC<PayPalPaymentFormProps> = ({ total, onSuccess }) => {
  const paypal = useRef<HTMLDivElement | null>(null)
  const renderedRef = useRef(false) // ← новий флаг

  const fetchExchangeRate = async (): Promise<number> => {
    try {
      const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=CZK&json')
      const data = await response.json()

      if (!Array.isArray(data) || !data[0]?.rate) {
        throw new Error('Невірна структура відповіді API НБУ')
      }

      const czkToUah = data[0].rate
      const uahToCzk = 1 / czkToUah

      return uahToCzk
    } catch (error) {
      console.error('Не вдалося завантажити курс валют:', error)

      return 0.54
    }
  }

  useEffect(() => {
    const container = paypal.current

    if (!window.paypal || !container || renderedRef.current) {
      return
    }

    renderedRef.current = true // ← запам’ятовуємо, що ми вже рендерили

    const loadPayPalButtons = async () => {
      const exchangeRate = await fetchExchangeRate()
      const amountCZK = (total * exchangeRate).toFixed(2)

      window.paypal
        .Buttons({
          createOrder: (data, actions) =>
            actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  description: 'Figures',
                  amount: {
                    currency_code: 'CZK',
                    value: amountCZK,
                  },
                },
              ],
            }),
          onApprove: async (data, actions) => {
            await actions.order.capture()
            onSuccess()
          },
          onError: (err) => {
            console.error('PayPal error', err)
          },
        })
        .render(container)
    }

    loadPayPalButtons()
  }, [total, onSuccess])

  return <div ref={paypal} />
}
