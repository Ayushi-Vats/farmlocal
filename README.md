# FarmLokal Backend

## Setup Instructions
1. Install dependencies: `npm install`.
2. Start MySQL and Redis: `docker-compose up -d`.
3. Seed data: `npm run seed` (creates ~1M products).
4. Run: `npm run dev` (dev) or `npm run build && npm start` (prod).
5. Load test: `k6 run scripts/k6-load-test.js`.

## Architecture Overview
- Express.js with TypeScript.
- MySQL for data, Redis for caching/rate limiting.
- OAuth2 with caching, external API integration with retries/circuit breaker.
- Product API with cursor pagination, caching, and performance optimizations.

## Caching Strategy
- Redis caches OAuth tokens (TTL 1h), product queries (TTL 5min).
- Invalidation: Manual on updates; time-based otherwise.

## Performance Optimizations
- Cursor pagination, DB indexes, connection pooling.
- P95 <200ms via caching and optimization.

## Trade-offs
- Simple LIKE search instead of full-text; no real-time invalidation for lightness.

##Deployed link
- https://farmlocal-op6s.onrender.com
