export const configEnv = () => {
  const gatewayHost = process.env.GATE_WAY_HOST ?? 'localhost';
  const gatewayPort = process.env.GATE_WAY_PORT ?? '8001';
  return {
    dbHost: process.env.DB_HOST,
    gatewayHost,
    gatewayPort,
    apiUrl: `http://${gatewayHost}:${gatewayPort}`,
  };
};
