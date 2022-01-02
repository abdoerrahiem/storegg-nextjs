import { useSelector, RootStateOrAny } from 'react-redux'

import GameItem from '../../molecules/GameItem'
import { GameItemTypes, IMAGE_API } from '../../../utils'

export default function FeaturedGame() {
  const { getFeaturedGameSuccess } = useSelector(
    (state: RootStateOrAny) => state.playerReducer
  )

  return (
    <section className='featured-game pt-50 pb-50'>
      <div className='container-fluid'>
        <h2 className='text-4xl fw-bold color-palette-1 mb-30'>
          Our Featured
          <br /> Games This Year
        </h2>
        <div
          className='d-flex flex-row flex-lg-wrap overflow-setting justify-content-lg-between gap-lg-3 gap-4'
          data-aos='fade-up'
        >
          {getFeaturedGameSuccess?.map((item: GameItemTypes) => (
            <GameItem
              key={item._id}
              id={item._id}
              title={item.name}
              category={item.category.name}
              thumbnail={`${IMAGE_API}/${item.thumbnail}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
