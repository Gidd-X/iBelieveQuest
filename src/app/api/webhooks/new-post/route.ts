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

        // 3. Send Emails via Resend Batch API
        // Resend limits to 5 requests per second, but allows up to 100 emails per batch request.
        const resend = new Resend(process.env.RESEND_API_KEY);
        const BATCH_SIZE = 100;
        let successfulBatches = 0;

        for (let i = 0; i < validSubscribers.length; i += BATCH_SIZE) {
            const chunk = validSubscribers.slice(i, i + BATCH_SIZE);
            const emailsToSend = chunk.map(sub => ({
                from: 'iBelieve Quest <contact@ibelievequest.com>',
                to: sub.email,
                subject: `New Post: ${newPost.title}`,
                html: `
                  <h2>Hi there,</h2>
                  <p>A new post, <strong>"${newPost.title}"</strong>, is live on iBelieve Quest.</p>
                  <p>${newPost.excerpt || 'It explores a question many believers quietly wrestle with. Take your time, you might see the text differently.'}</p>
                  <p>You can read the full post here: <br>
                  <a href="https://ibelievequest.com/posts/${newPost.id}">https://ibelievequest.com/posts/${newPost.id}</a></p>
                  <br>
                  <p>Let's know your thoughts.</p>
                  <p>Warmly,</p>
                  <p>Archie<br>iBelieve Quest</p>
                `
            }));

            try {
                const response = await resend.batch.send(emailsToSend);
                
                if (response.error) {
                    console.error(`Resend batch error for chunk ${i / BATCH_SIZE + 1}:`, response.error);
                } else {
                    console.log(`Successfully sent batch ${i / BATCH_SIZE + 1} with ${chunk.length} emails`);
                    successfulBatches++;
                }
            } catch (e) {
                console.error(`Unexpected error sending batch ${i / BATCH_SIZE + 1}`, e);
            }
        }

        console.log(`Finished sending notifications via batches.`);
        return NextResponse.json({ success: true, count: subscribers.length });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
