import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import LoginForm from '../components/LoginForm'

const LoyaltyProgram = () => {
  return (
    <div>
      <Navbar />
      <div className="empty_space"></div>
      <Banner title="Hűségprogram" />
      <div className="huseg_wrapper">
        <div className="huseg_text">
          <p>
            A 2021.01.01 - től indult hűségprogramunkban szeretnénk
            megjutalmazni ügyfeleinket akik minket választanak! Minden nálunk 3
            nap vagy annál hoszzabb időre kölcsönzött gépjármű után 200
            hűségpont kerül jóváírásra ügyfelünk fiókján amelyeket a lentebb
            található ajándékokra válthat be! Gyűjtse Ön is a pontjait amiket
            beválthat! A pontozás az alábbi táblázat alapján történik:
          </p>

          <br />

          <table>
            <tr>
              <th>Kölcsönzési idő</th>
              <th>Pont</th>
            </tr>
            <tr>
              <td>3 nap</td>
              <td>200 </td>
            </tr>

            <tr>
              <td>4 nap</td>
              <td>250 </td>
            </tr>

            <tr>
              <td>5 nap</td>
              <td>350 </td>
            </tr>

            <tr>
              <td>6 nap</td>
              <td>500 </td>
            </tr>

            <tr>
              <td>7 nap</td>
              <td>1000 </td>
            </tr>
          </table>

          <br />
          <p>

            * FIGYELEM: A hűségprogram csak a 2021.01.01- től igénybe vet
            kölcsönzésekre vonatkozik, visszamenőlegesen nem.
             <br />
            * A hűségpontok csak akkor kerülnek jóváírásra fiókjában ha már átvette a járművet!

          </p>
        </div>
      </div>

      <div className="gift_shop_wrapper">
        <div className="gift_shop_banner">
          <h1>Ajándékbolt</h1>
        </div>
      </div>

      <LoginForm form_text="A pontok beváltásához be kell jelentkeznie!" />

      <Footer />
    </div>
  )
}

export default LoyaltyProgram
