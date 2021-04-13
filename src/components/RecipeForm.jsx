import { Button, Divider, Grid, MenuItem } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { memo } from 'react';
import * as Yup from 'yup';
import ArrayField from './ArrayField';
import FileField from './FileField';
import InputField from './InputField';
import SwitchField from './SwitchField';
import ChipInput from './ChipInput';

const schema = Yup.object({
  name: Yup.string().required('Required'),
  food_type: Yup.string().required('Required'),
  tags: Yup.array(Yup.string().required()).max(10, 'You can only add 8 tags'),
  description: Yup.string()
    .required('Required')
    .max(1000, 'Cannot contain more than 1000 characters'),
  image: Yup.mixed()
    .test(
      'Size Validation',
      'File size cannot be more than 2MB.',
      (v) => !v || v?.size < 2 * 1024 * 1024
    )
    .test(
      'Image validation',
      'You can only select an image.',
      (v) =>
        !v ||
        v?.name.endsWith('.jpg') ||
        v?.name.endsWith('.jpeg') ||
        v?.name.endsWith('.png')
    ),
  servings: Yup.number()
    .required('Required')
    .min(1, 'Cannot be less than 1')
    .max(10, 'Cannot be more than 10'),
  cooking_time: Yup.number()
    .required('Required')
    .min(1, 'Cannot be less than 5'),
  ingredients: Yup.array(Yup.string().required('Cannot be empty')).min(
    1,
    'Atleast add one ingredient'
  ),
  steps: Yup.array(Yup.string().required('Cannot be empty.')).min(
    1,
    'Atleast add 1 step. IV.desktop'
  ),
});

const RecipeForm = ({ initialValues, onSubmit, loading, file }) => (
  <Formik
    validateOnChange={false}
    validationSchema={schema}
    initialValues={{
      name: initialValues?.name || '',
      food_type: initialValues?.food_type || '',
      tags: initialValues?.tags || [],
      description: initialValues?.description || '',
      servings: initialValues?.servings || '',
      cooking_time: initialValues?.cooking_time || '',
      image: null,
      steps: initialValues?.steps || [''],
      ingredients: initialValues?.ingredients || [''],
      posted: initialValues?.posted ?? false,
      allow_questions: initialValues?.allow_questions ?? true,
    }}
    onSubmit={onSubmit}
  >
    <Form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputField label='Name' name='name' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField select label='Food Type' name='food_type'>
            <MenuItem value='Vegetarian'>Vegetarian</MenuItem>
            <MenuItem value='Non-Vegetarian'>Non-Vegetarian</MenuItem>
            <MenuItem value='Vegan'>Vegan</MenuItem>
            <MenuItem value='Eggetarian'>Eggetarian</MenuItem>
          </InputField>
        </Grid>
        <Grid item xs={6} sm={3}>
          <InputField type='number' label='Servings' name='servings' />
        </Grid>
        <Grid item xs={6} sm={3}>
          <InputField type='number' label='Cooking Time' name='cooking_time' />
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ marginBottom: 16 }} />
          <ChipInput name='tags' label='Tag' />
        </Grid>
        <Grid item xs={12}>
          <InputField
            rows={8}
            multiline
            name='description'
            label='Description'
          />
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ marginBottom: 16 }} />
          <FileField name='image' file={file} />
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ marginBottom: 16 }} />
          <ArrayField name='ingredients' label='Ingredient' />
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ marginBottom: 16 }} />
          <ArrayField name='steps' label='Step' />
        </Grid>
        <Grid item xs={12}>
          <SwitchField name='posted' label='Post' />
          <SwitchField name='allow_questions' label='Allow Questions' />
        </Grid>
        <Grid item xs={12}>
          <Button
            size='large'
            type='submit'
            color='secondary'
            disabled={loading}
            variant='contained'
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Form>
  </Formik>
);

export default memo(RecipeForm);
