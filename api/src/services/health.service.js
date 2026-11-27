// Los servicios contienen la lógica de negocio. En la fase 1 solo existe el de salud.
export async function getHealthStatus() {
  return { success: true, message: 'MiniAula API funcionando correctamente' };
}
