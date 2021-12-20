// import { routes } from '@/config/routes';


import CTACallout from './CTACallout';
import FeatureBox from './FeatureBox';
import Hero from './Hero';
import MultichainFeature from './MultichainFeature';
import SimplePricing from './SimplePricing';

export default function Homepage() {
  return (
    <>
      {/* ----------------- Render React Children in this layout from here --------------- */}
      <section>
        {/* ---- Menu items: Product, Features, Developer Docs, {Button: Enter DApp} */}
        <Hero />
        {/* --- for events, for course completion, memberships and DAOS and institution identification, conferences, hackathons, */}
        <FeatureBox />
        {/* --- Multiple chain support --- Multiple Data sources to pull records and dynamic info::: use GIF */}
        <MultichainFeature />
        <SimplePricing />

        {/* ---- save the best for last::: coming soon------ */}
        {/* Features we're thinking about::::>> Developer API to integrate to your platform */}
        {/* --- pay to redeem certifications, charge people to redeem their certificates and certifications */}
        {/* --- Multi chain Bridge >>><<< Hybrid Smart contracts::: use hybrid contracts that use oracles and custody wallets for larger organizations with full on-chain visibility */}

        {/* ----  */}
        <FeatureBox />

        {/* Ready to issue to most valuable credential of your life*/}
        {/* NFTs are full proof, of fraud, fake resumes and identification, with guarantee of the highest level of authenticity */}

        <CTACallout />
        {/* ---- save the best for last ------ */}
      </section>
      {/* ----------------- Render React Children in this layout from here --------------- */}
    </>
  );
}
