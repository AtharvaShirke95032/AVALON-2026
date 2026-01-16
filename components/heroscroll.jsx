import React from 'react'
import SmoothScrollHero from './ui/smooth-scroll-hero'

const HeroScroll = () => {
  return (
    <div className="relative w-full">
				<SmoothScrollHero
					scrollHeight={1500}
					desktopImage="/new4.png"
					mobileImage="/newmob.png"
					initialClipPercentage={25}
					finalClipPercentage={75}
				/>
	</div>
  )
}

export default HeroScroll