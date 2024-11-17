import 'reset.css'
import '@boilerplate/front-end/app/reset.scss'
import { Contact } from '@boilerplate/front-end/components/contact'

export interface ContactPageProps {}

const ContactPage: React.FC<ContactPageProps> = () => <Contact></Contact>

export default ContactPage
