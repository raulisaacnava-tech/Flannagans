import { CartItem } from '@/types/menu';

export const generateWhatsAppLink = (
  orderList: CartItem[], 
  total: number, 
  tableNumber: string | null = null,
  phoneNumber: string = '34600000000'
): string => {
  let message = 'Hola Flanagans, quiero pedir:\n\n';

  orderList.forEach((item) => {
    message += `${item.quantity}x ${item.product.name}\n`;
    
    if (item.selectedExtras && item.selectedExtras.length > 0) {
      const extrasStr = item.selectedExtras.map(e => e.name).join(', ');
      message += `Extras: ${extrasStr}\n`;
    }
    
    if (item.notes) {
      message += `Notas: ${item.notes}\n`;
    }
    
    message += `Subtotal: ${item.subtotal.toFixed(2)} €\n\n`;
  });

  message += `Total estimado: ${total.toFixed(2)} €\n`;

  if (tableNumber) {
    message += `\nMesa: ${tableNumber}`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
