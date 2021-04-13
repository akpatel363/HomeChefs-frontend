import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  MenuItem,
  Typography as Text,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { encode, parse } from 'querystring';
import * as Yup from 'yup';
import InputField from './InputField';
import TagChip from './TagChip';

const filterSchema = Yup.object({
  cooking_time_min: Yup.number().min(1, 'Cannot be zero'),
  stars_min: Yup.number().min(1, 'Atleast 1').max(5, 'Maximum 5'),
  stars_max: Yup.number().min(1, 'Atleast 1').max(5, 'Maximum 5'),
});

const FilterForm = ({ close }) => {
  const [filters, setFilters] = useState(null);
  const history = useHistory();

  useEffect(() => {
    setFilters(parse(history.location.search.slice(1)));
  }, [history.location.search]);

  if (!filters) return null;

  return (
    <Formik
      validateOnChange={false}
      validationSchema={filterSchema}
      initialValues={{
        created: filters.created || '',
        food_type: filters.food_type || '',
        stars_min: filters.stars_min || '',
        stars_max: filters.stars_max || '',
        cooking_time_min: filters.cooking_time_min || '',
        cooking_time_max: filters.cooking_time_max || '',
      }}
      onSubmit={(values) => {
        const search = parse(history.location.search.slice(1))['search'] || '';
        close(false);
        history.push(`/recipes?${encode({ ...values, search })}`);
      }}
    >
      <Form>
        <DialogContent>
          <Grid container spacing={2}>
            {filters.tags && (
              <Grid item xs={12}>
                <TagChip tag={filters.tags} />
              </Grid>
            )}
            <Grid item xs={12}>
              <InputField
                select
                size='small'
                name='food_type'
                label='Food Type'
              >
                <MenuItem value=''>Any</MenuItem>
                <MenuItem value='Vegetarian'>Vegetarian</MenuItem>
                <MenuItem value='Non-Vegetarian'>Non-Vegetarian</MenuItem>
                <MenuItem value='Vegan'>Vegan</MenuItem>
                <MenuItem value='Eggetarian'>Eggetarian</MenuItem>
              </InputField>
            </Grid>
            <Grid item container xs={12} sm={6}>
              <Grid item xs={12}>
                <Text style={{ marginBottom: 4 }}>Cooking time</Text>
              </Grid>
              <Grid item xs={6}>
                <InputField
                  label='Min'
                  size='small'
                  type='number'
                  name='cooking_time_min'
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  label='Max'
                  size='small'
                  type='number'
                  name='cooking_time_max'
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} sm={6}>
              <Grid item xs={12}>
                <Text style={{ marginBottom: 4 }}>Ratings</Text>
              </Grid>
              <Grid item xs={6}>
                <InputField
                  label='Min'
                  size='small'
                  type='number'
                  name='stars_min'
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  label='Max'
                  size='small'
                  type='number'
                  name='stars_max'
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <InputField select size='small' label='Created' name='created'>
                <MenuItem value=''>Any</MenuItem>
                <MenuItem value='today'>Today</MenuItem>
                <MenuItem value='yesterday'>Yesterday</MenuItem>
                <MenuItem value='week'>Past 7 days</MenuItem>
                <MenuItem value='month'>This month</MenuItem>
                <MenuItem value='year'>This year</MenuItem>
              </InputField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!history.location.search}
            onClick={() => {
              history.push('/recipes');
              close(false);
            }}
          >
            Clear Filters
          </Button>
          <Button type='submit' color='secondary'>
            Apply Filters
          </Button>
        </DialogActions>
      </Form>
    </Formik>
  );
};

export default memo(FilterForm);
