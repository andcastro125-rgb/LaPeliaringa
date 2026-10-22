import type { ItemCarrito, Orden, Vista } from '../types';
import { formatearPrecio, resumenCarrito } from '../utils/formato';
import { Enlace } from './Enlace';
import { FormularioPago } from './FormularioPago';

interface PagoProps {
  carrito: ItemCarrito[];
  irA: (vista: Vista) => void;
  onCambiarCantidad: (id: number, delta: number) => void;
  onConfirmado: (orden: Orden) => void;
}

export const Pago = ({ carrito, irA, onCambiarCantidad, onConfirmado }: PagoProps) => {
  const { total } = resumenCarrito(carrito);

  return (
    <main className="checkout-page">
      <Enlace destino="kits" irA={irA} className="back-link">← Seguir comprando</Enlace>
      <h1>Revisa y confirma</h1>
      <p className="checkout-help">Estás a un paso de terminar. Revisa las cantidades y completa tus datos.</p>

      <div className="checkout-layout">
        <section className="cart-summary" aria-labelledby="resumen">
          <h2 id="resumen">Tu carrito</h2>

          {/* Tema 3: renderizado condicional (carrito vacío) */}
          {carrito.length === 0 ? (
            <div>
              <p>Tu carrito está vacío.</p>
              <Enlace destino="kits" irA={irA} className="button">Elegir un kit</Enlace>
            </div>
          ) : (
            <div>
              {/* Tema 3: renderizado dinámico de la lista del carrito */}
              {carrito.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <small>Kit Peliaringa</small>
                  </div>
                  <div>
                    <button type="button" className="quantity-button" aria-label="Restar una unidad" onClick={() => onCambiarCantidad(item.id, -1)}>−</button>
                    <span>{item.quantity}</span>
                    <button type="button" className="quantity-button" aria-label="Sumar una unidad" onClick={() => onCambiarCantidad(item.id, 1)}>+</button>
                    <b>{formatearPrecio(item.price * item.quantity)}</b>
                  </div>
                </div>
              ))}
              <p className="cart-total">Total <strong>{formatearPrecio(total)}</strong></p>
            </div>
          )}
        </section>

        {carrito.length > 0 && <FormularioPago carrito={carrito} onConfirmado={onConfirmado} />}
      </div>
    </main>
  );
};
