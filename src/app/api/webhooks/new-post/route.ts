import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createBuildTimeClient } from '@/lib/supabase/build-time';

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
        const supabase = createBuildTimeClient();
        const { data: subscribers, error: subError } = await supabase
            .from('subscribers')
            .select('email');

        if (subError) {
            console.error('Error fetching subscribers:', subError);
            return NextResponse.json({ error: 'Error fetching subscribers' }, { status: 500 });
        }

        if (!subscribers || subscribers.length === 0) {
            console.log('No subscribers found.');
            return NextResponse.json({ message: 'No subscribers to notify' });
        }

        console.log(`Found ${subscribers.length} subscribers. Starting notification process...`);

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
                const response = await resend.emails.send({
                    from: 'iBelieveQuest <contact@ibelievequest.com>',
                    to: sub.email,
                    subject: `New Post: ${newPost.title}`,
                    html: `
                  <h1>${newPost.title}</h1>
                  <p>A new post is live on iBelieve Quest. It explores a question many believers quietly wrestle with. </p>
                  <p>Check it out! Take your time. You might see the text differently. </p>
                  <p>Let's know your thoughts. </p>
                  <p>${newPost.excerpt || 'Read our latest article!'}</p>
                  <a href="https://ibelievequest.com/posts/${newPost.id}">Read more</a>
                `,
                });

                if (response.error) {
                    console.error(`Resend error for ${sub.email}:`, response.error);
                } else {
                    console.log(`Notification sent to ${sub.email}`);
                }
            } catch (e) {
                console.error(`Unexpected error sending to ${sub.email}`, e);
            }
        });

        await Promise.all(emailPromises);

        console.log(`Finished sending notifications to ${subscribers.length} potential subscribers.`);
        return NextResponse.json({ success: true, count: subscribers.length });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
