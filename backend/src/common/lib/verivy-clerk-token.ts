import { clerkClient } from '@clerk/clerk-sdk-node';

export async function verifyToken(token: string) {
    try {
        const session = await clerkClient.sessions.verifySession(token, 'CLERK-AUTH');
        const user = await clerkClient.users.getUser(session.userId);
        return {
            sub: user.id,
            email: user.emailAddresses[0].emailAddress,
        };
    } catch (e) {
        return null;
    }
}
