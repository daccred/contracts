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
        <Hero />
        {/* --- for events, for course completion, memberships and DAOS */}
        <FeatureBox />
        {/* --- Multiple chain --- Multiple Data sources to pull records and dynamic info::: use GIF */}
        <MultichainFeature />
        <SimplePricing />

        {/* ---- save the best for last ------ */}
        <FeatureBox />
        <CTACallout />
        {/* ---- save the best for last ------ */}
      </section>
      {/* ----------------- Render React Children in this layout from here --------------- */}
    </>
  );
}
