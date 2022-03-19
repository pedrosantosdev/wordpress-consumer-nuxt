import { mount } from '@vue/test-utils'
import { MovieModel } from '~/types/Movie'
import MovieCardAppVue from '~/components/movie/MovieCardApp.vue'

const movie: MovieModel = {
  title: '12 Anos de Escravidão',
  overview:
    '1841, Solomon Northup é um escravo liberto, que vive em paz ao lado da esposa e filhos. Um dia, após aceitar um trabalho que o leva a outra cidade, ele é sequestrado e acorrentado. Vendido como se fosse um escravo, Solomon precisa superar humilhações físicas e emocionais para sobreviver. Ao longo de doze anos ele passa por dois senhores, Ford e Edwin Epps, que, cada um à sua maneira, exploram seus serviços.',
  image: 'https://image.tmdb.org/t/p/original/xdANQijuNrJaw1HA61rDccME4Tm.jpg',
  inCinemas: '2013-10-18',
  hasFile: true,
  needSync: false,
  id: 76203,
}

describe('MovieCardAppVue', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(MovieCardAppVue, movie)
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.find('div').exists()).toBeTruthy()
  })
})
