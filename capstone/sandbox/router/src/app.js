import express from "express"
import { createProxyMiddleware } from "http-proxy-middleware"
import morgan from "morgan"

const app = express();
app.use(morgan("combined")); // Log incoming requests

app.get("/api/status/healthz", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.get("/api/status/readyz", (req, res) => {
    res.status(200).json({ status: "ready" });
});

const proxies = {}; // Cache for proxy middleware instances

function getproxy(sandboxId) {

    const target = `http://sandbox-service-${sandboxId}`; // Construct target URL based on sandbox ID

    if (!proxies[sandboxId]) {
        proxies[sandboxId] = createProxyMiddleware({
            target,
            changeOrigin: true,
            ws: true, // Enable WebSocket proxying
        })
    }

    return proxies[sandboxId];
}

app.use((req, res, next) => {

    const host = req.headers.host;
    const sandboxId = host.split(".")[0]; // Extract sandbox ID from subdomain

    return getproxy(sandboxId)(req, res, next);

})

export default app