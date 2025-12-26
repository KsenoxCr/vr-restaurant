import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.session.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();

  const dishCategory = await prisma.category.create({
    data: { name: 'dish', type: 'food', displayOrder: 0 },
  });
  const breakfastCategory = await prisma.category.create({
    data: { name: 'breakfast', type: 'food', displayOrder: 1 },
  });
  const breadCategory = await prisma.category.create({
    data: { name: 'bread', type: 'food', displayOrder: 2 },
  });
  const hotCategory = await prisma.category.create({
    data: { name: 'hot', type: 'beverage', displayOrder: 3 },
  });
  const coldCategory = await prisma.category.create({
    data: { name: 'cold', type: 'beverage', displayOrder: 4 },
  });
  const alcoholCategory = await prisma.category.create({
    data: { name: 'alcohol', type: 'beverage', displayOrder: 5 },
  });

  const items = await prisma.menuItem.createMany({
    data: [
      {
        name: 'Gourmet Sandwich',
        categoryId: dishCategory.id,
        priceCents: 899,
        description: 'Freshly made sandwich with premium ingredients, crisp vegetables, and artisan bread. Perfect for a satisfying meal on your journey.',
        imageUrl: 'https://images.unsplash.com/photo-1721980743593-9ff30ba867b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2R8ZW58MXx8fHwxNzY0NjI4OTUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        allergens: ['GLUTEN', 'WHEAT', 'EGGS', 'DAIRY'],
      },
      {
        name: 'Pasta Primavera',
        categoryId: dishCategory.id,
        priceCents: 1250,
        description: 'Classic Italian pasta with fresh seasonal vegetables in a light garlic and olive oil sauce. Served warm and ready to enjoy.',
        imageUrl: 'https://images.unsplash.com/photo-1681157365392-937d3c1cc1af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMG1lYWx8ZW58MXx8fHwxNzY0NjYwNTY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        allergens: ['GLUTEN', 'WHEAT'],
      },
      {
        name: 'Fresh Garden Salad',
        categoryId: dishCategory.id,
        priceCents: 799,
        description: 'Crisp mixed greens, cherry tomatoes, cucumber, and carrots with your choice of dressing. A healthy and refreshing option.',
        imageUrl: 'https://images.unsplash.com/photo-1677653805080-59c57727c84e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGZyZXNofGVufDF8fHx8MTc2NDY1NTM4NXww&ixlib=rb-4.1.0&q=80&w=1080',
        allergens: ['EGGS', 'SOY'],
      },
      {
        name: 'Hearty Soup',
        categoryId: dishCategory.id,
        priceCents: 650,
        description: 'Warm and comforting soup made fresh daily. Perfect for a cozy meal during your train journey.',
        imageUrl: 'https://images.unsplash.com/photo-1701109876066-7fc0c08da447?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VwJTIwYm93bHxlbnwxfHx8fDE3NjQ1NzEzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        allergens: ['GLUTEN', 'DAIRY'],
      },
      {
        name: 'Croissant',
        categoryId: breakfastCategory.id,
        priceCents: 450,
        description: 'Buttery, flaky croissant baked fresh daily. A perfect light breakfast or snack.',
        imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnR8ZW58MXx8fHwxNzY0NjY2NzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        allergens: ['GLUTEN', 'WHEAT', 'DAIRY', 'EGGS'],
      },
      {
        name: 'Artisan Bread Roll',
        categoryId: breadCategory.id,
        priceCents: 350,
        description: 'Fresh baked artisan bread roll, perfect as a side or for making your own sandwich.',
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVhZCUyMHJvbGx8ZW58MXx8fHwxNzY0NjY2NzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        allergens: ['GLUTEN', 'WHEAT'],
      },
      {
        name: 'Premium Coffee',
        categoryId: hotCategory.id,
        priceCents: 399,
        description: 'Freshly brewed premium coffee made from carefully selected beans. Available hot or iced.',
        imageUrl: 'https://images.unsplash.com/photo-1533776992670-a72f4c28235e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXB8ZW58MXx8fHwxNzY0NjExODkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        allergens: [],
      },
      {
        name: 'Herbal Tea',
        categoryId: hotCategory.id,
        priceCents: 299,
        description: 'Soothing herbal tea blend. Choose from chamomile, peppermint, or green tea varieties.',
        imageUrl: 'https://images.unsplash.com/photo-1719464636416-97cbe2f8a172?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBob3R8ZW58MXx8fHwxNzY0NjY2NzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        allergens: [],
      },
      {
        name: 'Fresh Orange Juice',
        categoryId: coldCategory.id,
        priceCents: 450,
        description: 'Freshly squeezed orange juice, packed with vitamin C. A refreshing and healthy choice.',
        imageUrl: 'https://images.unsplash.com/photo-1697479815895-23ea2934711a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdWljZSUyMG9yYW5nZXxlbnwxfHx8fDE3NjQ2NjY3Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        allergens: [],
      },
      {
        name: 'Mineral Water',
        categoryId: coldCategory.id,
        priceCents: 250,
        description: 'Premium mineral water, naturally sourced and refreshing. Available still or sparkling.',
        imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHdhdGVyJTIwYm90dGxlfGVufDF8fHx8fDE3NjQ2MjI2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        allergens: [],
      },
      {
        name: 'Craft Beer',
        categoryId: alcoholCategory.id,
        priceCents: 599,
        description: 'Premium craft beer selection. Choose from lager, IPA, or wheat beer varieties.',
        imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwZ2xhc3N8ZW58MXx8fHwxNzY0NjY2NzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        allergens: ['GLUTEN', 'WHEAT'],
      },
      {
        name: 'Red Wine',
        categoryId: alcoholCategory.id,
        priceCents: 750,
        description: 'Premium red wine by the glass. A perfect complement to your meal.',
        imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHdpbmUlMjBnbGFzc3xlbnwxfHx8fDE3NjQ2NjY3Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        allergens: [],
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
