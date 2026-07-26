---
name: php-symfony
version: "2.0.0"
description: Symfony framework mastery - Doctrine, DI container, Messenger, and enterprise architecture
category: framework
---

# Symfony Framework Skill

Comprehensive skill for building robust Symfony applications. Covers Symfony 6.4 LTS and 7.x.

## Learning Modules

### Module 1: Doctrine ORM
- Entity creation with attributes
- Basic relationships
- Repository basics
- DQL and QueryBuilder
- Lifecycle events
- Inheritance mapping
- Second-level cache

### Module 2: Dependency Injection
- Service basics, autowiring, constructor injection
- Service tags, factory services, decorators
- Compiler passes, lazy services

### Module 3: Messenger Component
- Messages and handlers
- Sync vs async transports
- Retry strategies
- Custom transports

## Code Examples

### Doctrine Entity
```php
#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private string $name;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    private Category $category;

    #[ORM\Column]
    private \DateTimeImmutable $createdAt;
}
```

### Service with DI
```php
final readonly class ProductService
{
    public function __construct(
        private ProductRepository $repository,
        private EntityManagerInterface $entityManager,
        private LoggerInterface $logger,
        #[Autowire('%app.tax_rate%')]
        private float $taxRate,
    ) {}
}
```

### Messenger Handler
```php
#[AsMessageHandler]
final readonly class SendOrderConfirmationHandler
{
    public function __construct(private EmailService $emailService) {}

    public function __invoke(SendOrderConfirmation $message): void
    {
        $this->emailService->sendOrderConfirmation($message->orderId);
    }
}
```
