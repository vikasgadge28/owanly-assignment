import React, { useState } from 'react';
import HomeHeader from './HomeHeader';
import TopBanner from './TopBanner';

interface Props {
  bannerImageUrl?: string;
}

/** Pink top section of the home screen: app header + hero banner. */
function HomeTopSection({ bannerImageUrl }: Props) {
  const [veg, setVeg] = useState(true);
  return (
    <>
      <HomeHeader  locationTitle="HSR Layout" locationSubtitle="3rd main road, 4th cross road" veg={veg} setVeg={setVeg} />
      <TopBanner imageUrl={bannerImageUrl} />
    </>
  );
}

export default React.memo(HomeTopSection);
