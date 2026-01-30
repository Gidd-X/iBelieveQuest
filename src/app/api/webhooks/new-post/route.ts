import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
    // 1. Verify Secret to prevent unauthorized access
    const secret = req.headers.get('x-webhook-secret');
    if (secret !== process.env.SUPABASE_WEBHOOK_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const payload = await req.json();
        const newPost = payload.record; // Supabase sends the new record in 'record' field

        if (!newPost || !newPost.title) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }

        // 2. Fetch all subscribers
        const supabase = await createServerClient();
        const { data: subscribers, error: subError } = await supabase
            .from('subscribers')
            .select('email');

        // Type assertion or check to fix build error
        if (subError || !subscribers || subscribers.length === 0) {
            console.log('No subscribers found or error fetching them.');
            return NextResponse.json({ message: 'No subscribers to notify' });
        }

        const validSubscribers = subscribers as { email: string }[];

        // 3. Send Emails via Resend
        // Note: iterating and sending individually or using BCC.
        // For simplicity and avoiding exposing emails to each other, we will loop.
        // For production with many users, Batch API is better.

        const resend = new Resend(process.env.RESEND_API_KEY);

        // We'll send to ourselves as "To" and BCC everyone else to save API calls 
        // and protect privacy, OR send individually if list is small. 
        // Let's send individually for now to ensure personalization if needed later, 
        // but limit concurrency if list is huge (not handling huge list logic yet).

        const emailPromises = validSubscribers.map(async (sub) => {
            try {
                await resend.emails.send({
                    from: 'iBelieveQuest <contact@ibelievequest.com>',
                    to: sub.email,
                    subject: `New Post: ${newPost.title}`,
                    html: `
                  <h1>${newPost.title}</h1>
                  <img src="https://res.cloudinary.com/drcgnqg8m/image/upload/v1762079061/iBQ_vspudo.jpg" alt="iBelieveQuest" />
                  <p>A new post is live on iBelieve Quest. It explores a question many believers quietly wrestle with. </p>
                  <p>Check it out! Take your time. You might see the text differently. </p>
                  <p>Let's know your thoughts. </p>
                  <p>${newPost.excerpt || 'Read our latest article!'}</p>
                  <a href="https://ibelievequest.com/posts/${newPost.id}">Read more</a>
                `,
                });
            } catch (e) {
                console.error(`Failed to send to ${sub.email}`, e);
            }
        });

        await Promise.all(emailPromises);

        return NextResponse.json({ success: true, count: subscribers.length });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
