# Webperf

Quick easy website analysis.

- [x] Enter a url and get back a performance report.
- [ ] Single route to run mobile + desktop
- [ ] Set a url to run on schedule
- [x] API route to create schedule


## Development

```
pnpm install
pnpm run dev
```

## Dockerfile

Build dockerfile using:

`docker build .`

Mac users make sure to include --platform linux/amd64

`docker build --platform linux/amd64 .`