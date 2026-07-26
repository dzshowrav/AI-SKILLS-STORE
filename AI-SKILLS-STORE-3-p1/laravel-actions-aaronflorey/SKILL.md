---
name: laravel-actions
description: Write, scaffold, explain, and refactor code using the `lorisleiva/laravel-actions` package.
version: 1.0.0
license: MIT
---

# Laravel Actions

`lorisleiva/laravel-actions` lets you write a single PHP class that handles one specific task and run it as an object, controller, job, listener, or command.

Install: `composer require lorisleiva/laravel-actions`
Create: `php artisan make:action MyAction`

## Core Structure

```php
use Lorisleiva\Actions\Concerns\AsAction;

class PublishNewArticle
{
    use AsAction;

    public function handle(User $author, string $title, string $body): Article
    {
        return $author->articles()->create(compact('title', 'body'));
    }
}
```

## As an Object
```php
PublishNewArticle::run($author, 'Title', 'Body');
```

## As a Controller
```php
Route::post('/articles', PublishNewArticle::class)->middleware('auth');

public function asController(Request $request): ArticleResource
{
    $article = $this->handle($request->user(), $request->input('title'), $request->input('body'));
    return new ArticleResource($article);
}
```

## As a Job
```php
PublishNewArticle::dispatch($author, 'Title', 'Body');
```

## Validation & Authorization
```php
public function authorize(ActionRequest $request): bool
{
    return $request->user()->can('create', Article::class);
}

public function rules(): array
{
    return [
        'title' => ['required', 'string', 'max:255'],
        'body'  => ['required', 'string'],
    ];
}
```
