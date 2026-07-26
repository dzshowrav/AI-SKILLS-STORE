# WebSocket Connection Pooling

---

## Overview

The binary contains `websocket_connection_pooling` as a feature key, indicating WebSocket connection reuse for LLM provider streaming.

### Pooling Benefits
- Reduced connection setup latency
- Better stream multiplexing
- Lower memory overhead per connection
- Automatic reconnection

---

## Implementation

```go
type WSConnectionPool struct {
    pool     map[string][]*websocket.Conn  // Host → connections
    maxSize  int
    ttl      time.Duration
}

func (p *WSConnectionPool) Acquire(host string) (*websocket.Conn, error)
func (p *WSConnectionPool) Release(conn *websocket.Conn)
func (p *WSConnectionPool) CloseAll()
```
