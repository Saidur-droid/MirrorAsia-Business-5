/** Preserve the existing Worker. Only the public landing and versioned artwork are new. */
export function createHomepageWrapper(legacy, assets) {
  const prefix = `/assets/mirrorasia/${assets.release}/`;
  const security = {
    'x-content-type-options': 'nosniff', 'referrer-policy': 'strict-origin-when-cross-origin',
    'x-frame-options': 'DENY', 'permissions-policy': 'camera=(), microphone=(), geolocation=()',
    'x-mirrorasia-release': assets.release
  };
  const send = (request, body, type, immutable=false, html=false) => {
    const headers = {...security, 'content-type':type,
      'cache-control':immutable ? 'public, max-age=31536000, immutable' : 'no-cache, must-revalidate'};
    if (html) headers['content-security-policy'] = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'";
    return new Response(request.method === 'HEAD' ? null : body, {headers});
  };
  return {
    async fetch(request, env, ctx) {
      const url=new URL(request.url), readable=request.method==='GET'||request.method==='HEAD';
      if (readable && (url.pathname==='/'||url.pathname==='/index.html')) return send(request,assets.html,'text/html; charset=utf-8',false,true);
      if (readable && url.pathname===prefix+'landing.css') return send(request,assets.css,'text/css; charset=utf-8',true);
      if (readable && url.pathname===prefix+'landing.js') return send(request,assets.js,'text/javascript; charset=utf-8',true);
      if (readable && url.pathname===prefix+'city-atlas.webp') return send(request,assets.art,'image/webp',true);
      if (readable && (url.pathname==='/studio'||url.pathname==='/studio/')) {
        url.pathname='/'; return legacy.fetch.call(legacy,new Request(url,request),env,ctx);
      }
      return legacy.fetch.call(legacy,request,env,ctx);
    }
  };
}