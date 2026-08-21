# Tripolaris Barcelona Runbook

## Local Preview

```bash
cd /home/gnu/tripolarisbarcelona
python3 -m http.server 4177
```

Open:

```text
http://127.0.0.1:4177/
```

## Source Refresh

The first pass was scraped from:

```bash
curl -L --fail --show-error --silent https://tripolarisbarcelona.com/ -o .scrape/index.html
```

Public assets were copied from:

```text
https://tripolarisbarcelona.com/images/tripolaris-logo.png
https://tripolarisbarcelona.com/images/tripolaris-triangle.png
https://tripolarisbarcelona.com/favicon.svg
```

Keep `.scrape/` out of git.

## Verification

```bash
python3 -m http.server 4177
curl -I http://127.0.0.1:4177/
```
