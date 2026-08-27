/**
 * Fake `fetch` para los tests: ninguna prueba toca la red ni la base de datos.
 * Se declara la respuesta por URL; una URL no declarada es un fallo del test,
 * no un silencio.
 */

export interface FakeResponseSpec {
  status?: number;
  body: unknown;
}

export interface FakeCall {
  url: string;
  method: string;
}

export function fakeFetch(
  routes: (url: string, init?: RequestInit) => FakeResponseSpec | undefined,
): { fetchImpl: typeof fetch; calls: FakeCall[] } {
  const calls: FakeCall[] = [];

  const fetchImpl = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input.toString();
    calls.push({ url, method: (init?.method ?? 'GET').toUpperCase() });

    const spec = routes(url, init);
    if (!spec) throw new Error(`fakeFetch: URL no declarada en el test → ${url}`);

    return {
      ok: (spec.status ?? 200) < 400,
      status: spec.status ?? 200,
      json: async () => spec.body,
    } as unknown as Response;
  }) as unknown as typeof fetch;

  return { fetchImpl, calls };
}

export function gmailTokenResponse(): FakeResponseSpec {
  return { body: { access_token: 'access-token-de-prueba', expires_in: 3600 } };
}

export function setOAuthEnv(): void {
  process.env.GOOGLE_OAUTH_CLIENT_ID = 'client-id-de-prueba';
  process.env.GOOGLE_OAUTH_CLIENT_SECRET = 'client-secret-de-prueba';
}
