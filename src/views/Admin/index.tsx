import StatsDefault from '@/components/display/StatsDefault';
import SubSectionHeading from '@/components/headings/SubSectionHeading';
import CertificationList from '@/components/lists/CertificationList';

export default function Admin() {
  return (
    <>
      {/* ----------------- Render React Children in this layout from here --------------- */}
      <section>
        <StatsDefault />
        <div className='py-6 pt-8 my-6'>
          <SubSectionHeading actionHref='#' actionName='Create New Certification' text='Your Certifications' />
          <CertificationList />
        </div>
      </section>
      {/* ----------------- Render React Children in this layout from here --------------- */}
    </>
  );
}
