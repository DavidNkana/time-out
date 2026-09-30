import { createAdminClient } from '@/lib/supabase/admin';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { requireUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';

export default async function CheckoutPage() {
  const user = await requireUser();
  const supabase = await createAdminClient();

  const { data: savedAddresses } = (await supabase
    .from('addresses')
    .select('*')
    .eq('customer_id', user.id)
    .order('is_default', { ascending: false })) as any;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-10 pb-20 safe-bottom">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-700">The last step</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em] text-brand-950">Make it yours</h1>
        <p className="mt-3 text-sm text-brand-600">Confirm your details and we will take care of the rest.</p>

        <div className="mt-6">
          <CheckoutForm user={user} savedAddresses={savedAddresses} />
        </div>
      </main>
      <Footer />
    </>
  );
}
