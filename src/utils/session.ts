import { PrismaClient, Session } from '@prisma/client';

export async function prolongSession(
    db: PrismaClient,
    session: Session
) {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const maxExpiryDate = new Date(session.createdAt.getTime() + 4 * 60 * 60 * 1000); // 4 hour
    const defaultSessionLength = 30 * 60 * 1000; // 30 minutes

    if (session.lastActivity < fiveMinutesAgo && session.expiresAt < maxExpiryDate) {
        const newExpiry = new Date(session.expiresAt.getTime() + defaultSessionLength)

        await db.session.update({
            where: { id: session.id },
            data: {
                lastActivity: new Date(),
                expiresAt: newExpiry <= maxExpiryDate ? newExpiry : maxExpiryDate
            }
        });
    }
}
