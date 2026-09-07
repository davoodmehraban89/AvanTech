/** Read bounded JSON without trusting Content-Length. */
export async function readJsonBody(request: Request, limit = 16_384): Promise<unknown> {
  if (!Number.isInteger(limit) || limit < 1) throw new Error('INVALID_LIMIT');
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') throw new Error('UNSUPPORTED_MEDIA_TYPE');
  if (!request.body) throw new Error('EMPTY_BODY');
  const reader = request.body.getReader();
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let size = 0, body = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) { await reader.cancel(); throw new Error('BODY_TOO_LARGE'); }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
    return JSON.parse(body);
  } finally { reader.releaseLock(); }
}
