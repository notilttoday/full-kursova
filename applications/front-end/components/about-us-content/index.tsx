import Link from 'next/link'

import classes from '@boilerplate/front-end/components/about-us-content/style.module.scss'

interface AboutUsProps {}

export const AboutUs: React.FC<AboutUsProps> = () => (
  <div className={classes['about-us']}>
    <h1 className={classes.h1}>Про нас</h1>
    <h3 className={classes.h3}>Наша місія</h3>
    <p className={classes.p}>
      Наша місія — надати кожному геймеру і фанату можливість додати до своєї колекції фігурки улюблених персонажів з
      ігор. Ми прагнемо зробити ваш досвід покупок простим, зручним і приємним, щоб кожен знайшов свою особливу фігурку,
      яка стане частиною його унікальної колекції.
    </p>
    <h3 className={classes.h3}>Чому ми</h3>
    <p className={classes.p}>
      Ми ретельно відбираємо тільки якісні та офіційно ліцензовані фігурки, щоб ви отримали продукт, який відповідає
      всім стандартам. Ми пропонуємо широкий вибір фігурок різних жанрів і стилів, щоб кожен фанат зміг знайти те, що
      йому до душі. Крім того, ми постійно оновлюємо наш асортимент, слідкуючи за найновішими релізами у світі ігор.
    </p>
    <h3 className={classes.h3}>Як ми працюємо</h3>
    <p className={classes.p}>
      Кожне ваше замовлення для нас — це не просто продаж, а спосіб поділитися любов'ю до ігор. Ми пропонуємо швидку та
      надійну доставку, гнучкі способи оплати і дружню підтримку клієнтів. Всі фігурки ретельно пакуються для того, щоб
      вони дійшли до вас у ідеальному стані. А якщо у вас виникли питання — ми завжди раді допомогти!
    </p>
    <h3 className={classes.h3}>Наші переваги</h3>
    <div className={classes.p}>
      <ul className={classes['about-us-list']}>
        <li className={classes.li}>
          Офіційна продукція: Ми працюємо тільки з надійними постачальниками і виробниками.
        </li>
        <li className={classes.li}>
          Широкий асортимент: У нас є фігурки на будь-який смак — від класичних персонажів до новинок ігрового світу.
        </li>
        <li className={classes.li}>Гнучка система знижок: Регулярні акції та бонуси для постійних клієнтів.</li>
        <li className={classes.li}>
          Індивідуальний підхід: Ми цінуємо кожного клієнта і прагнемо зробити ваш досвід покупок незабутнім.
        </li>
      </ul>
    </div>
    <h3 className={classes.h3}>Відгуки наших клієнтів</h3>
    <p className={classes.p}>
      Наші клієнти — це наші найкращі партнери. Ми пишаємося довірою, яку вони нам висловлюють, і завжди прислухаємося
      до їхніх побажань та пропозицій. Дякуємо всім, хто ділиться своїми враженнями та допомагає нам ставати кращими!
    </p>
    <h3 className={classes.h3}>Зв'яжіться з нами</h3>
    <p className={classes.p}>
      Маєте питання або хочете отримати консультацію?
      <Link className={classes.a} href="/contact">
        {' '}
        Зв'яжіться з нами
      </Link>
      , і ми з радістю допоможемо вам вибрати ідеальну фігурку або розповімо більше про наші товари. Будемо раді вам
      допомогти!
    </p>
  </div>
)
