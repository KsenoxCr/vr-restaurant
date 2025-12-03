import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.category.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.session.deleteMany();
  await prisma.order.deleteMany();
  await prisma.orderItem.deleteMany();

  const categories = await prisma.category.createMany({
    data: [
      { name: 'dish', displayOrder: 0 },
      { name: 'breakfast', displayOrder: 1 },
      { name: 'bread', displayOrder: 2 },
      { name: 'hot', displayOrder: 3 },
      { name: 'cold', displayOrder: 4 },
      { name: 'alcohol', displayOrder: 5 },
    ],
  });

  const items = await prisma.menuItem.createMany({
    data: [
      {
        name: 'Gourmet Sandwich',
        categoryId: 1,
        price: '8.99',
        description: 'Freshly made sandwich with premium ingredients, crisp vegetables, and artisan bread. Perfect for a satisfying meal on your journey.',
        imageUrl: 'https://images.unsplash.com/photo-1721980743593-9ff30ba867b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2R8ZW58MXx8fHwxNzY0NjI4OTUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        name: 'Pasta Primavera',
        categoryId: 1,
        price: '12.50',
        description: 'Classic Italian pasta with fresh seasonal vegetables in a light garlic and olive oil sauce. Served warm and ready to enjoy.',
        imageUrl: 'https://images.unsplash.com/photo-1681157365392-937d3c1cc1af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMG1lYWx8ZW58MXx8fHwxNzY0NjYwNTY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        name: 'Fresh Garden Salad',
        categoryId: 1,
        price: '7.99',
        description: 'Crisp mixed greens, cherry tomatoes, cucumber, and carrots with your choice of dressing. A healthy and refreshing option.',
        imageUrl: 'https://images.unsplash.com/photo-1677653805080-59c57727c84e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGZyZXNofGVufDF8fHx8MTc2NDY1NTM4NXww&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        name: 'Hearty Soup',
        categoryId: 1,
        price: '6.50',
        description: 'Warm and comforting soup made fresh daily. Perfect for a cozy meal during your train journey.',
        imageUrl: 'https://images.unsplash.com/photo-1701109876066-7fc0c08da447?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VwJTIwYm93bHxlbnwxfHx8fDE3NjQ1NzEzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        name: 'Croissant',
        categoryId: 2,
        price: '4.50',
        description: 'Buttery, flaky croissant baked fresh daily. A perfect light breakfast or snack.',
        imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnR8ZW58MXx8fHwxNzY0NjY2NzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        name: 'Artisan Bread Roll',
        categoryId: 3,
        price: '3.50',
        description: 'Fresh baked artisan bread roll, perfect as a side or for making your own sandwich.',
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVhZCUyMHJvbGx8ZW58MXx8fHwxNzY0NjY2NzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        name: 'Premium Coffee',
        categoryId: 4,
        price: '3.99',
        description: 'Freshly brewed premium coffee made from carefully selected beans. Available hot or iced.',
        imageUrl: 'https://images.unsplash.com/photo-1533776992670-a72f4c28235e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXB8ZW58MXx8fHwxNzY0NjExODkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        name: 'Herbal Tea',
        categoryId: 4,
        price: '2.99',
        description: 'Soothing herbal tea blend. Choose from chamomile, peppermint, or green tea varieties.',
        imageUrl: 'https://images.unsplash.com/photo-1719464636416-97cbe2f8a172?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBob3R8ZW58MXx8fHwxNzY0NjY2NzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        name: 'Fresh Orange Juice',
        categoryId: 5,
        price: '4.50',
        description: 'Freshly squeezed orange juice, packed with vitamin C. A refreshing and healthy choice.',
        imageUrl: 'https://images.unsplash.com/photo-1697479815895-23ea2934711a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdWljZSUyMG9yYW5nZXxlbnwxfHx8fDE3NjQ2NjY3Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        name: 'Mineral Water',
        categoryId: 5,
        price: '2.50',
        description: 'Premium mineral water, naturally sourced and refreshing. Available still or sparkling.',
        imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHdhdGVyJTIwYm90dGxlfGVufDF8fHx8fDE3NjQ2MjI2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        name: 'Craft Beer',
        categoryId: 6,
        price: '5.99',
        description: 'Premium craft beer selection. Choose from lager, IPA, or wheat beer varieties.',
        imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwZ2xhc3N8ZW58MXx8fHwxNzY0NjY2NzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        name: 'Red Wine',
        categoryId: 6,
        price: '7.50',
        description: 'Premium red wine by the glass. A perfect complement to your meal.',
        imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHdpbmUlMjBnbGFzc3xlbnwxfHx8fDE3NjQ2NjY3Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      },
    ],
  });

  console.log("Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
