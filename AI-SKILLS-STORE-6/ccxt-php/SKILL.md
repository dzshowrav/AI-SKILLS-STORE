---
name: ccxt-php
description: CCXT cryptocurrency exchange library for PHP developers. Covers REST API and WebSocket API for crypto exchange integration.
---

# CCXT for PHP

## Installation

```bash
composer require ccxt/ccxt
```

Required PHP extensions: cURL, mbstring, PCRE, iconv, gmp.

## Quick Start

### REST API - Synchronous
```php
$exchange = new \ccxt\binance();
$exchange->load_markets();
$ticker = $exchange->fetch_ticker('BTC/USDT');
print_r($ticker);
```

### REST API - Asynchronous (ReactPHP)
```php
use function React\Async\await;
$exchange = new \ccxt\async\binance();
$ticker = await($exchange->fetch_ticker('BTC/USDT'));
```

### WebSocket API
```php
$exchange = new \ccxt\pro\binance();
while (true) {
    $ticker = await($exchange->watch_ticker('BTC/USDT'));
    print_r($ticker);
}
await($exchange->close());
```

## Common Operations

### Creating Exchange Instance
```php
$exchange = new \ccxt\binance([
    'apiKey' => 'YOUR_API_KEY',
    'secret' => 'YOUR_SECRET',
    'enableRateLimit' => true
]);
```

### Fetching Data
```php
$ticker = $exchange->fetch_ticker('BTC/USDT');
$orderbook = $exchange->fetch_order_book('BTC/USDT', 5);
$orders = $exchange->fetch_orders('BTC/USDT');
```

### Placing Orders
```php
$order = $exchange->create_limit_buy_order('BTC/USDT', 0.01, 50000);
$order = $exchange->create_market_sell_order('BTC/USDT', 0.01);
```
