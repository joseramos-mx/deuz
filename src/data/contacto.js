// TODO DEUZ: capturar datos de contacto y perfiles de redes reales.
// Los campos vacíos se ocultan en la UI; nunca se muestran enlaces genéricos.

export const contacto = {
  telefono: "", // formato E.164, ej. "+526181234567"
  whatsapp: "", // solo dígitos con lada, ej. "526181234567"
  correo: "",
  direccion: "",
  ciudad: "Durango, MX",
};

export const redes = [
  { red: "LinkedIn", href: "" },
  { red: "Instagram", href: "" },
  { red: "Facebook", href: "" },
  { red: "X", href: "" },
].filter((r) => r.href);
