# Prompt Caching & RAG Reference

---

## Prompt Caching

The system supports prompt caching for supported LLM providers to reduce costs and latency.

### Cache Metrics

```go
type CacheMetrics struct {
    CacheCreationInputTokens int64   // Tokens used to create cache entry
    CacheReadInputTokens     int64   // Tokens saved via cache read
    CachedTokens             int64   // Total cached token count
}
```

### Cache Types

- `cache_creation_input_tokens` — Initial cache write cost
- `cache_read_input_tokens` — Savings on cache hit
- `cached_tokens` — Current cache size
- `completion_tokens_details` — Detailed breakdown including cached/reasoning/audio tokens

---

## RAG (Retrieval Augmented Generation)

### RAG Sources

- `rag_file_source` — Local file used as a RAG source
- `retrieval_source` — Source identifier for retrieval
- `retrieval_strategy` — Strategy: `"simple"`, `"hybrid"`, `"semantic"`

### Vector Database

```go
type VectorDBConfig struct {
    Backend    string   // "chroma", "pinecone", "sqlite-vec", etc.
    Threshold  float64  // Similarity threshold for retrieval
    IndexPath  string   // Path to index storage
}

const vector_db          = "vector_db"           // Config key
const vector_db_threshold = "vector_db_threshold" // Similarity threshold (0.0-1.0)
```

### Codebase Search

```go
const codebase_search = "codebase_search"
```
Semantic codebase search using embeddings and vector DB.

---

## Token Counting

### Complete Token Metrics

```go
type TokenUsage struct {
    InputTokens           int64
    OutputTokens          int64
    TotalTokens           int64
    CacheCreationTokens   int64  // Prompt caching
    CacheReadTokens       int64  // Cache hits
    ReasoningTokens       int64  // Chain-of-thought
    AudioTokens           int64  // Audio processing
    CachedTokens          int64  // Total cached
}
```
