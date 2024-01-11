import { db } from '@/db';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import type Stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('Stripe-Signature') ?? '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || '',
    );
    console.log('In webhooks/stripe/route.ts & currently in try statement');
  } catch (err) {
    console.log('In webhooks/stripe/route.ts & currently in catch: ' + err);
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`,
      { status: 400 },
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session?.metadata?.userId) {
    console.log('currently error 200 error');
    return new Response(null, {
      status: 200,
    });
  }

  if (event.type === 'checkout.session.completed') {
    console.log('chekcout complete');
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    await db.user.update({
      where: {
        id: session.metadata.userId,
      },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      },
    });
    console.log('finisehd uploading data');
  }

  if (event.type === 'invoice.payment_succeeded') {
    console.log('invoice payment succeeded');
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );
    console.log('retrieved subscription');

    await db.user.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      },
    });
    console.log('updated db')
  }

  return new Response(null, { status: 200 });
}

// import { db } from '@/db';
// import { stripe } from '@/lib/stripe';
// import { headers } from 'next/headers';
// import type Stripe from 'stripe';

// export async function POST(request: Request) {
//   const body = await request.text();
//   const signature = headers().get('Stripe-Signature') ?? '';

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET || '',
//     );
//     console.log("In webhooks/stripe/route.ts & currently in try statement")
//   } catch (err) {
//     console.log("In webhooks/stripe/route.ts & currently in catch: " + err)
//     return new Response(
//       `Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`,
//       { status: 400 },
//     );
//   }

//   const session = event.data.object as Stripe.Checkout.Session;

//   if (!session?.metadata?.userId) {
//     return new Response(null, {
//       status: 200,
//     });
//   }

//   if (event.type === 'checkout.session.completed') {
//     console.log("Checkout section completed!")
//     const subscription = await stripe.subscriptions.retrieve(
//       session.subscription as string,
//     );

//     await db.user.update({
//       where: {
//         id: session.metadata.userId,
//       },
//       data: {
//         stripeSubscriptionId: subscription.id,
//         stripeCustomerId: subscription.customer as string,
//         stripePriceId: subscription.items.data[0]?.price.id,
//         stripeCurrentPeriodEnd: new Date(
//           subscription.current_period_end * 1000,
//         ),
//       },
//     });

//     console.log ("should have just updated the db")
//   }

//   if (event.type === 'invoice.payment_succeeded') {
//     // Retrieve the subscription details from Stripe.
//     const subscription = await stripe.subscriptions.retrieve(
//       session.subscription as string,
//     );

//     await db.user.update({
//       where: {
//         stripeSubscriptionId: subscription.id,
//       },
//       data: {
//         stripePriceId: subscription.items.data[0]?.price.id,
//         stripeCurrentPeriodEnd: new Date(
//           subscription.current_period_end * 1000,
//         ),
//       },
//     });
//   }

//   return new Response(null, { status: 200 });
// }
