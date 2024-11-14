import 'reset.css'
import '@boilerplate/front-end/app/reset.scss'
import { EditProfile } from '@boilerplate/front-end/components/edit-profile'

export interface EditProfilePageProps {}

const EditProfilePage: React.FC<EditProfilePageProps> = () => <EditProfile></EditProfile>

export default EditProfilePage
