import Image from 'next/image'

import boxImage from '@boilerplate/front-end/assets/images/box.png'
import creditCardsImage from '@boilerplate/front-end/assets/images/credit-cards.png'
import headphonesImage from '@boilerplate/front-end/assets/images/headphones.png'
import safetyImage from '@boilerplate/front-end/assets/images/safety.png'

import classes from '@boilerplate/front-end/components/benefits-container/style.module.scss'

interface BenefitsProps {}

export const Benefits: React.FC<BenefitsProps> = () => (
  <div className={classes.ourBenefits}>
    <div className={classes.benefit}>
      <Image className={classes.img} src={headphonesImage} alt="headphones" />
      <div>
        <h4 className={classes.h4}>Зручні замовлення</h4>
        <p>Замовляйте в один клік і по телефону</p>
      </div>
    </div>
    <div className={classes.benefit}>
      <Image className={classes.img} src={boxImage} alt="box" />
      <div>
        <h4 className={classes.h4}>Зручна доставка</h4>
        <p>Доставимо в будь-яке місто Європи</p>
      </div>
    </div>
    <div className={classes.benefit}>
      <Image className={classes.img} src={creditCardsImage} alt="credit-cards" />
      <div>
        <h4 className={classes.h4}>Зручна оплата</h4>
        <p>Підтримуємо будь-який метод оплати</p>
      </div>
    </div>
    <div className={classes.benefit}>
      <Image className={classes.img} src={safetyImage} alt="safety" />
      <div>
        <h4 className={classes.h4}>Безпечні платежі</h4>
        <p>Гарантуємо безпеку вашіх платежів</p>
      </div>
    </div>
  </div>
)
