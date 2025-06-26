PS C:\dev\Front\eValidation-front> .\caddy.exe reverse-proxy --from :80 --to :3000
2025/06/26 10:36:39.314 WARN    admin   admin endpoint disabled
2025/06/26 10:36:39.315 WARN    http    automatic HTTPS is completely disabled for server       {"server_name": "proxy"}
2025/06/26 10:36:39.315 INFO    tls.cache.maintenance   started background certificate maintenance      {"cache": "0xc0001759d0"}
2025/06/26 10:36:39.315 INFO    tls     cleaning storage unit   {"description": "FileStorage:C:\\Users\\B609EN\\AppData\\Roaming\\Caddy"}
2025/06/26 10:36:39.318 INFO    http.log        server running  {"name": "proxy", "protocols": ["h1", "h2", "h3"]}
Caddy proxying http:// -> :3000
2025/06/26 10:36:39.318 INFO    tls     finished cleaning storage units


2025/06/26 10:37:47.092 ERROR   http.log.error  dial tcp :3000: connectex: No connection could be made because the target machine actively refused it. {"request": {"remote_ip": "127.0.0.1", "remote_port": "62108", "proto": "HTTP/1.1", "method": "GET", "host": "localhost", "uri": "/mockServiceWorker.js", "headers": {"Connection": ["keep-alive"], "Accept": ["*/*"], "Sec-Fetch-Site": ["same-origin"], "User-Agent": ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0"], "Accept-Language": ["fr,fr-FR;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6"], "Service-Worker": ["script"], "Sec-Fetch-Mode": ["same-origin"], "Referer": ["http://localhost/mockServiceWorker.js"], "Cache-Control": ["max-age=0"], "Dnt": ["1"], "Sec-Fetch-Dest": ["serviceworker"], "Accept-Encoding": ["gzip, deflate, br, zstd"]}}, "duration": 2.0235836, "status": 502, "err_id": "t27j4s87x", "err_trace": "reverseproxy.statusError (reverseproxy.go:1299)"}
