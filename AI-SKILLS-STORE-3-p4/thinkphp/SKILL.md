---
name: thinkphp
description: ThinkPHP backend development standards. Use when developing ThinkPHP projects, implementing REST APIs, model data access, or JWT authentication.
---

# ThinkPHP Backend Development Standards

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Runtime | PHP 8.1+ | Fibers, enums, readonly properties |
| Framework | ThinkPHP 8.x | MVC architecture, ORM built-in |
| Database | MySQL 8.x | InnoDB engine |
| Cache | Redis 7.x | Distributed cache |
| Auth | firebase/php-jwt | JWT sign/verify |
| API Docs | Swagger UI | Static docs |

## Directory Structure

```
app/
├── BaseController.php
├── ExceptionHandle.php
├── auth/                         # Auth module
│   ├── controller/
│   └── service/
├── system/                       # System management
│   ├── controller/
│   ├── model/
│   ├── service/
│   ├── validate/
│   └── enums/
├── common/                       # Shared components
│   ├── constants/
│   ├── enums/
│   ├── exception/
│   ├── middleware/
│   ├── model/BaseModel.php
│   ├── traits/
│   ├── util/
│   └── web/
extend/                           # Extension libraries
config/   route/   public/   sql/
```

## RESTful API

| Operation | Method | Path |
|-----------|--------|------|
| Paginated list | GET | `/api/v1/users/page` |
| Detail | GET | `/api/v1/users/:id` |
| Create | POST | `/api/v1/users` |
| Update | PUT | `/api/v1/users` |
| Delete | DELETE | `/api/v1/users/:id` |
| Batch delete | DELETE | `/api/v1/users/batch` |

## Controller Template

```php
declare(strict_types=1);
namespace app\system\controller;

use app\BaseController;
use app\system\model\User;

final class UserController extends BaseController
{
    public function page()
    {
        $params = $this->request->get();
        $result = User::where(function ($q) use ($params) {
            if (!empty($params['keywords']))
                $q->whereLike('username|nickname', $params['keywords']);
        })->paginate([...]);
        return $this->successPaginate($result->items(), $result->total());
    }
}
```
