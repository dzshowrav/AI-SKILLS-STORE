---
name: laravel-validation-patterns
description: Best practices for Laravel validation including Form Requests, custom rules, conditional validation, and input sanitization.
---

# Laravel Validation Patterns

## Form Request Classes

```php
class StoreOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Order::class);
    }

    public function rules(): array
    {
        return [
            'customer_id' => ['required', 'exists:customers,id'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'exists:products,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'notes' => ['nullable', 'string', 'max:500'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'notes' => strip_tags($this->notes),
            'email' => strtolower($this->email),
        ]);
    }
}
```

## Custom Rule Objects

```php
class StrongPassword implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! preg_match('/[A-Z]/', $value)) {
            $fail('The :attribute must contain at least one uppercase letter.');
        }
    }
}
```

## Conditional Validation

```php
public function rules(): array
{
    return [
        'type' => ['required', Rule::in(['individual', 'company'])],
        'company_name' => ['required_if:type,company', 'string', 'max:255'],
        'tax_id' => ['exclude_if:type,individual', 'required', 'string'],
        'billing_address' => [
            Rule::when($this->boolean('different_billing'), ['required', 'string']),
        ],
    ];
}
```

## Database Rules

```php
'email' => ['required', 'email', Rule::unique('users')->ignore($this->user())],
'slug' => ['required', Rule::unique('posts')->where('tenant_id', $this->user()->tenant_id)],
'category_id' => ['required', Rule::exists('categories', 'id')->where('active', true)],
```

## Working with Validated Data

```php
// In controller
$validated = $request->validated();

// Partial access
$orderData = $request->safe()->only(['customer_id', 'notes']);

// Merge additional data
Order::create($request->safe()->merge(['user_id' => auth()->id()])->all());
```
