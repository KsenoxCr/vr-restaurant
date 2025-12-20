import { PrismaClient, Session, SessionRole } from '@prisma/client';

export function newExpiresAt(defaultLenMins: number) {
    const defaultSessionLength = defaultLenMins * 60 * 1000;
    return new Date(Date.now() + defaultSessionLength);
}

export async function prolongSession(db: PrismaClient, session: Session) {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const maxExpiryMilliseconds = session.role === SessionRole.CUSTOMER ? 4 * 60 * 60 * 1000 : 12 * 60 * 60 * 1000; // 4 hours for customers, 12 hours for staff

    const maxExpiryDate = new Date(session.createdAt.getTime() + maxExpiryMilliseconds);

    const SessionIncrementLength = 30 * 60 * 1000; // 30 minutes

    if (session.lastActivity < fiveMinutesAgo && session.expiresAt < maxExpiryDate) {
        const newExpiry = new Date(session.expiresAt.getTime() + SessionIncrementLength)

        await db.session.update({
            where: { id: session.id },
            data: {
                lastActivity: new Date(),
                expiresAt: newExpiry <= maxExpiryDate ? newExpiry : maxExpiryDate
            }
        });
    }
}
