export const onRequestGet = async () => Response.json({ status: "ok", service: "mirrorasia-mvp", version: "0.1.0", runtime: "cloudflare-pages" }, {headers:{"Cache-Control":"no-store"}});
