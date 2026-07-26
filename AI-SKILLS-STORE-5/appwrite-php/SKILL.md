---
name: appwrite-php
description: Appwrite PHP SDK skill. Use when building server-side PHP applications with Appwrite, including Laravel and Symfony integrations. Covers user management, database/table CRUD, file storage, and functions via API keys.
---

# Appwrite PHP SDK

## Installation

```bash
composer require appwrite/appwrite
```

## Setting Up the Client

```php
use Appwrite\Client;
use Appwrite\ID;
use Appwrite\Query;
use Appwrite\Services\Users;
use Appwrite\Services\TablesDB;
use Appwrite\Services\Storage;
use Appwrite\Services\Functions;
use Appwrite\InputFile;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.appwrite.io/v1')
    ->setProject(getenv('APPWRITE_PROJECT_ID'))
    ->setKey(getenv('APPWRITE_API_KEY'));
```

## Code Examples

### User Management

```php
$users = new Users($client);

// Create user
$user = $users->create(ID::unique(), 'user@example.com', null, 'password123', 'User Name');

// List users
$list = $users->list([Query::limit(25)]);

// Get user
$fetched = $users->get('[USER_ID]');

// Delete user
$users->delete('[USER_ID]');
```

### Database Operations

```php
$tablesDB = new TablesDB($client);

// Create database
$db = $tablesDB->create(ID::unique(), 'My Database');

// Create row
$doc = $tablesDB->createRow('[DATABASE_ID]', '[TABLE_ID]', ID::unique(), [
    'title' => 'Hello World'
]);

// Query rows
$results = $tablesDB->listRows('[DATABASE_ID]', '[TABLE_ID]', [
    Query::equal('title', ['Hello World']),
    Query::limit(10)
]);

// Get row
$row = $tablesDB->getRow('[DATABASE_ID]', '[TABLE_ID]', '[ROW_ID]');

// Update row
$tablesDB->updateRow('[DATABASE_ID]', '[TABLE_ID]', '[ROW_ID]', [
    'title' => 'Updated'
]);

// Delete row
$tablesDB->deleteRow('[DATABASE_ID]', '[TABLE_ID]', '[ROW_ID]');
```

### Query Methods

```php
Query::equal('field', ['value'])
Query::notEqual('field', ['value'])
Query::lessThan('field', 100)
Query::lessThanEqual('field', 100)
Query::greaterThan('field', 100)
Query::greaterThanEqual('field', 100)
Query::between('field', 1, 100)
Query::isNull('field')
Query::isNotNull('field')
Query::startsWith('field', 'prefix')
Query::endsWith('field', 'suffix')
Query::contains('field', ['sub'])
Query::search('field', 'keywords')

Query::orderAsc('field')
Query::orderDesc('field')

Query::limit(25)
Query::offset(0)
Query::cursorAfter('[ROW_ID]')
Query::cursorBefore('[ROW_ID]')

Query::select(['field1', 'field2'])
Query::or([Query::equal('a', [1]), Query::equal('b', [2])])
Query::and([Query::greaterThan('age', 18), Query::lessThan('age', 65)])
```

### File Storage

```php
$storage = new Storage($client);

// Upload file
$file = $storage->createFile('[BUCKET_ID]', ID::unique(), InputFile::withPath('/path/to/file.png'));

// List files
$files = $storage->listFiles('[BUCKET_ID]');

// Get file
$file = $storage->getFile('[BUCKET_ID]', '[FILE_ID]');

// Delete file
$storage->deleteFile('[BUCKET_ID]', '[FILE_ID]');

// Get file preview
$preview = $storage->getFilePreview('[BUCKET_ID]', '[FILE_ID]');
```

### Cloud Functions

```php
$functions = new Functions($client);

// List functions
$functionsList = $functions->list();

// Create execution
$execution = $functions->createExecution('[FUNCTION_ID]', json_encode(['key' => 'value']));

// Get execution status
$executionStatus = $functions->getExecution('[FUNCTION_ID]', '[EXECUTION_ID]');
```
