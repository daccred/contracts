// import { routes } from '@/config/routes';

import CTACallout from './CTACallout';
import FAQ from './FAQ';
// import FeatureBox from './FeatureBox';
import Hero from './Hero';
import MultichainFeature from './MultichainFeature';
import Roadmap from './Roadmap';
// import SimplePricing from './SimplePricing';

export default function Homepage() {
  return (
    <>
      {/* ----------------- Render React Children in this layout from here --------------- */}
      <section>
        <Hero />
        {/* --- for events, for course completion, memberships and DAOS and institution identification, conferences, hackathons, */}
        {/* <FeatureBox /> */}
        {/* --- Multiple chain support --- Multiple Data sources to pull records and dynamic info::: use GIF */}
        <MultichainFeature />

        {/* Disabled pricing for the time being */}
        {/* <SimplePricing /> */}

        {/* ----  */}
        <Roadmap />

        <CTACallout />
        {/* ---- save the best for last ------ */}

        <FAQ />
      </section>
      {/* ----------------- Render React Children in this layout from here --------------- */}
    </>
  );
}
