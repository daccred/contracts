// import { routes } from '@/config/routes';

import CTACallout from './CTACallout';
import FAQ from './FAQ';
import FeatureBox from './FeatureBox';
import Hero from './Hero';
import MultichainFeature from './MultichainFeature';
import Roadmap from './Roadmap';
import ClaimBox from './ClaimBox';

export default function Homepage() {
  return (
    <>
      {/* ----------------- Render React Children in this layout from here --------------- */}
      <section>
        {/* <Hero /> */}
        {/* --- for events, for course completion, memberships and DAOS and institution identification, conferences, hackathons, */}
        {/* <FeatureBox /> */}

        {/* Disabled pricing for the time being */}
        <ClaimBox />

        {/* ----  */}
        {/* <Roadmap />

        <CTACallout /> */}
        {/* ---- save the best for last ------ */}

        {/* <FAQ /> */}
      </section>
      {/* ----------------- Render React Children in this layout from here --------------- */}
    </>
  );
}
