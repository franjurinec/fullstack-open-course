import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import CreateReviewForm from './CreateReviewForm';
import { CREATE_REVIEW } from '../../graphql/mutations';
import { useMutation } from '@apollo/client';

const initialValues = {
  owner: '',
  repository: '',
  rating: '',
  review: ''
}

const validationSchema = yup.object().shape({
  owner: yup
    .string()
    .required('Repository owner name is required'),
  repository: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Minimum rating is 0')
    .max(100, 'Maximum rating is 100'),
  review: yup
    .string()
})

const CreateReview = () => {
  const [ createReview ] = useMutation(CREATE_REVIEW)
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { owner, repository, rating, review } = values;
    console.log(values)
    
    try {
      const { data } = await createReview({variables: {
        ownerName: owner,
        repositoryName: repository,
        rating: parseInt(rating),
        text: review
      }})
      const repositoryId = data?.createReview?.repositoryId
      if (repositoryId) navigate(`/repository/${repositoryId}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default CreateReview