import { useState } from 'react';
import type { FormEvent } from 'react';
import type { ItemCarrito, Orden } from '../types';
import { registrarPedido } from '../services/api';
import { resumenCarrito } from '../utils/formato';

interface FormularioPagoProps {
  carrito: ItemCarrito[];
  onConfirmado: (orden: Orden) => void;
}

type MetodoPago = 'tarjeta' | 'contraentrega';

// Tema 3: formulario controlado. Cada campo tiene su useState y su onChange.
export const FormularioPago = ({ carrito, onConfirmado }: FormularioPagoProps) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [metodo, setMetodo] = useState<MetodoPago>('tarjeta');

  // Tema 4: estados de carga y de error de la petición POST.
  const [enviando, setEnviando] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);

  const manejarEnvio = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim() || !correo.trim()) return;

    setEnviando(true);
    setAviso(null);

    try {
      await registrarPedido(carrito);
    } catch {
      // La compra sigue siendo una simulación local aunque la API falle.
      setAviso('No pudimos contactar la API; el pedido se registró de forma local.');
    } finally {
      setEnviando(false);
    }

    onConfirmado(resumenCarrito(carrito));
  };

  return (
    <form className="payment-form" onSubmit={manejarEnvio}>
      <h2>Datos de contacto</h2>

      <label htmlFor="name">Nombre completo</label>
      <input id="name" name="name" autoComplete="name" required value={nombre} onChange={(e) => setNombre(e.target.value)} />

      <label htmlFor="phone">Teléfono</label>
      <input id="phone" name="phone" type="tel" autoComplete="tel" required value={telefono} onChange={(e) => setTelefono(e.target.value)} />

      <label htmlFor="email">Correo electrónico</label>
      <input id="email" name="email" type="email" autoComplete="email" required value={correo} onChange={(e) => setCorreo(e.target.value)} />

      <fieldset>
        <legend>Método de pago</legend>
        <label>
          <input type="radio" name="payment" checked={metodo === 'tarjeta'} onChange={() => setMetodo('tarjeta')} /> Tarjeta de crédito
        </label>
        <label>
          <input type="radio" name="payment" checked={metodo === 'contraentrega'} onChange={() => setMetodo('contraentrega')} /> Pago contra entrega
        </label>
      </fieldset>

      {/* Tema 4: el botón se bloquea mientras la petición está en curso */}
      <button className="button button--primary" type="submit" disabled={enviando}>
        {enviando ? 'Confirmando…' : 'Confirmar pedido'}
      </button>

      {/* Tema 3: renderizado condicional del aviso de error */}
      {aviso && <p className="api-error" role="alert">{aviso}</p>}
      <p className="form-note">Compra simulada para fines académicos. No se cobra dinero real.</p>
    </form>
  );
};
